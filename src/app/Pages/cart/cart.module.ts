import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent, RemoveItemConfirmation } from './cart.component';

@NgModule({
  imports: [SharedModule, MaterialModule, CartRoutingModule],
  declarations: [CartComponent, RemoveItemConfirmation],
})
export class CartModule {}
