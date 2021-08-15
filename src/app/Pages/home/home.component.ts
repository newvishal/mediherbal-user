import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/service/loader.service';
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
    private snackbarService: SnakbarService,
    private loader: LoaderService
  ) {}
  images = ['', 2, 5].map((n) => `/assets/Images/About Us/about${n}.jpg`);
  editCombo = [];
  editedCombo;
  data;
  products = [];
  comboProducts = [];
  ngOnInit(): void {
    this.loader.openDialog();
    this.homeService.getProducts().subscribe(
      (products) => {
        this.products = products.data;
        this.homeService.getComboProducts().subscribe(
          (comboProduct) => {
            this.comboProducts = comboProduct.data;
            this.loader.closeDialog();
          },
          (err) => {
            this.loader.closeDialog();
            this.snackbarService.showSnackBar('', 'danger');
          }
        );
      },
      (err) => {
        this.loader.closeDialog();
        this.snackbarService.showSnackBar('', 'danger');
      }
    );
  }
}
