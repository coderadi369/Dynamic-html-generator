const MongoClient = require('mongodb').MongoClient;
function DB() {
    this.db = null;            // The MongoDB database connection
}

DB.prototype.connect = function(uri) {
	var _this = this;
    return new Promise(function(resolve, reject) {
        if (_this.db) {
            resolve();
        } else {
            var __this = _this;
            MongoClient.connect(uri)
            .then(
                function(database) {
                    __this.db = database;
                   resolve();
                },
                function(err) {
                	console.log("Error connecting: " + err.message);
					reject(err.message);
                }
            )
        }
    })
}

DB.prototype.insertDocuments=function(collection_name,data){
	var _this=this
	return new Promise((resolve,reject)=>{
	   let collection=(_this.db).collection(collection_name)
       collection.insert(data,(err,result)=>{
             if(err){
             	reject({'status':'error','message':"Error occurred while inserting to database",'dev_message':err})
             }
            console.log("result",result)
            resolve({'status':'success','message':'document inserted successfully'})
       });
	})
}

DB.prototype.findDocument=function(collection_name,data){
    var _this=this
    console.log("data",data)
    return new Promise((resolve,reject)=>{
        let collection=(_this.db).collection(collection_name)
        collection.findOne(data,(err,result)=>{
            if(err){
                reject({'status':'error','message':'Error occured while finding login'})
            }
        console.log("result",result)
        resolve({'status':'success','message':'logged in user successfully','result':result})
        })
    })
}

DB.prototype.close = function() {
    if (this.db) {
        this.db.close()
        .then(
            function() {},
            function(error) {
                console.log("Failed to close the database: " + error.message)
            }
        )    
    }
}

module.exports={
	DB
}