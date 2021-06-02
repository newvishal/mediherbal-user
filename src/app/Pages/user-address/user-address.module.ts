import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { UserAddressRoutingModule } from './user-address-routing.module';
import { UserAddressComponent } from './user-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';

@NgModule({
  imports: [SharedModule, MaterialModule, UserAddressRoutingModule],
  declarations: [UserAddressComponent, AddAddressComponent],
})
export class UserAddressModule {}
