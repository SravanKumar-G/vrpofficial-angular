import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMobileMenu = false;
  public showDropDownMenu = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  showDropDown() {
    this.showDropDownMenu = !this.showDropDownMenu;
  }
}
