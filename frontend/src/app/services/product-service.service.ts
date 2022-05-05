import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "http://localhost:3000/products"

  constructor(private httpClient: HttpClient) { }

  all(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiURL)
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post(this.apiURL, product)
  }
}
