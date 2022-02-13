import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/enviroment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  apiURLUsers: string = environment.apiUrl + 'users';

  login(email : string, password: string) : Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/login`, {email,password})
  }
}
