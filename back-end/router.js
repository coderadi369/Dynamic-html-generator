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
    	 return res.status(200).json({'status':'success','message':'htmldata inserted successfully'})
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
	}).then(function(data){
		database.close()
		return res.status(200).json({'status':'success','message':'document found out'})
	}).catch(function(error){
		database.close()
		console.log(error)
		return res.status(500).json({'status':'error','message':'document was not found'})
	})
	
})



