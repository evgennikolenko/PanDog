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
const router_1 = require("@angular/router");
const animalsRepository_model_1 = require("./../../sections/buy-animals/animalsRepository.model");
const product_service_1 = require("../../services/product.service");
const shopping_cart_service_1 = require("./../../components/cart/shopping-cart.service");
let AnimalsDetailComponent = class AnimalsDetailComponent {
    constructor(renderer, el, model, ps, router, route, shoppingCartService) {
        this.renderer = renderer;
        this.el = el;
        this.model = model;
        this.ps = ps;
        this.router = router;
        this.route = route;
        this.shoppingCartService = shoppingCartService;
        this.count = '1';
        this.showContent = 'desc';
        this.router.params.subscribe(param => {
            let id = param['id'];
            this.model.getAnimal(id).subscribe(animal => {
                this.animal = animal;
                if (this.animal === undefined) {
                    this.route.navigate(['/store/product/animals']);
                }
                if (this.animal.available === true) {
                    this.availableAnimal = 'In stoke';
                }
                else
                    this.availableAnimal = 'not available';
            });
        });
    }
    addProductToCart(product, count) {
        this.shoppingCartService.addItem(product, +count);
        this.count = '1';
        this.route.navigate(['/store/product/animals']);
    }
    increase() {
        let num = +this.count;
        num++;
        this.count = num.toString();
    }
    ;
    subtraction() {
        let num = +this.count;
        num--;
        this.count = num.toString();
    }
    contentShow(str) {
        this.showContent = str;
    }
    ngOnInit() { }
};
AnimalsDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-animals-detail',
        templateUrl: './app/sections/animals-detail/animalsDetail.component.html'
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        core_1.ElementRef,
        animalsRepository_model_1.AnimalsModel,
        product_service_1.ProductService,
        router_1.ActivatedRoute,
        router_1.Router,
        shopping_cart_service_1.ShoppingCartService])
], AnimalsDetailComponent);
exports.AnimalsDetailComponent = AnimalsDetailComponent;
