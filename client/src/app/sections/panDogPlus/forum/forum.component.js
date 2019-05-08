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
const forum_model_1 = require("./forum.model");
const forum_service_1 = require("./forum.service");
const storage_service_1 = require("./../../../services/storage.service");
const user_service_1 = require("./../../../services/user.service");
const socket_service_1 = require("./../../../services/socket.service");
const lastMessage_pipe_1 = require("../../../pipes/lastMessage.pipe");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let ForumComponent = class ForumComponent {
    constructor(fs, forumService, elementRef, storage, user, socket) {
        this.fs = fs;
        this.forumService = forumService;
        this.elementRef = elementRef;
        this.storage = storage;
        this.user = user;
        this.socket = socket;
        this.newSubject = new forum_model_1.ForumSubject("", "", "");
        this.s = this.socket.getSocket();
    }
    createSubject(form) {
        if (form.valid) {
            // add fields in object newSubject
            this.newSubject.subjectName = form.value.createsub;
            this.newSubject.authorLogin = this.currentUser.login;
            this.newSubject.authorId = this.currentUser.id;
            forum_service_1.ForumService.createSubjectSocket(this.newSubject, this.s);
            form.reset();
            document.querySelector(".modal").style.display = "none";
        }
    }
    ngOnInit() {
        this.user.getUserApi().subscribe(user => {
            this.currentUser = user;
        });
        this.subjects = [];
        this.subscribeGetSubjects = this.forumService.getForumSub().subscribe(res => {
            res.docs.map(item => this.subjects.push(item));
            this.subjectCount = res.total;
        });
        // subscribe on the ws emit 'SubjectAdded'
        // when subject was added
        this.subscribeSubjectsAdd = this.forumService.subjectWasAdded(this.s).subscribe((data) => {
            this.subjects = data.docs;
            this.subjectCount = data.total;
        });
    }
    ngAfterContentInit() {
        // show modal
        const button = document.querySelector('.modal-trigger');
        button.addEventListener('click', () => {
            let dataModa = button.getAttribute("data-modal");
            let el = document.querySelector("#" + dataModa);
            el.style.display = "block";
        });
        document.querySelector(".close-modal").addEventListener('click', () => {
            document.querySelector(".modal").style.display = "none";
        });
        document.querySelector(".close-modal-b").addEventListener('click', () => {
            document.querySelector(".modal").style.display = "none";
        });
    }
    ngOnDestroy() {
        this.subscribeGetSubjects.unsubscribe();
        this.subscribeSubjectsAdd.unsubscribe();
    }
};
ForumComponent = __decorate([
    core_1.Component({
        selector: 'pd-forum',
        templateUrl: './app/sections/panDogPlus/forum/forum.component.html',
        pipes: [lastMessage_pipe_1.LastMessage]
    }),
    __metadata("design:paramtypes", [forum_model_1.ForumSubjectRep,
        forum_service_1.ForumService,
        core_1.ElementRef,
        storage_service_1.LocalStorageServie,
        user_service_1.UserService,
        socket_service_1.SocketService])
], ForumComponent);
exports.ForumComponent = ForumComponent;
