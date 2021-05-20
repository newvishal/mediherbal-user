import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    /* this method dispatch Actions From Service */
    this.homeService.fetchComboProducts();
    this.homeService.fetchProducts();

    /* this method return data observable Service */
    this.homeService.getProducts().subscribe((products) => {
      console.log(products);
    });
    this.homeService.getComboProducts().subscribe((comboProducts) => {
      console.log(comboProducts);
    });
  }
}
