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
    private UserDataService: UserDataService
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
    this.UserDataService.UserData.subscribe((userData) => {
      console.log(userData);
      this.userData = userData;

      this.RAZORPAY_OPTIONS.prefill.email = this.userData.email;
      this.RAZORPAY_OPTIONS.prefill.contact = this.userData.phone_number;
      this.RAZORPAY_OPTIONS.prefill.name =
        this.userData.first_name + ' ' + this.userData.last_name;
    });

    this.checkoutService.getUsersAddress().subscribe(
      (userAddress) => {
        console.log(userAddress);

        /*    this.selectedAddress = userAddress[0];
          this.userAddress = userAddress.data; */
      },
      (err) => {
        console.log(err.error.err.message);
        if (err.error.err.message === 'Address not Found') {
          this.userAddress = [];
        }
      }
    );
    this.cartService.getCartDetail().subscribe((cartDetails) => {
      this.cartData = cartDetails.data;
      this.calculateAmount();
      this.userCart = {
        cartData: this.cartData,
        amountDetail: this.AmountDetails,
      };
    });
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
    this.RAZORPAY_OPTIONS.amount =
      this.userCart.AmountDetails.TotalPrice + '00';
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    this.razorpayResponse = `Razorpay Response`;
    const data = {
      order_createdby: this.userData.user.id,
      paymentId: response.razorpay_payment_id,
      cart: this.userCart,
      address: this.selectedAddress,
      order_date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      order_status: 'Booked',
    };
    this.checkoutService.placeOrder(data);

    this.chnageCartDeatils();
    this.showModal = true;
    this.cd.detectChanges();
    this.router.navigate(['/home/order'], { replaceUrl: true });
  }
  changeSelectedUserAddress(event) {
    this.selectedAddress = event.value;
  }
  chnageCartDeatils() {
    this.userData = { ...this.userData.user, cart: [] };

    this.store.dispatch(
      new fromAuthSectionActions.ChangeUserCartDeatilsStart(this.userData)
    );
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
