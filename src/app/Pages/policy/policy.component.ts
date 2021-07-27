import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from './service/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  isPrivacy;
  privacyData;
  constructor(
    private activatedRouter: ActivatedRoute,
    private privacySerivce: PolicyService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((res) => {
      if (res.type === 'TermsAndConditions') {
        this.isPrivacy = false;
        this.privacySerivce.getTermsAndConditions().subscribe(
          (res) => {
            this.privacyData = res.data[0];
          },
          (err) => {
            console.log(err);
          }
        );
      } else if (res.type === 'Privacy') {
        this.isPrivacy = true;
        this.privacySerivce.getPrivacyPolicy().subscribe(
          (res) => {
            this.privacyData = res.data[0];
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
