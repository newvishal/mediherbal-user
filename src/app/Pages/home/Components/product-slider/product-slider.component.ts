import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import { User } from 'src/app/auth/interface/user.interface';
import * as fromApp from '../../../../store/app.reducer';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { ProductService } from 'src/app/Pages/product/Service/product.service';
import { HomeService } from '../../service/home.service';

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
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private snackBar: SnakbarService,
    private homeService: HomeService
  ) {}
  ngOnChanges(): void {}

  /*

  this method is responsible for adding item from Cart

  */
  addToCart(index) {
    const data = {
      product_id: this.products[index]._id,
      quantity: 1,
    };
    this.homeService.editProductToCart(data).subscribe(
      (response) => {
        if (!this.products[index].addToCart) {
          this.products[index].addToCart = true;
          this.products[index].quantity = this.products[index].quantity + 1;
        } else {
          this.products[index].quantity = this.products[index].quantity + 1;
        }
        this.products[index].quantity = response.data.quantity;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  removeQuantity(index) {
    if (this.products[index].quantity > 0) {
      const data = {
        product_id: this.products[index]._id,
        quantity: -1,
      };
      this.homeService.editProductToCart(data).subscribe(
        (response) => {
          if (this.products[index].quantity == 1) {
            this.products[index].addToCart = false;
            this.products[index].quantity = this.products[index].quantity - 1;
          } else {
            this.products[index].quantity = this.products[index].quantity - 1;
          }
          if (response.data) {
            this.products[index].quantity = response.data.quantity;
          } else {
            this.products[index].quantity = 0;
          }
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    } else {
      this.products[index].addToCart = false;
      this.products[index].quantity = 0;
    }
  }

  ngOnInit(): void {
    this.products.map((product, index) => {
      this.products[index] = {
        ...this.products[index],
        quantity: 0,
        addToCart: false,
      };
    });
  }
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/single/${id}`]);
  }
}
