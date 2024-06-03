import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductModelAngular } from '../models/IProductModelAngular';

@Injectable({
  providedIn: 'root'
})
export class CartProxyService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(item: IProductModelAngular) {
    const existingItem = this.cartItems.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeFromCart(item: IProductModelAngular) {
    const index = this.cartItems.findIndex(i => i.productId === item.productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
