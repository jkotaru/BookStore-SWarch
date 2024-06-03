import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductProxyService } from '../../services/product-proxy.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IProductModelAngular } from '../../models/IProductModelAngular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  @ViewChild('productForm', { static: false }) productForm!: NgForm;
  products!: any[];
  showForm: boolean = false;
  isEditing: boolean = false;
  editingProductIndex: number = -1;
  formData: any = {};
  productData!: IProductModelAngular ;

  constructor(private productService: ProductProxyService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
    this.showForm = true;
    this.isEditing = false;
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      this.productData = this.productForm.value;
      if (this.isEditing) {
        // Update existing product
        this.productService.updateProduct(this.productData).subscribe(
          (response: any) => {
            if (response.message === "Product data updated!") {
              this.fetchProducts();
              this.showForm = false;
              this.isEditing = false;
            }
          },
          (error: any) => {
            console.error('Error while updating product:', error);
          }
        );
      }else {
        // Add new product
        this.productService.addProduct(this.productData).subscribe(
          (response: any) => {
            if (response.message === "Product added!") {
              this.fetchProducts();
              this.showForm = false;
            }
          },
          (error: any) => {
            console.error('Error while adding product:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  editProduct(product: any): void {
    this.showForm = true;
    this.isEditing = true;
    this.formData = { ...product };
  }

  deleteProduct(product: any): void {
    this.productService.deleteProduct(product.productId).subscribe(() => {
      this.products = this.products.filter(p => p.productId !== product.productId);
    });
  }

  cancel(): void {
    this.showForm = false;
    this.isEditing = false;
  }
}
