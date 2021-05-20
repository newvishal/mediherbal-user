import * as fromHomeActions from '../store/home.action';
import * as fromApp from '../../../store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
@Injectable()
export class HomeEffects {
  constructor(
    private action$: Actions,
    private angularFireStore: AngularFirestore
  ) {}
  @Effect({ dispatch: true })
  FetchProducts = this.action$.pipe(
    ofType(fromHomeActions.FETCH_PRODUCT_START),
    switchMap((productState: fromHomeActions.FetchProductStart) => {
      return this.angularFireStore
        .collection('products')
        .snapshotChanges()
        .pipe(
          map((products) =>
            products.map((product) => {
              const data = product.payload.doc.data() as any;
              const id = product.payload.doc.id;
              return { id: id, ...data };
            })
          )
        );
    }),
    map((products) => {
      return new fromHomeActions.FetchProductSuccess(products);
    }),
    catchError((e) => {
      return of({ type: 'Error' });
    })
  );
  @Effect({
    dispatch: true,
  })
  fetchComboProducts = this.action$.pipe(
    ofType(fromHomeActions.FETCH_COMBO_PRODUCT_START),
    switchMap((procutsState) => {
      return this.angularFireStore
        .collection('combo-products')
        .snapshotChanges()
        .pipe(
          map((combo_products) =>
            combo_products.map((combo_product) => {
              const data = combo_product.payload.doc.data() as any;
              const id = combo_product.payload.doc.id;
              return { id: id, ...data };
            })
          )
        );
    }),
    map((combo_products) => {
      return new fromHomeActions.FetchComboProductSuccess(combo_products);
    }),
    catchError((e) => {
      return of({ type: 'Error' });
    })
  );
}
