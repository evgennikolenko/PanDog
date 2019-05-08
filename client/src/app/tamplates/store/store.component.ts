import { Component, OnChanges } from '@angular/core';
import { LocalStorageServie } from './../../services/storage.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'pd-store',
  templateUrl: './app/tamplates/store/store.component.html'
})
export class StoreComponent implements OnChanges{
  public isAuth;
  public currentUser;
        constructor( private storage : LocalStorageServie,
               private  user: UserService) {

            // if (this.user.isAuth()) {
            //     this.user.getUser();
            // }

    // if(this.storage.get().getItem('currentUser')){
    //   this.isAuth = true
    // } else this.isAuth = false;


  }
    ngOnChanges() {
        // if (!this.currentUser) {
        //     console.log('GET');
        //     // this.user.getUser().subscribe(
        //     //     (user) => this.currentUser = user
        //     // );
        // }
        // if (this.user.getToken()) {
        //     this.user.getUser().subscribe(
        //         (user) => {
        //             console.log('uss', user);
        //             this.currentUser = user
        //         }
        //     );
        // }

    }

    ngOnInit() {
        // this.user.getUser().subscribe(
        //     (user) => {
        //       console.log('uss', user);
        //       this.currentUser = user
        //     }
        // );
        // this.currentUser =
        // console.log('currentUser', this.currentUser);
        // if (currentUser) {
        //     this.isAuth = true
        // } else this.isAuth = false;
    }
 }