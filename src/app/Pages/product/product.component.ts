import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromAuthSectionActions from '../../auth/store/Auth.Actions';
import { ProductInterface } from '../Interface/product.interface';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { HomeService } from '../home/service/home.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private homeService: HomeService,
    private snackBar: SnakbarService
  ) {}
  productType;
  ProductList;
  data;
  userData;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res.type === 'single') {
        this.productType = 'single';
        this.homeService.getProducts().subscribe(
          (products) => {
            this.ProductList = products.data;
          },
          (err) => {
            this.snackBar.showSnackBar(err.error.message, 'danger');
          }
        );
      }

      if (res.type === 'combo') {
        this.productType = 'combo';
        this.homeService.getComboProducts().subscribe(
          (comboProduct) => {
            this.ProductList = comboProduct.data;
          },
          (err) => {
            this.snackBar.showSnackBar(err.error.message, 'danger');
          }
        );
      }
    });

    /*   this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),

        tap((userData) => {
          this.userData = userData;
        })
      )
      .subscribe();
    this.activatedRoute.params.subscribe((res) => {
      if (res.type === 'single') {
        this.productType = 'single';
        this.store
          .select('HomeSection')
          .pipe(
            take(1),
            pluck('products'),
            tap((products: any) => {
              this.ProductList = [];
              console.log(products);
              products.map((product, index) => {
                const cartElementIndex = this.userData.cart.findIndex(
                  (cartDetail) =>
                    cartDetail.product_id === product.id &&
                    cartDetail.selected_product_id ===
                      product.product_type[0].product_id
                );

                if (cartElementIndex >= 0) {
                  this.ProductList[index] = {
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
                  this.ProductList[index] = {
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
            tap((comboProduct) => {
              this.ProductList = comboProduct;
              let products = comboProduct;

              this.data = [];
              products.map((product, index) => {
                const cartElementIndex = this.userData.cart.findIndex(
                  (cartDetail) => cartDetail.product_id === product.id
                );

                if (cartElementIndex >= 0) {
                  this.data[index] = {
                    ...product,
                    addToCart: true,
                    products: [],
                    quantity: this.userData.cart[cartElementIndex].quantity,
                  };
                } else if (cartElementIndex < 0) {
                  this.data[index] = {
                    ...product,
                    addToCart: false,
                    products: [],
                    quantity: 0,
                  };
                }
              });
              this.ProductList.map((res, index) => {
                if (res.products) {
                  res.products.map((productType, i) => {
                    this.store
                      .select('HomeSection')
                      .pipe(
                        take(1),
                        pluck('products'),
                        map((products) => {
                          return products.filter(
                            (product) => product.id === productType.id
                          );
                        }),
                        tap((product: any) => {
                          product[0].product_type.map((type, i) => {
                            if (type.product_id === productType.product_id) {
                              this.data[index].products[i] = {
                                ...this.ProductList[index].products[i],
                                product_name: res.product_name,
                                product_type: type.name,
                                price: type.price,
                              };
                            }
                          });
                        })
                      )
                      .subscribe((res) => {});
                  });
                }
              });
              this.ProductList = [];
              this.ProductList = this.data;
            })
          )
          .subscribe((res) => {});
      }
    });
    console.log(this.ProductList); */
  }
  addToCart(index) {
    if (this.productType === 'combo') {
      let cartItems: any[] = [];
      cartItems = [...this.userData.cart];
      if (this.ProductList[index].quantity == 0) {
        this.ProductList[index].addToCart = true;
      }
      this.ProductList[index].quantity = this.ProductList[index].quantity + 1;

      if (cartItems.length == 0) {
        const data = {
          product_id: this.ProductList[index].id,
          quantity: this.ProductList[index].quantity,
          product_type: 'comboProduct',
        };

        cartItems.push({ ...data });

        this.userData = { ...this.userData, cart: [...cartItems] };

        this.chnageCartDeatils();
      } else {
        let elementPresent = cartItems.findIndex(
          (item, itemIndex) => item.product_id === this.ProductList[index].id
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
            product_id: this.ProductList[index].id,

            quantity: this.ProductList[index].quantity,
            product_type: 'comboProduct',
          };

          cartItems.push({ ...data });
          this.userData = { ...this.userData, cart: [...cartItems] };

          this.chnageCartDeatils();
        }
      }
    } else if (this.productType === 'single') {
      if (this.ProductList[index].quantity == 0) {
        this.ProductList[index].addToCart = true;
      }
      this.ProductList[index].quantity = this.ProductList[index].quantity + 1;
      let cartItems: any[] = [];
      cartItems = [...this.userData.cart];
      if (cartItems.length == 0) {
        const data = {
          product_id: this.ProductList[index].id,
          selected_product_id:
            this.ProductList[index].selectedOption.product_id,
          quantity: this.ProductList[index].quantity,
          product_type: 'products',
        };

        cartItems.push(data);
        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
      } else {
        let elementPresent = cartItems.findIndex(
          (item, itemIndex) =>
            item.product_id === this.ProductList[index].id &&
            item.selected_product_id ===
              this.ProductList[index].selectedOption.product_id
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
            product_id: this.ProductList[index].id,
            selected_product_id:
              this.ProductList[index].selectedOption.product_id,
            quantity: this.ProductList[index].quantity,
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
        (item) => item.product_id === this.ProductList[index].id
      );

      if (this.ProductList[index].quantity > 1) {
        this.ProductList[index].quantity = this.ProductList[index].quantity - 1;
        cartItems[selectedItemIndex] = {
          ...cartItems[selectedItemIndex],
          quantity: +cartItems[selectedItemIndex].quantity - 1,
        };

        this.userData = { ...this.userData, cart: cartItems };
        this.chnageCartDeatils();
      } else {
        this.ProductList[index].quantity = 0;
        this.ProductList[index].addToCart = false;
        cartItems.splice(selectedItemIndex, 1);

        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
      }
    } else if (this.productType === 'single') {
      let cartItems = [...this.userData.cart];
      const selectedItemIndex = cartItems.findIndex(
        (item) =>
          item.product_id === this.ProductList[index].id &&
          item.selected_product_id ===
            this.ProductList[index].selectedOption.product_id
      );

      if (this.ProductList[index].quantity > 1) {
        this.ProductList[index].quantity = this.ProductList[index].quantity - 1;
        cartItems[selectedItemIndex] = {
          ...cartItems[selectedItemIndex],
          quantity: +cartItems[selectedItemIndex].quantity - 1,
        };

        this.userData = { ...this.userData, cart: cartItems };
        this.chnageCartDeatils();
      } else {
        console.log(this.ProductList[index]);

        this.ProductList[index].quantity = 0;
        this.ProductList[index].addToCart = false;
        cartItems.splice(selectedItemIndex, 1);

        this.userData = { ...this.userData, cart: cartItems };

        this.chnageCartDeatils();
      }
    }
    this.snackBar.showSnackBar('Item removed from cart', 'danger');
  }
  changeTag1(evt, index) {
    this.ProductList[index].product_type.map((res) => {
      if (res.product_id === evt) {
        this.ProductList[index].selectedOption = {
          price: res.price,
          fake_price: res.fake_price,
          product_id: res.product_id,
        };
      }
    });

    this.ProductList.map((product, index) => {
      const cartElementIndex = this.userData.cart.findIndex(
        (cartDetail) =>
          cartDetail.product_id === this.ProductList[index].id &&
          cartDetail.selected_product_id === evt
      );
      if (cartElementIndex >= 0) {
        this.ProductList[index].addToCart = true;
        this.ProductList[index].quantity =
          this.userData.cart[cartElementIndex].quantity;
      } else if (cartElementIndex < 0) {
        this.ProductList[index].addToCart = false;
        this.ProductList[index].quantity = 0;
      }
    });
  }
  navigateToDeatils(id) {
    if (this.productType === 'single') {
      this.router.navigate([`/product-detail/single/${id}`]);
    } else if (this.productType === 'combo') {
      this.router.navigate([`/product-detail/combo/${id}`]);
    }
  }
}
