var express = require("express"); // là on apporte express
var router = express.Router(); // là on utilise un fonction Router de express c'est pour creer les routes
// const fileUploader = require("./../config/cloudinary");
var moment = require("moment");
const protectUserRoute = require("./../middlewares/protectUserRoute")

const MaraudeModel = require("../models/Maraude");

// afficher la page du form-create-maraude 
router.get("/form-create-maraude", (req, res) => { // quand je tape /form-create-maraude sur mon navigateur 
    res.render("form-create-maraude"); //la page s'affiche
});

//----------  get all maraudes
/* GET all-maraudes page */
router.get("/all-maraudes", async (req, res, next) => { // quand je tape /form-create-maraude sur mon navigateur
    console.log("ici c req.body dans router get", req.body);
    try {
        const maraudes = await MaraudeModel.find().populate('participants');
        res.render("all-maraudes", {
            maraudes,
        });
    } catch (error) {
        next(error)
    }
});

// //router.get('/all', async (req, res, next) => {
//     try {
//         const addMaraude = await MaraudeModel.find().populate('participants')
//         }
//         res.render("fateliers/all-ateliers", {
//           addMaraude
//         })
//       } catch (error) {
//         next(error)
//       }



//route manage-maraudes
router.get("/manage-maraudes", async (req, res, next) => {
    try {
        const maraude = await MaraudeModel.find();
        // await le resultat d'une action asynchrone
        res.render("manage-maraudes", {
            maraude,
        });
    } catch (dbErr) {
        next(dbErr);
    }
});

//----post une maraude
router.post("/create", async (req, res, next) => {

    console.log("ici c req.body dans router POST", req.body);
    var date = moment(req.body.date).format("Do MMMM YYYY");
    console.log("moment", date);
    const maraude2 = {
        date: date,
        lieu: {
            numRue: req.body.numrue,
            nomRue: req.body.nomRue,
            ville: req.body.ville,
            code_postal: req.body.code_postal,
        },
    };
    const maraude = await MaraudeModel.create(maraude2);
    res.redirect("/maraude/all-maraudes");
});

//***********************************************************EDIT***********************************************************************

router.get("/form-edit/:id", async (req, res, next) => {
    try {
        const editMaraude = await MaraudeModel.findById(req.params.id);
        // await le resultat d'une action asynchrone
        // console.log(editMaraude)
        res.render("form-edit-maraude", {
            maraude: editMaraude,
        });
    } catch (dbErr) {
        next(dbErr);
    }
});

router.post("/form-edit/:id", async (req, res, next) => {
    try {
        const maraude1 = {
            lieu: {
                nomRue: req.body.nomRue,
                numRue: req.body.numRue,
                ville: req.body.ville,
                code_postal: req.body.code_postal,
            },
        };
        console.log("le body de post de Muram", req.body);
        const maraude = await MaraudeModel.findByIdAndUpdate(
            req.params.id,
            maraude1, {
                new: true,
            }
        );
        // console.log(maraude);
        // res.redirect("/manage-maraudes")
        res.redirect("/maraude/manage-maraudes");
    } catch (dbErr) {
        next(dbErr);
    }
});

// ci dessous, on utilise les segment dynamique de route d'express
// chaque mot préfixé avec : devient une variable
// cette varibale est accessible dans la fonctin suivante sous req.params
router.post("/inscription/:maraude_id/user/:user_id", async (req, res, next) => {
    console.log("post dans maraude req.params.maraude_id:", req.params.maraude_id, "user:", req.params.user_id);
    try {
        const updatedMaraude = await MaraudeModel.findByIdAndUpdate(req.params.maraude_id, {
            // { $push: { participants:  req.params.user_id } }

            $push: {
                participants: req.params.user_id
            }
        }, {
            new: true
        });
        console.log(updatedMaraude);

        // res.send("todo .. ajouter participant à maraude !")
        res.redirect("/dashboard/dashboard-user")
    } catch (err) {
        next(err);
    }

    ;

});

// la requete bdd : utiliser le modèle Maraude pour ajouter l'id du participant dans la maraude actuelle
// ajouter à la clé participants, l'id avec $push





//***********************************************************DELETE********************************************************************
router.get("/form-delete/:id", (req, res) => {
    console.log(req.params.id); //params psq y'a les :
    MaraudeModel.findByIdAndDelete(req.params.id)
        .then((dbRes) => {
            console.log(dbRes);
            res.redirect("/maraude/manage-maraudes");
        })
        .catch((dbErr) => console.error(dbErr));
});


router.get("/inscriptionMaraude/currentUser._id", protectUserRoute, async (req, res, next) => {
    console.log(req.session.currentUser);

    try {
        // 1 trouver l'atelier par id
        // 2 ajouter l'id de user connecté dans l'array des participants (mongo : $push)
        const updatedMaraude = await MaraudeModel.findByIdAndUpdate(req.params.id, {
            $push: {
                participants: req.session.currentUser._id
            }
        }, {
            new: true
        });
        console.log(updatedMaraude);

        res.send("todo : what's next ?")
    } catch (err) {
        next(err);
    }
});




module.exports = router;