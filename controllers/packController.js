requirePack = require("../domain/pack");
requireBasic = require("../domain/pack/basic/basic");
requireStandard = require("../domain/pack/standard/standard");
requirePremium = require("../domain/pack/premium/premium");
Packs = require("../models/packs");

var packAPI = (function singleController() {
  let tienda = []
  
  const findAllPacks = (req, res) => {
    Packs.find().exec(function (err, packs) {
      if (err) {
        return next(err);
      }
      res.status(200).type("json").json(packs);
    });
  };
  const deletePack = (req, res) => {
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
  return {
    findAllPacks,
    deletePack,
  };
})();

exports.packAPI = packAPI;
