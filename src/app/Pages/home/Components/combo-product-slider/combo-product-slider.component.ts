import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/user.interface';
import { Store } from '@ngrx/store';
import { pluck, take, tap } from 'rxjs/operators';
import * as fromApp from '../../../../store/app.reducer';
import * as fromAuthSectionActions from '../../../../auth/store/Auth.Actions';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-combo-product-slider',
  templateUrl: './combo-product-slider.component.html',
  styleUrls: ['./combo-product-slider.component.scss'],
})
export class ComboProductSliderComponent implements OnInit {
  @Input() products = [];
  productsList = [];
  userData: User = null;
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private snackBar: SnakbarService,
    private homeService: HomeService
  ) {}
  ngOnChanges(): void {}
  addToCart(index) {
    const data = {
      combo_product_id: this.products[index]._id,
      quantity: 1,
    };
    this.homeService.editComboProductToCart(data).subscribe(
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
        combo_product_id: this.products[index]._id,
        quantity: -1,
      };
      this.homeService.editComboProductToCart(data).subscribe(
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
    this.router.navigate([`/product-detail/combo/${id}`]);
  }
}
