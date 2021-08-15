import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserDataService } from 'src/app/shared/service/userData.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() closesidenav = new EventEmitter<void>();
  showItems = false;
  userData;
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private auth: AuthService
  ) {}
  sidenavclose() {
    this.closesidenav.emit();
  }
  ngOnInit() {
    this.auth.active_user.subscribe((res) => {
      this.userData = res;
    });
  }
  logout() {
    this.sidenavclose();
    this.userDataService.logout();
    this.sidenavclose();
    this.router.navigate(['/login']);
  }
}
