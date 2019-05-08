import { Inject,  Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { ForumSubject } from './forum.model';
import { ForumMessages } from './forumMessage.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Rx from "rxjs";

@Injectable()
export class ForumService {

     // Resolve HTTP using the constructor
     constructor (private http: HttpClient) {}

     // this is url on server
     private forumUrl = 'http://localhost:9000/api/forum/subjects';

    getForumSub (){
        return this.http.get(this.forumUrl);
    }

    getUserSubjectsApi(id) {
        return this.http.get(`http://localhost:9000/api/subjects/${id}`);
    }

    getSubjectApi(id) {
        return this.http.get(`http://localhost:9000/api/forum/subject/${id}`);
    }

    getSubMessages(subjectId : number){
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
        let observable = new Observable(observer => {
            socket.on('SubjectAdded', (data) => {
                observer.next(data);
            });
        });

        let observer = {
            next: (data: Object) => {
                return data;
            },
        };

        return Rx.Subject.create(observer, observable);
    }

    messegeWasAdded(socket) {
        let observable = new Observable(observer => {
            socket.on('MessageAdded', (data) => {
                observer.next(data);
            });
        });

        let observer = {
            next: (data: Object) => {
                return data;
            },
        };

        return Rx.Subject.create(observer, observable);
    }

    writeMessage (body: ForumMessages){
        return this.http.post(`http://localhost:9000/api/forum/subject/message/create`, body);
    }

}