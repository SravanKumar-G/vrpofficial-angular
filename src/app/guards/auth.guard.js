import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate(route, state) {
        const currentAccessToken = this.authService.currentUserValue;
        if (currentAccessToken) {
            if (this.authService.isAuthenticated()) {
                return true;
            }
        }
        else {
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url },
            });
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return true;
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map