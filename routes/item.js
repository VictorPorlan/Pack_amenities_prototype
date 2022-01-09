var express = require('express');
var router = express.Router();
itemController = require('../controllers/itemController')
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.params);
    next();
  })

router.get('/findOne/:nombre', itemController.itemAPI.findName)

router.get('/allItems', itemController.itemAPI.findAllItems)

router.delete('/delete/:id', itemController.itemAPI.deleteItem)

router.post('/create', itemController.itemAPI.createItem)

router.get('/use/:nombre', itemController.itemAPI.usarItem)

router.get('/calcPrice/:nombre', itemController.itemAPI.recalcularPrecio)

module.exports = router