"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const forms_2 = require("@angular/forms");
const common_1 = require("@angular/common");
const http_2 = require("@angular/common/http");
const route_module_1 = require("./modules/route.module");
const app_component_1 = require("./app.component");
const landing_component_1 = require("./tamplates/landing/landing.component");
const store_component_1 = require("./tamplates/store/store.component");
const header_component_1 = require("./tamplates/header/header.component");
const nav_component_1 = require("./tamplates/nav/nav.component");
const footer_component_1 = require("./tamplates/footer/footer.component");
const login_component_1 = require("./sections/login/login.component");
const registration_component_1 = require("./sections/registration/registration.component");
const user_service_1 = require("./services/user.service");
const login_panel_component_1 = require("./components/login-panel/login-panel.component");
const news_component_1 = require("./sections/news/news.component");
const news_service_1 = require("./services/news.service");
const product_service_1 = require("./services/product.service");
const product_component_1 = require("./sections/product/product.component");
const buy_animals_component_1 = require("./sections/buy-animals/buy-animals.component");
const animalsRepository_model_1 = require("./sections/buy-animals/animalsRepository.model");
const filter_animals_component_1 = require("./sections/buy-animals/filter-animals/filter-animals.component");
const counter_directive_1 = require("./directives/counter.directive");
const orderrBy_pipe_1 = require("./pipes/orderrBy.pipe");
const lastMessage_pipe_1 = require("./pipes/lastMessage.pipe");
const animalsDetail_component_1 = require("./sections/animals-detail/animalsDetail.component");
const shopping_cart_component_1 = require("./components/cart/shopping-cart.component");
const shopping_cart_service_1 = require("./components/cart/shopping-cart.service");
const storage_service_1 = require("./services/storage.service");
const socket_service_1 = require("./services/socket.service");
const checkout_component_1 = require("./sections/checkout/checkout.component");
const buy_component_1 = require("./sections/buy/buy.component");
const about_component_1 = require("./sections/about/about.component");
const reviews_component_1 = require("./sections/reviews/reviews.component");
const pandogplus_component_1 = require("./sections/panDogPlus/pandogplus.component");
const forum_component_1 = require("./sections/panDogPlus/forum/forum.component");
const forum_service_1 = require("./sections/panDogPlus/forum/forum.service");
const forum_model_1 = require("./sections/panDogPlus/forum/forum.model");
const messages_component_1 = require("./sections/panDogPlus/forum/messages/messages.component");
const user_room_component_1 = require("./sections/user-room/user-room.component");
const token_interceptor_1 = require("./services/token.interceptor");
const auth_guard_1 = require("./services/auth.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            landing_component_1.LandingComponent,
            store_component_1.StoreComponent,
            header_component_1.HeaderComponent,
            nav_component_1.NavComponent,
            footer_component_1.FooterComponent,
            login_component_1.LoginComponent,
            registration_component_1.RegistrationComponent,
            login_panel_component_1.LoginPanelComponent,
            news_component_1.NewsComponent,
            product_component_1.ProductComponent,
            buy_animals_component_1.BuyAnimalsComponent,
            filter_animals_component_1.FilterAnimalsComponent,
            counter_directive_1.CounterDirective,
            orderrBy_pipe_1.OrderBy,
            lastMessage_pipe_1.LastMessage,
            animalsDetail_component_1.AnimalsDetailComponent,
            shopping_cart_component_1.ShoppingCartComponent,
            checkout_component_1.CheckoutComponent,
            buy_component_1.BuyComponent,
            about_component_1.AboutComponent,
            reviews_component_1.ReviewsComponent,
            pandogplus_component_1.PandogplusComponent,
            forum_component_1.ForumComponent,
            messages_component_1.MessagesComponent,
            user_room_component_1.UserRoomComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            route_module_1.AppRouteModule,
            forms_2.ReactiveFormsModule,
            http_2.HttpClientModule
        ],
        providers: [{ provide: http_2.HTTP_INTERCEPTORS, useClass: token_interceptor_1.TokenInterceptor, multi: true },
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, auth_guard_1.AuthGuard, socket_service_1.SocketService,
            user_service_1.UserService, news_service_1.NewsService, product_service_1.ProductService, animalsRepository_model_1.AnimalsModel, storage_service_1.LocalStorageServie, shopping_cart_service_1.ShoppingCartService, forum_model_1.ForumSubjectRep, forum_service_1.ForumService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
