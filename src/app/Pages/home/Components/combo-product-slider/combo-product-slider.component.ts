import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComboProductInterface } from 'src/app/Pages/Interface/combo-products.interface';

@Component({
  selector: 'app-combo-product-slider',
  templateUrl: './combo-product-slider.component.html',
  styleUrls: ['./combo-product-slider.component.scss'],
})
export class ComboProductSliderComponent implements OnInit {
  @Input() products = [];
  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.products.map((res, index) => {
      this.products[index] = { ...res, addToCart: false, quantity: 1 };
    });
  }
  addToCart(index) {
    this.products[index].addToCart = true;
    if (this.products[index].quantity == 0) {
      this.addQuantity(index);
    }
  }
  removeQuantity(index) {
    if (this.products[index].quantity >= 1) {
      this.products[index].quantity = this.products[index].quantity - 1;
    }
    if (this.products[index].quantity == 0) {
      this.products[index].addToCart = false;
    }
  }
  addQuantity(index) {
    this.products[index].quantity = this.products[index].quantity + 1;
  }
  ngOnInit(): void {}
  navigateToDeatils(id) {
    this.router.navigate([`/product-detail/combo/${id}`]);
  }
}
