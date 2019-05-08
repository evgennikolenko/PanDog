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
// @ts-ignore
const core_1 = require("@angular/core");
const storage_service_1 = require("./../../services/storage.service");
const user_service_1 = require("./../../services/user.service");
const router_1 = require("@angular/router");
let LoginPanelComponent = class LoginPanelComponent {
    // public currentUser;
    constructor(storage, user, router) {
        this.storage = storage;
        this.user = user;
        this.router = router;
        //
        // let curUser = this.storage.get().getItem('currentUser');
        //
        // this.currentUser = JSON.parse(curUser);
    }
    ngDoCheck() {
        if (this.user.isAuth()) {
            this.isAuth = true;
        }
        else
            this.isAuth = false;
    }
    logout() {
        this.user.logout();
        this.router.navigate(['/store/about']);
    }
    ngOnInit() {
        this.user.getUserApi().subscribe(user => {
            this.current = user;
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LoginPanelComponent.prototype, "currentUser", void 0);
LoginPanelComponent = __decorate([
    core_1.Component({
        selector: 'login-panel',
        templateUrl: './app/components/login-panel/login-panel.component.html'
    }),
    __metadata("design:paramtypes", [storage_service_1.LocalStorageServie,
        user_service_1.UserService,
        router_1.Router])
], LoginPanelComponent);
exports.LoginPanelComponent = LoginPanelComponent;
