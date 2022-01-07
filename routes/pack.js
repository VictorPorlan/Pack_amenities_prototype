var express = require('express');
var router = express.Router();
packController = require('../controllers/packController')

router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.params);

    next();
  })
router.get('/allPacks', packController.packAPI.findAllPacks)

router.delete('/delete/:id', packController.packAPI.deletePack)

router.post('/create', packController.packAPI.createPack)

router.get('/buy/:id', packController.packAPI.buyPack)

router.get('/open/:id', packController.packAPI.openPack)

module.exports = router