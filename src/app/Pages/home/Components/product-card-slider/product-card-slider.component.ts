import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card-slider',
  templateUrl: './product-card-slider.component.html',
  styleUrls: ['./product-card-slider.component.scss'],
})
export class ProductCardSliderComponent implements OnInit, OnChanges {
  @Input() images;
  constructor() {}
  ngOnChanges() {}
  ngOnInit(): void {}
}
