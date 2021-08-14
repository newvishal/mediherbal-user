import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/shared/service/userData.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() reviews;
  constructor() {}
  ngOnInit(): void {}
}
