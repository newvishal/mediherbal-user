import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddAddressComponent } from '../user-address/components/add-address/add-address.component';
import { CheckoutService } from './service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private dialog: MatDialog
  ) {}
  userAddress: any[] = [];
  userCart;
  selectedAddress;
  AmountDetails;
  userAddressSubscription: Subscription;
  ngOnInit(): void {
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
}
