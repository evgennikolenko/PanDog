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
let NavComponent = class NavComponent {
    constructor(storage, user) {
        this.storage = storage;
        this.user = user;
    }
    ngDoCheck() {
        if (this.user.isAuth()) {
            this.isAuth = true;
        }
        else
            this.isAuth = false;
    }
};
NavComponent = __decorate([
    core_1.Component({
        selector: 'pd-nav',
        templateUrl: './app/tamplates/nav/nav.component.html',
        styleUrls: ['./app/tamplates/nav/nav.component.scss']
    }),
    __metadata("design:paramtypes", [storage_service_1.LocalStorageServie,
        user_service_1.UserService])
], NavComponent);
exports.NavComponent = NavComponent;
