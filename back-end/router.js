const router =module.exports=require('express').Router()
const {DB}=require(`${__base}/utils/db`)
const {config}=require(`${__base}/utils/config`)
const cors = require('cors')
const mongo=require('mongodb')


var corsOptions = {
  credentials: true
}

router.use((req, res, next) => {
  corsOptions['origin'] = req.get('origin')
  next()
}, cors(corsOptions))


router.post('/', (req,res)=>{
	let database=new DB()
    const {client:{mongodb}}=config
    database.connect(mongodb.defaultUri+'/'+mongodb.defaultDatabase).then(()=>{
    	  return database.insertDocuments('htmldata',req.body)
    }).then(function(data){
    	 database.close()
    	 console.log("data",data)
    	 return res.status(200).json({'url':'localhost:4000/htmlview/'+data.ops[0]._id})
	}).catch(function(error){
		 console.log("eroor",error)
		 database.close()
		 return res.status(500).json({'status':'error','message':'some error occured while inserting into db'})
	})


})

router.get('/htmlview/:id',(req,res)=>{
	let database=new DB()
	const {client:{mongodb}}=config
	console.log("req.params",req.params.id)
	database.connect(mongodb.defaultUri+'/'+mongodb.defaultDatabase).then(()=>{
		return database.findDocument('htmldata',{'_id':new mongo.ObjectID(req.params.id)})
	}).then(function(result){
		database.close()
		if(result.data)
			res.render('home',{data:result.data})
		else
			res.status(400).json({'message':'HTML view not found'})
	}).catch(function(error){
		database.close()
		console.log(error)
		return res.status(500).json({'status':'error','message':'html view was not found'})
	})
	
})



