import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductProxyService } from '../../services/product-proxy.service';
import { IProductModelAngular } from '../../models/IProductModelAngular';
import { CartProxyService } from '../../services/cart-proxy.service';
import { UserProxyService } from '../../services/user-proxy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: IProductModelAngular;
  editMode: boolean = false;

  constructor(private cartService: CartProxyService, private route: ActivatedRoute, private productService: ProductProxyService, private userproxy: UserProxyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId) {
        this.productService.getProduct(productId).subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  get isLoggedIn(): boolean {
    return this.userproxy.user.logInStatus;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  get isAdmin(): boolean {
    return this.userproxy.user.role === 'admin';
  }

  updateProductDetails(): void {
    this.productService.updateProductInfo(this.product).subscribe(
      (updatedProduct: IProductModelAngular) => {
        console.log('Product details updated successfully:', updatedProduct);
        this.editMode = false;
      },
      (error:any) => {
        console.error('Error updating user details:', error);
      }
    );
  }
}
