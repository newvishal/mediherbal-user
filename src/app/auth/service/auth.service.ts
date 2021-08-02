import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthService {
  httpClient: HttpClient;
  constructor(private http: HttpClient, private httpbackEnd: HttpBackend) {
    this.httpClient = new HttpClient(httpbackEnd);
  }
  userSingup(UserData: User) {
    const finalData: User = {
      ...UserData,
      number_of_times_order_placed: 0,
      user_type: 'user',
    };
    return this.httpClient.post<{
      status: boolean;
      message: string;
      data: any;
    }>(`${environment.base_url}user/create-user`, finalData);
  }
  userLogin(loginData) {
    return this.httpClient.post<{
      status: boolean;
      message: string;
      data: any;
    }>(`${environment.base_url}user/login`, loginData);
  }
  userForgotPassword(data) {
    return this.httpClient.post<{
      status: boolean;
      message: string;
      data: any;
    }>(`${environment.base_url}user/forgot-password`, data);
  }
  changePassword(data, id) {
    return this.httpClient.post<{
      status: boolean;
      message: string;
      data: any;
    }>(`${environment.base_url}user/change-password/${id}`, data);
  }
}
