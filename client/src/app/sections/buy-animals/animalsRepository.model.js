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
const product_service_1 = require("../../services/product.service");
// Import RxJs required methods
require("rxjs/add/operator/map");
let AnimalsModel = class AnimalsModel {
    constructor(ps) {
        this.ps = ps;
        this.locator = (animal, id) => animal.id == id;
        this.data = new Array();
        this.types = new Array();
        this.ps.getAnimals().subscribe(res => {
            console.log('animals', res);
            res.map(item => this.data.push(item));
        });
        console.log("DATA", this.data);
    }
    getAllAnimals(type, breed, money, textSearch) {
        if (type && breed && money) {
            return this.data.filter((animals, index, array) => {
                return animals.cost <= money && animals.type === type && animals.breed === breed;
            });
        }
        else if (type && breed) {
            return this.data.filter((animals, index, array) => {
                return animals.type === type && animals.breed === breed;
            });
        }
        else if (type && money) {
            return this.data.filter((animals, index, array) => {
                return animals.cost <= money && animals.type === type;
            });
        }
        else if (breed && money) {
            return this.data.filter((animals, index, array) => {
                return animals.breed === breed && animals.cost <= money;
            });
        }
        else if (money) {
            return this.data.filter((animals, index, array) => {
                return animals.cost <= money;
            });
        }
        else if (type) {
            return this.data.filter((animals, index, array) => {
                return animals.type === type;
            });
        }
        else if (breed) {
            return this.data.filter((animals, index, array) => {
                return animals.breed === breed;
            });
        }
        else if (textSearch) {
            textSearch = textSearch.toLowerCase();
            return this.data.filter((animals, index, array) => {
                return animals.type.toLowerCase().indexOf(textSearch) != -1 ||
                    animals.breed.toLowerCase().indexOf(textSearch) != -1;
            });
        }
        else {
            return this.data;
        }
    }
    getAnimal(id) {
        return this.ps.getAnimal(id);
    }
    getTypesAnimals() {
        let array = [];
        for (let item of this.data) {
            array.push(item.type);
        }
        return new Set(array);
    }
    getBreedAnimals() {
        let array = [];
        for (let item of this.data) {
            array.push(item.breed);
        }
        return new Set(array);
    }
};
AnimalsModel = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], AnimalsModel);
exports.AnimalsModel = AnimalsModel;
