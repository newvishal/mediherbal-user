import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as fromHomeAction from '../store/home.action';
@Injectable()
export class HomeService {
  constructor(private store: Store<fromApp.AppState>) {}
  fetchProducts() {
    this.store.dispatch(new fromHomeAction.FetchProductStart());
  }
  fetchComboProducts() {
    this.store.dispatch(new fromHomeAction.FetchComboProductStart());
  }
}
