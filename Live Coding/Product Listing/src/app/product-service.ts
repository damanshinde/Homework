import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'https://dummyjson.com/products';

  private readonly http = inject(HttpClient);

  getProducts() {
    return this.http.get<ProductsResponse>(this.apiUrl);
  }
}
