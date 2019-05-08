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
const user_service_1 = require("./../../services/user.service");
let StoreComponent = class StoreComponent {
    constructor(storage, user) {
        // if (this.user.isAuth()) {
        //     this.user.getUser();
        // }
        this.storage = storage;
        this.user = user;
        // if(this.storage.get().getItem('currentUser')){
        //   this.isAuth = true
        // } else this.isAuth = false;
    }
    ngOnChanges() {
        // if (!this.currentUser) {
        //     console.log('GET');
        //     // this.user.getUser().subscribe(
        //     //     (user) => this.currentUser = user
        //     // );
        // }
        // if (this.user.getToken()) {
        //     this.user.getUser().subscribe(
        //         (user) => {
        //             console.log('uss', user);
        //             this.currentUser = user
        //         }
        //     );
        // }
    }
    ngOnInit() {
        // this.user.getUser().subscribe(
        //     (user) => {
        //       console.log('uss', user);
        //       this.currentUser = user
        //     }
        // );
        // this.currentUser =
        // console.log('currentUser', this.currentUser);
        // if (currentUser) {
        //     this.isAuth = true
        // } else this.isAuth = false;
    }
};
StoreComponent = __decorate([
    core_1.Component({
        selector: 'pd-store',
        templateUrl: './app/tamplates/store/store.component.html'
    }),
    __metadata("design:paramtypes", [storage_service_1.LocalStorageServie,
        user_service_1.UserService])
], StoreComponent);
exports.StoreComponent = StoreComponent;
