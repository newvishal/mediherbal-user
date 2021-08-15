import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromAuthSectionActions from '../../auth/store/Auth.Actions';
import { ProductInterface } from '../Interface/product.interface';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { HomeService } from '../home/service/home.service';
import { CartService } from '../cart/service/cart.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
import { LoaderService } from 'src/app/shared/service/loader.service';

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
    private snackBar: SnakbarService,
    private cartService: CartService,
    private userDataService: UserDataService,
    private loader: LoaderService
  ) {}
  productType;
  ProductList;
  data;
  userData;
  ngOnInit(): void {
    this.loader.openDialog();
    this.activatedRoute.params.subscribe((res) => {
      if (res.type === 'single') {
        this.productType = 'single';
        this.homeService.getProducts().subscribe(
          (products) => {
            this.ProductList = products.data;
            this.ProductList.map((product, index) => {
              this.ProductList[index] = {
                ...this.ProductList[index],
                quantity: 0,
                addToCart: false,
              };
            });

            if (this.userDataService.getUserData()) {
              this.cartService.getCartDetail().subscribe((cart) => {
                cart.data.map((item) => {
                  if (item.product_type === 'product') {
                    this.ProductList.map((product, index) => {
                      if (product._id === item.product_id._id) {
                        this.ProductList[index] = {
                          ...this.ProductList[index],
                          quantity: item.quantity,
                          addToCart: true,
                        };
                      }
                    });
                  }
                });
              });
            }
            this.loader.closeDialog();
          },
          (err) => {
            this.loader.closeDialog();
            this.snackBar.showSnackBar(err.error.message, 'danger');
          }
        );
      }

      if (res.type === 'combo') {
        this.productType = 'combo';
        this.homeService.getComboProducts().subscribe(
          (comboProduct) => {
            this.ProductList = comboProduct.data;
            this.ProductList.map((product, index) => {
              this.ProductList[index] = {
                ...this.ProductList[index],
                quantity: 0,
                addToCart: false,
              };
            });

            if (this.userDataService.getUserData()) {
              this.cartService.getCartDetail().subscribe((cart) => {
                cart.data.map((item) => {
                  if (item.product_type === 'combo-product') {
                    this.ProductList.map((product, index) => {
                      if (product._id === item.combo_product_id._id) {
                        this.ProductList[index] = {
                          ...this.ProductList[index],
                          quantity: item.quantity,
                          addToCart: true,
                        };
                      }
                    });
                  }
                });
              });
            }
            this.loader.closeDialog();
          },
          (err) => {
            this.loader.closeDialog();
            this.snackBar.showSnackBar(err.error.message, 'danger');
          }
        );
      }
    });
  }
  addToCart(index) {
    if (this.productType === 'single') {
      const data = {
        product_id: this.ProductList[index]._id,
        quantity: 1,
      };
      this.homeService.editProductToCart(data).subscribe(
        (response) => {
          if (!this.ProductList[index].addToCart) {
            this.ProductList[index].addToCart = true;
            this.snackBar.showSnackBar('Item added to cart', 'success');
          }
          this.ProductList[index].quantity = response.data.quantity;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    } else if (this.productType === 'combo') {
      const data = {
        combo_product_id: this.ProductList[index]._id,
        quantity: 1,
      };
      this.homeService.editComboProductToCart(data).subscribe(
        (response) => {
          if (!this.ProductList[index].addToCart) {
            this.ProductList[index].addToCart = true;
            this.snackBar.showSnackBar('Item added to cart', 'success');
          }
          this.ProductList[index].quantity = response.data.quantity;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
  }
  removeQuantity(index) {
    if (this.productType === 'single') {
      if (this.ProductList[index].quantity > 0) {
        const data = {
          product_id: this.ProductList[index]._id,
          quantity: -1,
        };
        this.homeService.editProductToCart(data).subscribe(
          (response) => {
            if (response.data) {
              this.ProductList[index].quantity = response.data.quantity;
            } else {
              this.ProductList[index].addToCart = false;
              this.ProductList[index].quantity = 0;
              this.snackBar.showSnackBar('Item removed from cart', 'danger');
            }
          },
          (err) => {
            console.log(err.error.message);
          }
        );
      } else {
        this.ProductList[index].addToCart = false;
        this.ProductList[index].quantity = 0;
      }
    } else if (this.productType === 'combo') {
      if (this.ProductList[index].quantity > 0) {
        const data = {
          combo_product_id: this.ProductList[index]._id,
          quantity: -1,
        };
        this.homeService.editComboProductToCart(data).subscribe(
          (response) => {
            if (response.data) {
              this.ProductList[index].quantity = response.data.quantity;
            } else {
              this.ProductList[index].quantity = 0;
              this.ProductList[index].addToCart = false;
              this.snackBar.showSnackBar('Item removed from cart', 'danger');
            }
          },
          (err) => {
            console.log(err.error.message);
          }
        );
      } else {
        this.ProductList[index].addToCart = false;
        this.ProductList[index].quantity = 0;
      }
    }
  }

  navigateToDeatils(id) {
    if (this.productType === 'single') {
      this.router.navigate([`/product-detail/single/${id}`]);
    } else if (this.productType === 'combo') {
      this.router.navigate([`/product-detail/combo/${id}`]);
    }
  }
}
