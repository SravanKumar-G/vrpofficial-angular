import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { ApiServiceService } from "@app/services/api-service.service";
import { ApiUrlsService } from "@app/services/api-urls.service";
import {ConfirmPasswordValidator} from "@app/services/ConfirmPassword.validator"
import { first } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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

  get r() {
    return this.signUpForm.controls;
  }

  signUpForm: any = FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any= String;
  error = '';
  public showAndHideText = 'password';

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      fatherFirstName: new FormControl(null, [Validators.required]),
      fatherLastName: new FormControl(null, [Validators.required]),
      motherFirstName: new FormControl(null, [Validators.required]),
      motherLastName: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      maritalStatus: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required,  Validators.minLength(10), Validators.pattern("^[0-9]*$"),]),
      email: new FormControl(null, [Validators.required,  Validators.email]),
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      mandal: new FormControl('', [Validators.required]),
      constituency: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      employmentStatus: new FormControl('', [Validators.required]),
      employmentType: new FormControl('', [Validators.required]),
    }, {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    const userData = {
      firstName: this.r.firstName.value,
      lastName: this.r.lastName.value,
      fatherFirstName: this.r.fatherFirstName.value,
      fatherLastName: this.r.fatherLastName.value,
      motherFirstName: this.r.motherFirstName.value,
      motherLastName: this.r.motherLastName.value,
      gender: this.r.gender.value,
      dateOfBirth: this.r.dateOfBirth.value,
      maritalStatus: this.r.maritalStatus.value,
      phoneNumber: this.r.phoneNumber.value,
      email: this.r.email.value,
      password: this.r.password.value,
      state: this.r.state.value,
      district: this.r.district.value,
      mandal: this.r.mandal.value,
      constituency: this.r.constituency.value,
      address: this.r.address.value,
      role: 5
    }
    this.apiService.getAll(this.apiUrls.register, userData).subscribe((res: any) => {
      if (res) {
        this.signUpForm.reset();
        Swal.fire('Success', res.message, 'success');
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }


}
