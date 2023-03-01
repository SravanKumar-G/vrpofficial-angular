import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as $ from 'jquery';
let LayoutComponent = class LayoutComponent {
    constructor(router, apiUrls, apiService, authService) {
        this.router = router;
        this.apiUrls = apiUrls;
        this.apiService = apiService;
        this.authService = authService;
        this.allSites = [];
        this.siteCodes = [];
        this.toggled = true;
        this.search = '';
        this.model = '';
        this.date = new Date();
    }
    ngOnInit() {
        // @ts-ignore
        this.currentUser = JSON.parse(localStorage.getItem('loggedInOMSUser'));
        this.getSites();
        this.currentYear = new Date().getFullYear();
    }
    getSites() {
        this.apiService.get(this.apiUrls.getAllSites).subscribe((res) => {
            if (res) {
                this.allSites = res.data;
            }
        });
    }
    logout() {
        this.authService.logOut();
    }
    toggleLogo() {
        $('#wrapper').toggleClass('toggled');
    }
};
LayoutComponent = __decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.component.html',
        styleUrls: ['./layout.component.scss'],
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map