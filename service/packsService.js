requirePack = require("../domain/pack");
requireBasic = require("../domain/pack/basic/basic");
requireStandard = require("../domain/pack/standard/standard");
requirePremium = require("../domain/pack/premium/premium");
requireItem = require("../domain/item");
requireConsumible = require("../domain/item/consumible/consumible");
requireIndestructible = require("../domain/item/indestructible/indestructible");
requireNormal = require("../domain/item/normal/normal");

Utils = require("../utils/utils");
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

var packService = (function api() {
  async function findAllPacks() {
    try {
      let response = await Packs.find()
        .populate("items")
        .then((response) => {
          return response;
        });
      return response;
    } catch {
      return false;
    }
  }

  async function findByName(nombre) {
    try {
      let response = Packs.findOne({ nombre: nombre })
        .populate("items")
        .then((response) => {
          return response;
        });
      return response;
    } catch {
      return false;
    }
  }

  async function deletePack(nombre) {
    try {
      let response = Packs.findOneAndDelete({ nombre: nombre }).then(
        (response) => {
          return response;
        }
      );
      return response;
    } catch {
      return false;
    }
  }

  async function openPack(nombre) {
    /* 
    No voy a usar la lógica del domain porque abrir() es un closure que se crea al vender el item, 
    pero se perdería al subir el item a la bdd y al volver a crearlo para abrirlo
    */
    try {
      let response = Packs.findOne({ nombre: nombre })
        .populate("items")
        .then((pack) => {
          if (pack !== null) {
            if (pack.vendido && !pack.abierto) {
              pack.abierto = true;
              pack.save();
              return pack;
            } else {
              return {
                error: true,
                exists: true,
              };
            }
          } else {
            return {
              error: true,
              exists: false,
            };
          }
        });
      return response;
    } catch {
      return {
        error: true,
        exists: false,
      };
    }
  }

  async function buyPack(nombre) {
    try {
      let response = Packs.findOne({ nombre: nombre })
        .populate("items")
        .then((boughtPack) => {
          if (boughtPack !== null) {
          if (!boughtPack.vendido) {
            let domainPack = Utils.packModeltoDomain(boughtPack);
            domainPack.vender();
            Utils.packDomaintoModel(boughtPack, domainPack);
            Utils.saveItems(domainPack);
            boughtPack.save();
            return boughtPack;
          } else {
            return {
              error: true,
              bought: true,
            };
          }}
          else{
            return {
              error: true,
              bought: false
            }
          }
        });
      return response;
    } catch {
      return {
        error: true,
        bought: false,
      };
    }
  }

  async function useItems(nombre) {
    try {
      let response = Packs.findOne({ nombre: nombre })
        .populate("items")
        .then((usePack) => {
          if(usePack !== null){
          if (usePack.abierto) {
            let domainPack = Utils.packModeltoDomain(usePack);
            domainPack.usarItems();
            Utils.saveItems(domainPack);
            if (domainPack.items.length > 0) {
              usePack = Utils.packDomaintoModel(usePack, domainPack);
              usePack.save();
              return domainPack;
            } else {
              Packs.findOneAndDelete({ _id: usePack._id }).exec(function (
                err,
                _deletedPack
              ) {
                return {
                  exception: true,
                  type: "depleted",
                };
              });
            }
          } else {
            return {
              exception: true,
              type: "not open",
            };
          }}
          else{
            return{
              exception: true,
              type: "server",
            }
          }
        });
      return response;
    } catch {
      return {
        exception: true,
        type: "server",
      };
    }
  }

  async function useItem(nombre, indexPack) {
    try {
      let response = Packs.findOne({ nombre: nombre })
        .populate("items")
        .then((usePack) => {
          if(usePack !== null){
          let index = indexPack - 1;
          if (index > usePack.items.length || index < 0) {
            return {
              exception: true,
              type: "index",
            };
          }
          if (usePack.abierto) {
            let domainPack = Utils.packModeltoDomain(usePack);
            domainPack.usarItemIndex(index);
            if (domainPack.items[index]) {
              Items.findOneAndUpdate(
                { _id: domainPack.items[index]._id },
                {
                  calidad: domainPack.items[index].calidad,
                  cantidad: domainPack.items[index].cantidad,
                }
              ).exec(function (_err, _item) {});
            }
            if (domainPack.items.length > 0) {
              usePack = Utils.packDomaintoModel(usePack, domainPack);
              usePack.save();
              return domainPack;
            } else {
              Packs.findOneAndDelete({ _id: usePack._id }).exec(function (
                _err,
                _deletedPack
              ) {
                return {
                  exception: true,
                  type: "depleted",
                };
              });
            }
          } else {
            return {
              exception: true,
              type: "not open",
            };
          }
        }
        else{
          return {
            exception: true,
            type: "server",
          };
        }
        });
      return response;
    } catch {
      return {
        exception: true,
        type: "server",
      };
    }
  }

  return {
    findAllPacks,
    findByName,
    deletePack,
    openPack,
    buyPack,
    useItems,
    useItem,
  };
})();

module.exports = packService;
