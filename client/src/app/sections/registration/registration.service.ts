import { Inject,  Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { RegistrationComponent } from './registration.component'


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {

     // Resolve HTTP using the constructor
     constructor (private http: Http) {}


     // this is url on server
     private registrationUrl = 'http://localhost:3000/registration'; 

      // Add a new comment
    addUser (body: Object): Observable<RegistrationComponent[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.registrationUrl, body, options) // ...using post request
                         .map((res:Response) => {
                             console.log('QQQ', res.json());
                            return res.json()}) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if anyRegistrationComponent
    }

}