import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRouteModule } from './modules/route.module'
import { AppComponent } from './app.component';
import { LandingComponent  } from './tamplates/landing/landing.component'
import { StoreComponent  } from './tamplates/store/store.component'
import { HeaderComponent } from './tamplates/header/header.component';
import { NavComponent } from './tamplates/nav/nav.component';
import { FooterComponent } from './tamplates/footer/footer.component';
import { LoginComponent } from './sections/login/login.component';
import { RegistrationComponent } from './sections/registration/registration.component';
import { UserService } from './services/user.service';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { NewsComponent } from './sections/news/news.component';
import { NewsService }  from './services/news.service';
import { ProductService }  from './services/product.service';
import { ProductComponent } from './sections/product/product.component';
import { BuyAnimalsComponent } from './sections/buy-animals/buy-animals.component';
import { AnimalsModel } from "./sections/buy-animals/animalsRepository.model";
import { FilterAnimalsComponent } from './sections/buy-animals/filter-animals/filter-animals.component';
import { CounterDirective } from './directives/counter.directive';
import { OrderBy } from './pipes/orderrBy.pipe';
import { LastMessage } from './pipes/lastMessage.pipe';
import { AnimalsDetailComponent } from './sections/animals-detail/animalsDetail.component'
import { ShoppingCartComponent } from './components/cart/shopping-cart.component';
import { ShoppingCartService } from './components/cart/shopping-cart.service';
import { LocalStorageServie } from './services/storage.service';
import { SocketService } from './services/socket.service';
import { CheckoutComponent } from './sections/checkout/checkout.component';
import { BuyComponent } from './sections/buy/buy.component';
import { AboutComponent } from './sections/about/about.component';
import { ReviewsComponent} from './sections/reviews/reviews.component';
import { PandogplusComponent } from './sections/panDogPlus/pandogplus.component';
import { ForumComponent } from './sections/panDogPlus/forum/forum.component';
import { ForumService } from './sections/panDogPlus/forum/forum.service';
import { ForumSubjectRep } from './sections/panDogPlus/forum/forum.model';
import { MessagesComponent } from './sections/panDogPlus/forum/messages/messages.component'
import { UserRoomComponent } from './sections/user-room/user-room.component';
import { TokenInterceptor} from './services/token.interceptor';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    StoreComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    LoginPanelComponent,
    NewsComponent,
    ProductComponent,
    BuyAnimalsComponent,
    FilterAnimalsComponent,
    CounterDirective,
    OrderBy,
    LastMessage,
    AnimalsDetailComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    BuyComponent,
    AboutComponent,
    ReviewsComponent,
    PandogplusComponent,
    ForumComponent,
    MessagesComponent,
    UserRoomComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouteModule,
    ReactiveFormsModule,
      HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
      {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuard,  SocketService,
    UserService, NewsService,ProductService, AnimalsModel,LocalStorageServie, ShoppingCartService,ForumSubjectRep,ForumService ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

