import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  addProductReview(data, id) {
    return this.http.post<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}reviews/product/${id}`,
      data
    );
  }
  addComboProductReview(data, id) {
    return this.http.post<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}reviews/combo-product/${id}`,
      data
    );
  }
  deleteReview(id) {
    return this.http.delete<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}reviews/${id}`
    );
  }
  refreshData = new EventEmitter();
}
