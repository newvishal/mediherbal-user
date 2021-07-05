import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class OrderService {
  constructor(
    private store: Store<fromApp.AppState>,
    private angularFireStore: AngularFirestore
  ) {}
  getUserOrder() {
    return this.angularFireStore
      .collection('orders')
      .snapshotChanges()
      .pipe(
        take(1),
        map((products) =>
          products.map((product) => {
            const data = product.payload.doc.data() as any;
            return data;
          })
        )
      );
  }
}
