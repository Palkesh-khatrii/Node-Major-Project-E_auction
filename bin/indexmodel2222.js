const db = require("../models/connection")




this.registerUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        db.collection("register").find().sort({ "_id": -1 }).toArray((err, result) => {
            if (err)
                reject(err)
            else {
                var flag = 1
                var _id = result.length == 0 ? 1 : result[0]._id + 1

                for (let row of result)
                    if (userDetails.email == row.email) {
                        flag = 0
                    }
            }
            if (flag == 1) {
                userDetails._id = _id
                userDetails.role = "user"
                userDetails.status = 0
                userDetails.info = Date()

                db.collection("register").insertOne(userDetails, (err, result) => {
                    err ? reject(err) : resolve({ status: 1 });
                })
            }
            else
                resolve({ "status": 0 })
        })
    })

}


this.update = (collectionName, conditionValue, setValue) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).updateOne(conditionValue, setValue, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    })
}

this.find =(collectionName, conditionValue) =>{
    return new promise ((resolve,reject)=>{
        db.collection(collectionName).find(conditionValue).toArray((err,result)=>{
            err ? reject(err) : resolve(result)
        })
    })
}





