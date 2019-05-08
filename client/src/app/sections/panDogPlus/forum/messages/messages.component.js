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
const forum_model_1 = require("./../forum.model");
const forumMessage_model_1 = require("./../forumMessage.model");
const forum_service_1 = require("./../forum.service");
const router_1 = require("@angular/router");
const storage_service_1 = require("./../../../../services/storage.service");
const user_service_1 = require("./../../../../services/user.service");
const socket_service_1 = require("./../../../../services/socket.service");
let MessagesComponent = class MessagesComponent {
    constructor(fs, route, router, forumService, elementRef, storage, user, socket) {
        this.fs = fs;
        this.route = route;
        this.router = router;
        this.forumService = forumService;
        this.elementRef = elementRef;
        this.storage = storage;
        this.user = user;
        this.socket = socket;
        this.subjectMessages = new Array();
        this.s = this.socket.getSocket();
        this.route.params.subscribe(param => {
            this.forumService.getSubjectApi(param.id).subscribe(sub => {
                this.subject = sub;
                if (this.subject === undefined) {
                    this.router.navigate(['/store/forum']);
                }
                else {
                    this.forumService.getSubMessages(this.subject._id).subscribe(mess => this.subjectMessages = mess);
                }
            });
        });
    }
    // write message; form valid;
    writeMessage(form) {
        if (form.valid) {
            const login = this.currentUser.login;
            this.message = new forumMessage_model_1.ForumMessages(this.textareaMessage, login, this.subject.subjectName, this.subject._id);
            this.forumService.writeMessage(this.message).subscribe();
            form.reset();
            document.querySelector(".modal").style.display = "none";
        }
    }
    ngOnInit() {
        this.user.getUserApi().subscribe(user => {
            this.currentUser = user;
        });
        this.subscribeMessageAdd = this.forumService.messegeWasAdded(this.s).subscribe((data) => this.subjectMessages = data);
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
        this.subscribeMessageAdd.unsubscribe();
    }
};
MessagesComponent = __decorate([
    core_1.Component({
        selector: 'pd-messages',
        templateUrl: './app/sections/panDogPlus/forum/messages/messages.component.html'
    }),
    __metadata("design:paramtypes", [forum_model_1.ForumSubjectRep,
        router_1.ActivatedRoute,
        router_1.Router,
        forum_service_1.ForumService,
        core_1.ElementRef,
        storage_service_1.LocalStorageServie,
        user_service_1.UserService,
        socket_service_1.SocketService])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
