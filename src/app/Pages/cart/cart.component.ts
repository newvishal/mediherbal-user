import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromAuthSectionActions from '../../auth/store/Auth.Actions';
import { CartService } from './service/cart.service';
import * as fromCartAction from './store/cart.actions';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CheckoutService } from '../checkout/service/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartSerice: CartService,
    private snackBar: SnakbarService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    public dialog: MatDialog,
    private checkoutService: CheckoutService
  ) {}
  cartData;
  userData;
  CartDetails;
  AmountDetails;
  ngOnInit(): void {
    this.cartSerice.fetchCart();
    this.cartSerice.CartDeatilsSubject.subscribe((cartDetails) => {
      this.CartDetails = cartDetails;
      this.cartData = cartDetails.productList;
      this.AmountDetails = cartDetails.totalAmount;
    });
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),

        tap((userData) => {
          this.userData = userData;
        })
      )
      .subscribe();
  }
  chnageCartDeatils() {
    this.store.dispatch(
      new fromAuthSectionActions.ChangeUserCartDeatilsStart(this.userData)
    );
  }
  removeQuantity(index) {
    const dialogRef = this.dialog.open(RemoveItemConfirmation, {
      data: this.cartData[index],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let cartItems = [...this.userData.cart];
        cartItems.splice(index, 1);

        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
        this.snackBar.showSnackBar('Item removed from cart', 'danger-SnackBar');
      }
    });
  }
  navigateToDeatils(id, type) {
    if (type === 'products') {
      this.router.navigate([`/product-detail/single/${id}`]);
    } else if (type === 'comboProduct') {
      this.router.navigate([`/product-detail/combo/${id}`]);
    }
  }
  navigateToCheckout() {
    this.checkoutService.setUserCart(this.CartDetails);
    this.router.navigate(['/home/checkout']);
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'confirm-remove.html',
  styleUrls: ['./cart.component.scss'],
})
export class RemoveItemConfirmation {
  constructor(
    public dialogRef: MatDialogRef<RemoveItemConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(data);
  }
}
