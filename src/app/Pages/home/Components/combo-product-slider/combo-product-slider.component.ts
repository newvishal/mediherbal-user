import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/user.interface';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { HomeService } from '../../service/home.service';
import { CartService } from 'src/app/Pages/cart/service/cart.service';
import { UserDataService } from 'src/app/shared/service/userData.service';

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
    private snackBar: SnakbarService,
    private homeService: HomeService,
    private cartService: CartService,
    private userDataService: UserDataService
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
          this.snackBar.showSnackBar('Item added to cart', 'success');
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
          if (response.data) {
            this.products[index].quantity = response.data.quantity;
          } else {
            this.products[index].quantity = 0;
            this.products[index].addToCart = false;
            this.snackBar.showSnackBar('Item removed from cart', 'danger');
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

    if (this.userDataService.getUserData()) {
      this.cartService.getCartDetail().subscribe((cart) => {
        cart.data.map((item) => {
          if (item.product_type === 'combo-product') {
            this.products.map((product, index) => {
              if (product._id === item.combo_product_id._id) {
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
    this.router.navigate([`/product-detail/combo/${id}`]);
  }
}
