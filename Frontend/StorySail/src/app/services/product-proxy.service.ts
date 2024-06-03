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

  updateProductInfo(product: IProductModelAngular): Observable<IProductModelAngular> {
    return this.http.put<IProductModelAngular>(this.apiUrl + '/update', product);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`http://localhost:5000/search/products?query=${query}`);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, product);
  }

}
