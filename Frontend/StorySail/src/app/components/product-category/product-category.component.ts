import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductProxyService} from '../../services/product-proxy.service';
import { IProductModelAngular } from '../../models/IProductModelAngular';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit{
  products: IProductModelAngular[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductProxyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const genre = params.get('genre');
      if (genre) {
        this.productService.getProductsByCategory(genre).subscribe(products => {
          this.products = products;
        });
      }
    });
  }
}
