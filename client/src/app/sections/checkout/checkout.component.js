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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const product_service_1 = require("./../../services/product.service");
const user_service_1 = require("./../../services/user.service");
const shopping_cart_service_1 = require("./../../components/cart/shopping-cart.service");
const router_1 = require("@angular/router");
const http_1 = require("@angular/common/http");
let CheckoutComponent = class CheckoutComponent {
    constructor(productsService, router, route, shoppingCartService, userService, http) {
        this.productsService = productsService;
        this.router = router;
        this.route = route;
        this.shoppingCartService = shoppingCartService;
        this.userService = userService;
        this.http = http;
        this.userService.getUser();
        this.cart = this.shoppingCartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
            this.productsService.getAnimals().subscribe((products) => {
                this.animals = products;
                this.cartItems = cart;
                this.cartItems.items = this.cartItems.items
                    .map((item) => {
                    const product = this.animals.find((p) => p.id.toString() === item.productId);
                    return Object.assign({}, item, { product });
                });
            });
        });
        this.router.params.subscribe(param => {
            if (this.itemCount < 1) {
                this.route.navigate(['/product/animals']);
            }
        });
    }
    emptyCart() {
        this.shoppingCartService.empty();
    }
    deleteOrder(animals) {
        this.shoppingCartService.addItem(animals, -1);
        if (this.itemCount < 1) {
            this.route.navigate(['/store/product/animals']);
        }
    }
    setDeliveryOption(option) {
        this.shoppingCartService.setDeliveryOption(option.value);
    }
    // function for confirmation order
    setOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            let cartObject;
            const user = this.userService.getCurrentUser();
            this.cartSubscription = yield this.cart.subscribe((cart) => {
                cartObject = cart;
            });
            const order = Object.assign({}, cartObject, { userId: user.id });
            this.shoppingCartService.createOrder(order).subscribe(item => {
                this.route.navigate(['/store/user-room']);
                return item;
            });
            this.shoppingCartService.empty();
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
};
CheckoutComponent = __decorate([
    core_1.Component({
        selector: "app-checkout",
        templateUrl: "./app/sections/checkout/checkout.component.html"
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute,
        router_1.Router,
        shopping_cart_service_1.ShoppingCartService,
        user_service_1.UserService,
        http_1.HttpClient])
], CheckoutComponent);
exports.CheckoutComponent = CheckoutComponent;
