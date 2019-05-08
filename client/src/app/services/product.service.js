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
const http_1 = require("@angular/common/http");
const animals_model_1 = require("./../sections/buy-animals/animals.model");
const shopping_cart_model_1 = require("./../components/cart/shopping-cart.model");
// Import RxJs required methods
require("rxjs/operator/map");
require("rxjs/add/operator/catch");
let ProductService = class ProductService {
    constructor(http) {
        this.http = http;
        this.productUrl = 'http://localhost:9000/api/animals';
    }
    // get animals
    getAnimals() {
        return this.http.get(this.productUrl)
            .map((res) => {
            console.log('req animals', res);
            return res.map(item => {
                return new animals_model_1.Animals(item.id, item.src, item.type, item.breed, item.age, item.cost, item.available, item.location, item.discount);
            });
        });
    }
    getAnimal(id) {
        return this.http.get(`http://localhost:9000/api/animals/${id}`).
            map(item => {
            return new animals_model_1.Animal(item.id, item.src, item.type, item.breed, item.age, item.cost, item.available, item.location, item.discount, item.reviews);
        });
    }
    // get orders for current customer
    getCustomerOrders(userLogin) {
        return this.http.get(`http://localhost:3000/orders?userLogin=${userLogin}`)
            .map((res) => {
            return res.json().map(item => {
                return new shopping_cart_model_1.GetCartModel(item.items, item.grossTotal, item.deliveryTotal, item.itemsTotal, item.userLogin);
            });
        });
    }
};
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], ProductService);
exports.ProductService = ProductService;
