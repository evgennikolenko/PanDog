import { Component, OnInit} from "@angular/core";
import { ShoppingCart } from "./shopping-cart.model";
import { ShoppingCartService } from "./shopping-cart.service";
import { Observable } from "rxjs/Observable";


@Component({
  selector: "app-shopping-cart",
  templateUrl: "./app/components/cart/shopping-cart.component.html"
})
export class ShoppingCartComponent implements OnInit {

  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  public grossTotal: number;

  public constructor(private shoppingCartService: ShoppingCartService) {}

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    this.cart = this.shoppingCartService.get().subscribe(
        cart => {
          this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0)
          this.grossTotal = cart.grossTotal;
        });
  }
}