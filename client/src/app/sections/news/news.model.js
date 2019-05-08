"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class News {
    constructor(source, author, title, description, url, urlToImage, publishedAt) {
        this.source = source;
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
}
exports.News = News;
