import { AfterContentInit, Component, OnInit, ElementRef, DoCheck, OnChanges, OnDestroy } from '@angular/core';
import {ForumSubject, ForumSubjectRep } from './forum.model';
import { ForumService } from  './forum.service';
import { NgForm } from '@angular/forms';
import { LocalStorageServie } from './../../../services/storage.service';
import { UserService } from './../../../services/user.service';
import { SocketService } from './../../../services/socket.service';
import { LastMessage } from '../../../pipes/lastMessage.pipe';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'pd-forum',
  templateUrl: './app/sections/panDogPlus/forum/forum.component.html',
  pipes: [ LastMessage ]
})

export class ForumComponent implements OnInit , AfterContentInit, DoCheck, OnChanges, OnDestroy  {
     
    private  currentUser;
    private newSubject = new ForumSubject("", "", "");
    public subjects;
    public pages: number;
    private error;

    private subscribeGetSubjects;
    private subscribeSubjectsAdd;
    public s: any;
    private subjectCount: number;

    constructor(private fs : ForumSubjectRep,
                private forumService : ForumService,
                private elementRef: ElementRef,
                private storage : LocalStorageServie,
                private user: UserService,
                private socket: SocketService){

        this.s = this.socket.getSocket();
    }

    createSubject(form : NgForm){

       if(form.valid){

        // add fields in object newSubject
        this.newSubject.subjectName = form.value.createsub;
        this.newSubject.authorLogin = this.currentUser.login;
        this.newSubject.authorId = this.currentUser.id;

        ForumService.createSubjectSocket(this.newSubject, this.s);

        form.reset();
        document.querySelector(".modal").style.display = "none";       
       }     
    }

    ngOnInit() {
        this.user.getUserApi().subscribe(
            user => {
                this.currentUser = user;
            }
        );

        this.subjects = [];

        this.subscribeGetSubjects = this.forumService.getForumSub().subscribe(
            res => {
                res.docs.map(item => this.subjects.push(item));
                this.subjectCount = res.total;
            });

          // subscribe on the ws emit 'SubjectAdded'
          // when subject was added
        this.subscribeSubjectsAdd = this.forumService.subjectWasAdded(this.s).subscribe(
              (data) => {
                  this.subjects = data.docs;
                  this.subjectCount = data.total;
              }
          );
        }

    ngAfterContentInit() {
      // show modal
      const button = document.querySelector('.modal-trigger');
      button.addEventListener('click', () => {
        let dataModa = button.getAttribute("data-modal");
        let el = document.querySelector("#"+dataModa);
        el.style.display = "block";
      });
      document.querySelector(".close-modal").addEventListener('click', ()=> {
        document.querySelector(".modal").style.display = "none";
      });
      document.querySelector(".close-modal-b").addEventListener('click', ()=> {
        document.querySelector(".modal").style.display = "none";
      });
  
    }

    ngOnDestroy(): void {
        this.subscribeGetSubjects.unsubscribe();
        this.subscribeSubjectsAdd.unsubscribe()
    }
}

