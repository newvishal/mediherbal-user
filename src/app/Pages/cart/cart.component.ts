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
  cartData;
  AmountDetails = {
    Total: 0,
    TotalMRP: 0,
    DiscountMrp: 0,
  };
  ngOnInit(): void {
    this.cartSerice.fetchCart();
    this.cartSerice.CartDeatilsSubject.subscribe((cartDetails) => {
      this.cartData = cartDetails;
      console.log(cartDetails);
      if (cartDetails.length > 0) {
        console.log('Data');

        cartDetails.map((cart) => {
          console.log(cart);

          if (cart.cartData.product_type === 'products') {
            console.log('product');
            cart.product_data.product_type.map((productType) => {
              if (
                productType.product_id === cart.cartData.selected_product_id
              ) {
                this.AmountDetails.Total =
                  this.AmountDetails.Total +
                  productType.price * cart.cartData.quantity;
                console.log(productType.price * cart.cartData.quantity);
              }
            });
          }
          if (cart.cartData.product_type === 'comboProduct') {
            console.log('combo');

            this.AmountDetails.Total =
              this.AmountDetails.Total +
              cart.product_data.price * cart.cartData.quantity;
            console.log(cart.product_data.price * cart.cartData.quantity);
          }
        });
      }
      console.log(this.AmountDetails);
    });
  }
}
