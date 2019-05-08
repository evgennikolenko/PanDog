import { Component } from '@angular/core';
import { LocalStorageServie } from './../../services/storage.service';

@Component({
  selector: 'pd-landing',
  templateUrl: './app/tamplates/landing/landing.component.html'
})

export class LandingComponent {
  public isAuth;

  constructor( private storage : LocalStorageServie) {
  
    if(this.storage.get().getItem('currentUser')){
      this.isAuth = true 
    } else this.isAuth = false;
      

  }


 }