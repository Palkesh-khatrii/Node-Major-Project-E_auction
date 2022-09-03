var indexModel = require("models/indexmodel")
const sendMail = require("../controller/emailAPI")



this.registerUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        indexModel.registerUser(userDetails).then((result) => {
            if (result.status == 1) {
                sendMail(userDetails.email, userDetails.password)
            }

        }).catch((err) => {
            console.log(err)
        })
    })
}


this.verifyUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        var collectionName = "register"
        var conditionValue = { email: emailid }
        var setValue = { $set: { status: 1 } }
        indexModel.verifyUser(collectionName, conditionValue, setValue).then((result) => {
            var status = result ? 1 : 0;
            resolve({ status: status })
        }).catch((err) => {
            console.log(err)
        })
    })
}
this.userLogin = (emailid) => {
    return new Promise((resolve, reject) => {
        var collectionName = "register"
        var conditionValue = { email: userDetails.email, password:userDetails.password }    
        indexModel.find(collectionName, conditionValue).then((result) => {
            var status = result.length==0 ? 0 : (result[0].role=="admin" ? 1:2);
            resolve({ status: status, userDetails:result[0]})
        }).catch((err) => {
            console.log(err)
        })
    })
}