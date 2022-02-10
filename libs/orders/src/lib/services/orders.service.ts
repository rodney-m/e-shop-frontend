/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Order } from '../models/order';
import { Observable } from 'rxjs';

import { environment } from '@env/enviroment'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders: string = environment.apiUrl + 'orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  getOrder(orderId: string): Observable<Order>{
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  createOrder (order : Order) :Observable<Order>{
    return this.http.post<Order>(this.apiURLOrders, order)
  }

  updateOrder (order : Order) :Observable<Order>{
    return this.http.put<Order>(`${this.apiURLOrders}/${order.id}`, order)
  }

  deleteOrder(orderId : string) : Observable<Object>{
    return this.http.delete<Object>(`${this.apiURLOrders}/${orderId}`)
  }
  
}
