import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class PolicyService {
  constructor(private http: HttpClient) {}
  getPrivacyPolicy() {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}privacy_policy`
    );
  }
  getTermsAndConditions() {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}terms_and_condition`
    );
  }
}
