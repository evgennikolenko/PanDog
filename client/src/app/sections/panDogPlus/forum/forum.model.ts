import { Injectable } from "@angular/core";
import { ForumService } from  './forum.service';
import {Observable, Subject} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class ForumSubject {
    constructor(
        public  subjectName : string,
        public  authorLogin : string,
        public  authorId : string) {
    }
}

@Injectable()
export class ForumSubjectRep {

    private subjects : ForumSubject[];
    private pages: number;

    constructor( private fs : ForumService){
        this.subjects = new Array<ForumSubject>();
    }

    getSubjects() {
       this.fs.getForumSub().subscribe(
           subs => {
               this.subjects = subs.docs;
           },
           error => Observable.throw(error)
           )
    }

    getSubjectById(id: number ) {
        this.fs.getSubjectApi(id).subscribe(
            subs => this.subjects = subs
        );
    }
}