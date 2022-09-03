var express = require('express');
var router = express.Router();
var indexController = require('../controller/indexController')
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/contact', (req, res, next) => {
  res.render('contact');
});

router.get('/service', (req, res, next) => {
  res.render('service');
});

router.get('/register', (req, res, next) => {
  res.render('register', { "output": "" });
});

router.post('/register', (req, res, next) => {
  indexController.registerUser(req.body).then((result) => {
    var msg = result.status ? "User registered successfully...." : "Registration failed , user already exists....";
    res.render('register', { "output": msg });
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/verifyUser', (req, res, next) => {
  indexController.verifyUser(req.query.emailid).then((result) => {
    if (result.status)
      res.redirect('/login')
    else
      res.render('register', { "output": "Verification failed, please try again......" });
  }).catch((err) => {
    console.log(err)
  })
});


//For login page
router.get('/login', (req, res, next) => {
  req.session.sunm = undefined
  req.session.srole = undefined
  res.render('login', { "output": "" });
});

router.post('/login', (req, res, next) => {
  indexController.userLogin(req.body).then((result) => {
    
    //to set user details in session
    var token
    if (result.status == 1 || result.status == 2) {
      let payload = { subject: result.userDetails._id }
      console.log(" payload=========================   ",payload )
      token = jwt.sign(payload, 'fsfsfgsyfhjghjfghdfs') 
      console.log(" token------------------------------  ",token )
      jwt.verify(token, 'fsfsfgsyfhjghjfghdfs')

      req.session.sunm = result.userDetails.email
      req.session.srole = result.userDetails.role
      req.session.token = token


         
      //res.json({token :token, userDetails:userDetails})
     
      //code for UI page it will not support on server side end only work on client end need to post on UI page.
      /*localStorage.setItem('token', token)
      localStorage.setItem('_id', result.userDetails._id)
      localStorage.setItem('name', result.userDetails.name)
      localStorage.setItem('email', result.userDetails.email)
      localStorage.setItem('password', result.userDetails.password)
      localStorage.setItem('mobile', result.userDetails.mobile)
      localStorage.setItem('address', result.userDetails.address)
      localStorage.setItem('city', result.userDetails.city)
      localStorage.setItem('gender', result.userDetails.gender)
      localStorage.setItem('role', result.userDetails.role)
      localStorage.setItem('info', result.userDetails.info)*/
    }
    else
    {
          token = 'error'
          // localStorage.setItem('token', token)
         // res.json({token :token, userDetails:userDetails})
    }


    // console.log(token)

    result.status ? (result.status == 1 ? res.redirect('/admin') : res.redirect('/users')) : res.render('login', { 'output': "Invalid User , please verify your account" });

  }).catch((err) => {
    console.log(err)
  })
});

module.exports = router;