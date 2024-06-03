import { Component, OnInit } from '@angular/core';
import { CartProxyService } from '../../services/cart-proxy.service';
import { ProductProxyService } from '../../services/product-proxy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartProxyService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  updateQuantity(item: any) {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}