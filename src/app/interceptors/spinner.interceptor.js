import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
let SpinnerInterceptor = class SpinnerInterceptor {
    constructor(loaderService) {
        this.loaderService = loaderService;
        this.requests = [];
    }
    // tslint:disable-next-line:typedef
    removeRequest(req) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
    intercept(req, next) {
        this.requests.push(req);
        // console.log("No of requests--->" + this.requests.length);
        this.loaderService.isLoading.next(true);
        return Observable.create((observer) => {
            const subscription = next.handle(req).subscribe(event => {
                if (event instanceof HttpResponse) {
                    // console.log('error' + req);
                    this.removeRequest(req);
                    observer.next(event);
                }
            }, err => {
                // console.log('error===>' + err);
                this.removeRequest(req);
                observer.error(err);
            }, () => {
                this.removeRequest(req);
                observer.complete();
            });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
};
SpinnerInterceptor = __decorate([
    Injectable()
], SpinnerInterceptor);
export { SpinnerInterceptor };
//# sourceMappingURL=spinner.interceptor.js.map