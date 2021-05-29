import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pluck, take, tap } from 'rxjs/operators';
import { User } from 'src/app/auth/interface/user.interface';
import * as fromApp from '../../../../store/app.reducer';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  @Input() products = [];
  productsList = [];
  selectedItemIdArray = [];
  userData: User = null;
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}
  ngOnChanges(): void {}
  addToCart(index) {
    if (this.productsList[index].quantity == 0) {
      this.productsList[index].addToCart = true;
    }
    this.productsList[index].quantity = this.productsList[index].quantity + 1;
    let cartItems: any[] = [];
    cartItems = [...this.userData.cart];
    if (cartItems.length == 0) {
      const data = {
        product_id: this.productsList[index].id,
        selected_product_id: this.productsList[index].selectedOption.product_id,
        quantity: this.productsList[index].quantity,
        product_type: 'products',
      };

      cartItems.push(data);
      this.userData = { ...this.userData, cart: cartItems };
      console.log(this.userData);
      this.chnageCartDeatils();
    } else {
      let elementPresent = cartItems.findIndex(
        (item, itemIndex) =>
          item.product_id === this.productsList[index].id &&
          item.selected_product_id ===
            this.productsList[index].selectedOption.product_id
      );
      console.log(elementPresent);
      console.log(cartItems[elementPresent]);

      if (elementPresent >= 0) {
        cartItems[elementPresent] = {
          ...cartItems[elementPresent],
          quantity: cartItems[elementPresent].quantity + 1,
        };

        this.userData = { ...this.userData, cart: cartItems };
        console.log(this.userData);
        this.chnageCartDeatils();
      } else if (elementPresent < 0) {
        const data = {
          product_id: this.productsList[index].id,
          selected_product_id:
            this.productsList[index].selectedOption.product_id,
          quantity: this.productsList[index].quantity,
          product_type: 'products',
        };

        cartItems.push(data);
        this.userData = { ...this.userData, cart: cartItems };
        console.log(this.userData);
        this.chnageCartDeatils();
      }
    }
  }
  removeQuantity(index) {
    if (this.productsList[index].quantity >= 1) {
      this.productsList[index].quantity = this.productsList[index].quantity - 1;
    }
    if (this.productsList[index].quantity == 0) {
      this.productsList[index].addToCart = false;
    }
  }

  changeTag1(evt, index) {
    this.productsList[index].product_type.map((res) => {
      if (res.product_id === evt) {
        this.productsList[index].selectedOption = {
          ...this.productsList[index].selectedOption,
          price: res.price,
          fake_price: res.fake_price,
          product_id: res.product_id,
        };
      }
    });
    this.productsList.map((product, index) => {
      const cartElementIndex = this.userData.cart.findIndex(
        (cartDetail) =>
          cartDetail.product_id === this.productsList[index].id &&
          cartDetail.selected_product_id === evt
      );
      if (cartElementIndex >= 0) {
        this.productsList[index].addToCart = true;
        this.productsList[index].quantity =
          this.userData.cart[cartElementIndex].quantity;
      } else if (cartElementIndex < 0) {
        this.productsList[index].addToCart = false;
        this.productsList[index].quantity = 0;
      }
    });
  }
  ngOnInit(): void {
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),
        take(1),
        tap((userData) => {
          this.userData = userData;
          console.log(this.userData);
          console.log(this.products);

          this.productsList = [];
          let products = this.products;
          products.map((product, index) => {
            const cartElementIndex = this.userData.cart.findIndex(
              (cartDetail) =>
                cartDetail.product_id === product.id &&
                cartDetail.selected_product_id ===
                  product.product_type[0].product_id
            );

            if (cartElementIndex >= 0) {
              this.productsList[index] = {
                ...product,
                addToCart: true,
                quantity: this.userData.cart[cartElementIndex].quantity,
                selectedOption: {
                  price: product.product_type[0].price,
                  fake_price: product.product_type[0].fake_price,
                  product_id: product.product_type[0].product_id,
                },
              };
            } else if (cartElementIndex < 0) {
              this.productsList[index] = {
                ...product,
                addToCart: false,
                quantity: 0,
                selectedOption: {
                  price: product.product_type[0].price,
                  fake_price: product.product_type[0].fake_price,
                  product_id: product.product_type[0].product_id,
                },
              };
            }
          });
          console.log(this.productsList);
        })
      )
      .subscribe();
  }
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/single/${id}`]);
  }
  chnageCartDeatils() {
    this.store.dispatch(
      new fromAuthSectionActions.ChangeUserCartDeatilsStart(this.userData)
    );
  }
}
