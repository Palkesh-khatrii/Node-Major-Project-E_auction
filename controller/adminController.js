var indexModel = require('../models/indexModel')
var path = require('path')

function AdminConroller() {



    this.manageUser = () => {
        return new Promise((resolve, reject) => {
            var conditionValue = { role: 'user' }
            var setValue = { $set: { status: 1 } }
            var collectionName = "register"
            indexModel.find(collectionName, conditionValue).then((result) => {
                resolve(result)

            }).catch((err) => {
                reject(err)
            })
        })

    }

    this.manageUserStatus = (urlDetails) => {
        return new Promise((resolve, reject) => {
            var collectionName = "register"
            var conditionValue = { _id: parseInt(urlDetails.regid) }
            var status
            status = urlDetails.s == "block" ? 0 : (urlDetails.s == "verify" ? 1 : 2);
            if (status == 0 || status == 1) {
                var setValue = { $set: { status: status } }
                indexModel.update(collectionName, conditionValue, setValue).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }
            else {
                indexModel.delete(collectionName, conditionValue).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }

        })
    }

    this.addCategory = (catnm, caticonobj) => {
        return new Promise((resolve, reject) => {
            indexModel.addCategory(catnm, caticonobj).then((result) => {
                if(result.status==0)
                resolve(result)
                else
                {
                    var uploadpath=path.join(__dirname, "../public/uploads/categoryicons", result.caticonnm)
                    console.log(uploadpath)
                    caticonobj.mv(uploadpath)
                    resolve(result)
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

// this.registerUser = (userDetails) => {
//     return new Promise((resolve, reject) => {
//         indexModel.registerUser(userDetails).then((result) => {
//             if (result.status == 1)
//                 sendMail(userDetails.email, userDetails.password)
//             resolve(result)
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }
// this.verifyUser = (emailid) => {
//     return new Promise((resolve, reject) => {
//         var conditionValue = { email: emailid }
//         var setValue = { $set: { status: 1 } }
//         var collectionName = "register"
//         indexModel.update(collectionName, conditionValue, setValue).then((result) => {
//             var status = result ? 1 : 0;
//             resolve({ status: status })
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }
// this.userLogin=(userDetails)=>{
//     return new Promise ((resolve,reject)=>{
//         collectionName="register"
//         conditionValue={email:userDetails.email, password: userDetails.password,status:1} 
//         indexModel.find(collectionName,conditionValue).then((result)=>{
//             var status= result.length==0 ? 0 : (result[0].role=="admin" ? 1 :2);
//             resolve({status:status})

//         }).catch((err)=>{
//             reject(err)
//         })
//     })

// }
// }

module.exports = new AdminConroller();