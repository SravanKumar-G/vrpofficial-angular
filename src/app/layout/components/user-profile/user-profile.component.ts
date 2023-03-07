import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@app/services/auth.service";
import {ApiServiceService} from "@app/services/api-service.service";
import {ApiUrlsService} from "@app/services/api-urls.service";
import {ConfirmPasswordValidator} from "@app/services/ConfirmPassword.validator";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public states: Array <any> = [];
  public districts: Array <any> = [];
  public mandals: Array <any> = [];
  public constituencies: Array <any> = [];
  public userId: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthService,
      private apiService: ApiServiceService,
      private apiUrls: ApiUrlsService
  ) {
  }

  get r() {
    return this.updateUserDetails.controls;
  }

  updateUserDetails: any = FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any= String;
  error = '';
  public showAndHideText = 'password';
  dependents: Array<any> = [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
    {value: '8'}, {value: '9'}, {value: 'more'},];
  public isDisabled = true;


  ngOnInit(): void {
    // @ts-ignore
    this.userId = JSON.parse(localStorage.getItem('loggedInOMSUser'))._id;
    this.getUserDetails(this.userId);
    this.getAllStates();
    this.getAllConstituencies();
    this.updateUserDetails = this.formBuilder.group({
      firstName: new FormControl({value: '', disabled: this.isDisabled}, [Validators.required]),
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
    });
    this.disableForm(this.isDisabled);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  getUserDetails(userId: any) {
    this.apiService.get(this.apiUrls.getUserById + userId).subscribe((res: any) => {
      if (res) {
        const data = res.data;
        if (data) {
          this.getDistByState(data.state);
          this.getMandals(data.district);
        }
        this.updateUserDetails.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          fatherFirstName: data.fatherFirstName,
          fatherLastName: data.fatherLastName,
          motherFirstName: data.motherFirstName,
          motherLastName: data.motherLastName,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          maritalStatus: data.maritalStatus,
          phoneNumber: data.phoneNumber,
          email: data.email,
          state: data.state,
          district: data.district,
          mandal: data.mandal,
          address: data.address,
          employmentStatus: data.employmentStatus,
          employmentType: data.employmentType,
          dependents: data.dependents,
          interestInPolitics: data.interestInPolitics,
          isContestInElection: data.isContestInElection,
          positionToContest: data.positionToContest,
          contestingConstituency: data.contestingConstituency,
          typeOfContribution: data.typeOfContribution,
          description: data.description,
          acceptConsent: data.acceptConsent,
          acceptDeclaration: data.acceptDeclaration,
        })
      }
    })
  }

  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateUserDetails.invalid) {
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
    }
    // console.log(userData)
    this.apiService.update(this.apiUrls.updateById + this.userId, userData).subscribe((res: any) => {
      if (res) {
        Swal.fire('Success', res.message, 'success');
        this.disableForm(!this.isDisabled);
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

  getDistByState(stateId: any) {
    this.apiService.get(this.apiUrls.getDistrictsByState + stateId).subscribe((res: any) => {
      if (res) {
        this.districts = res.districts;
      }
    }, erorr => {
      this.error = erorr.error.message;
    });
  }
  getDistrictsByStateId(event: any): void {
    const stateId = event.target.value;
    this.getDistByState(stateId);
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

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  enableForm(isDisabled: any) {
    this.disableForm(isDisabled);
  }
  private disableForm(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    if(isDisabled) {
      this.updateUserDetails.disable();
    }else{
      this.updateUserDetails.enable();
    }
  }
}
