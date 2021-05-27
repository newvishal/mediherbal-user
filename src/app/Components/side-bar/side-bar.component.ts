import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() closesidenav = new EventEmitter<void>();
  showItems = false;
  constructor() {}
  sidenavclose() {
    this.closesidenav.emit();
  }
  ngOnInit(): void {}
}
