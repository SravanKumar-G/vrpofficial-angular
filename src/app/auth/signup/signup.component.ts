import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { ApiServiceService } from "@app/services/api-service.service";
import { ApiUrlsService } from "@app/services/api-urls.service";
import {ConfirmPasswordValidator} from "@app/services/ConfirmPassword.validator"
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public states: Array <any> = [];
  public districts: Array <any> = [];
  public mandals: Array <any> = [];
  public constituencies: Array <any> = [];

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
  dependents: Array<any> = [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
    {value: '8'}, {value: '9'}, {value: 'more'},];

  ngOnInit(): void {
    this.getAllStates();
    this.getAllConstituencies();
    this.signUpForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      fatherFirstName: new FormControl('', [Validators.required]),
      fatherLastName: new FormControl('', [Validators.required]),
      motherFirstName: new FormControl('', [Validators.required]),
      motherLastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern("^[0-9]*$"),]),
      email: new FormControl('', [Validators.required,  Validators.email]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      mandal: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      employmentStatus: new FormControl('', [Validators.required]),
      employmentType: new FormControl('', [Validators.required]),
      dependents: new FormControl('', [Validators.required]),
      interestInPolitics: new FormControl('', [Validators.required]),
      isContestInElection: new FormControl('', [Validators.required]),
      positionToContest: new FormControl('', [Validators.required]),
      contestingConstituency: new FormControl('', [Validators.required]),
      typeOfContribution: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      acceptConsent: new FormControl('', [Validators.required]),
      acceptDeclaration: new FormControl('', [Validators.required]),
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
      address: this.r.address.value,
      employmentStatus: this.r.employmentStatus.value,
      employmentType: this.r.employmentType.value,
      dependents: this.r.dependents.value,
      interestInPolitics: this.r.interestInPolitics.value,
      isContestInElection: this.r.isContestInElection.value,
      positionToContest: this.r.positionToContest.value,
      contestingConstituency: this.r.contestingConstituency.value,
      typeOfContribution: this.r.typeOfContribution.value,
      description: this.r.description.value,
      acceptConsent: this.r.acceptConsent.value,
      acceptDeclaration: this.r.acceptDeclaration.value,
      role: 5
    }
    // console.log(userData)
    this.apiService.getAll(this.apiUrls.register, userData).subscribe((res: any) => {
      if (res) {
        this.signUpForm.reset();
        Swal.fire('Success', res.message, 'success');
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }

  getAllStates(): void {
    this.apiService.get(this.apiUrls.getAllStates).subscribe((res: any) => {
      if (res) {
        this.states = res.states;
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }

  getDistrictsByStateId(event: any): void {
    const stateId = event.target.value;
    this.apiService.get(this.apiUrls.getDistrictsByState + stateId).subscribe((res: any) => {
      if (res) {
        this.districts = res.districts;
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }

  getMandals(distId: any) {
    this.apiService.get(this.apiUrls.getMandalsByDistrict + distId).subscribe((res: any) => {
      if (res) {
        this.mandals = res.mandals;
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }

  getAllConstituencies() {
    this.apiService.get(this.apiUrls.getAllConstituencies).subscribe((res: any) => {
      if (res) {
        this.constituencies = res.constituencies;
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }
  getManContByDistId(event: any) {
    const distId = event.target.value;
    this.getMandals(distId);
  }
}
