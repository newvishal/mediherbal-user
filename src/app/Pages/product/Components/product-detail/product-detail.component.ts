import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private snackBar: SnakbarService
  ) {}
  ProductData;
  data;
  showImage;
  imageShown;
  productType;
  userData;
  ngOnInit(): void {
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),

        tap((userData) => {
          this.userData = userData;
        })
      )
      .subscribe();
    this.activatedRoute.params.subscribe((res) => {
      if (res.id) {
        if (res.type === 'single') {
          this.productType = 'single';
          this.store
            .select('HomeSection')
            .pipe(
              take(1),
              pluck('products'),
              map((products) => {
                return products.filter((product) => product.id === res.id);
              }),
              tap((product: any) => {
                const cartElementIndex = this.userData.cart.findIndex(
                  (cartDetail) =>
                    cartDetail.product_id === product[0].id &&
                    cartDetail.selected_product_id ===
                      product[0].product_type[0].product_id
                );

                if (cartElementIndex >= 0) {
                  this.ProductData = {
                    ...product[0],
                    addToCart: true,
                    quantity: this.userData.cart[cartElementIndex].quantity,
                    selectedOption: {
                      price: product[0].product_type[0].price,
                      fake_price: product[0].product_type[0].fake_price,
                      product_id: product[0].product_type[0].product_id,
                    },
                  };
                } else if (cartElementIndex < 0) {
                  this.ProductData = {
                    ...product[0],
                    addToCart: false,
                    quantity: 0,
                    selectedOption: {
                      price: product[0].product_type[0].price,
                      fake_price: product[0].product_type[0].fake_price,
                      product_id: product[0].product_type[0].product_id,
                    },
                  };
                }
                /*        this.ProductData = {
                  ...product[0],
                  quantity: 1,
                  selectedOption: {
                    price: product[0].product_type[0].price,
                    fake_price: product[0].product_type[0].fake_price,
                    product_id: product[0].product_type[0].product_id,
                  },
                }; */
                this.imageShown = this.ProductData.products_images[0];
              })
            )
            .subscribe((res) => {});
        }
        if (res.type === 'combo') {
          this.productType = 'combo';
          this.store
            .select('HomeSection')
            .pipe(
              take(1),
              pluck('comboProduct'),
              map((products) => {
                return products.filter((product) => product.id === res.id);
              }),
              tap((comboProduct) => {
                const cartElementIndex = this.userData.cart.findIndex(
                  (cartDetail) => cartDetail.product_id === comboProduct[0].id
                );

                if (cartElementIndex >= 0) {
                  this.ProductData = {
                    ...comboProduct[0],
                    addToCart: true,
                    products: [],
                    quantity: this.userData.cart[cartElementIndex].quantity,
                  };
                } else if (cartElementIndex < 0) {
                  this.ProductData = {
                    ...comboProduct[0],
                    addToCart: false,
                    products: [],
                    quantity: 0,
                  };
                }
                /*   this.ProductData = {
                  ...comboProduct[0],
                  quantity: 1,
                  products: [],
                }; */
                this.imageShown = this.ProductData.products_images[0];
                this.data = comboProduct[0];
                this.data.products.map((productList, index) => {
                  this.store
                    .select('HomeSection')
                    .pipe(
                      take(1),
                      pluck('products'),
                      map((products) => {
                        return products.filter(
                          (product) => product.id === productList.id
                        );
                      }),
                      tap((product: any) => {
                        product[0].product_type.map((type, i) => {
                          if (type.product_id === productList.product_id) {
                            this.ProductData.products[i] = {
                              ...this.data.products[i],
                              product_name: product[0].product_name,
                              product_type: type.name,
                              price: type.price,
                            };
                          }
                        });
                      })
                    )
                    .subscribe((res) => {});
                });
              })
            )
            .subscribe((res) => {});
        }
      }
    });
    console.log(this.ProductData);
  }
  changeImage(link) {
    this.imageShown = link;
  }
  addToCart(index) {
    if (this.productType === 'combo') {
      let cartItems: any[] = [];
      cartItems = [...this.userData.cart];
      console.log(this.ProductData);

      if (this.ProductData.quantity == 0) {
        this.ProductData.addToCart = true;
      }

      this.ProductData.quantity = this.ProductData.quantity + 1;

      if (cartItems.length == 0) {
        const data = {
          product_id: this.ProductData.id,
          quantity: this.ProductData.quantity,
          product_type: 'comboProduct',
        };

        cartItems.push({ ...data });

        this.userData = { ...this.userData, cart: [...cartItems] };

        this.chnageCartDeatils();
      } else {
        let elementPresent = cartItems.findIndex(
          (item, itemIndex) => item.product_id === this.ProductData.id
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
            product_id: this.ProductData.id,

            quantity: this.ProductData.quantity,
            product_type: 'comboProduct',
          };

          cartItems.push({ ...data });
          this.userData = { ...this.userData, cart: [...cartItems] };

          this.chnageCartDeatils();
        }
      }
    } else if (this.productType === 'single') {
      if (this.ProductData.quantity == 0) {
        this.ProductData.addToCart = true;
      }
      this.ProductData.quantity = this.ProductData.quantity + 1;
      let cartItems: any[] = [];
      cartItems = [...this.userData.cart];
      if (cartItems.length == 0) {
        const data = {
          product_id: this.ProductData.id,
          selected_product_id: this.ProductData.selectedOption.product_id,
          quantity: this.ProductData.quantity,
          product_type: 'products',
        };

        cartItems.push(data);
        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
      } else {
        let elementPresent = cartItems.findIndex(
          (item, itemIndex) =>
            item.product_id === this.ProductData.id &&
            item.selected_product_id ===
              this.ProductData.selectedOption.product_id
        );

        if (elementPresent >= 0) {
          cartItems[elementPresent] = {
            ...cartItems[elementPresent],
            quantity: cartItems[elementPresent].quantity + 1,
          };

          this.userData = { ...this.userData, cart: cartItems };

          this.chnageCartDeatils();
        } else if (elementPresent < 0) {
          const data = {
            product_id: this.ProductData.id,
            selected_product_id: this.ProductData.selectedOption.product_id,
            quantity: this.ProductData.quantity,
            product_type: 'products',
          };

          cartItems.push(data);
          this.userData = { ...this.userData, cart: cartItems };

          this.chnageCartDeatils();
        }
      }
    }
    this.snackBar.showSnackBar('Item added to cart', 'success');
  }
  chnageCartDeatils() {
    this.store.dispatch(
      new fromAuthSectionActions.ChangeUserCartDeatilsStart(this.userData)
    );
  }
  removeQuantity(index) {
    if (this.productType === 'combo') {
      let cartItems = [...this.userData.cart];
      const selectedItemIndex = cartItems.findIndex(
        (item) => item.product_id === this.ProductData.id
      );

      if (this.ProductData.quantity > 1) {
        this.ProductData.quantity = this.ProductData.quantity - 1;
        cartItems[selectedItemIndex] = {
          ...cartItems[selectedItemIndex],
          quantity: +cartItems[selectedItemIndex].quantity - 1,
        };

        this.userData = { ...this.userData, cart: cartItems };
        this.chnageCartDeatils();
      } else {
        this.ProductData.quantity = 0;
        this.ProductData.addToCart = false;
        cartItems.splice(selectedItemIndex, 1);

        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
      }
    } else if (this.productType === 'single') {
      let cartItems = [...this.userData.cart];
      const selectedItemIndex = cartItems.findIndex(
        (item) =>
          item.product_id === this.ProductData.id &&
          item.selected_product_id ===
            this.ProductData.selectedOption.product_id
      );

      if (this.ProductData.quantity > 1) {
        this.ProductData.quantity = this.ProductData.quantity - 1;
        cartItems[selectedItemIndex] = {
          ...cartItems[selectedItemIndex],
          quantity: +cartItems[selectedItemIndex].quantity - 1,
        };

        this.userData = { ...this.userData, cart: cartItems };
        this.chnageCartDeatils();
      } else {
        console.log(this.ProductData);

        this.ProductData.quantity = 0;
        this.ProductData.addToCart = false;
        cartItems.splice(selectedItemIndex, 1);

        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
      }
    }
    this.snackBar.showSnackBar('Item removed from cart', 'danger');
  }
  changeTag1(evt, index) {
    this.ProductData.product_type.map((res) => {
      if (res.product_id === evt) {
        this.ProductData.selectedOption = {
          price: res.price,
          fake_price: res.fake_price,
          product_id: res.product_id,
        };
      }
    });
    const cartElementIndex = this.userData.cart.findIndex(
      (cartDetail) =>
        cartDetail.product_id === this.ProductData.id &&
        cartDetail.selected_product_id === evt
    );
    if (cartElementIndex >= 0) {
      this.ProductData.addToCart = true;
      this.ProductData.quantity = this.userData.cart[cartElementIndex].quantity;
    } else if (cartElementIndex < 0) {
      this.ProductData.addToCart = false;
      this.ProductData.quantity = 0;
    }
  }
}
