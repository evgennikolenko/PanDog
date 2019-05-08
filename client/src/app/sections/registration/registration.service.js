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
const Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let RegistrationService = class RegistrationService {
    // Resolve HTTP using the constructor
    constructor(http) {
        this.http = http;
        // this is url on server
        this.registrationUrl = 'http://localhost:3000/registration';
    }
    // Add a new comment
    addUser(body) {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.registrationUrl, body, options) // ...using post request
            .map((res) => {
            console.log('QQQ', res.json());
            return res.json();
        }) // ...and calling .json() on the response to return data
            .catch((error) => Rx_1.Observable.throw(error.json().error || 'Server error')); //...errors if anyRegistrationComponent
    }
};
RegistrationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RegistrationService);
exports.RegistrationService = RegistrationService;
