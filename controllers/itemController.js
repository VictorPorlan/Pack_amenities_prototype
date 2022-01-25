requireItem = require("../domain/item");
requireConsumible = require("../domain/item/consumible/consumible");
requireIndestructible = require("../domain/item/indestructible/indestructible");
requireNormal = require("../domain/item/normal/normal");
Item = requireItem.class
Normal = requireNormal.class
Consumible = requireConsumible.class
Indestructible = requireIndestructible.class

Items = require("../models/item");
var itemAPI = (function singleController() {
  const findName = (req, res, next) => {
    Items.findOne({ nombre: req.params.nombre }).exec(function (err, item) {
      res.status(200).type("json").json(item);
    });
  };
  const findAllItems = (req, res, next) => {
    Items.find()
      .exec(function (err, items) {
        res.status(200).type("json").json(items);
      });
  };
  const deleteItem = (req, res, next) => {
    Items.findOneAndDelete({ _id: req.params.id }).exec(function (
      err,
      deletedItem
    ) {
      res.status(200).type("json").json(deletedItem);
    });
  };

  const createItem = async (req, res, next) => {
    let data = ({
      nombre: nombre,
      precio: precio,
      demanda: demanda,
      calidad: calidad,
      cantidad: cantidad
    } = req.body);
    let itemInstance = new Items(data);
    itemInstance.save(
      function (err) {
            if (err) return next(err);
        }
    )
    res.status(200).type("json").json(itemInstance);
  };

  const usarItem = async (req, res, next) => {
    Items.findOne({ nombre: req.params.nombre }).exec(function (err, item) {
      let {nombre, precio, demanda, calidad, cantidad} = item
      let domainItem = new this[item.material](nombre, precio, demanda, calidad, cantidad);
      domainItem.usarItem()
      item.calidad = domainItem.calidad
      item.cantidad = domainItem.cantidad
      item.save()
      res.status(200).type("json").json(item);
    });
  };

  const recalcularPrecio = async (req, res, next) => {
    Items.findOne({ nombre: req.params.nombre }).exec(function (err, item) {
      let {nombre, precio, demanda, calidad, cantidad} = item
      let domainItem = new this[item.material](nombre, precio, demanda, calidad, cantidad);
      domainItem.recalcularPrecio()
      item.precio = domainItem.precio
      item.save()
      res.status(200).type("json").json(item);
    });
  };

    return {
    findName,
    findAllItems,
    deleteItem,
    createItem,
    usarItem,
    recalcularPrecio
  };
})();
exports.itemAPI = itemAPI;