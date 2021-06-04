import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromApp from '../../../../app/store/app.reducer';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private angularFireStore: AngularFirestore,
    private store: Store<fromApp.AppState>
  ) {}
  CartDeatilsSubject = new BehaviorSubject(null);
  fetchCart() {
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),
        pluck('cart'),
        map((userCart) => {
          let updatedCartDetails: any[] = [];
          if (userCart) {
            userCart.map((cartitem) => {
              if (cartitem.product_type === 'products') {
                this.angularFireStore
                  .collection('products')
                  .doc(cartitem.product_id)
                  .snapshotChanges()
                  .pipe(
                    take(1),
                    map((product) => {
                      let returnData;
                      const data = product.payload.data() as any;
                      const id = product.payload.id;
                      return (returnData = {
                        product_data: { ...data },
                        cartData: { ...cartitem },
                        product_id: id,
                      });
                    }),
                    map((cartDetails) => {
                      updatedCartDetails.push({
                        ...cartDetails,
                      });
                    })
                  )
                  .subscribe();
              }
              if (cartitem.product_type === 'comboProduct') {
                this.angularFireStore
                  .collection('combo-products')
                  .doc(cartitem.product_id)
                  .snapshotChanges()
                  .pipe(
                    take(1),
                    map((product) => {
                      let returnData;
                      const data = product.payload.data() as any;
                      const id = product.payload.id;
                      return (returnData = {
                        product_data: { ...data },
                        cartData: { ...cartitem },
                        product_id: id,
                      });
                    }),
                    map((cartDetails) => {
                      updatedCartDetails.push({
                        ...cartDetails,
                      });
                    })
                  )
                  .subscribe();
              }
            });
          }
          return updatedCartDetails;
        }),
        map((cartDeatils) => {
          const finalData = cartDeatils;
          this.CartDeatilsSubject.next(finalData);
        })
      )
      .subscribe();
  }
}
