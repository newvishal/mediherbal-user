import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, pluck, tap } from 'rxjs/operators';
import * as fromApp from '../../../app/store/app.reducer';
import { CartService } from './service/cart.service';
import * as fromCartAction from './store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartSerice: CartService) {}

  ngOnInit(): void {
    this.cartSerice.fetchCart();
    this.cartSerice.CartDeatilsSubject.subscribe((cartDetails) => {
      console.log(cartDetails);
    });
  }
}
