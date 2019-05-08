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
const animalsRepository_model_1 = require("./../animalsRepository.model");
const buy_animals_component_1 = require("./../buy-animals.component");
let FilterAnimalsComponent = class FilterAnimalsComponent {
    constructor(model, byanimal, router, route) {
        this.model = model;
        this.byanimal = byanimal;
        this.router = router;
        this.route = route;
        this.rangeMoney = '0';
        this.showBreedsInTempl = false;
        this.breeds = [];
        this.router.queryParams.subscribe(params => {
            this.breeds.splice(0, this.breeds.length);
            let type = params['type'];
            let breed = params['breed'];
            let money = params['money'];
            let textSearch = params['search'];
            this.byanimal.getDataAnimals(type, breed, money, textSearch);
            for (let i of this.byanimal.animals) {
                this.breeds.push(i.breed);
            }
            this.breedsSet = new Set(this.breeds);
            if (this.router.snapshot._routerState.url === '/store/product/animals' ||
                this.router.snapshot._routerState.url === '/store/product/animals?search=') {
                this.showBreedsInTempl = false;
            }
            else
                this.showBreedsInTempl = true;
        });
    }
    getAnimals() {
        return this.model.getAllAnimals();
    }
    getTypesAnimals() {
        return this.model.getTypesAnimals();
    }
    getBreedAnimals() {
        return this.model.getBreedAnimals();
    }
    filterType(element) {
        this.byanimal.changePage(1);
        this.route.navigate(['/store/product/animals'], { queryParams: {
                type: element.value
            }
        });
    }
    filterBreed(element) {
        this.byanimal.changePage(1);
        this.route.navigate(['/store/product/animals'], { queryParams: {
                breed: element.value
            }
        });
    }
    filterMoney(count) {
        this.byanimal.changePage(1);
        this.route.navigate(['/store/product/animals'], { queryParams: {
                money: count
            }
        });
    }
    filterSearch(text) {
        this.byanimal.changePage(1);
        this.route.navigate(['/store/product/animals'], { queryParams: {
                search: text
            }
        });
        console.log(`TExt in full : ${text}`);
    }
    fullSearch(type, breed, money) {
        this.byanimal.changePage(1);
        this.route.navigate(['/product/animals'], { queryParams: {
                type: type,
                breed: breed,
                money: money
            } });
    }
    ngOnInit() {
        if (this.router.snapshot._routerState.url.indexOf('?') !== -1) {
            this.route.navigate(['/product/animals']);
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Set)
], FilterAnimalsComponent.prototype, "breedsSet", void 0);
FilterAnimalsComponent = __decorate([
    core_1.Component({
        selector: 'filter-animals',
        templateUrl: './app/sections/buy-animals/filter-animals/filter-animals.component.html'
    }),
    __metadata("design:paramtypes", [animalsRepository_model_1.AnimalsModel,
        buy_animals_component_1.BuyAnimalsComponent,
        router_1.ActivatedRoute,
        router_1.Router])
], FilterAnimalsComponent);
exports.FilterAnimalsComponent = FilterAnimalsComponent;
