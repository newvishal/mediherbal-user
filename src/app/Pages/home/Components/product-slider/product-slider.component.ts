import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  @Input() products = [];
  productsList = [];
  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.productsList = [];
    let products = this.products;
    products.map((res, index) => {
      this.productsList[index] = {
        ...res,
        addToCart: false,
        quantity: 1,
        selectedOption: {
          price: res.product_type[0].price,
          fake_price: res.product_type[0].fake_price,
          product_id: res.product_type[0].product_id,
        },
      };
    });
  }
  addToCart(index) {
    this.productsList[index].addToCart = true;
  }
  removeQuantity(index) {
    this.productsList[index].quantity = this.productsList[index].quantity - 1;
    if (this.productsList[index].quantity == 0) {
      this.productsList[index].addToCart = false;
    }
  }
  addQuantity(index) {
    this.productsList[index].quantity = this.productsList[index].quantity + 1;
  }
  changeTag1(evt, index) {
    this.productsList[index].product_type.map((res) => {
      if (res.product_id === evt) {
        this.productsList[index].selectedOption = {
          ...this.productsList[index].selectedOption,
          price: res.price,
          fake_price: res.fake_price,
          product_id: res.product_id,
        };
      }
    });
    this.productsList[index].addToCart = false;
    this.productsList[index].quantity = 1;
  }
  ngOnInit(): void {}
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/single/${id}`]);
  }
}
