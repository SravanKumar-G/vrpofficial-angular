import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SpinnerComponent = class SpinnerComponent {
    constructor(loaderService) {
        this.loaderService = loaderService;
        this.loading = false;
        this.loaderService.isLoading.subscribe((v) => {
            // console.log(v);
            this.loading = v;
        });
    }
    ngOnInit() { }
};
SpinnerComponent = __decorate([
    Component({
        selector: 'app-spinner',
        templateUrl: './spinner.component.html',
        styleUrls: ['./spinner.component.scss']
    })
], SpinnerComponent);
export { SpinnerComponent };
//# sourceMappingURL=spinner.component.js.map