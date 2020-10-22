const express = require('express');
const router = express.Router();
const userModel = require("../models/Users");
const protectAdminRoute = require("../middlewares/protectAdminRoute")
const protectuserRoute = require("../middlewares/protectUserRoute")

/************************************************/
/****** Route administrable par l'admin  ********/
/************************************************/

router.get('/manage-users', protectAdminRoute, function (req, res, next) {
    userModel
        .find()
        .then((dbRres) => {
            res.render('dashboard/manage-users', {
                users: dbRres
            });
        })
        .catch(next);
});

/************************************************/
/******         delete users             ********/
/************************************************/

router.get("/user-delete/:id", (req, res, next) => {
    userModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/dashboard/manage-users"))
        .catch(next);
});


/************************************************/
/******          edit users              ********/
/************************************************/

router.get("/user-edit/:id", async (req, res, next) => {
    console.log(req);

    try {
        console.log("whats in req.params.id", req.params.id)
        const user = await userModel.findById(req.params.id)
        res.render("dashboard/form-edit-users", {
            user
        })
    } catch (next) {
        next(err)
    }
});

// router.get('/form-edit/:id', async (req, res, next) => {
//     try {
//         const atelier = await atelierModel.findById(req.params.id)
//         const categories = await categoryModel.find()
//         res.render("fateliers/form-edit-atelier", {
//             atelier,
//             categories
//         })
//     } catch (err) {
//         next(err)
//     }
// })
router.post("/user-edit/:id", (req, res, next) => {
    console.log("did i get in here")
    const user = {
        ...req.body
    };
    userModel
        .findByIdAndUpdate(req.params.id, user, {
            new: true
        })
        .then((dbRes) => res.redirect("/dashboard/manage-users"))
        .catch(next)
});


/************************************************/
/****** Route administrable par l'user  ********/
/************************************************/
router.get("/dashboard-user", protectuserRoute, (req, res) => {
    res.render("dashboard-user")
});






module.exports = router;