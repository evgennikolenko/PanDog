import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private user: UserService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('thit', this.user);
        console.log('thit', this.user.isAuth());
        if (this.user.isAuth()) {
            console.log('thit', this.user);
            req = req.clone({
                setHeaders: {
                    Authorization: this.user.getToken()
                }
            })
        }
        return next.handle(req)
    }
}