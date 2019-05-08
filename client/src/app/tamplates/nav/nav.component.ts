import { Component, DoCheck } from '@angular/core';
import { LocalStorageServie } from './../../services/storage.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'pd-nav',
  templateUrl: './app/tamplates/nav/nav.component.html',
  styleUrls: ['./app/tamplates/nav/nav.component.scss']
})
export class NavComponent implements DoCheck{
  public isAuth;

  constructor( private storage : LocalStorageServie,
               private  user: UserService) {
    
  }

  ngDoCheck() {
    if(this.user.isAuth()){
      this.isAuth = true
    } else this.isAuth = false;
  }
 }