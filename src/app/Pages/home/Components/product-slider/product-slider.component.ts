import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComboProductInterface } from 'src/app/Pages/Interface/combo-products.interface';
import { ProductInterface } from 'src/app/Pages/Interface/product.interface';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  selectedOption = { price: '', fake_price: '', product_id: '' };
  @Input() products: ProductInterface[];
  constructor() {}
  ngOnChanges(): void {}
  ngOnInit(): void {}
}
