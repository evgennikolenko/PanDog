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
const news_model_1 = require("../sections/news/news.model");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let NewsService = class NewsService {
    constructor(http) {
        this.http = http;
        this.newsUrl = 'https://newsapi.org/v2/everything?pageSize=50&sources=national-geographic&apiKey=5f87115c45194e94af3a96bbff7a0a7f';
        this.worldNewsArray = new Array();
        this.worldNews().subscribe(news => news.map(item => {
            this.worldNewsArray.push(item);
        }), error => Rx_1.Observable.throw(error));
        console.log('sdwq', this.worldNewsArray);
    }
    worldNews() {
        return this.http.get(this.newsUrl)
            .map((res) => {
            return res.json().articles.map(item => {
                return new news_model_1.News(item.source, item.author, item.title, item.description, item.url, item.urlToImage, item.publishedAt);
            });
        })
            .catch((error) => Rx_1.Observable.throw(error || 'Server error'));
    }
    getNews() {
        return this.worldNewsArray;
    }
};
NewsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NewsService);
exports.NewsService = NewsService;
