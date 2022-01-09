standardFactory = require("../standard/standard");
requirePack = require("../pack");
requireItemNormal = require("../../item/normal/normal");
requireItemConsumible = require("../../item/consumible/consumible");
requireItemIndestructible = require("../../item/indestructible/indestructible");
Pack = requirePack.class;

beforeEach(async () => {
  packStandard = standardFactory.standard.getStandard("Pack Standard", 10, false, false, [
    requireItemNormal.normal.getNormal("Item Normal 1", 3, 0, 50),
    requireItemNormal.normal.getNormal("Item Normal 2", 3, 0, 50),
    requireItemNormal.normal.getNormal("Item Normal 3", 3, 0, 50),
  ]);
});

test("Abrir un pack", () => {
  //Compruebo que no se puede abrir hasta que no se haya vendido
  expect(packStandard.abrir).toBeUndefined();
  expect(packStandard.abierto).toBeFalsy();
  //La función vender crea un closure que te permite abrir el paquete
  packStandard.vender();
  expect(packStandard.abrir).toBeDefined();
  packStandard.abrir();
  expect(packStandard.abierto).toBe(true);
});

test("usarItems() todos los items a la vez", () => {
  packStandard.vender();
  packStandard.abrir();
  expect(Array.isArray(packStandard.items)).toBe(true);
  expect(packStandard.items[0].nombre).toBe("Item Normal 1");
  packStandard.usarItems();
  // Comprobamos que la calidad de los items ha bajado correctamente
  packStandard.items.forEach((x) => {
    expect(x.calidad).toBe(49);
  });
});

test("usarItemIndex() un item por index", () => {
  packStandard.vender();
  packStandard.abrir();
  packStandard.usarItemIndex(0);
  expect(packStandard.items[0].calidad).toBe(49);
  expect(packStandard.items[1].calidad).toBe(50);
  expect(packStandard.items[2].calidad).toBe(50);
});

test("usarItems consumibles, indestructibles y normales", () => {
  let packStandard = standardFactory.standard.getStandard("Pack Standard", 10, false, false, [
    requireItemNormal.normal.getNormal("Item Normal", 3, 0, 50),
    requireItemIndestructible.indestructible.getIndestructible("Item Indestructible", 3, 0, 50),
    requireItemConsumible.consumible.getConsumible("Item Consumible", 3, 0, 50),
  ]);
  packStandard.vender()
  packStandard.abrir()
  packStandard.usarItemIndex(0)
  expect(packStandard.items[0].calidad).toBe(49)

  //Compruebo que usarItems elimina un consumible y deja igual la de un indestructible
  packStandard.usarItems()
  expect(packStandard.items.length).toBe(2)
  expect(packStandard.items[1].calidad).toBe(50)

  //Compruebo que usarItemIndex deja igual la calidad de un indestructible
  packStandard.usarItemIndex(1)
  expect(packStandard.items[1].calidad).toBe(50)
});