function Pack(price){
    this.price = price
}

Pack.prototype.getPrice = function () {

}

var factory = (function singlePack() {
    const packInstance = new Pack();
    return {
        getBox: function getPack() {
            return packInstance
        }
    }
})

