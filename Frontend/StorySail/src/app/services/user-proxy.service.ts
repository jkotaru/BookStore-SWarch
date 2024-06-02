import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserModelAngular } from '../models/IUserModelAngular';

@Injectable({
  providedIn: 'root'
})
export class UserProxyService {
  private apiUrl = 'http://localhost:5000';

  user: IUserModelAngular = {
    logInStatus: false,
    userId: '',
    userName: '',
    password: '',
    isAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  };

  constructor(private http: HttpClient) { }

  userLogin(username: string, password: string): Observable<any> {
    return this.http.post<IUserModelAngular>(`${this.apiUrl}/login`, { userName: username, password: password });
  }

  userRegister(userData: IUserModelAngular): Observable<IUserModelAngular> {
    return this.http.post<IUserModelAngular>(`${this.apiUrl}/register`, userData);
  }

  getUserProfile(userId: string): Observable<IUserModelAngular> {
    return this.http.get<IUserModelAngular>(`${this.apiUrl}/account/${userId}`);
  }

  updateUserInfo(user: IUserModelAngular): Observable<IUserModelAngular> {
    return this.http.put<IUserModelAngular>(this.apiUrl + '/account/update', user);
  }
}
