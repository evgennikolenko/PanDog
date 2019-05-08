"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shopping_cart_service_1 = require("./shopping-cart.service");
let ShoppingCartComponent = class ShoppingCartComponent {
    constructor(shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }
    emptyCart() {
        this.shoppingCartService.empty();
    }
    ngOnInit() {
        this.cart = this.shoppingCartService.get().subscribe(cart => {
            this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
            this.grossTotal = cart.grossTotal;
        });
    }
};
ShoppingCartComponent = __decorate([
    core_1.Component({
        selector: "app-shopping-cart",
        templateUrl: "./app/components/cart/shopping-cart.component.html"
    }),
    __metadata("design:paramtypes", [shopping_cart_service_1.ShoppingCartService])
], ShoppingCartComponent);
exports.ShoppingCartComponent = ShoppingCartComponent;
