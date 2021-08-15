import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserDataService } from 'src/app/shared/service/userData.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userData;
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.userDataService.setUserData(this.userData);
      this.auth.active_user.next(this.userData);
    }
    this.auth.active_user.subscribe((res) => {
      this.userData = res;
    });
  }
}
