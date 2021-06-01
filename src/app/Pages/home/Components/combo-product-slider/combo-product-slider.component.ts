import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/user.interface';
import { Store } from '@ngrx/store';
import { pluck, take, tap } from 'rxjs/operators';
import * as fromApp from '../../../../store/app.reducer';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';

@Component({
  selector: 'app-combo-product-slider',
  templateUrl: './combo-product-slider.component.html',
  styleUrls: ['./combo-product-slider.component.scss'],
})
export class ComboProductSliderComponent implements OnInit {
  @Input() products = [];
  productsList = [];
  userData: User = null;
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}
  ngOnChanges(): void {}
  addToCart(index) {
    let cartItems: any[] = [];
    cartItems = [...this.userData.cart];
    if (this.productsList[index].quantity == 0) {
      this.productsList[index].addToCart = true;
    }
    this.productsList[index].quantity = this.productsList[index].quantity + 1;

    if (cartItems.length == 0) {
      const data = {
        product_id: this.productsList[index].id,

        quantity: this.productsList[index].quantity,
        product_type: 'comboProduct',
      };

      console.log(cartItems);
      cartItems.push({ ...data });
      console.log(cartItems);

      this.userData = { ...this.userData, cart: [...cartItems] };

      this.chnageCartDeatils();
    } else {
      let elementPresent = cartItems.findIndex(
        (item, itemIndex) => item.product_id === this.productsList[index].id
      );

      if (elementPresent >= 0) {
        cartItems[elementPresent] = {
          ...cartItems[elementPresent],
          quantity: cartItems[elementPresent].quantity + 1,
        };

        this.userData = { ...this.userData, cart: [...cartItems] };

        this.chnageCartDeatils();
      } else if (elementPresent < 0) {
        const data = {
          product_id: this.productsList[index].id,

          quantity: this.productsList[index].quantity,
          product_type: 'comboProduct',
        };

        cartItems.push({ ...data });
        this.userData = { ...this.userData, cart: [...cartItems] };

        this.chnageCartDeatils();
      }
    }
  }
  chnageCartDeatils() {
    console.log(this.userData);

    this.store.dispatch(
      new fromAuthSectionActions.ChangeUserCartDeatilsStart(this.userData)
    );
  }
  removeQuantity(index) {
    let cartItems = [...this.userData.cart];
    const selectedItemIndex = cartItems.findIndex(
      (item) => item.product_id === this.productsList[index].id
    );

    if (this.productsList[index].quantity > 1) {
      this.productsList[index].quantity = this.productsList[index].quantity - 1;
      cartItems[selectedItemIndex] = {
        ...cartItems[selectedItemIndex],
        quantity: +cartItems[selectedItemIndex].quantity - 1,
      };

      this.userData = { ...this.userData, cart: cartItems };
      this.chnageCartDeatils();
    } else {
      this.productsList[index].quantity = 0;
      this.productsList[index].addToCart = false;
      cartItems.splice(selectedItemIndex, 1);

      this.userData = { ...this.userData, cart: cartItems };

      this.chnageCartDeatils();
    }
    console.log(this.userData.cart);
  }
  ngOnInit(): void {
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),

        tap((userData) => {
          this.userData = userData;
          this.productsList = [];
          let products = this.products;
          products.map((product, index) => {
            const cartElementIndex = this.userData.cart.findIndex(
              (cartDetail) => cartDetail.product_id === product.id
            );

            if (cartElementIndex >= 0) {
              this.productsList[index] = {
                ...product,
                addToCart: true,
                quantity: this.userData.cart[cartElementIndex].quantity,
              };
            } else if (cartElementIndex < 0) {
              this.productsList[index] = {
                ...product,
                addToCart: false,
                quantity: 0,
              };
            }
          });
        })
      )
      .subscribe();
  }
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/combo/${id}`]);
  }
}
