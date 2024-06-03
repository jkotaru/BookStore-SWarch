import { ProductProxyService } from '../../services/product-proxy.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProductModelAngular } from '../../models/IProductModelAngular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  products: IProductModelAngular[] = [];
  loading: boolean = false;
  searchPerformed: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductProxyService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.search();
    });
  }

  search(): void {
    if (this.query) {
      this.loading = true;
      this.productService.searchProducts(this.query).subscribe(products => {
        this.products = products;
        this.loading = false;
        this.searchPerformed = true;
      });
    } else {
      this.products = [];
      this.searchPerformed = false;
    }
  }
}
