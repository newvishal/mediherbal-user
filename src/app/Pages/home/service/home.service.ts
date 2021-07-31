import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../../store/app.reducer';
import * as fromHomeAction from '../store/home.action';
@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}
  getProducts() {
    let params = new HttpParams();
    params = params.append('purchasable', 'true');
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}products/get-product`,
      {
        params: params,
      }
    );
  }
  getComboProducts() {
    let params = new HttpParams();
    params = params.append('purchasable', 'true');
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}combo-product`,
      {
        params: params,
      }
    );
  }
  getProductsById(id) {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}products/${id}`
    );
  }
  getComboProductsById(id) {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}combo-product/${id}`
    );
  }
  editProductToCart(data) {
    return this.http.patch<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}cart/product`,
      data
    );
  }
  editComboProductToCart(data) {
    return this.http.patch<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}cart/combo-product`,
      data
    );
  }
}
