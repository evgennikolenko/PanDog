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
const http_1 = require("@angular/http");
const http_2 = require("@angular/common/http");
const Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.token = null;
        // this is url on server
        this.registrationUrl = 'http://localhost:9000/api/registration';
        this.loginUrl = 'http://localhost:9000/api/login';
    }
    addUser(body) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.registrationUrl, body, options)
            .map((data) => {
            localStorage.setItem('auth-token', data.token);
            this.setToken(data.token);
        })
            .catch((error) => Rx_1.Observable.throw(error));
    }
    login(user) {
        return this.http.post(this.loginUrl, user)
            .map((data) => {
            localStorage.setItem('auth-token', data.token);
            this.setToken(data.token);
        })
            .catch((error) => Rx_1.Observable.throw(error));
    }
    getUserApi() {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/currentuser', options)
            .map((user) => {
            return user;
        });
    }
    setToken(token) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    isAuth() {
        return !!this.token;
    }
    logout() {
        this.setToken(null);
        localStorage.removeItem('auth-token');
    }
    getUser() {
        this.getUserApi().subscribe((user) => {
            this.currentUser = user;
        });
    }
    getCurrentUser() {
        return this.currentUser;
    }
};
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_2.HttpClient])
], UserService);
exports.UserService = UserService;
