import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../sections/login/login.component';
import { RegistrationComponent } from '../sections/registration/registration.component';
import { NewsComponent } from  '../sections/news/news.component';
import { ProductComponent } from '../sections/product/product.component';
import { BuyAnimalsComponent } from '../sections/buy-animals/buy-animals.component';
import { AnimalsDetailComponent } from '../sections/animals-detail/animalsDetail.component'
import { CheckoutComponent } from '../sections/checkout/checkout.component';
import { BuyComponent } from '../sections/buy/buy.component';
import { AboutComponent } from '../sections/about/about.component';
import { LandingComponent } from '../tamplates/landing/landing.component';
import { StoreComponent } from '../tamplates/store/store.component';
import { ReviewsComponent} from '../sections/reviews/reviews.component';
import { PandogplusComponent } from '../sections/panDogPlus/pandogplus.component';
import { ForumComponent } from '../sections/panDogPlus/forum/forum.component';
import { MessagesComponent } from '../sections/panDogPlus/forum/messages/messages.component';
import { UserRoomComponent } from '../sections/user-room/user-room.component';

import { AuthGuard } from '../services/auth.guard';

const appRoutes : Routes = [

   { path: '', component: LandingComponent},
   { path: 'store', component: StoreComponent,
                children: [
                { path: 'login', component: LoginComponent},
                { path: 'registration', component: RegistrationComponent},
                { path: 'news', component: NewsComponent},
                { path: 'about', component: AboutComponent},
                { path: 'about/reviews', component: ReviewsComponent},
                { path: 'product', component: ProductComponent},
                { path: 'product/animals', component: BuyAnimalsComponent },
                { path: 'product/animals/:id', component: AnimalsDetailComponent },
                { path: 'product/for-pets', component: NewsComponent },
                { path: 'product/checkout', component: CheckoutComponent },
                { path: 'product/buy', component: BuyComponent },
                { path: 'service', component: PandogplusComponent },
                { path: 'forum', component: ForumComponent },
                { path: 'forum/:id', component: MessagesComponent },
                { path: 'user-room', component: UserRoomComponent, canActivate: [AuthGuard] },
            ]},
   { path: '**', component: AboutComponent},
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ]
})

export class AppRouteModule {}
