requirePack = require("../domain/pack/pack");
requireBasic = require("../domain/pack/basic/basic");
requireStandard = require("../domain/pack/standard/standard");
requirePremium = require("../domain/pack/premium/premium");
requireItem = require("../domain/item/item");
requireConsumible = require("../domain/item/consumible/consumible");
requireIndestructible = require("../domain/item/indestructible/indestructible");
requireNormal = require("../domain/item/normal/normal");

Pack = requirePack.class;
Basic = requireBasic.class;
Standard = requireStandard.class;
Premium = requirePremium.class;

Item = requireItem.class;
Normal = requireNormal.class;
Consumible = requireConsumible.class;
Indestructible = requireIndestructible.class;

Packs = require("../models/packs");
Items = require("../models/item");

var utils = (function api() {
  const packModeltoDomain = (pack) => {
    let { nombre, precio, calidad, abierto, vendido, items } = pack;
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
    return domainPack;
  }

  const packDomaintoModel = (packModel, packDomain) => {
    let { nombre, precio, _calidad, abierto, vendido, items } = packDomain;
    packModel.nombre = nombre;
    packModel.precio =precio;
    packModel.abierto = abierto;
    packModel.vendido = vendido;
    packModel.items = items
    return packModel
  }

  const saveItems = (domainPack) => {
    domainPack.items.forEach((x) => {
        Items.findOneAndUpdate({ _id: x._id }, x).exec(
          function (err, _item) {
          }
        );
      });
  }

  return {
    packModeltoDomain,
    packDomaintoModel,
    saveItems,
    
  };
})();

module.exports = utils;
