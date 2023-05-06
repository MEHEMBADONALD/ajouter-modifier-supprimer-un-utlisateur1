var express = require('express');
const uniqid=require('uniqid')
const mongoose = require('mongoose');
var router = express.Router();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  idUser: { type: String, required:true},
  name: { type: String, required:true},
  email: { type: String, required:true},
  tel: { type: String, required:true},
  ville: { type: String, required:true},
  pays: { type: String, required:true},
  poids: { type: String, required:true},
  sexe: { type: String, required:true},
  description: { type: String, required:true},
});

const userModel = mongoose.model('user', userSchema);
module.exports = router;

/* Page create */
router.post('/create', function(req, res) {
  let nom=req.body.nom
  let email=req.body.email
  let tel=req.body.tel
  let ville=req.body.ville
  let pays=req.body.pays
  let poid=req.body.poid
  let sexe=req.body.sexe
  let comment=req.body.comment

  if (nom=='' || email=='' || tel=='' || ville=='' || pays=='' || poid=='' || sexe=='' || comment=='') {
    req.session.error=true
    res.redirect('/create')
  }else{
    let newUser=new userModel({
      idUser:uniqid(),
      name:req.body.nom,
      email:req.body.email,
      tel:req.body.tel,
      ville:req.body.ville,
      pays:req.body.pays,
      poids:req.body.poid,
      sexe:req.body.sexe,
      description:req.body.comment,
    })

    newUser.save()
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => console.log(err))
  }
});


/* Page index */
router.get('/', (req, res) => {
  userModel.find()
  .then((item) => {
    res.render('pages/index',{users:item})
  })
  .catch((err) => console.log(err))
})

// page delete  pr supprimer un utilisateur

router.get('/delete/:id', (req, res) => {
  userModel.deleteOne({idUser:req.params.id})
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => console.log(err))
})

// page edit pour editer un utilisateur : modifier un utilisation

router.get('/edit/:id', (req, res) => {
  if (req.session.error) {
    res.locals.error=req.session.error
    req.session.error=undefined
  }
  userModel.find({idUser:req.params.id})
  .then((item) => {
    res.render('pages/edit',{user:item[0]})
  })
  .catch((err) => console.log(err))
})

router.post('/edit/:id', (req, res) => {
  let nom=req.body.nom
  let email=req.body.email
  let tel=req.body.tel
  let ville=req.body.ville
  let pays=req.body.pays
  let poid=req.body.poid
  let sexe=req.body.sexe
  let comment=req.body.comment

  if (nom=='' || email=='' || tel=='' || ville=='' || pays=='' || poid=='' || sexe=='' || comment=='') {
    req.session.error=true
    res.redirect('/edit/'+req.params.id)
  }else{
    let updateUser={
      name:req.body.nom,
      email:req.body.email,
      tel:req.body.tel,
      ville:req.body.ville,
      pays:req.body.pays,
      poids:req.body.poid,
      sexe:req.body.sexe,
      description:req.body.comment,
    }
  userModel.updateOne({idUser:req.params.id},{$set:updateUser})
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => console.log(err))

  }
})