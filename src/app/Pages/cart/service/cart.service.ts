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
          let cartData = {
            productList: [],
            totalAmount: {},
          };
          let updatedCartDetails: any[] = [];
          let AmountDetails = {
            TotalPrice: 0,
            TotalMRP: 0,
          };
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
                      cartDetails.product_data.product_type.map(
                        (dataResponse) => {
                          if (
                            dataResponse.product_id ===
                            cartDetails.cartData.selected_product_id
                          ) {
                            AmountDetails.TotalPrice =
                              AmountDetails.TotalPrice +
                              dataResponse.price *
                                cartDetails.cartData.quantity;
                            AmountDetails.TotalMRP =
                              AmountDetails.TotalMRP +
                              dataResponse.fake_price *
                                cartDetails.cartData.quantity;
                          }
                        }
                      );
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
                      AmountDetails.TotalPrice =
                        AmountDetails.TotalPrice +
                        cartDetails.product_data.price *
                          cartDetails.cartData.quantity;
                      AmountDetails.TotalMRP =
                        AmountDetails.TotalMRP +
                        cartDetails.product_data.fake_price *
                          cartDetails.cartData.quantity;

                      updatedCartDetails.push({
                        ...cartDetails,
                      });
                    })
                  )
                  .subscribe();
              }
            });
          }
          cartData.productList = updatedCartDetails;
          cartData.totalAmount = AmountDetails;
          return cartData;
        }),
        map((cartDeatils) => {
          const finalData = cartDeatils;
          this.CartDeatilsSubject.next(finalData);
        })
      )
      .subscribe();
  }
}
