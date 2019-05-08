import { CartItem } from "./cart-item.model";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemsTotal: number = 0;
  public userLogin : string;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
    this.userLogin = src.userLogin;
  }
}

export class GetCartModel {
  constructor(
    public items,
    public grossTotal: number,
    public deliveryTotal: number,
    public itemsTotal: number,
    public userLogin : string) {}
}