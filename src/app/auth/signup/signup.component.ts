import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  showPassword: any = false;
  showConfirmPassword: any = false;
  positionArray: any = [
    {key: 'MP', value: 'MP'},
    {key: 'MLA', value: 'MLA'},
    {key: 'MLC', value: 'MLC'},
    {key: 'CORPORATOR', value: 'CORPORATOR'},
    {key: 'COUNCELLOR', value: 'COUNCELLOR'},
    {key: 'SARPANCH', value: 'SARPANCH'},
    {key: 'OTHERS', value: 'OTHERS'},
  ];
  contributeArray: any = [
    {key: 'Work in your community', value: '1'},
    {key: 'Become a digital activist', value: '2'},
    {key: 'Join calling campaigns', value: '3'},
    {key: 'Attend party events', value: '4'},
    {key: 'IT support (coding)', value: '5'},
    {key: 'web design etc.', value: '6'},
    {key: 'Become a photo/video volunteer', value: '7'},
    {key: 'Provide housing to volunteers', value: '8'},
    {key: 'Content writing (mention preferred language below)', value: '9'},
    {key: 'Policy/Research support', value: '10'},
    {key: 'Others', value: '11'},
  ]
  employmentType: string = '';

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
      employmentType: new FormControl(''),
      dependents: new FormControl('', [Validators.required]),
      interestInPolitics: new FormControl('', [Validators.required]),
      isContestInElection: new FormControl(''),
      positionToContest: new FormControl(''),
      contestDistrict: new FormControl(''),
      contestingConstituency: new FormControl(''),
      typeOfContribution: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      acceptConsent: new FormControl('', [Validators.required]),
      acceptDeclaration: new FormControl(''),
    }, {
      validators: [ConfirmPasswordValidator("password", "confirmPassword")]
    });
    this.validateEmpType();
    this.validateIntInPolitics();
    this.positionValidation();
  }

  get r() {
    return this.signUpForm.controls;
  }

  get employmentTypeVal() {
    return this.signUpForm.get('employmentType');
  }
  get isContestVali() {
    return this.signUpForm.get('isContestInElection');
  }
  get posVali() {
    return this.signUpForm.get('positionToContest');
  }
  get conDist() {
    return this.signUpForm.get('contestDistrict');
  }
  get conCons() {
    return this.signUpForm.get('contestingConstituency');
  }

  validateEmpType() {
    this.signUpForm.get('employmentStatus').valueChanges.subscribe((ctrl: string) => {
      const validators = [Validators.required];
      const employmentType = this.signUpForm.get('employmentType');
      if (ctrl === 'Yes') {
        this.signUpForm.get('employmentType').value = '';
        employmentType.addValidators(validators);
      }else{
        employmentType.removeValidators(validators);
      }
      employmentType.updateValueAndValidity();
    });
  }
  validateIntInPolitics() {
    this.signUpForm.get('interestInPolitics').valueChanges.subscribe((ctrl: string) => {
      const validators = [Validators.required];
      const isContestInElection = this.signUpForm.get('isContestInElection');
      if (ctrl === 'Yes') {
        isContestInElection.addValidators(validators);
      }else{
        isContestInElection.removeValidators(validators);
      }
      isContestInElection.updateValueAndValidity();
    });
  }

  positionValidation() {
    this.signUpForm.get('isContestInElection').valueChanges.subscribe((ctrl: string) => {
      const validators = [Validators.required];
      const positionToContest = this.signUpForm.get('positionToContest');
      const contestDistrict = this.signUpForm.get('contestDistrict');
      const contestingConstituency = this.signUpForm.get('contestingConstituency');
      if (ctrl === 'Yes') {
        positionToContest.addValidators(validators);
        contestDistrict.addValidators(validators);
        contestingConstituency.addValidators(validators);
      }else{
        positionToContest.removeValidators(validators);
        contestDistrict.removeValidators(validators);
        contestingConstituency.removeValidators(validators);
      }
      positionToContest.updateValueAndValidity();
      contestDistrict.updateValueAndValidity();
      contestingConstituency.updateValueAndValidity();
    });
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
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onRegister() {
    this.submitted = true;
    console.log(this.signUpForm);
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
      positionToContest: [this.r.positionToContest.value],
      contestDistrict: this.r.contestDistrict.value,
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
    const stateId = event ? event.target.value : '63ff22fca2fa8ae3ae31d3f6';
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

  togglePasswordVisibility(showOrHide: any) {
    this.showPassword = showOrHide;
  }

  toggleConfirmPasswordVisibility(showOrHide: any) {
    this.showConfirmPassword = showOrHide;
  }

  getConsByDistId(event: any, position: any) {
    let apiUrl;
    const distId = event.target.value;
    if (position === 'MP') {
      apiUrl = this.apiUrls.getParliamentConst;
    }else if (position !== 'MP') {
      apiUrl = this.apiUrls.getConstituenciesByDistrict + distId;
    }
    this.apiService.get(apiUrl).subscribe((res: any) => {
      if (res) {
        this.constituencies = res.constituencies;
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }

  checkPosType() {
    if(this.r.positionToContest.value === 'MP' || this.r.positionToContest.value === 'MLA' || this.r.positionToContest.value === 'MLC') {
      return true;
    }else{
      return false;
    }
  }
}
