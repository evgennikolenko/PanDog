"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const login_component_1 = require("../sections/login/login.component");
const registration_component_1 = require("../sections/registration/registration.component");
const news_component_1 = require("../sections/news/news.component");
const product_component_1 = require("../sections/product/product.component");
const buy_animals_component_1 = require("../sections/buy-animals/buy-animals.component");
const animalsDetail_component_1 = require("../sections/animals-detail/animalsDetail.component");
const checkout_component_1 = require("../sections/checkout/checkout.component");
const buy_component_1 = require("../sections/buy/buy.component");
const about_component_1 = require("../sections/about/about.component");
const landing_component_1 = require("../tamplates/landing/landing.component");
const store_component_1 = require("../tamplates/store/store.component");
const reviews_component_1 = require("../sections/reviews/reviews.component");
const pandogplus_component_1 = require("../sections/panDogPlus/pandogplus.component");
const forum_component_1 = require("../sections/panDogPlus/forum/forum.component");
const messages_component_1 = require("../sections/panDogPlus/forum/messages/messages.component");
const user_room_component_1 = require("../sections/user-room/user-room.component");
const auth_guard_1 = require("../services/auth.guard");
const appRoutes = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'store', component: store_component_1.StoreComponent,
        children: [
            { path: 'login', component: login_component_1.LoginComponent },
            { path: 'registration', component: registration_component_1.RegistrationComponent },
            { path: 'news', component: news_component_1.NewsComponent },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'about/reviews', component: reviews_component_1.ReviewsComponent },
            { path: 'product', component: product_component_1.ProductComponent },
            { path: 'product/animals', component: buy_animals_component_1.BuyAnimalsComponent },
            { path: 'product/animals/:id', component: animalsDetail_component_1.AnimalsDetailComponent },
            { path: 'product/for-pets', component: news_component_1.NewsComponent },
            { path: 'product/checkout', component: checkout_component_1.CheckoutComponent },
            { path: 'product/buy', component: buy_component_1.BuyComponent },
            { path: 'service', component: pandogplus_component_1.PandogplusComponent },
            { path: 'forum', component: forum_component_1.ForumComponent },
            { path: 'forum/:id', component: messages_component_1.MessagesComponent },
            { path: 'user-room', component: user_room_component_1.UserRoomComponent, canActivate: [auth_guard_1.AuthGuard] },
        ] },
    { path: '**', component: about_component_1.AboutComponent },
];
let AppRouteModule = class AppRouteModule {
};
AppRouteModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(appRoutes)
        ],
        exports: [router_1.RouterModule]
    })
], AppRouteModule);
exports.AppRouteModule = AppRouteModule;
