import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from '../services/auth.service'
import * as $ from 'jquery';
import {ApiUrlsService} from "@app/services/api-urls.service";
import {ApiServiceService} from "@app/services/api-service.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public allSites: Array<any> = [];
  public siteCodes: Array<any> = [];

  toggled = true;
  search = '';
  orders: any;
  model = '';
  public currentUser: any;
  date:any = new Date();
  currentYear: any;

  constructor(private router: Router,
              private apiUrls: ApiUrlsService,
              public apiService: ApiServiceService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    (($) => {
      $(document).ready( () => {
        const treeviewMenu = $('.app-menu');
        const treeviewMenuChild = $('.app-menu-child');
        // tslint:disable-next-line:only-arrow-functions typedef
        $('[data-toggle="sidebar"]').click(function(event) {
          event.preventDefault();
          $('.app').toggleClass('sidenav-toggled');
        });
      });
    })(jQuery);
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('loggedInOMSUser'));
    this.currentYear = new Date().getFullYear();
  }

  logout() {
    this.authService.logOut()
  }

  toggleLogo() {
    $('#wrapper').toggleClass('toggled');
  }
}
