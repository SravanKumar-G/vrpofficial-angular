import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { first } from "rxjs";
let LoginComponent = class LoginComponent {
    constructor(formBuilder, route, router, authenticationService, apiService, apiUrls) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.apiService = apiService;
        this.apiUrls = apiUrls;
        this.loginForm = FormGroup;
        this.loading = false;
        this.submitted = false;
        this.returnUrl = String;
        this.error = '';
        this.errorMessage = String;
        this.showAndHideText = 'password';
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    // tslint:disable-next-line:typedef
    get f() {
        return this.loginForm.controls;
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            phoneNumber: ['', Validators.required],
            password: ['', Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.logIn(this.f.phoneNumber.value, this.f.password.value).pipe(first()).subscribe((data) => {
            this.router.navigate([this.returnUrl]);
            Swal.fire('Success', 'Login in successfully..!', 'success');
        }, (error) => {
            this.error = error.message;
            this.loading = false;
        });
    }
    showAndHidePassword(showAndHide) {
        if (showAndHide === true) {
            this.showAndHideText = 'text';
        }
        else {
            this.showAndHideText = 'password';
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map