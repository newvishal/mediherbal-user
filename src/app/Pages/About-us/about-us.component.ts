import { Component, OnInit } from '@angular/core';
import { AboutService } from './service/aboutUs.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  aboutUsData;
  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAboutUs().subscribe(
      (response) => {
        this.aboutUsData = response.data[0];
      },
      (err) => {}
    );
  }
}
