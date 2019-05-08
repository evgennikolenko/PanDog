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
const animalsRepository_model_1 = require("./../../sections/buy-animals/animalsRepository.model");
const product_service_1 = require("../../services/product.service");
const forum_service_1 = require("./../panDogPlus/forum/forum.service");
const user_service_1 = require("./../../services/user.service");
require("rxjs/add/operator/map");
let UserRoomComponent = class UserRoomComponent {
    constructor(storage, animal, productService, forumService, user) {
        this.storage = storage;
        this.animal = animal;
        this.productService = productService;
        this.forumService = forumService;
        this.user = user;
        // this.currentUser = JSON.parse(this.storage.get().getItem('currentUser'));
        // this.currentUser = this.user.getCurrentUser();
        // console.log('SS',  this.currentUser);
        //
        this.userSubjects = new Array();
        // this.userOrders = new Array();
        //
        // this.productService.getCustomerOrders(this.currentUser.login).subscribe(
        //     orders => this.userOrders  = orders ,
        //     error => this.errors = error
        // )
        this.currentUser = this.user.getUserApi().subscribe(user => {
            this.currentUser = user;
            this.forumService.getUserSubjectsApi(this.currentUser.id).subscribe(item => this.userSubjects = item, error => this.errors = error);
        });
        console.log('USER ROOM ', this.currentUser);
    }
};
UserRoomComponent = __decorate([
    core_1.Component({
        selector: 'pd-user-room',
        templateUrl: './app/sections/user-room/user-room.component.html'
    }),
    __metadata("design:paramtypes", [storage_service_1.LocalStorageServie,
        animalsRepository_model_1.AnimalsModel,
        product_service_1.ProductService,
        forum_service_1.ForumService,
        user_service_1.UserService])
], UserRoomComponent);
exports.UserRoomComponent = UserRoomComponent;
