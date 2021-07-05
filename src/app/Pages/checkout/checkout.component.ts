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
    private datePipe: DatePipe
  ) {}
  userAddress: any[] = [];
  userCart;
  selectedAddress;
  AmountDetails;
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
  ngOnInit(): void {
    this.UserDataSubscription = this.checkoutService
      .getUserData()
      .pipe(
        tap((userData) => {
          this.userData = userData;

          this.RAZORPAY_OPTIONS.prefill.email = this.userData.user.email;
          this.RAZORPAY_OPTIONS.prefill.contact =
            this.userData.user.phone_number;
          this.RAZORPAY_OPTIONS.prefill.name =
            this.userData.user.first_name + ' ' + this.userData.user.last_name;
        })
      )
      .subscribe();
    this.userAddressSubscription = this.checkoutService
      .getUsersAddress()
      .pipe(
        tap((userAddress) => {
          this.selectedAddress = userAddress[0];
          this.userAddress = userAddress;
        })
      )
      .subscribe();
    this.checkoutService.userCart
      .pipe(
        tap((usercart) => {
          this.userCart = usercart;
        })
      )
      .subscribe();
  }
  addAddress() {
    this.dialog.open(AddAddressComponent);
  }
  clickToPay() {
    /*  this.RAZORPAY_OPTIONS.amount = 100 + '00'; */
    this.RAZORPAY_OPTIONS.amount = this.userCart.totalAmount.TotalPrice + '00';
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
}
