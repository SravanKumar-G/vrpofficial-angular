import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let JwtInterceptor = class JwtInterceptor {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    intercept(request, next) {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
};
JwtInterceptor = __decorate([
    Injectable()
], JwtInterceptor);
export { JwtInterceptor };
//# sourceMappingURL=jwt.interceptor.js.map