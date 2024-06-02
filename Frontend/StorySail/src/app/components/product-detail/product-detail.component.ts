import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductProxyService } from '../../services/product-proxy.service';
import { IProductModelAngular } from '../../models/IProductModelAngular';
import { CartProxyService } from '../../services/cart-proxy.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: IProductModelAngular | undefined;

  constructor(private cartService: CartProxyService, private route: ActivatedRoute, private productService: ProductProxyService) { }

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
}
