import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();
  constructor() {}
  onToggleSidenav() {
    this.sidenavToggle.emit();

  }
  ngOnInit(): void {}
}
