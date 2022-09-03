const { promiseImpl } = require('ejs')
var indexModel = require('../models/indexModel')
var sendMail = require('./emailAPI')

function IndexConroller() {
    this.registerUser = (userDetails) => {
        return new Promise((resolve, reject) => {
            indexModel.registerUser(userDetails).then((result) => {
                if (result.status == 1)
                    sendMail(userDetails.email, userDetails.password)
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    
    this.verifyUser = (emailid) => {
        return new Promise((resolve, reject) => {
            var conditionValue = { email: emailid }
            var setValue = { $set: { status: 1 } }
            var collectionName = "register"
            indexModel.update(collectionName, conditionValue, setValue).then((result) => {
                var status = result ? 1 : 0;
                resolve({ status: status })
            }).catch((err) => {
                reject(err)
            })
        })
    }
    this.userLogin=(userDetails)=>{
        return new Promise ((resolve,reject)=>{
            collectionName="register"

            conditionValue={email:userDetails.email, password: userDetails.password,status:1} 
            indexModel.find(collectionName,conditionValue).then((result)=>{
                var status= result.length==0 ? 0 : (result[0].role=="admin" ? 1 :2);
                resolve({status:status, userDetails:result[0]})
            }).catch((err)=>{
                reject(err)
            })
        })
        
    }
}

module.exports = new IndexConroller();