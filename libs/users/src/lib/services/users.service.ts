import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/enviroment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib  from"i18n-iso-countries";

import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers: string = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiURLUsers)
  }

  getUser(userId: string): Observable<User>{
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`)
  }

  createUser (user : User) :Observable<User>{
    return this.http.post<User>(this.apiURLUsers, user)
  }

  updateUser (userData : User, userId : string) :Observable<User>{
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, userData)
  }

  deleteUser(userId : string) : Observable<User>{
    return this.http.delete<User>(`${this.apiURLUsers}/${userId}`)
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
