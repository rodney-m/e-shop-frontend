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
  apiURLCategories: string = environment.apiUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURLCategories)
  }

  // getCategory(categoryId: string): Observable<Category>{
  //   return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`)
  // }

  // createCategory (category : Category) :Observable<Category>{
  //   return this.http.post<Category>(this.apiURLCategories, category)
  // }

  // updateCategory (category : Category) :Observable<Category>{
  //   return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category)
  // }

  // deleteCategory(categoryId : string) : Observable<Object>{
  //   return this.http.delete<Object>(`${this.apiURLCategories}/${categoryId}`)
  // }
  
}
