var express = require('express');
var router = express.Router();
packController = require('../controllers/packController')

router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.params);

    next();
  })
router.get('/findOne/:nombre', packController.packAPI.findName)

router.get('/allPacks', packController.packAPI.findAllPacks)

router.delete('/delete/:id', packController.packAPI.deletePack)

router.post('/create', packController.packAPI.createPack)

router.get('/buy/:nombre', packController.packAPI.buyPack)

router.get('/open/:id', packController.packAPI.openPack)

router.get('/useItems/:nombre', packController.packAPI.useItems)

router.get('/useItem/:nombre/:index', packController.packAPI.useItem)

module.exports = router