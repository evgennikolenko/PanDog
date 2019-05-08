import { Inject,  Injectable} from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

     public currentUser;
     private token = null;

     constructor (private http: HttpClient) {

     }
     // this is url on server
     private registrationUrl = 'http://localhost:9000/api/registration';

    addUser (body: Object){

        let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        let options       = new RequestOptions({ headers: headers }); 

        return this.http.post(this.registrationUrl, body, options)
                .map(
                    (data) => {
                        localStorage.setItem('auth-token', data.token);
                        this.setToken(data.token)
                    })
                .catch((error:any) => Observable.throw(error));
    }
  
    private loginUrl = 'http://localhost:9000/api/login';

    login(user: Object): Observable<{token: string}> {
        return this.http.post<{token: string}>(this.loginUrl, user)
            .map(
                (data) => {
                    localStorage.setItem('auth-token', data.token);
                    this.setToken(data.token)
                })
            .catch((error:any) => Observable.throw(error));
    }

    getUserApi() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/currentuser', options)
            .map((user) => {
                return user;
            })
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuth() {
        return !!this.token;
    }

    logout(){
        this.setToken(null);
        localStorage.removeItem('auth-token');
    }

    getUser() {
        this.getUserApi().subscribe(
            (user) => {
                this.currentUser = user
            }
        );
    }

    getCurrentUser() {
        return this.currentUser;
    }

}