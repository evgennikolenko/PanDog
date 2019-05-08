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
const storage_service_1 = require("./../../services/storage.service");
const Observable_1 = require("rxjs/Observable");
const cart_item_model_1 = require("./cart-item.model");
const shopping_cart_model_1 = require("./shopping-cart.model");
const product_service_1 = require("./../../services/product.service");
const http_1 = require("@angular/common/http");
const CART_KEY = "cart";
let ShoppingCartService = class ShoppingCartService {
    constructor(storageService, productService, http) {
        this.storageService = storageService;
        this.productService = productService;
        this.http = http;
        this.subscribers = new Array();
        // public createOrder22(body: Object){
        //       console.log('CREATE', JSON.stringify(body));
        //       return this.http.post(this.configUrl, body);
        //
        //   }
        this.forumUrl = 'http://localhost:9000/api/animals/createOrder';
        this.storage = this.storageService.get();
        this.productService.getAnimals().subscribe((products) => this.products = products);
        this.subscriptionObservable = new Observable_1.Observable((observer) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
                this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
        });
    }
    get() {
        return this.subscriptionObservable;
    }
    addItem(product, quantity) {
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.productId === product.id);
        if (item === undefined) {
            item = new cart_item_model_1.CartItem();
            item.productId = product.id;
            cart.items.push(item);
        }
        item.quantity += quantity;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
        this.calculateCart(cart);
    }
    empty() {
        const newCart = new shopping_cart_model_1.ShoppingCart();
        this.save(newCart);
        this.dispatch(newCart);
    }
    setDeliveryOption(deliveryOption) {
        const cart = this.retrieve();
        cart.deliveryTotal = +deliveryOption;
        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
    }
    calculateCart(cart) {
        let arr = [];
        cart.items.map((item) => {
            this.productService.getAnimal(item.productId).subscribe(animal => {
                arr.push(item.quantity * animal.cost);
                cart.itemsTotal = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
                this.save(cart);
                this.dispatch(cart);
            });
        });
    }
    retrieve() {
        const cart = new shopping_cart_model_1.ShoppingCart();
        let curUser = JSON.parse(this.storage.getItem('currentUser'));
        cart.userLogin = curUser.login;
        const storedCart = this.storage.getItem(CART_KEY);
        if (storedCart) {
            cart.updateFrom(JSON.parse(storedCart));
            cart.userLogin = curUser.login;
        }
        return cart;
    }
    save(cart) {
        this.storage.setItem(CART_KEY, JSON.stringify(cart));
    }
    dispatch(cart) {
        this.subscribers
            .forEach((sub) => {
            try {
                sub.next(cart);
            }
            catch (e) {
            }
        });
    }
    createOrder(order) {
        console.log('CREA');
        return this.http.post(this.forumUrl, order);
    }
};
ShoppingCartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [storage_service_1.LocalStorageServie,
        product_service_1.ProductService,
        http_1.HttpClient])
], ShoppingCartService);
exports.ShoppingCartService = ShoppingCartService;
