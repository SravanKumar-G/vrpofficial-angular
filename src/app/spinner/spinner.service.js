import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
let SpinnerService = class SpinnerService {
    constructor() {
        this.isLoading = new BehaviorSubject(false);
    }
};
SpinnerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SpinnerService);
export { SpinnerService };
//# sourceMappingURL=spinner.service.js.map