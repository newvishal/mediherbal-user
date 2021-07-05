import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderList = [];
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getUserOrder().subscribe((orders) => {
      this.orderList = orders;
    });
  }
  navigateToDeatils(id, type) {
    if (type === 'products') {
      this.router.navigate([`/product-detail/single/${id}`]);
    } else if (type === 'comboProduct') {
      this.router.navigate([`/product-detail/combo/${id}`]);
    }
  }
}
