"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animals {
    constructor(id, src, type, breed, age, cost, available, location, discount) {
        this.id = id;
        this.src = src;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.cost = cost;
        this.available = available;
        this.location = location;
        this.discount = discount;
    }
}
exports.Animals = Animals;
class Animal {
    constructor(id, src, type, breed, age, cost, available, location, discount, reviews) {
        this.id = id;
        this.src = src;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.cost = cost;
        this.available = available;
        this.location = location;
        this.discount = discount;
        this.reviews = reviews;
    }
}
exports.Animal = Animal;
