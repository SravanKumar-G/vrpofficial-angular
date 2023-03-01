import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from "rxjs";
let AuthService = class AuthService {
    constructor(http, apiUrls, route) {
        this.http = http;
        this.apiUrls = apiUrls;
        this.route = route;
        // @ts-ignore
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('loggedInOMSUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    isAuthenticated() {
        // @ts-ignore
        return localStorage.getItem('loggedInOMSUser');
    }
    logIn(userName, password) {
        return this.http.post(this.apiUrls.mainUrl + '/api/auth/login', { userName, password })
            .pipe(map(response => {
            if (response) {
                localStorage.setItem('loggedInOMSUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
            }
            return response;
        }));
    }
    logOut() {
        // @ts-ignore
        localStorage.clear('loggedInOMSUser');
        this.route.navigate(['/login']);
        this.currentUserSubject.next(null);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map