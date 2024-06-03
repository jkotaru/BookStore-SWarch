import { ProductProxyService } from '../../services/product-proxy.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  products: any[] = [];
  query!: string;
  private querySub!: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductProxyService) {}

  ngOnInit() {
    
  }


}