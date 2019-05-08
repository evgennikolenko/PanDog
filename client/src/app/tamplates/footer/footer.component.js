"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FooterComponent = class FooterComponent {
    constructor() {
        this.footerPhrase = '"Это простая фраза для тестировки! Lorem Lorem ascfg hallo tre des loytre."';
        this.phrasesArray = ['this is Phrase 1',
            'this is Phrase 2', ' this is Phrase 3'];
        this.setIntervalToken = setInterval(() => this.setPhrase(), 3000);
    }
    setPhrase() {
        this.genericIndex = Math.floor(Math.random() * this.phrasesArray.length);
        if (this.genericIndex === this.index) {
            this.genericIndex = Math.floor(Math.random() * this.phrasesArray.length);
        }
        this.index = this.genericIndex;
        return this.footerPhrase = this.phrasesArray[this.index];
    }
};
FooterComponent = __decorate([
    core_1.Component({
        selector: 'pd-footer',
        templateUrl: './app/tamplates/footer/footer.component.html',
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
