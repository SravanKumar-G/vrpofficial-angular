import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { ApiServiceService } from "@app/services/api-service.service";
import { ApiUrlsService } from "@app/services/api-urls.service";
import { first } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private apiService: ApiServiceService,
    private apiUrls: ApiUrlsService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.loginForm.controls;
  }

  loginForm: any = FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any= String;
  error = '';
  public showAndHideText = 'password';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: new FormControl(null, [Validators.required,  Validators.minLength(10), Validators.pattern("^[0-9]*$"),]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.logIn(this.f.phoneNumber.value, this.f.password.value).pipe(first()).subscribe((data: any) => {
      this.router.navigate([this.returnUrl]);
      Swal.fire('Success', 'Login in successfully..!', 'success');
    }, (error: any) => {
      this.error = error.error.message;
      this.loading = false;
    });
  }

  showAndHidePassword(showAndHide: any): void {
    if (showAndHide === true) {
      this.showAndHideText = 'text';
    } else {
      this.showAndHideText = 'password';
    }
  }

}
