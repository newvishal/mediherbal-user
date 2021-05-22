import { Component, Input, OnInit } from '@angular/core';
import { ComboProductInterface } from 'src/app/Pages/Interface/combo-products.interface';

@Component({
  selector: 'app-combo-product-slider',
  templateUrl: './combo-product-slider.component.html',
  styleUrls: ['./combo-product-slider.component.scss'],
})
export class ComboProductSliderComponent implements OnInit {
  @Input() products: ComboProductInterface[];
  constructor() {}
  ngOnChanges(): void {}
  ngOnInit(): void {}
}
