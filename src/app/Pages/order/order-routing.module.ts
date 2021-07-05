import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { OrderComponent } from './order.component';

const orderRoutes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: 'order-detail/:id',
    component: OrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule],
})
export class OrdrerRoutingModule {}
