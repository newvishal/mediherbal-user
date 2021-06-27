import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddAddressComponent } from '../user-address/components/add-address/add-address.component';
import { CheckoutService } from './service/checkout.service';
import * as fromApp from '../../store/app.reducer';
declare var Razorpay: any;

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
    private store: Store<fromApp.AppState>
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
    amount: '1000',
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
        })
      )
      .subscribe();
    this.userAddressSubscription = this.checkoutService
      .getUsersAddress()
      .pipe(
        tap((userAddress) => {
          console.log(userAddress);
          this.selectedAddress = userAddress[0];
          this.userAddress = userAddress;
        })
      )
      .subscribe();
    this.checkoutService.userCart
      .pipe(
        tap((usercart) => {
          console.log(usercart);
          this.userCart = usercart;
        })
      )
      .subscribe();
  }
  addAddress() {
    this.dialog.open(AddAddressComponent);
  }
  clickToPay() {
    this.RAZORPAY_OPTIONS.amount = 100 + '00';

    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    console.log(response);
    this.razorpayResponse = `Razorpay Response`;
    this.showModal = true;
    this.cd.detectChanges();
  }
  changeSelectedUserAddress(event) {
    console.log(event);

    this.selectedAddress = event.value;
  }
}
