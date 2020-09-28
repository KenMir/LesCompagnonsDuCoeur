var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('home', {
    title: 'home'
  });
});

router.get('/participer', function (req, res) {
  res.render('participer', {
    title: 'PARTICIPER'
  });
});

router.get('/contact', function (req, res) {
  res.render('contact', {
    title: 'CONTACT'
  });
});


//************************************************************ROUTE POUR AFFICHER MON DASHBOARD ADMIN*************************************************************************//

router.get('/dashboard-admin', function (req, res) {
  res.render('dashboard-admin', {
    title: 'Dashboard Admin'
  });
});

//************************************************************ROUTE POUR AFFICHER MA HOME*************************************************************************//








module.exports = router;