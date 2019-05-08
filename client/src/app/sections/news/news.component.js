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
const news_service_1 = require("../../services/news.service");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let NewsComponent = class NewsComponent {
    constructor(http, newsService) {
        this.http = http;
        this.newsService = newsService;
        // select pages
        this.page = 1;
        this.newsOnPage = 10;
        this.first = 0;
        this.last = 10;
        this.worldNews = this.newsService.getNews();
        this.first = (this.page - 1) * this.newsOnPage;
    }
    selectPage(e) {
        this.isSelected = true;
        this.page = e.value;
        this.first = (this.page - 1) * this.newsOnPage;
        this.last = this.first + this.newsOnPage;
    }
    ngOnInit() { }
};
NewsComponent = __decorate([
    core_1.Component({
        selector: 'app-news',
        templateUrl: './app/sections/news/news.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        news_service_1.NewsService])
], NewsComponent);
exports.NewsComponent = NewsComponent;
