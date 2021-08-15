import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { ProductService } from '../../Service/product.service';
import { HomeService } from 'src/app/Pages/home/service/home.service';
import { CartService } from 'src/app/Pages/cart/service/cart.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private snackBar: SnakbarService,
    private cartService: CartService,
    private userDataService: UserDataService,
    private loader: LoaderService
  ) {}
  interviewAdded = false;
  ProductData;
  data;
  showImage;
  imageShown;
  productType;
  userData;
  ngOnInit(): void {
    this.getData();
    this.productService.refreshData.subscribe((res) => {
      this.getData();
    });
  }
  getData() {
    this.loader.openDialog();
    this.activatedRoute.params.subscribe((res) => {
      if (res.type === 'single') {
        this.productType = 'single';
        this.homeService.getProductsById(res.id).subscribe(
          (products) => {
            this.ProductData = products.data;

            this.ProductData = {
              ...this.ProductData,
              quantity: 0,
              addToCart: false,
              products_images: this.ProductData.product_images,
            };

            this.checkReview();
            if (this.userDataService.getUserData()) {
              this.cartService.getCartDetail().subscribe((cart) => {
                cart.data.map((item) => {
                  if (item.product_type === 'product') {
                    if (this.ProductData._id === item.product_id._id) {
                      this.ProductData = {
                        ...this.ProductData,
                        quantity: item.quantity,
                        addToCart: true,
                      };
                    }
                  }
                });
              });
            }
            this.imageShown = this.ProductData.products_images[0];
            this.loader.closeDialog();
          },
          (err) => {
            this.snackBar.showSnackBar(err.error.message, 'danger');
            this.loader.closeDialog();
          }
        );
      }

      if (res.type === 'combo') {
        this.productType = 'combo';
        this.homeService.getComboProductsById(res.id).subscribe(
          (comboProduct) => {
            this.ProductData = comboProduct.data;
            this.ProductData = {
              ...this.ProductData,
              quantity: 0,
              addToCart: false,
            };
            this.checkReview();
            if (this.userDataService.getUserData()) {
              this.cartService.getCartDetail().subscribe((cart) => {
                cart.data.map((item) => {
                  if (item.product_type === 'combo-product') {
                    if (this.ProductData._id === item.combo_product_id._id) {
                      this.ProductData = {
                        ...this.ProductData,
                        quantity: item.quantity,
                        addToCart: true,
                      };
                    }
                  }
                });
              });
            }
            this.imageShown = this.ProductData.products_images[0];
            this.loader.closeDialog();
          },
          (err) => {
            this.snackBar.showSnackBar(err.error.message, 'danger');
            this.loader.closeDialog();
          }
        );
      }
    });
  }
  checkReview() {
    if (this.userDataService.getUserData()) {
      this.ProductData.reviews.map((review) => {
        if (review.user_id._id === this.userDataService.getUserData()._id) {
          this.interviewAdded = true;
        }
      });
    }
  }
  changeImage(link) {
    this.imageShown = link;
  }
  addToCart() {
    if (this.productType === 'single') {
      const data = {
        product_id: this.ProductData._id,
        quantity: 1,
      };
      this.homeService.editProductToCart(data).subscribe(
        (response) => {
          if (!this.ProductData.addToCart) {
            this.ProductData.addToCart = true;

            this.snackBar.showSnackBar('Item added to cart', 'success');
          }
          this.ProductData.quantity = response.data.quantity;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    } else if (this.productType === 'combo') {
      const data = {
        combo_product_id: this.ProductData._id,
        quantity: 1,
      };
      this.homeService.editComboProductToCart(data).subscribe(
        (response) => {
          if (!this.ProductData.addToCart) {
            this.ProductData.addToCart = true;
            this.snackBar.showSnackBar('Item added to cart', 'success');
          }
          this.ProductData.quantity = response.data.quantity;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
  }
  removeQuantity() {
    if (this.productType === 'single') {
      if (this.ProductData.quantity > 0) {
        const data = {
          product_id: this.ProductData._id,
          quantity: -1,
        };
        this.homeService.editProductToCart(data).subscribe(
          (response) => {
            if (response.data) {
              this.ProductData.quantity = response.data.quantity;
            } else {
              this.ProductData.quantity = 0;
              this.ProductData.addToCart = false;
              this.snackBar.showSnackBar('Item removed from cart', 'danger');
            }
          },
          (err) => {
            console.log(err.error.message);
          }
        );
      } else {
        this.ProductData.addToCart = false;
        this.ProductData.quantity = 0;
      }
    } else if (this.productType === 'combo') {
      if (this.ProductData.quantity > 0) {
        const data = {
          combo_product_id: this.ProductData._id,
          quantity: -1,
        };
        this.homeService.editComboProductToCart(data).subscribe(
          (response) => {
            if (response.data) {
              this.ProductData.quantity = response.data.quantity;
            } else {
              this.ProductData.addToCart = false;
              this.ProductData.quantity = 0;
              this.snackBar.showSnackBar('Item removed from cart', 'danger');
            }
          },
          (err) => {
            console.log(err.error.message);
          }
        );
      } else {
        this.ProductData.addToCart = false;
        this.ProductData.quantity = 0;
      }
    }
  }
  updateUrl(event) {
    this.imageShown = 'https://i.stack.imgur.com/y9DpT.jpg';
  }
  updateArrayUrl(event, index) {
    this.ProductData.products_images[index] =
      'https://i.stack.imgur.com/y9DpT.jpg';
  }
}
