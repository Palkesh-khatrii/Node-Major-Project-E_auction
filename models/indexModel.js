const { promiseImpl } = require('ejs');
const { response } = require('express');
var db = require('./connection');

function IndexModel() {
  this.registerUser = (userDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("register").find().sort({ "_id": -1 }).toArray((err, result) => {
        if (err)
          reject(err)
        else {
          var flag = 1
          var _id
          if (result.length == 0)
            _id = 1
          else {
            _id = result[0]._id + 1

            for (let row of result) {
              if (row.email == userDetails.email)
                flag = 0
            }

          }

          if (flag == 1) {
            userDetails._id = _id
            userDetails.role = "user"
            userDetails.status = 0
            userDetails.info = Date()

            db.collection("register").insertOne(userDetails, (err, result) => {
              err ? reject(err) : resolve({ "status": 1 });
            })
          }
          else
            resolve({ "status": 0 })
        }
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

  this.find = (collectionName, conditionValue) => {
    return new Promise((resolve, reject) => {
      db.collection(collectionName).find(conditionValue).toArray((err, result) => {
        err ? reject(err) : resolve(result);
      })
    })
  }
  //to block ,unblock and delete the  user
  this.delete = (collectionName, conditionValue) => {
    return new Promise((resolve, reject) => {
      db.collection(collectionName).remove(conditionValue, (err, result) => {
        err ? reject(err) : resolve(result);
      })
    })
  }
  this.addCategory = (catnm, caticonobj) => {
    return new Promise((resolve, reject) => {
      db.collection("category").find().sort({ "_id": -1 }).toArray((err, result) => {
        var _id = result.length == 0 ? 1 : result[0]._id + 1;
        //to avoid duplicacy
        var flag = result.find(e => e.catnm == catnm)
        var caticonnm = Date.now()+ "-" +caticonobj.name

        if (!flag) {
          db.collection("category").insertOne({ "_id": _id, "catnm": catnm, "caticonobj": caticonnm }).
            err ? reject(err) : resolve({ status: 1, caticonnm: caticonnm });
        }
        else {
          resolve({ status: 0 })
        }
      })
    })
  }

  // this.addCategory = (catnm, caticonobj) => {
  //   return new Promise((resolve, reject) => {
  //     var caticonnm = Date() + '-' + caticonobj.name
  //     db.collection("category").insertOne({ "catnm": catnm, "caticonobj": caticonnm }).
  //       err ? reject(err) : resolve();
  //   })
  // }
}

module.exports = new IndexModel();