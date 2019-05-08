import { Injectable } from "@angular/core";
import { LocalStorageServie } from "./../../services/storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "./cart-item.model";
import { Animals, Animal } from "./../../sections/buy-animals/animals.model";
import { ShoppingCart } from "./shopping-cart.model";
import { ProductService } from "./../../services/product.service";
import { HttpClient } from '@angular/common/http';

const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Animals[];

  public constructor(private storageService : LocalStorageServie,
                     private productService: ProductService,
                     private http: HttpClient
                    ) {
    this.storage = this.storageService.get();
    this.productService.getAnimals().subscribe((products) => this.products = products);

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(product: Animal, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      cart.items.push(item);
    }
 
    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    this.calculateCart(cart);


  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryTotal = +deliveryOption;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  private calculateCart(cart: ShoppingCart) {
    let arr = [];
    cart.items.map((item) => {
           this.productService.getAnimal(item.productId).subscribe(
               animal => {
                    arr.push(item.quantity * animal.cost);
                    cart.itemsTotal = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
                    this.save(cart);
                    this.dispatch(cart);
               });
           });
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    let curUser = JSON.parse(this.storage.getItem('currentUser'))  ;
    cart.userLogin =  curUser.login;
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
      cart.userLogin =  curUser.login;
    }
    return cart;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
          }
        });
  }

  // public createOrder22(body: Object){
  //       console.log('CREATE', JSON.stringify(body));
  //       return this.http.post(this.configUrl, body);
  //
  //   }

    private forumUrl = 'http://localhost:9000/api/animals/createOrder';

    createOrder (order){
      console.log('CREA');
      return this.http.post(this.forumUrl, order);
    }
}