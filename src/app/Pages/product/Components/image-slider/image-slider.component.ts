import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit {
  @Input() images;
  constructor() {}

  ngOnInit(): void {}
  updateUrl(event, index) {
    this.images[index] = 'https://i.stack.imgur.com/y9DpT.jpg';
  }
}
