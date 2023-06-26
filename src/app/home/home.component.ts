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

  public signupHideShow = false;
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
  showPassword: any = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: new FormControl(null, [Validators.required,  Validators.minLength(10), Validators.pattern("^[0-9]*$"),]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    // this.getTimer();
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
      this.error = error.message;
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

  togglePasswordVisibility(showOrHide: any) {
    this.showPassword = showOrHide;
  }

  signupHideShowFun() {
    if (this.signupHideShow){
      this.signupHideShow = false;
    }else {
      this.signupHideShow = true;
    }
  }

  getTimer(): any {
    var countDownDate = new Date("June 2, 2023 0:0:0").getTime();

    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24)) <= 9 ?
          '0' + Math.floor(distance / (1000 * 60 * 60 * 24)) : Math.floor(distance / (1000 * 60 * 60 * 24));
      const daysArray = days.toString().split('');
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) <= 9 ?
          '0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const hoursArray = hours.toString().split('');
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) <= 9 ?
          '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const minArray = minutes.toString().split('');
      var seconds = Math.floor((distance % (1000 * 60)) / 1000) <= 9 ?
          '0' + Math.floor((distance % (1000 * 60)) / 1000) : Math.floor((distance % (1000 * 60)) / 1000);
      const secArray = seconds.toString().split('');
      // @ts-ignore
      document.getElementById('timer').innerHTML =
          "<div style='margin-left: 25px;'><span>" + daysArray[0] + "</span> <span>" + daysArray[0] + "</span> <p>Days</p></div>" +
          "<div style='margin-left: 25px;'><span>" + hoursArray[0] + "</span> <span>" + hoursArray[1] + "</span> <p>Hours</p></div>" +
          "<div style='margin-left: 25px;'><span>" + minArray[0] + "</span> <span>" + minArray[1] + "</span> <p>Minutes</p></div>" +
          "<div style='margin-left: 25px;'><span>" + secArray[0] + "</span> <span>" + secArray[1] + "</span> <p>Seconds</p></div>";
      if (distance < 0) {
        clearInterval(x);
        // @ts-ignore
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
}
