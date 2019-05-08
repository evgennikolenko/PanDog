import {Component, AfterContentInit, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { ForumSubject, ForumSubjectRep } from './../forum.model';
import { ForumMessages } from './../forumMessage.model';
import { ForumService } from  './../forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LocalStorageServie } from './../../../../services/storage.service';
import { UserService } from './../../../../services/user.service';
import { SocketService } from './../../../../services/socket.service';

@Component({
  selector: 'pd-messages',
  templateUrl: './app/sections/panDogPlus/forum/messages/messages.component.html'
})

export class MessagesComponent  implements OnInit, AfterContentInit, OnDestroy {
     
    public subject : ForumSubject;
    public message : ForumMessages;
    public textareaMessage : string;
    private currentUser;
    private subjectMessages : ForumMessages[];
    private s: any;
    private subscribeMessageAdd;

    constructor(private fs : ForumSubjectRep,
                private route : ActivatedRoute,
                private router : Router,
                private forumService : ForumService,
                private elementRef: ElementRef,
                private storage : LocalStorageServie,
                private user: UserService,
                private socket: SocketService){
        
        this.subjectMessages = new Array<ForumMessages>();
        this.s = this.socket.getSocket();

    this.route.params.subscribe(
      param => {

        this.forumService.getSubjectApi(param.id).subscribe(
            sub => {
                this.subject = sub;

                if ( this.subject === undefined) {
                    this.router.navigate(['/store/forum'])
                } else {
                    this.forumService.getSubMessages(this.subject._id).subscribe(
                        mess =>  this.subjectMessages = mess)
                }
            }
        );
      })
  }

  // write message; form valid;
    writeMessage(form : NgForm) {
      if(form.valid){
          const login = this.currentUser.login;
          this.message = new ForumMessages(this.textareaMessage, login, this.subject.subjectName,  this.subject._id );

          this.forumService.writeMessage(this.message).subscribe();

          form.reset();
          document.querySelector(".modal").style.display = "none";
        }
    }

    ngOnInit(): void {
        this.user.getUserApi().subscribe(
            user => {
                this.currentUser = user;
            }
        );

       this.subscribeMessageAdd = this.forumService.messegeWasAdded(this.s).subscribe(
            (data) => this.subjectMessages = data
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
        this.subscribeMessageAdd.unsubscribe();
    }
}