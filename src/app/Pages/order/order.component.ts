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
      console.log(orders.data);

      this.orderList = orders.data;
    });
  }
  navigateToDeatils(id, type) {
    this.router.navigate([`/product-detail/${type}/${id}`]);
  }
  updateImage(mainIndex, type, index, $event) {
    if (type === 'single') {
      this.orderList[mainIndex].products[index].product_images[0] =
        'https://i.stack.imgur.com/y9DpT.jpg';
    } else if (type === 'combo') {
      this.orderList[mainIndex].combo_products[index].products_images[0] =
        'https://i.stack.imgur.com/y9DpT.jpg';
    }
  }
}
