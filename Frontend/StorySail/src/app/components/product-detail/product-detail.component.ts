import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductProxyService } from '../../services/product-proxy.service';
import { IProductModelAngular } from '../../models/IProductModelAngular';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: IProductModelAngular | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductProxyService) { }

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
}
