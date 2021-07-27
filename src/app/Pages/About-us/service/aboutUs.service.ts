import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class AboutService {
  constructor(private http: HttpClient) {}
  getAboutUs() {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}about_us`
    );
  }
}
