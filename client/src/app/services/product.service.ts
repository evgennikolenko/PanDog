import { Inject,  Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animals, Animal } from './../sections/buy-animals/animals.model'
import {Observable} from 'rxjs/Rx';
import { GetCartModel } from './../components/cart/shopping-cart.model';

// Import RxJs required methods
import 'rxjs/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

     constructor (private http: HttpClient) {}

     private productUrl = 'http://localhost:9000/api/animals';

      // get animals
    getAnimals() : Observable<Animals[]>{

        return this.http.get(this.productUrl) 
                         .map( (res:Response) => {
                             console.log('req animals', res);
                            return res.map(item => {
                                    return new Animals(
                                        item.id,
                                        item.src,
                                        item.type,
                                        item.breed,
                                        item.age,
                                        item.cost,
                                        item.available,
                                        item.location,
                                        item.discount,
                                    );
                                })
                            }) 

    }

    getAnimal(id): Observable<Animal[]>{
        return this.http.get(`http://localhost:9000/api/animals/${id}`).
            map(item => {
                return  new Animal(
                    item.id,
                    item.src,
                    item.type,
                    item.breed,
                    item.age,
                    item.cost,
                    item.available,
                    item.location,
                    item.discount,
                    item.reviews
                );


        })
    }

            // get orders for current customer
        getCustomerOrders(userLogin : string) {
        return this.http.get(`http://localhost:3000/orders?userLogin=${userLogin}`)
        .map( (res:Response) => {
            return res.json().map(item => {
                    return new GetCartModel(
                       item.items,
                       item.grossTotal,
                       item.deliveryTotal,
                       item.itemsTotal,
                       item.userLogin
                    );
                })
            })
                       
}
}