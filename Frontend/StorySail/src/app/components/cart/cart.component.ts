import { Component, OnInit } from '@angular/core';
import { CartProxyService } from '../../services/cart-proxy.service';
import { ProductProxyService } from '../../services/product-proxy.service';
import { UserProxyService } from '../../services/user-proxy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(private cartService: CartProxyService, private productService: ProductProxyService, private userService: UserProxyService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
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

  checkout(){
    // Check product availability before creating the invoice
    const productCheckPromises = this.cartItems.map(item => {
      return this.productService.checkProductAvailability(item.productId, item.quantity);
    });

    Promise.all(productCheckPromises).then(results => {
      const allAvailable = results.every(isAvailable => isAvailable);


      if (allAvailable) {
        const transactionData = {
          userId: this.userService.user.userId,
          items: this.cartItems,
          totalPrice: this.totalPrice
        };

        // Send invoice data to backend
        this.cartService.createTransaction(transactionData).subscribe(
          (invoice: any) => {
            // Handle successful invoice creation
            console.log('Transaction created:', invoice);
            // Optionally, display a success message to the user
            alert('Transaction created successfully!');
            this.productService.updateAvailability(transactionData);
            // Clear the cart after successful checkout
            this.cartService.clearCart();
            // Reload cart items after checkout
            this.loadCartItems();
            this.router.navigate(['']);
          },
          (error: any) => {
            // Handle error
            console.error('Error creating invoice:', error);
            // Optionally, display an error message to the user
            alert('Error creating invoice. Please try again.');
          }
        );
      } else {
        // Notify the user that some products are not available
        alert('Some products in your cart are not available in the desired quantity. Please update your cart.');
      }
    }).catch(error => {
      // Handle error
      console.error('Error checking product availability:', error);
      // Optionally, display an error message to the user
      alert('Error checking product availability. Please try again.');
    });
  }
}