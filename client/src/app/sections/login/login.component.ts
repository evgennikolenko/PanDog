import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Login } from './login.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './app/sections/login/login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: Login = new Login();
  isSubmittet: boolean = false;
  private error: string = '';

  constructor( private fb : FormBuilder,
               private user: UserService,
               private  router: Router,
               private route: ActivatedRoute) {
  }

  login(form : NgForm){
    this.isSubmittet = true;
     if(form.valid){
      this.user.login(this.loginForm).subscribe(
          () => {
              this.router.navigate(['/store/about']);
              this.user.getUser();
          },
          (error) => {
              this.error = error.error.message;
          });

      this.isSubmittet = false;
      form.reset();
     }
    
  }
  ngOnInit() {}
}
