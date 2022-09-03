var express = require('express');
var router = express.Router();

/* middleware function to check user */
router.use((req,res,next)=>{
    req.session.sunm==undefined || req.session.srole!="user"
    ? res.redirect("/login")
    : next();
   })


/* GET users listing. */
router.get('/',(req, res, next) =>{
    console.log(req.session.sunm)
res.render('userhome',{"sunm": req.session.sunm});
});



module.exports = router;
