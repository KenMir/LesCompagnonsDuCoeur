var express = require('express');
var router = express.Router();

const UserModel = require('../models/Users');

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });


//---------RECOVER-ALL --------
router.get("/all", async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
});

//---------RECOVER-ID --------
router.get("/one/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
});


//--------- CREATE--------

router.post("/create", async (req, res, next) => {
  try {
    const newUser = await UserModel.create(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
});


//--------- DELETE--------

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id)
    res.json(deleteUser)
  } catch (err) {
    next(err)
  }
})

//--------- UPDATE--------
router.patch("/update/:id", async (req, res, next) => { //:id est une variable les : signifie que c'est une variable case modifiable avec : l'id peut être n'importe quoi 
  try {
    const uptadeUser = await UserModel.findByIdAndUpdate(
      req.params.id, //params c'est un objet de la requete il contient toute les données du lien il contient id tous les : quon a mi dans le lien
      req.body, {
        new: true, //si on met pas ça sera l'ancien qui sera tjs là 
      }
    );
    res.json(uptadeUser)
  } catch (err) {
    next(err)
  }
})





module.exports = router;