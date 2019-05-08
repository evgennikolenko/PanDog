// @ts-ignore
import {Component, Input, OnInit, DoCheck } from '@angular/core';
import { LocalStorageServie } from './../../services/storage.service';
import { UserService } from './../../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'login-panel',
  templateUrl: './app/components/login-panel/login-panel.component.html'
})

export class LoginPanelComponent implements OnInit, DoCheck {
  @Input() currentUser;
  public current;
  public isAuth;
  // public currentUser;

  constructor( private storage : LocalStorageServie,
               private user: UserService,
               private router: Router) {
    //
    // let curUser = this.storage.get().getItem('currentUser');
    //
    // this.currentUser = JSON.parse(curUser);
  }

  ngDoCheck() {
      if(this.user.isAuth()){
          this.isAuth = true
      } else this.isAuth = false;
  }

  logout() {
      this.user.logout();
      this.router.navigate(['/store/about'])
  }

  ngOnInit() {
      this.user.getUserApi().subscribe(
          user => {
              this.current = user;
          }
      );
  }
}
