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
const http_1 = require("@angular/common/http");
const Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
const Rx = require("rxjs");
let ForumService = class ForumService {
    // Resolve HTTP using the constructor
    constructor(http) {
        this.http = http;
        // this is url on server
        this.forumUrl = 'http://localhost:9000/api/forum/subjects';
    }
    getForumSub() {
        return this.http.get(this.forumUrl);
    }
    getUserSubjectsApi(id) {
        return this.http.get(`http://localhost:9000/api/subjects/${id}`);
    }
    getSubjectApi(id) {
        return this.http.get(`http://localhost:9000/api/forum/subject/${id}`);
    }
    getSubMessages(subjectId) {
        return this.http.get(`http://localhost:9000/api/forum/subject/message/${subjectId}`);
    }
    // private createSubUrl = 'http://localhost:9000/api/forum/subjects/create';
    // createNewSubApi (body: ForumSubject): Observable<ForumSubject[]>{
    //     return this.http.post(this.createSubUrl, body);
    // }
    static createSubjectSocket(sub, socket) {
        socket.emit('createSubject', sub);
    }
    subjectWasAdded(socket) {
        let observable = new Rx_1.Observable(observer => {
            socket.on('SubjectAdded', (data) => {
                observer.next(data);
            });
        });
        let observer = {
            next: (data) => {
                return data;
            },
        };
        return Rx.Subject.create(observer, observable);
    }
    messegeWasAdded(socket) {
        let observable = new Rx_1.Observable(observer => {
            socket.on('MessageAdded', (data) => {
                observer.next(data);
            });
        });
        let observer = {
            next: (data) => {
                return data;
            },
        };
        return Rx.Subject.create(observer, observable);
    }
    writeMessage(body) {
        return this.http.post(`http://localhost:9000/api/forum/subject/message/create`, body);
    }
};
ForumService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], ForumService);
exports.ForumService = ForumService;
