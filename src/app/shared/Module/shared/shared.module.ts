import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from 'src/app/Pages/user-address/components/add-address/add-address.component';
import { MaterialModule } from '../material/material.module';
import { OrderComponent } from 'src/app/Pages/order/order.component';
import { AddressCardComponent } from 'src/app/Pages/user-address/components/address-card/address-card.component';
import { UserAddressComponent } from 'src/app/Pages/user-address/user-address.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    AddAddressComponent,
    OrderComponent,
    AddressCardComponent,
    UserAddressComponent,
    AddressCardComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddAddressComponent,
    OrderComponent,
    AddressCardComponent,
    UserAddressComponent,
    AddressCardComponent,
  ],
  providers: [DatePipe],
})
export class SharedModule {}
