import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartProxyService {
  private items: any[] = [];

  constructor() { }

  // Add item to the cart
  addToCart(product: any): void {
    // Check if the item already exists in the cart
    const itemIndex = this.items.findIndex(item => item.id === product.id);
    if (itemIndex !== -1) {
      // If item exists, increase the quantity
      this.items[itemIndex].quantity += 1;
    } else {
      // If item does not exist, add it to the cart with quantity 1
      this.items.push({ ...product, quantity: 1 });
    }
  }

  // Get all items from the cart
  getItems(): any[] {
    return this.items;
  }

  // Remove item from the cart by index
  removeFromCart(index: number): void {
    this.items.splice(index, 1);
  }

  // Clear the cart
  clearCart(): void {
    this.items = [];
  }
}
