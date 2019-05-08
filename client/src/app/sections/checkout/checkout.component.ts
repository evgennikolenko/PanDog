import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "./../../components/cart/cart-item.model";
import { Animals } from "./../buy-animals/animals.model";
import { ShoppingCart } from "./../../components/cart/shopping-cart.model";
import { ProductService } from "./../../services/product.service";
import { UserService } from "./../../services/user.service";
import { ShoppingCartService } from "./../../components/cart/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Route, Router , Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "app-checkout",
  templateUrl: "./app/sections/checkout/checkout.component.html"
})

export class CheckoutComponent implements OnInit, OnDestroy {

  public cart;
  public cartItems;
  public itemCount: number;
  private animals: Animals[];
  private cartSubscription: Subscription;
  public deliveryOptoin;

  public constructor(  private productsService: ProductService,
                       private router : ActivatedRoute,
                       private route : Router,
                       private shoppingCartService: ShoppingCartService,
                       private userService: UserService,
                       private http: HttpClient){
        this.userService.getUser();

        this.cart = this.shoppingCartService.get();
   
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
            this.productsService.getAnimals().subscribe((products) => {
            this.animals = products;
            this.cartItems = cart;
            this.cartItems.items =  this.cartItems.items
                .map((item) => {
                const product = this.animals.find((p) => p.id.toString() === item.productId);
                return {
               ...item,
                product
                  };
                });
              });
            });

                      this.router.params.subscribe(
                        param => {
                          if (this.itemCount < 1) { 
                              this.route.navigate(['/product/animals'])
                          }
                        }
                    )}

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }
 
  public deleteOrder(animals : Animals) : void {
    this.shoppingCartService.addItem(animals , -1);
    if (this.itemCount < 1) { 
      this.route.navigate(['/store/product/animals'])} }

  public setDeliveryOption(option): void {
    this.shoppingCartService.setDeliveryOption(option.value);
  }

  // function for confirmation order
  public async setOrders() {
      let cartObject;
      const user = this.userService.getCurrentUser();
      this.cartSubscription = await this.cart.subscribe((cart) => {
          cartObject = cart;
      });
      const order = {
          ...cartObject,
          userId: user.id
      };
      this.shoppingCartService.createOrder(order).subscribe(item => {
          this.route.navigate(['/store/user-room']);
          return item;
      });
      this.shoppingCartService.empty();
  }


  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}