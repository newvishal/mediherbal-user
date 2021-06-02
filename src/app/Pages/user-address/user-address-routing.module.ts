import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddressComponent } from './user-address.component';

const user_address_routes: Routes = [
  {
    path: '',
    component: UserAddressComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(user_address_routes)],
  exports: [RouterModule],
})
export class UserAddressRoutingModule {}
