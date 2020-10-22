var express = require('express');
var router = express.Router();
//nodemailer
// mailer = require('express-mailer');
const nodemailer = require("nodemailer");
const mail_host = "smtp.mailtrap.io";
const mail_host_port = 2525;
const mail_user_address = "23923c2764-06c482@inbox.mailtrap.io";
const mail_user_name = "4ee57b9f16ea5c";
const mail_user_pass = "854e571403b61f";
/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index')
// });/* GET home page. */
router.get('/', function (req, res) {

  res.render('home', {
    title: 'home'
  });
});

// router.get("/", (req, res, next) => {
//   try {
//     res.render('hometwo')
//   } catch (error) {
//     next(error)
//   }
// });




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

//************************************************************formulaire de contact*************************************************************************//

async function sendMail(infos) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: mail_host,
    port: mail_host_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail_user_name, // generated ethereal user
      pass: mail_user_pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    name: infos.nom,
    from: ` ${infos.email} `, //  address de la prsn
    to: mail_user_address, // mon email denvoi
    subject: infos.sujet, // Subject 
    text: infos.message, // plain text body
    html: `<div>${infos.message}</div>`, // html body
  });

}

router.post("/contact", async (req, res, next) => {
  console.log(req.body);
  sendMail(req.body)
    .then(() => {
      // console.log("mail: ");
      req.flash("success", "Votre message nous à été envoyé. Il sera traité rapidement .");
      res.redirect("/contact");
    })
    .catch((err) => {
      console.error("erreur:", err);
      res.status(500).json("/contact");
    });
});







module.exports = router;