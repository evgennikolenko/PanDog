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
const io = require("socket.io-client");
const Observable_1 = require("rxjs/Observable");
const Rx = require("rxjs/Rx");
let SocketService = class SocketService {
    constructor() {
        this.socket = io('http://localhost:9000');
    }
    // connect() {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    //     // We define our observable which will observe any incoming messages
    //     // from our socket.io server.
    //     let observable = new Observable(observer => {
    //         this.socket.on('message', (data) => {
    //             console.log("Received message from Websocket Server")
    //             observer.next(data);
    //         })
    //         return () => {
    //             this.socket.disconnect();
    //         }
    //     });
    //
    //     // We define our Observer which will listen to messages
    //     // from our other components and send messages back to our
    //     // socket server whenever the `next()` method is called.
    //     let observer = {
    //         next: (data: Object) => {
    //             this.socket.emit('message', JSON.stringify(data));
    //         },
    //     };
    //
    //     // we return our Rx.Subject which is a combination
    //     // of both an observer and observable.
    //     return Rx.Subject.create(observer, observable);
    // }
    // }
    send(data) {
        this.socket.emit('message', data);
    }
    getS() {
        // this.socket.on('SubjectAdded', (data) => {
        //     console.log('SubjectAdded: ', data);
        //     return data.docs;
        // });
        let observable = new Observable_1.Observable(observer => {
            this.socket.on('SubjectAdded', (data) => {
                console.log('SubjectAdded: ', data);
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
    connect() {
        this.socket.connect();
    }
    disconnect() {
        this.socket.disconnect();
    }
    getSocket() {
        return this.socket;
    }
};
SocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SocketService);
exports.SocketService = SocketService;
