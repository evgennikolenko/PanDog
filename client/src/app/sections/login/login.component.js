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
const forms_1 = require("@angular/forms");
const user_service_1 = require("../../services/user.service");
const login_model_1 = require("./login.model");
const router_1 = require("@angular/router");
let LoginComponent = class LoginComponent {
    constructor(fb, user, router, route) {
        this.fb = fb;
        this.user = user;
        this.router = router;
        this.route = route;
        this.loginForm = new login_model_1.Login();
        this.isSubmittet = false;
        this.error = '';
    }
    login(form) {
        this.isSubmittet = true;
        if (form.valid) {
            this.user.login(this.loginForm).subscribe(() => {
                this.router.navigate(['/store/about']);
                this.user.getUser();
            }, (error) => {
                this.error = error.error.message;
            });
            this.isSubmittet = false;
            form.reset();
        }
    }
    ngOnInit() { }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './app/sections/login/login.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute])
], LoginComponent);
exports.LoginComponent = LoginComponent;
