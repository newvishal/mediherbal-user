import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, pluck, tap } from 'rxjs/operators';
import * as fromApp from '../../../app/store/app.reducer';
import * as fromCartAction from './store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromCartAction.FetchCartStart());
  }
}
