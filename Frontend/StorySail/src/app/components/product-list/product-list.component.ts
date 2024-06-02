import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductProxyService} from '../../services/product-proxy.service';
import { IProductModelAngular } from '../../models/IProductModelAngular';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: IProductModelAngular[] = [];

  constructor(private productService: ProductProxyService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
}
