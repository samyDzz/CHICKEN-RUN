var express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

// se connecter à la base de données MongoDB
mongoose.connect('mongodb://localhost/chickendb', { useNewUrlParser: true });

// définir le modèle Chicken
const chicken_schema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: Date,
  weight: { type: Number, required: true },
  steps: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
  farmyard: { type: mongoose.Schema.Types.ObjectId, ref : "Farmyard" }
});

const Chicken = mongoose.model('Chicken', chicken_schema);

/* Récuperer tous les elements de la collection Chicken. */
router.get('/', async (req, res, next) => {
  try{  
    const chickens = await Chicken.find();
    res.send(chickens);    
  } catch (e) {
    console.log(e.stack);
  }  
});

// Ajouter un nouvel element à la collection Chicken.
router.post('/', async (req, res) => {
  try {

    const chicken = new Chicken(req.body);
    await chicken.save();
    res.send(chicken);

  } catch (e) {
    console.log(e.stack);
  }  
});

// Récuperer un element spécifique de la collection  
router.get('/chicken/:id', async (req, res) => {
  try{

    const chicken = await Chicken.findById(req.params.id, req.body);
    res.send(chicken);

  } catch (e) {
    console.log(e.stack);
  }
});

// modifier un element spécifique de la collection  
router.patch('/chicken/:id', async (req, res) => {
  try{

    const chicken = await Chicken.findByIdAndUpdate(req.params.id, req.body);
    res.send(chicken);

  } catch (e) {
    console.log(e.stack);
  }
});
router.put('/chicken/:id', async (req, res) => {
  try{

    const chicken = await Chicken.findByIdAndUpdate(req.params.id, req.body);
    res.send(chicken);

  } catch (e) {
    console.log(e.stack);
  }
});

// Supprimer un element spécifique de la collection  
router.patch('/chicken/:id/run', async (req, res) => {
  try{
    
    const chicken = await Chicken.findById(req.params.id);
    chicken.steps++;
    chicken.isRunning = true;
    await chicken.save();
    res.send(chicken);

  } catch (e) {
    console.log(e.stack);
  }
});




module.exports = router;
