import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductModelAngular } from '../models/IProductModelAngular';

@Injectable({
  providedIn: 'root'
})
export class ProductProxyService {
  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProductModelAngular[]> {
    return this.http.get<IProductModelAngular[]>(this.apiUrl);
  }

  getProduct(productId: string): Observable<IProductModelAngular> {
    return this.http.get<IProductModelAngular>(`${this.apiUrl}/${productId}`);
  }

  getCategories(): Observable<IProductModelAngular[]> {
    return this.http.get<IProductModelAngular[]>(this.apiUrl+'/category');
  }

  getProductsByCategory(genre:string): Observable<IProductModelAngular[]> {
    return this.http.get<IProductModelAngular[]>(`${this.apiUrl}/category/${genre}`);
  }


}
