import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private activatedRouter: ActivatedRoute,
    private loader: LoaderService
  ) {}
  orderDetail;
  ngOnInit(): void {
    this.loader.openDialog();
    this.activatedRouter.params.subscribe((res) => {
      if (res.id) {
        this.orderService.getUserByIdOrder(res.id).subscribe(
          (response) => {
            this.orderDetail = response.data;
            this.loader.closeDialog();
          },
          (err) => {
            this.loader.closeDialog();
          }
        );
      }
    });
  }
}
