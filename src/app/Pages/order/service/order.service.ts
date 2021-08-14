import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class OrderService {
  constructor(
    private store: Store<fromApp.AppState>,
    private angularFireStore: AngularFirestore,
    private http: HttpClient
  ) {}
  getUserOrder() {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}order`
    );
  }
  createOrder(data) {
    return this.http.post<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}order`,
      data
    );
  }
  cancelOrder(id) {
    return this.http.put<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}order/cancel-order/${id}`,
      {}
    );
  }
}
