import { NgModule } from '@angular/core';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { OrdrerRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderService } from './service/order.service';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';

@NgModule({
  imports: [SharedModule, MaterialModule, OrdrerRoutingModule],
  declarations: [OrderComponent, OrderDetailComponent],
  providers: [OrderService],
})
export class OrderModule {}
