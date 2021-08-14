import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() images;
  bannerData;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getBannerData().subscribe((res) => {
      this.bannerData = res.data;
    });
  }
}
