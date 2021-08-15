import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CheckoutService } from '../checkout/service/checkout.service';
import { HomeService } from '../home/service/home.service';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartSerice: CartService,
    private snackBar: SnakbarService,
    private homeService: HomeService,
    private router: Router,
    public dialog: MatDialog,
    private checkoutService: CheckoutService,
    private loader: LoaderService
  ) {}
  cartData = [];
  userData;
  AmountDetails = {
    TotalMRP: 0,
    TotalPrice: 0,
  };
  ngOnInit(): void {
    this.loader.openDialog();
    this.cartSerice.getCartDetail().subscribe(
      (cartDetails) => {
        this.cartData = cartDetails.data;
        this.calculateAmount();
        this.loader.closeDialog();
      },
      (err) => {
        this.loader.closeDialog();
      }
    );
  }
  calculateAmount() {
    this.AmountDetails = {
      TotalMRP: 0,
      TotalPrice: 0,
    };
    this.cartData.map((products, index) => {
      if (products.product_type === 'product') {
        this.AmountDetails.TotalMRP =
          this.AmountDetails.TotalMRP +
          products.quantity * products.product_id.fake_price;
        this.AmountDetails.TotalPrice =
          this.AmountDetails.TotalPrice +
          products.quantity * products.product_id.price;
        this.cartData[index] = {
          ...this.cartData[index],
          quantity: products.quantity,
          addToCart: true,
        };
      } else if (products.product_type === 'combo-product') {
        this.AmountDetails.TotalMRP =
          this.AmountDetails.TotalMRP +
          products.quantity * products.combo_product_id.fake_price;
        this.AmountDetails.TotalPrice =
          this.AmountDetails.TotalPrice +
          products.quantity * products.combo_product_id.price;
        this.cartData[index] = {
          ...this.cartData[index],
          quantity: products.quantity,
          addToCart: true,
        };
      }
    });
  }
  addComboToCart(index) {
    const data = {
      combo_product_id: this.cartData[index].combo_product_id._id,
      quantity: 1,
    };
    this.homeService.editComboProductToCart(data).subscribe(
      (response) => {
        this.cartData[index].quantity = response.data.quantity;
        this.calculateAmount();
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  removeComboQuantity(index) {
    if (this.cartData[index].quantity > 0) {
      const data = {
        combo_product_id: this.cartData[index].combo_product_id._id,
        quantity: -1,
      };
      this.homeService.editComboProductToCart(data).subscribe(
        (response) => {
          if (response.data) {
            this.cartData[index].quantity = response.data.quantity;
          } else {
            this.cartData.splice(index, 1);
            this.snackBar.showSnackBar('Item removed from cart', 'danger');
          }
          this.calculateAmount();
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
  }
  removeProductQuantity(index) {
    if (this.cartData[index].quantity > 0) {
      const data = {
        product_id: this.cartData[index].product_id._id,
        quantity: -1,
      };
      this.homeService.editProductToCart(data).subscribe(
        (response) => {
          if (response.data) {
            this.cartData[index].quantity = response.data.quantity;
          } else {
            this.cartData.splice(index, 1);
            this.snackBar.showSnackBar('Item removed from cart', 'danger');
          }
          this.calculateAmount();
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
  }
  addProductToCart(index) {
    const data = {
      product_id: this.cartData[index].product_id._id,
      quantity: 1,
    };
    this.homeService.editProductToCart(data).subscribe(
      (response) => {
        this.cartData[index].quantity = response.data.quantity;
        this.calculateAmount();
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  deleteProduct(index, id) {
    const dialogRef = this.dialog.open(RemoveItemConfirmation, {
      data: this.cartData[index],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartSerice.deleteProductFromCart(id).subscribe((response) => {
          this.cartData.splice(index, 1);
          this.calculateAmount();
          this.snackBar.showSnackBar('Item removed from cart', 'danger');
        });
      }
    });
  }
  navigateToDeatils(id, type) {
    this.router.navigate([`/product-detail/${type}/${id}`]);
  }
  navigateToCheckout() {
    this.router.navigate(['/home/checkout']);
  }
  updateImageCombo(event, index) {
    this.cartData[index].combo_product_id.products_images[0] =
      'https://i.stack.imgur.com/y9DpT.jpg';
  }
  updateImageProduct(event, index) {
    this.cartData[0].product_id.product_images[0] =
      'https://i.stack.imgur.com/y9DpT.jpg';
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'confirm-remove.html',
  styleUrls: ['./cart.component.scss'],
})
export class RemoveItemConfirmation {
  constructor(
    public dialogRef: MatDialogRef<RemoveItemConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
}
