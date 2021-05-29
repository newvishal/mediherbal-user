import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  isPrivacy;
  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((res) => {
      if (res.type === 'TermsAndConditions') {
        this.isPrivacy = false;
      } else if (res.type === 'Privacy') {
        this.isPrivacy = true;
      }
    });
  }
}
