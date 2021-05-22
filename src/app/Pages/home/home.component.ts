import { Component, OnInit } from '@angular/core';
import { ComboProductInterface } from '../Interface/combo-products.interface';
import { ProductInterface } from '../Interface/product.interface';
import { ComboProductSliderComponent } from './Components/combo-product-slider/combo-product-slider.component';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}
  images = ['', 2, 5].map((n) => `/assets/Images/About Us/about${n}.jpg`);
  editCombo = [];
  editedCombo;
  data;
  products = [];
  comboProducts: ComboProductInterface[] = [];
  ngOnInit(): void {
    /* this method dispatch Actions From Service */
    this.homeService.fetchComboProducts();
    this.homeService.fetchProducts();

    /* this method return data observable Service */
    this.homeService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.homeService.getComboProducts().subscribe((comboProduct) => {
      this.comboProducts = comboProduct;
      this.data = [];
      this.comboProducts.map((products, index) => {
        this.data.push({ ...products, products: [] });
      });
      this.comboProducts.map((res, index) => {
        if (res.products) {
          res.products.map((productType, i) => {
            this.products.map((res, ind) => {
              if (productType.id === res.id) {
                res.product_type.map((type) => {
                  if (type.product_id === productType.product_id) {
                    this.data[index].products[i] = {
                      ...this.comboProducts[index].products[i],
                      product_name: res.product_name,
                      product_type: type.name,
                      price: type.price,
                    };
                  }
                });
              }
            });
          });
        }
      });
      this.comboProducts = [];
      this.comboProducts = this.data;
    });
  }
}
