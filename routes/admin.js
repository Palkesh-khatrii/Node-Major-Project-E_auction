var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController')

/* middleware function to check admin user */
router.use((req, res, next) => {
    req.session.sunm == undefined || req.session.srole != "admin"
        ? res.redirect("/login")
        : next();
})

/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log(req.session.sunm)
    console.log(req.session.srole)
    res.render('adminhome', { "sunm": req.session.sunm });
});

router.get('/manageuser', (req, res, next) => {
    adminController.manageUser().then((result) => {
        res.render('manageuser', { result: result, "sunm": req.session.sunm });
    }).catch((err) => {
        console.log(err)
    })

});

router.get('/manageuserstatus', (req, res, next) => {
    adminController.manageUserStatus(req.query).then((result) => {
        res.redirect('/admin/manageuser', { "sunm": req.session.sunm })
    }).catch((err) => {
        console.log(err)
    })

});

router.get('/addcategory', (req, res, next) => {
    res.render('addcategory', { "sunm": req.session.sunm, "output": "" });
});

router.post('/addcategory', (req, res, next) => {
    adminController.addCategory(req.body.catnm, req.files.caticon).then((result) => {
        var msg =result.status ==1 ? "Category added sucessfully...." : "Category not added"
        res.render('addcategory', { "sunm": req.session.sunm, "output": "Category added sucessfully" });
    }).catch((err) => {
        console.log(err)
    })
                
});

module.exports = router;
