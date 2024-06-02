import { Component, OnInit } from '@angular/core';
import { CartProxyService } from '../../services/cart-proxy.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartProxyService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}