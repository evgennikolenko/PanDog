import {  AfterContentInit, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { RegistrationFormControl } from './registration.model'
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { NullAstVisitor } from '@angular/compiler';
import { LocalStorageServie } from "./../../services/storage.service";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

declare var jquery:any;   
declare var $ :any;

@Component({
  selector: 'app-registration',
  templateUrl: './app/sections/registration/registration.component.html'
})

export class RegistrationComponent implements OnInit {
  RegistrationForm : FormGroup;
  private error;

  constructor( private fb : FormBuilder,
               private elementRef:ElementRef,
               private userService: UserService,
               private storage : LocalStorageServie,
               private router : Router ) {
    this.createForm();
  }

  createForm() {
    this.RegistrationForm = this.fb.group(
      {
          firstName: new RegistrationFormControl('FirstName','firstName','',
          Validators.compose([
            Validators.required,
            Validators.maxLength(5)
          ])),
         lastName:  new RegistrationFormControl('LastName','lastName','', Validators.required),
         email:  new RegistrationFormControl('email','email','', Validators.required),
         phone:  new RegistrationFormControl('phone','phone','', Validators.required),
         country:  new RegistrationFormControl('country','country','', Validators.nullValidator),
         city:  new RegistrationFormControl('city','city','', Validators.required),
         street:  new RegistrationFormControl('street','street','', Validators.required),
         index:  new RegistrationFormControl('index','index','', Validators.required),
         login:  new RegistrationFormControl('login','login','', Validators.required),
         password:  new RegistrationFormControl('password','password','', Validators.required),
         againPassword:  new RegistrationFormControl('againPassword','againPassword','', Validators.required)
        }
    );
  }

  regControls : any[] = [];
  
  getControls(): RegistrationFormControl[] {
        for(let item in this.RegistrationForm.controls){
            this.regControls.push(this.RegistrationForm.controls[item])
        }
        return this.regControls;
  }

  getFormValidationMessages(form: any) : string[] {
    let messages: string[] = [];
    this.regControls.forEach(c => c.getControls() .forEach(m => messages.push(m)));
        return messages;
    }
    formSubmitted : boolean = false;

    httpUser : User;
    
    submitForm(form: NgForm){
     
      this.formSubmitted = true;
      if(form.valid){
          this.httpUser = form.value;
          form.reset();
          this.userService.addUser(this.httpUser).subscribe(
              () => {
                  this.router.navigate(['/store/about']);
                  this.userService.getUser();
              },
              (error) => {
                  this.error = error.error.message;
              }
          );
          this.formSubmitted = false;
      }
    }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../src/assets/js/selectCountry.js";
    this.elementRef.nativeElement.appendChild(s);

    var q = document.createElement("script");
    q.type = "text/javascript";
    q.src = "../src/assets/js/selectCountry2.js";
    this.elementRef.nativeElement.appendChild(q);
    this.getControls();
  }
}
