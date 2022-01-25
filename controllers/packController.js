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

PackService = require("../service/packsService");

Pack = requirePack.class;
Basic = requireBasic.class;
Standard = requireStandard.class;
Premium = requirePremium.class;

Item = requireItem.class;
Normal = requireNormal.class;
Consumible = requireConsumible.class;
Indestructible = requireIndestructible.class;

var packAPI = (function singleController() {
  const findName = async (req, res) => {
    const result = await PackService.findByName(req.params.nombre);
    result
      ? res.status(200).type("json").json(result)
      : res.status(400).type("json").json({
          error: true,
          response: "Ha ocurrido un error, aseguresé de que el pack existe",
        });
  };

  const findAllPacks = async (req, res) => {
    const result = await PackService.findAllPacks();
    result
      ? res.status(200).type("json").json(result)
      : res.status(400).type("json").json({
          error: true,
          response: "Ha ocurrido un error",
        });
  };

  const deletePack = async (req, res) => {
    const result = await PackService.deletePack(req.params.nombre);
    result
      ? res.status(200).type("json").json(result)
      : res.status(400).type("json").json({
          error: true,
          response: "No se ha podido eliminar el pack, aseguresé de que el pack existe",
        });
  };

  const buyPack = async (req, res) => {
    const result = await PackService.buyPack(req.params.nombre);
    if (result.error) {
      result.bought
        ? res.status(400).type("json").json({
            error: true,
            response: "El pack no se puede comprar porque ya ha sido vendido",
          })
        : res.status(400).type("json").json({
            error: true,
            response: "Ha ocurrido un error, compruebe que el pack existe",
          });
    } else {
      res.status(200).type("json").json(result);
    }
  };

  const openPack = async (req, res) => {
    const result = await PackService.openPack(req.params.nombre);
    if (result.error) {
      result.exists
        ? res.status(400).type("json").json({
            error: true,
            response:
              "El pack no se puede abrir porque no ha sido vendido o ya está abierto",
          })
        : res.status(400).type("json").json({
            error: true,
            response: "Ha ocurrido un error, compruebe que el pack existe",
          });
    } else {
      res.status(200).type("json").json(result);
    }
  };

  const useItems = async (req, res) => {
    const result = await PackService.useItems(req.params.nombre);
    if (result.exception) {
      switch (result.type) {
        case "depleted":
          res.status(200).type("json").json(result);
          break;
        case "server":
          res.status(400).type("json").json({
            error: true,
            response: "Ha ocurrido un error, compruebe que el pack existe",
          });
          break;
        case "not open":
          res.status(400).type("json").json({
            error: true,
            response: "El pack no está abierto",
          });
          break;
      }
    } else {
      res.status(200).type("json").json(result);
    }
  };

  const useItem = async (req, res) => {
    const result = await PackService.useItem(
      req.params.nombre,
      req.params.index
    );
    if (result.exception) {
      switch (result.type) {
        case "depleted":
          res.status(200).type("json").json(result);
          break;
        case "server":
          res.status(400).type("json").json({
            error: true,
            response: "Ha ocurrido un error, compruebe que el pack existe",
          });
          break;
        case "not open":
          res.status(400).type("json").json({
            error: true,
            response: "El pack no está abierto",
          });
          break;
        case "index":
          res.status(400).type("json").json({
            error: true,
            response: "El índice aportado no es válido (0 no es valido)",
          });
          break;
      }
    } else {
      res.status(200).type("json").json(result);
    }
  };

  const createPack = async (req, res) => {
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
