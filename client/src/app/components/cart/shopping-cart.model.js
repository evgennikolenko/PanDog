"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShoppingCart {
    constructor() {
        this.items = new Array();
        this.grossTotal = 0;
        this.deliveryTotal = 0;
        this.itemsTotal = 0;
    }
    updateFrom(src) {
        this.items = src.items;
        this.grossTotal = src.grossTotal;
        this.deliveryTotal = src.deliveryTotal;
        this.itemsTotal = src.itemsTotal;
        this.userLogin = src.userLogin;
    }
}
exports.ShoppingCart = ShoppingCart;
class GetCartModel {
    constructor(items, grossTotal, deliveryTotal, itemsTotal, userLogin) {
        this.items = items;
        this.grossTotal = grossTotal;
        this.deliveryTotal = deliveryTotal;
        this.itemsTotal = itemsTotal;
        this.userLogin = userLogin;
    }
}
exports.GetCartModel = GetCartModel;
