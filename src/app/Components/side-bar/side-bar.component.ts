import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/service/userData.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() closesidenav = new EventEmitter<void>();
  showItems = false;
  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}
  sidenavclose() {
    this.closesidenav.emit();
  }
  ngOnInit(): void {}
  logout() {
    this.userDataService.logout();
    this.sidenavclose();
    this.router.navigate(['/login']);
  }
}
