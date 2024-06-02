import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductProxyService } from '../../services/product-proxy.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products!: any[];

  constructor(private productService: ProductProxyService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
    // Implement logic to add new product
  }

  editProduct(product: any): void {
    // Implement logic to edit product
  }

  deleteProduct(product: any): void {
    // Implement logic to delete product
  }
}
