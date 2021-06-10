import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutService } from './service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private checkoutService: CheckoutService) {}
  userAddress: any[] = [];
  userAddressSubscription: Subscription;
  ngOnInit(): void {
    this.userAddressSubscription = this.checkoutService
      .getUsersAddress()
      .pipe(
        tap((userAddress) => {
          this.userAddress = userAddress;
        })
      )
      .subscribe();
  }
}
