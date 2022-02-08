/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from '@env/enviroment'
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts: string = environment.apiUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURLProducts)
  }

  getProduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
  }

  createProduct (productData : FormData) :Observable<Product>{
    return this.http.post<Product>(this.apiURLProducts, productData)
  }

  updateProduct (productData : FormData, productId : string) :Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData)
  }

  // deleteCategory(categoryId : string) : Observable<Object>{
  //   return this.http.delete<Object>(`${this.apiURLProducts}/${categoryId}`)
  // }
  
}
