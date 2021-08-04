import { Component, OnInit } from '@angular/core';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private snackbarService: SnakbarService
  ) {}
  images = ['', 2, 5].map((n) => `/assets/Images/About Us/about${n}.jpg`);
  editCombo = [];
  editedCombo;
  data;
  products = [];
  comboProducts = [];
  ngOnInit(): void {
    /* this method return data observable Service */

    this.homeService.getProducts().subscribe(
      (products) => {
        console.log(products);

        this.products = products.data;
      },
      (err) => {
        this.snackbarService.showSnackBar('', 'danger');
      }
    );
    this.homeService.getComboProducts().subscribe(
      (comboProduct) => {
        console.log(comboProduct);

        this.comboProducts = comboProduct.data;
      },
      (err) => {
        this.snackbarService.showSnackBar('', 'danger');
      }
    );
  }
}
