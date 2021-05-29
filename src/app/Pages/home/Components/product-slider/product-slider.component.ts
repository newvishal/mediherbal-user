import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pluck, take, tap } from 'rxjs/operators';
import { User } from 'src/app/auth/interface/user.interface';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  @Input() products = [];
  productsList = [];
  userData: User = null;
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}
  ngOnChanges(): void {
    this.productsList = [];
    let products = this.products;
    products.map((res, index) => {
      this.productsList[index] = {
        ...res,
        addToCart: false,
        quantity: 0,
        selectedOption: {
          price: res.product_type[0].price,
          fake_price: res.product_type[0].fake_price,
          product_id: res.product_type[0].product_id,
        },
      };
    });
  }
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
      };

      cartItems.push(data);
      this.userData = { ...this.userData, cart: cartItems };
      console.log(this.userData);
    } else {
      cartItems.forEach((item, index) => {
        if (
          item.product_id === this.productsList[index].id &&
          item.selected_product_id ===
            this.productsList[index].selectedOption.product_id
        ) {
          cartItems[index].quantity = cartItems[index].quantity + 1;
          this.userData = { ...this.userData, cart: cartItems };
          console.log(this.userData);
        } else {
          const data = {
            product_id: this.productsList[index].id,
            selected_product_id:
              this.productsList[index].selectedOption.product_id,
            quantity: this.productsList[index].quantity,
          };

          cartItems.push(data);
          this.userData = { ...this.userData, cart: cartItems };
          console.log(this.userData);
        }
      });
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
    this.productsList[index].addToCart = false;
    this.productsList[index].quantity = 0;
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
        })
      )
      .subscribe();
  }
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/single/${id}`]);
  }
}
