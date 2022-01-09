requirePack = require("../domain/pack");
requireBasic = require("../domain/pack/basic/basic");
requireStandard = require("../domain/pack/standard/standard");
requirePremium = require("../domain/pack/premium/premium");
requireItem = require("../domain/item");
requireConsumible = require("../domain/item/consumible/consumible");
requireIndestructible = require("../domain/item/indestructible/indestructible");
requireNormal = require("../domain/item/normal/normal");
Packs = require("../models/packs");
Items = require("../models/item");

Pack = requirePack.class;
Basic = requireBasic.class;
Standard = requireStandard.class;
Premium = requirePremium.class;

Item = requireItem.class;
Normal = requireNormal.class;
Consumible = requireConsumible.class;
Indestructible = requireIndestructible.class;

var packAPI = (function singleController() {
  const findName = (req, res, next) => {
    Packs.findOne({ nombre: req.params.nombre })
      .populate("items")
      .exec(function (err, pack) {
        if (err) {
          return next(err);
        }
        res.status(200).type("json").json(pack);
      });
  };

  const findAllPacks = (req, res, next) => {
    Packs.find()
      .populate("items")
      .exec(function (err, packs) {
        if (err) {
          return next(err);
        }
        res.status(200).type("json").json(packs);
      });
  };

  const deletePack = (req, res, next) => {
    Packs.findOneAndDelete({ _id: req.params.id }).exec(function (
      err,
      deletedPack
    ) {
      if (err) {
        return next(err);
      }
      res.status(200).type("json").json(deletedPack);
    });
  };

  const buyPack = (req, res, next) => {
    Packs.findOne({ nombre: req.params.nombre })
      .populate("items")
      .exec(function (err, boughtPack) {
        if (err) {
          return next(err);
        }
        if (!boughtPack.vendido) {
          let { nombre, precio, calidad, abierto, vendido, items } = boughtPack;
          let domainPack = new this[calidad](
            nombre,
            precio,
            abierto,
            vendido,
            items.map((x) => {
              let item = new this[x.material](
                x.nombre,
                x.precio,
                x.demanda,
                x.calidad,
                x.cantidad,
                x._id
              );
              return item;
            })
          );
          domainPack.vender();
          boughtPack.precio = domainPack.precio;
          boughtPack.vendido = true;
          domainPack.items.forEach((x) => {
            Items.findOneAndUpdate({ _id: x._id }, { precio: x.precio }).exec(
              function (err, _item) {
                if (err) {
                  return next(err);
                }
              }
            );
          });
          boughtPack.save();
          res.status(200).type("json").json(boughtPack);
        } else {
          res.status(400).type("json").json({
            error: true,
            response: "El pack ya ha sido vendido",
          });
        }
      });
  };

  const openPack = async (req, res) => {
    /* 
    No voy a usar la lógica del domain porque abrir() es un closure que se crea al vender el item, 
    pero se perdería al subir el item a la bdd y al volver a crearlo para abrirlo
    */
    Packs.findOne({ nombre: req.params.nombre })
      .populate("items")
      .exec(function (err, pack) {
        if (err) {
          return next(err);
        }
        if (pack.vendido && !pack.abierto) {
          pack.abierto = true;
          pack.save();
          res.status(200).type("json").json(pack);
        } else {
          res.status(400).type("json").json({
            error: true,
            response:
              "El pack no se puede abrir porque no ha sido vendido o ya está abierto",
          });
        }
      });
  };

  const useItems = async (req, res, next) => {
    Packs.findOne({ nombre: req.params.nombre })
      .populate("items")
      .exec(function (err, usePack) {
        if (err) {
          return next(err);
        }
        if (usePack == null) {
          return res.status(400).type("json").json({
            error: true,
            response: "El objeto no existe",
          });
        }
        if (usePack.abierto) {
          let { nombre, precio, calidad, abierto, vendido, items } = usePack;
          let domainPack = new this[calidad](
            nombre,
            precio,
            abierto,
            vendido,
            items.map((x) => {
              let item = new this[x.material](
                x.nombre,
                x.precio,
                x.demanda,
                x.calidad,
                x.cantidad,
                x._id
              );
              return item;
            }),
          );
          domainPack.usarItems();
          domainPack.items.forEach((x) => {
            Items.findOneAndUpdate(
              { _id: x._id },
              { calidad: x.calidad, cantidad: x.cantidad }
            ).exec(function (err, _item) {
              if (err) {
                return next(err);
              }
            });
          });
          if (domainPack.items.length > 0) {
            usePack.items = domainPack.items;
            usePack.save();
            res.status(200).type("json").json(domainPack);
          } else {
            Packs.findOneAndDelete({ _id: usePack._id }).exec(function (
              err,
              deletedPack
            ) {
              if (err) {
                return next(err);
              }
              res.status(200).type("json").json({
                error: false,
                response: "El pack se ha usado y eliminado con éxito",
              });
            });
          }
        } else {
          res.status(400).type("json").json({
            error: true,
            response: "Primero ha de abrir el pack",
          });
        }
      });
  };

  const useItem = async (req, res, next) => {
    Packs.findOne({ nombre: req.params.nombre })
      .populate("items")
      .exec(function (err, usePack) {
        if (usePack == null) {
          return res.status(400).type("json").json({
            error: true,
            response: "El objeto no existe",
          });
        }
        let index = req.params.index - 1;
        if (index > usePack.items.length || index < 0) {
          return res.status(400).type("json").json({
            error: true,
            response: "Introduce un número válido (el 0 no es valido)",
          });
        }
        if (err) {
          return next(err);
        }
        if (usePack.abierto) {
          let { nombre, precio, calidad, abierto, vendido, items } = usePack;
          let domainPack = new this[calidad](
            nombre,
            precio,
            abierto,
            vendido,
            items.map((x) => {
              let item = new this[x.material](
                x.nombre,
                x.precio,
                x.demanda,
                x.calidad,
                x.cantidad,
                x._id
              );
              return item;
            }),


          );
          domainPack.usarItemIndex(index);
          if (domainPack.items[index]) {
            Items.findOneAndUpdate(
              { _id: domainPack.items[index]._id },
              {
                calidad: domainPack.items[index].calidad,
                cantidad: domainPack.items[index].cantidad,
              }
            ).exec(function (err, _item) {
              if (err) {
                return next(err);
              }
            });
          }
          if (domainPack.items.length > 0) {
            usePack.items = domainPack.items;
            usePack.save();
            res.status(200).type("json").json(domainPack);
          } else {
            Packs.findOneAndDelete({ _id: usePack._id }).exec(function (
              err,
              deletedPack
            ) {
              if (err) {
                return next(err);
              }
              res.status(200).type("json").json({
                error: false,
                response: "El pack se ha usado y eliminado con éxito",
              });
            });
          }
        } else {
          res.status(400).type("json").json({
            error: true,
            response: "Primero ha de abrir el pack",
          });
        }
      });
  };

  const createPack = async (req, res, next) => {
    let { nombre, precio, abierto, calidad, vendido, items } = req.body;
    Items.find({ _id: { $in: items } }).exec(function (err, itemsBDD) {
      if (err) {
        res.status(400).type("json").json({
          error: true,
          response: "Ha ocurrido un error",
        });
      }
      if (itemsBDD.length < items.length) {
        res.status(400).type("json").json({
          error: true,
          response: "Uno de los items no existe",
        });
      }
    });
    let packInstance = new Packs({
      nombre,
      precio,
      calidad,
      abierto,
      vendido,
      items,
    });
    packInstance.save();
    res.status(200).type("json").json(packInstance);
  };
  return {
    findName,
    findAllPacks,
    deletePack,
    buyPack,
    openPack,
    createPack,
    useItems,
    useItem,
  };
})();

exports.packAPI = packAPI;
