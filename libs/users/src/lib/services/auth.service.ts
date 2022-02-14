import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/enviroment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService : LocalStorageService,
    private router: Router
    ) { }

  apiURLUsers: string = environment.apiUrl + 'users';

  login(email : string, password: string) : Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/login`, {email,password})
  }

  logout(){
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
    
  }
}
