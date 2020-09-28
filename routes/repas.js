var express = require('express');
var router = express.Router();

const RepasModel = require('../models/Repas');

// afficher la page du form-create-maraude
router.get("/form-create-repas", (req, res) => {
    res.render("form-create-repass")
})

//----post une maraude
router.post("/create", async (req, res) => { //fileUploader sert à upload une image 

    const repas = {

        lieu: {
            numRue: req.body.numrue,
            nomRue: req.body.nomRue,
            ville: req.body.ville,
            code_postal: req.body.code_postal,
        },
    }
    const maraude = await MaraudeModel.create(repas)
    res.redirect("/maraude/all-maraudes")

});

//---------RECOVER-ALL --------
router.get("/all", async (req, res, next) => {
    try {
        const allRepas = await RepasModel.find()
        res.json(allRepas)
    } catch (err) {
        next(err)
    }
});

//---------RECOVER-ID --------
router.get("/one/:id", async (req, res, next) => {
    try {
        const oneRepas = await RepasModel.findById(req.params.id)
        res.json(oneRepas)
    } catch (err) {
        next(err)
    }
});

//--------- CREATE--------

router.post("/create", async (req, res, next) => {
    try {
        const newRepas = await RepasModel.create(req.body)
        res.json(newRepas)
    } catch (err) {
        next(err)
    }
});

//--------- DELETE--------

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const deleteRepas = await RepasModel.findByIdAndDelete(req.params.id)
        res.json(deleteRepas)
    } catch (err) {
        next(err)
    }
});

//--------- UPDATE--------

router.patch("/update/:id", async (req, res, next) => {
    try {
        const uptaderepas = await RepasModel.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
            }
        );
        res.json(uptaderepas)
    } catch (err) {
        next(err)
    }
})

module.exports = router;