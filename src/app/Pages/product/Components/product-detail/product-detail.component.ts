import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { ProductService } from '../../Service/product.service';
import { HomeService } from 'src/app/Pages/home/service/home.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private homeService: HomeService,
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
            this.imageShown = this.ProductData.products_images[0];
          },
          (err) => {
            this.snackBar.showSnackBar(err.error.message, 'danger');
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

            this.imageShown = this.ProductData.products_images[0];
          },
          (err) => {
            this.snackBar.showSnackBar(err.error.message, 'danger');
          }
        );
      }
    });
  }
  changeImage(link) {
    this.imageShown = link;
  }
  addToCart() {
    if (this.productType === 'single') {
      this.ProductData.showLoader = true;
      const data = {
        product_id: this.ProductData._id,
        quantity: 1,
      };
      this.homeService.editProductToCart(data).subscribe(
        (response) => {
          if (!this.ProductData.addToCart) {
            this.ProductData.addToCart = true;
            this.ProductData.quantity = this.ProductData.quantity + 1;
          } else {
            this.ProductData.quantity = this.ProductData.quantity + 1;
          }
          this.ProductData.quantity = response.data.quantity;
          this.ProductData.showLoader = false;
        },
        (err) => {
          console.log(err.error.message);
          this.ProductData.showLoader = false;
        }
      );
    } else if (this.productType === 'combo') {
      this.ProductData.showLoader = true;
      const data = {
        combo_product_id: this.ProductData._id,
        quantity: 1,
      };
      this.homeService.editComboProductToCart(data).subscribe(
        (response) => {
          if (!this.ProductData.addToCart) {
            this.ProductData.addToCart = true;
            this.ProductData.quantity = this.ProductData.quantity + 1;
          } else {
            this.ProductData.quantity = this.ProductData.quantity + 1;
          }
          this.ProductData.quantity = response.data.quantity;
          this.ProductData.showLoader = false;
        },
        (err) => {
          console.log(err.error.message);
          this.ProductData.showLoader = false;
        }
      );
    }
  }
  removeQuantity() {
    if (this.productType === 'single') {
      if (this.ProductData.quantity > 0) {
        this.ProductData.showLoader = true;
        const data = {
          product_id: this.ProductData._id,
          quantity: -1,
        };
        this.homeService.editProductToCart(data).subscribe(
          (response) => {
            if (this.ProductData.quantity == 1) {
              this.ProductData.addToCart = false;
              this.ProductData.quantity = this.ProductData.quantity - 1;
            } else {
              this.ProductData.quantity = this.ProductData.quantity - 1;
            }
            if (response.data) {
              this.ProductData.quantity = response.data.quantity;
            } else {
              this.ProductData.quantity = 0;
            }
            this.ProductData.showLoader = false;
          },
          (err) => {
            console.log(err.error.message);
            this.ProductData.showLoader = false;
          }
        );
      } else {
        this.ProductData.addToCart = false;
        this.ProductData.quantity = 0;
      }
    } else if (this.productType === 'combo') {
      if (this.ProductData.quantity > 0) {
        this.ProductData.showLoader = true;
        const data = {
          combo_product_id: this.ProductData._id,
          quantity: -1,
        };
        this.homeService.editComboProductToCart(data).subscribe(
          (response) => {
            if (this.ProductData.quantity == 1) {
              this.ProductData.addToCart = false;
              this.ProductData.quantity = this.ProductData.quantity - 1;
            } else {
              this.ProductData.quantity = this.ProductData.quantity - 1;
            }
            if (response.data) {
              this.ProductData.quantity = response.data.quantity;
            } else {
              this.ProductData.quantity = 0;
            }
            this.ProductData.showLoader = false;
          },
          (err) => {
            console.log(err.error.message);
            this.ProductData.showLoader = false;
          }
        );
      } else {
        this.ProductData.addToCart = false;
        this.ProductData.quantity = 0;
      }
    }
  }
}
