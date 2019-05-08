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
const animalsRepository_model_1 = require("./animalsRepository.model");
const product_service_1 = require("../../services/product.service");
const orderrBy_pipe_1 = require("./../../pipes/orderrBy.pipe");
const shopping_cart_service_1 = require("./../../components/cart/shopping-cart.service");
let BuyAnimalsComponent = class BuyAnimalsComponent {
    constructor(model, ps, router, route, shoppingCartService) {
        this.model = model;
        this.ps = ps;
        this.router = router;
        this.route = route;
        this.shoppingCartService = shoppingCartService;
        this.order = '';
        this.ascending = true;
        this.breeds = [];
        // show product
        this.productsPerPage = 50;
        this.selectedPage = 1;
        this.router.queryParams.subscribe(params => {
            // parameters from url
            let type = params['type'];
            let breed = params['breed'];
            let money = params['money'];
            let textSearch = params['search'];
            this.getDataAnimals(type, breed, money, textSearch);
        });
    }
    getDataAnimals(type, breed, money, textSearch) {
        let queryParams = this.router.snapshot.queryParams;
        let pType = queryParams.type || '', pBreed = queryParams.breed || '', pMoney = queryParams.money || '', pSearch = queryParams.search || '';
        this.breeds.splice(0, this.breeds.length);
        ;
        // get filtered array with animals
        this.animals = this.model.getAllAnimals(type || pType, breed || pBreed, money || pMoney, textSearch || pSearch);
        // breeds
        for (let i of this.animals) {
            this.breeds.push(i.breed);
        }
        this.breedsSet = new Set(this.breeds);
        // count pages
        this.pageCount();
        // pages show
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        this.animals = this.animals.slice(pageIndex, pageIndex + this.productsPerPage);
    }
    changePage(newPage) {
        this.selectedPage = newPage;
        this.getDataAnimals();
    }
    changePageSize(newSize) {
        this.productsPerPage = Number(newSize);
        this.getDataAnimals();
    }
    pageCount() {
        this.countPages = Math.ceil(this.animals.length / this.productsPerPage);
        return this.countPages;
    }
    addProductToCart(product) {
        this.shoppingCartService.addItem(product, 1);
    }
    ngOnInit() {
        this.ps.getAnimals().subscribe(res => res.map(item => this.animals.push(item)));
    }
};
BuyAnimalsComponent = __decorate([
    core_1.Component({
        selector: 'app-buy-animals',
        templateUrl: './app/sections/buy-animals/buy-animals.component.html',
        pipes: [orderrBy_pipe_1.OrderBy]
    }),
    __metadata("design:paramtypes", [animalsRepository_model_1.AnimalsModel,
        product_service_1.ProductService,
        router_1.ActivatedRoute, router_1.Router,
        shopping_cart_service_1.ShoppingCartService])
], BuyAnimalsComponent);
exports.BuyAnimalsComponent = BuyAnimalsComponent;
