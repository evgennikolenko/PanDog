import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginPanelComponent } from '../../components/login-panel/login-panel.component';
import { LocalStorageServie } from './../../services/storage.service';
import { User } from './../../models/user.model';
import { AnimalsModel } from "./../../sections/buy-animals/animalsRepository.model";
import { Animals } from './../buy-animals/animals.model';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ForumService } from './../panDogPlus/forum/forum.service';
import { UserService } from './../../services/user.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pd-user-room',
  templateUrl: './app/sections/user-room/user-room.component.html'
})

export class UserRoomComponent implements OnInit, DoCheck{

    public currentUser;
    public userOrders;
    orderItems
    public userSubjects;
    private errors;
    constructor( private storage : LocalStorageServie,
                 private animal : AnimalsModel,
                 private productService : ProductService,
                 private forumService : ForumService,
                 private user: UserService
                ){
  
        // this.currentUser = JSON.parse(this.storage.get().getItem('currentUser'));
        // this.currentUser = this.user.getCurrentUser();
        // console.log('SS',  this.currentUser);
        //
        this.userSubjects = new Array();
        // this.userOrders = new Array();
        //
        // this.productService.getCustomerOrders(this.currentUser.login).subscribe(
        //     orders => this.userOrders  = orders ,
        //     error => this.errors = error
        // )

        this.currentUser = this.user.getUserApi().subscribe(
            user => {
                this.currentUser = user;

                this.forumService.getUserSubjectsApi(this.currentUser.id).subscribe(
                    item =>  this.userSubjects = item,
                    error => this.errors = error
                );
            }
        );
        console.log('USER ROOM ', this.currentUser);


    }

    // ngDoCheck() {
    //     this.currentUser = this.user.getCurrentUser();
    // }
    // ngOnInit() {
    //     this.currentUser = this.user.getCurrentUser();
    //     console.log('currr', this.currentUser);
    // }
 }