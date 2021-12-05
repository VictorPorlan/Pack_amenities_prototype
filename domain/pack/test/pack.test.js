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
  expect(Array.isArray(packStandard.contenido)).toBe(true);
  expect(packStandard.contenido[0].nombre).toBe("Item Normal 1");
  packStandard.usarItems();
  // Comprobamos que la calidad de los items ha bajado correctamente
  packStandard.contenido.forEach((x) => {
    expect(x.calidad).toBe(49);
  });
});

test("usarItemIndex() un item por index", () => {
  packStandard.vender();
  packStandard.abrir();
  packStandard.usarItemIndex(0);
  expect(packStandard.contenido[0].calidad).toBe(49);
  expect(packStandard.contenido[1].calidad).toBe(50);
  expect(packStandard.contenido[2].calidad).toBe(50);
});

test("usarItems consumibles e indestructibles", () => {
  let packStandard = standardFactory.standard.getStandard("Pack Standard", 10, false, false, [
    requireItemConsumible.consumible.getConsumible("Item Consumible 1", 3, 0, 50),
    requireItemConsumible.consumible.getConsumible("Item Consumible 2", 3, 0, 50),
    requireItemIndestructible.indestructible.getIndestructible("Item Indestructible 3", 3, 0, 50),
  ]);
  packStandard.vender()
  packStandard.abrir()
  //Compruebo que usarItemIndex baja a 0 la calidad de un consumible
  packStandard.usarItemIndex(0)
  expect(packStandard.contenido[0].calidad).toBe(0)

  //Compruebo que usarItems baja a 0 la de un consumible y deja igual la de un indestructible
  packStandard.usarItems()
  expect(packStandard.contenido[1].calidad).toBe(0)
  expect(packStandard.contenido[2].calidad).toBe(50)

  //Compruebo que usarItemIndex deja igual la calidad de un indestructible
  packStandard.usarItemIndex(2)
  expect(packStandard.contenido[2].calidad).toBe(50)
});