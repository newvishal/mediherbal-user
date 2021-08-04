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
import { CartService } from 'src/app/Pages/cart/service/cart.service';
import { UserDataService } from 'src/app/shared/service/userData.service';

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
    private homeService: HomeService,
    private cartService: CartService,
    private userDataService: UserDataService
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
    this.homeService.editProductToCart(data).subscribe((response) => {
      if (!this.products[index].addToCart) {
        this.products[index].addToCart = true;
        this.snackBar.showSnackBar('Item added to cart', 'success');
      }
      this.products[index].quantity = response.data.quantity;
    });
  }
  removeQuantity(index) {
    if (this.products[index].quantity > 0) {
      const data = {
        product_id: this.products[index]._id,
        quantity: -1,
      };
      this.homeService.editProductToCart(data).subscribe((response) => {
        if (response.data) {
          this.products[index].quantity = response.data.quantity;
        } else {
          this.products[index].quantity = 0;
          this.products[index].addToCart = false;
          this.snackBar.showSnackBar('Item removed from cart', 'danger');
        }
      });
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
    if (this.userDataService.getUserData()) {
      this.cartService.getCartDetail().subscribe((cart) => {
        cart.data.map((item) => {
          if (item.product_type === 'product') {
            this.products.map((product, index) => {
              if (product._id === item.product_id._id) {
                this.products[index] = {
                  ...this.products[index],
                  quantity: item.quantity,
                  addToCart: true,
                };
              }
            });
          }
        });
      });
    }
  }
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/single/${id}`]);
  }
}
