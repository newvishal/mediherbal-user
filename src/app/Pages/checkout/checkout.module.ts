import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [SharedModule, MaterialModule, CheckoutRoutingModule],
  declarations: [CheckoutComponent],
})
export class CheckoutModule {}
