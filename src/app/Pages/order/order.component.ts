import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/shared/Components/delete-confirmation/delete-confirmation.component';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { RemoveItemConfirmation } from '../cart/cart.component';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderList = [];
  @Input() limit;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: SnakbarService,
    private dialog: MatDialog,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList() {
    this.loader.openDialog();
    this.orderService.getUserOrder().subscribe(
      (orders) => {
        if (this.limit) {
          orders.data.map((order, index) => {
            if (index < 2) {
              this.orderList.push(order);
            }
          });
        } else {
          this.orderList = orders.data;
        }
        this.loader.closeDialog();
      },
      (err) => {
        this.loader.closeDialog();
      }
    );
  }
  navigateToList() {
    this.router.navigate([`/home/order`]);
  }
  viewInvoice(id) {
    this.router.navigate([`/home/order/order-detail/${id}`]);
  }
  navigateToDeatils(id, type) {
    this.router.navigate([`/product-detail/${type}/${id}`]);
  }
  updateImage(mainIndex, type, index, $event) {
    if (type === 'single') {
      this.orderList[mainIndex].products[index].product_id.product_images[0] =
        'https://i.stack.imgur.com/y9DpT.jpg';
    } else if (type === 'combo') {
      this.orderList[mainIndex].combo_products[
        index
      ].comboproduct_id.products_images[0] =
        'https://i.stack.imgur.com/y9DpT.jpg';
    }
  }
  cancelOrder(id) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        title: `Cancel Order Confirmation`,
        description: `Are You Sure You Want To cancel this order ?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.cancelOrder(id).subscribe(
          (res) => {
            this.snackBar.showSnackBar(res.message, 'success');
            this.getOrderList();
          },
          (err) => {
            console.log(err);
            this.snackBar.showSnackBar('Something went wrong', 'success');
          }
        );
      }
    });
  }
}
