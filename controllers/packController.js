requirePack = require("../domain/pack");
requireBasic = require("../domain/pack/basic/basic");
requireStandard = require("../domain/pack/standard/standard");
requirePremium = require("../domain/pack/premium/premium");
Packs = require("../models/packs");

var packAPI = (function singleController() {
  let tienda = [];

  const findAllPacks = (req, res, next) => {
    Packs.find()
      .populate({ path: "contenido", select: "nombre precio" })
      .exec(function (err, packs) {
        if (err) {
          return next(err);
        }
        res.status(200).type("json").json(packs);
      });
  };
  const deletePack = (req, res, next) => {
    Packs.findOneAndDelete({ id: req.params.id }).exec(function (
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
    const update = { vendido: true };
    Packs.findOneAndUpdate(req.params.id, update).exec(function (
      err,
      boughtPack
    ) {
      if (err) {
        return next(err);
      }
      boughtPack.vendido = true;
      res.status(200).type("json").json(boughtPack);
    });
  };

  const openPack = async (req, res) => {
    const update = { abierto: true };
    await Packs.findOne({ id: 1 }).exec(function (err, pack) {
      if (pack.vendido == true) {
        Packs.findOneAndUpdate(req.params.id, update);
        pack.abierto = true;
        res.status(200).type("json").json(pack);
      } else {
        res.status(200).type("json").json({
          error: true,
          response: "El pack no se puede abrir porque no ha sido vendido",
        });
      }
    });
  };
  const createPack = async (req, res) => {
    let data = ({
      nombre: nombre,
      precio: precio,
      abierto: abierto,
      vendido: vendido,
      contenido: contenido,
    } = req.body);
    let packInstance = new Packs(data);
    console.log(packInstance);
  };
  return {
    findAllPacks,
    deletePack,
    buyPack,
    openPack,
    createPack,
  };
})();

exports.packAPI = packAPI;
