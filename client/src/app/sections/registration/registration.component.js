"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const registration_model_1 = require("./registration.model");
const forms_1 = require("@angular/forms");
const storage_service_1 = require("./../../services/storage.service");
const router_1 = require("@angular/router");
const user_service_1 = require("../../services/user.service");
let RegistrationComponent = class RegistrationComponent {
    constructor(fb, elementRef, userService, storage, router) {
        this.fb = fb;
        this.elementRef = elementRef;
        this.userService = userService;
        this.storage = storage;
        this.router = router;
        this.regControls = [];
        this.formSubmitted = false;
        this.createForm();
    }
    createForm() {
        this.RegistrationForm = this.fb.group({
            firstName: new registration_model_1.RegistrationFormControl('FirstName', 'firstName', '', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.maxLength(5)
            ])),
            lastName: new registration_model_1.RegistrationFormControl('LastName', 'lastName', '', forms_1.Validators.required),
            email: new registration_model_1.RegistrationFormControl('email', 'email', '', forms_1.Validators.required),
            phone: new registration_model_1.RegistrationFormControl('phone', 'phone', '', forms_1.Validators.required),
            country: new registration_model_1.RegistrationFormControl('country', 'country', '', forms_1.Validators.nullValidator),
            city: new registration_model_1.RegistrationFormControl('city', 'city', '', forms_1.Validators.required),
            street: new registration_model_1.RegistrationFormControl('street', 'street', '', forms_1.Validators.required),
            index: new registration_model_1.RegistrationFormControl('index', 'index', '', forms_1.Validators.required),
            login: new registration_model_1.RegistrationFormControl('login', 'login', '', forms_1.Validators.required),
            password: new registration_model_1.RegistrationFormControl('password', 'password', '', forms_1.Validators.required),
            againPassword: new registration_model_1.RegistrationFormControl('againPassword', 'againPassword', '', forms_1.Validators.required)
        });
    }
    getControls() {
        for (let item in this.RegistrationForm.controls) {
            this.regControls.push(this.RegistrationForm.controls[item]);
        }
        return this.regControls;
    }
    getFormValidationMessages(form) {
        let messages = [];
        this.regControls.forEach(c => c.getControls().forEach(m => messages.push(m)));
        return messages;
    }
    submitForm(form) {
        this.formSubmitted = true;
        if (form.valid) {
            this.httpUser = form.value;
            form.reset();
            this.userService.addUser(this.httpUser).subscribe(() => {
                this.router.navigate(['/store/about']);
                this.userService.getUser();
            }, (error) => {
                this.error = error.error.message;
            });
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
};
RegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-registration',
        templateUrl: './app/sections/registration/registration.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        core_1.ElementRef,
        user_service_1.UserService,
        storage_service_1.LocalStorageServie,
        router_1.Router])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
