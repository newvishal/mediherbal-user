import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddAddressComponent } from '../user-address/components/add-address/add-address.component';
import { CheckoutService } from './service/checkout.service';
import * as fromApp from '../../store/app.reducer';
declare var Razorpay: any;
import * as fromAuthSectionActions from '../../auth/store/Auth.Actions';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CartService } from '../cart/service/cart.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private datePipe: DatePipe,
    private cartService: CartService,
    private UserDataService: UserDataService,
    private snackbar: SnakbarService
  ) {}
  userAddress: any[] = [];
  userCart;
  cartData = [];
  selectedAddress;
  userAddressSubscription: Subscription;
  razorpayResponse;
  showModal = false;
  userData;
  UserDataSubscription: Subscription;
  RAZORPAY_OPTIONS = {
    key: 'rzp_test_B2nHBKAHakk7vV',
    amount: '',
    name: 'Mediherbal',
    order_id: '',
    description: 'Pay for your order',
    image: '/assets/Images/Logo/onlyLogo.jpg',
    prefill: {
      name: '', //user'sname,
      email: 'test@test.com', //user's email ,
      contact: '',
      method: '',
    },
    modal: {},
    theme: {
      color: '#51F079',
    },
  };
  AmountDetails = {
    TotalMRP: 0,
    TotalPrice: 0,
  };
  ngOnInit(): void {
    this.cartService.getCartDetail().subscribe((cartDetails) => {
      if (cartDetails.data.length > 0) {
        this.cartData = cartDetails.data;
        this.calculateAmount();
        this.userCart = {
          cartData: this.cartData,
          amountDetail: this.AmountDetails,
        };
      } else {
        this.router.navigate(['/home/cart']);
      }
    });
    this.UserDataService.UserData.subscribe((userData) => {
      this.userData = userData;

      this.RAZORPAY_OPTIONS.prefill.email = this.userData.email;
      this.RAZORPAY_OPTIONS.prefill.contact = this.userData.phone_number;
      this.RAZORPAY_OPTIONS.prefill.name =
        this.userData.first_name + ' ' + this.userData.last_name;
    });

    this.checkoutService.getUsersAddress().subscribe(
      (userAddress) => {
        this.userAddress = userAddress.data;
        if (userAddress.data.length > 0) {
          this.selectedAddress = userAddress.data[0]._id;
        }
      },
      (err) => {
        if (err.error.err.message === 'Address not Found') {
          this.userAddress = [];
        }
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
  addAddress() {
    this.dialog.open(AddAddressComponent);
  }
  clickToPay() {
    /*  this.RAZORPAY_OPTIONS.amount = 100 + '00'; */
    this.RAZORPAY_OPTIONS.amount = this.userCart.amountDetail.TotalPrice + '00';
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    this.razorpayResponse = `Razorpay Response`;
    const data = {
      paymentId: response.razorpay_payment_id,
      total_price: this.userCart.amountDetail.TotalPrice,
      address: this.selectedAddress,
    };
    this.cd.detectChanges();
    this.checkoutService.placeOrder(data).subscribe(
      (order) => {
        this.snackbar.showSnackBar('Order created successfully !!', 'success');
        this.showModal = true;
        this.router.navigate(['/home/order'], { replaceUrl: true });
      },
      (err) => {
        this.snackbar.showSnackBar('Place order unsuccessfull', 'danger');
      }
    );
  }
  changeSelectedUserAddress(event) {
    this.selectedAddress = event.value;
  }

  updateImageCombo(event, index) {
    this.userCart.cartData[index].combo_product_id.products_images[0] =
      'https://i.stack.imgur.com/y9DpT.jpg';
  }
  updateImageProduct(event, index) {
    this.userCart.cartData[index].product_id.product_images[0] =
      'https://i.stack.imgur.com/y9DpT.jpg';
  }
}
