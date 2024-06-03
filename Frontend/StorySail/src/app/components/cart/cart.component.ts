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

  checkout() {
    // Convert Observables to Promises
    const productCheckPromises = this.cartItems.map(item => {
        console.log(`Checking availability for product ${item.productId} with quantity ${item.quantity}`);
        return this.productService.checkProductAvailability(item.productId, item.quantity).toPromise();
    });

    Promise.all(productCheckPromises).then(results => {
        console.log('Product availability results:', results);

        // Safely check if all results are available
        const allAvailable = results.every(result => result && result.available);

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
                    alert('Transaction created successfully!');

                    // Update product availability
                    console.log('Updating product availability with data:', transactionData);
                    this.productService.updateAvailability(transactionData).subscribe(
                        () => {
                            console.log('Product availability updated successfully');
                            
                            // Clear the cart after successful checkout
                            this.cartService.clearCart();

                            // Reload cart items after checkout
                            this.loadCartItems();
                            this.router.navigate(['']);
                        },
                        error => {
                            console.error('Error updating product availability:', error);
                            alert('Error updating product availability. Please try again.');
                        }
                    );
                },
                (error: any) => {
                    // Handle error
                    console.error('Error creating invoice:', error);
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
        alert('Error checking product availability. Please try again.');
    });
}


}