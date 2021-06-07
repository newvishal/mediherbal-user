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
    public dialog: MatDialog
  ) {}
  cartData;
  userData;
  AmountDetails = {
    Total: 0,
    TotalMRP: 0,
    DiscountMrp: 0,
  };
  ngOnInit(): void {
    this.cartSerice.fetchCart();
    this.cartSerice.CartDeatilsSubject.subscribe((cartDetails) => {
      this.cartData = cartDetails;
      console.log(this.cartData);

      if (cartDetails.length > 0) {
        cartDetails.map((cart) => {
          if (cart.cartData.product_type === 'products') {
            cart.product_data.product_type.map((productType) => {
              if (
                productType.product_id === cart.cartData.selected_product_id
              ) {
                this.AmountDetails.Total =
                  this.AmountDetails.Total +
                  productType.price * cart.cartData.quantity;
              }
            });
          }
          if (cart.cartData.product_type === 'comboProduct') {
            this.AmountDetails.Total =
              this.AmountDetails.Total +
              cart.product_data.price * cart.cartData.quantity;
          }
        });
      }
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
