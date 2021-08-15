import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}
  editProfileDetail(data) {
    return this.http.patch<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user`,
      data
    );
  }
  getProfileDetail(id) {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user/${id}`
    );
  }
}
