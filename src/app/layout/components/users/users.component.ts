import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from "@app/services/api-service.service";
import {ApiUrlsService} from "@app/services/api-urls.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ConfirmPasswordValidator} from "@app/services/ConfirmPassword.validator";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    listOfAllUsers: Array<any> = [];
    states: Array<any> = [];
    districts: Array<any> = [];
    mandals: Array<any> = [];
    query: any = {
        page: 1,
        count: 50,
        phoneNumber: '',
        state: '',
        district: '',
        mandal: '',
    }
    data: any = { };
    userId: any;
    public userName: any;
    @ViewChild('viewUserDetailsModal') viewUserDetailsModal: any;
    @ViewChild('resetPasswordModal') resetPasswordModal: any;
    public errors: any[] | undefined;


    public changePassword = {id: '', password: '', confirmPassword: ''};
    public modalPass: any;
    // @ts-ignore
    public changePasswordError: string;
    // @ts-ignore
    public passwordValid: boolean;
    // @ts-ignore
    public changePasswordForm: FormGroup;
    public showAndHideText = 'password';
    public ConfirmPasswordShowAndHideText = 'password';
    isTrue: boolean = false;
    isTrueConfirm: boolean = false;

    get r() {
        return this.resetPassForm.controls;
    }

    resetPassForm: any = FormGroup;
    public submitted = false;
    showPassword: any = false;
    showConfirmPassword: any = false;


    constructor(public apiService: ApiServiceService,
                private apiUrls: ApiUrlsService,
                private ngModalService: NgbModal,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAllUser();
        this.getAllStates();
        this.getAllDistricts('');
        this.getAllMandals('');
        this.resetPassForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        },{
            validator: ConfirmPasswordValidator("password", "confirmPassword")
        })
    }

    getAllStates() {
        this.apiService.get(this.apiUrls.getAllStates).subscribe((res: any) => {
            if (res) {
                this.states = res.states;
            }
        });
    }

    getAllDistricts(stateId: any) {
        if (stateId) {
            this.apiService.get(this.apiUrls.getDistrictsByState + stateId).subscribe((res: any) => {
                if (res) {
                    this.districts = res.districts;
                }
            });
        }else{
            this.apiService.get(this.apiUrls.getAllDistricts).subscribe((res: any) => {
                if (res) {
                    this.districts = res.districts;
                }
            });
        }
    }

    getAllMandals(distId: any) {
        if (distId) {
            this.apiService.get(this.apiUrls.getMandalsByDistrict + distId).subscribe((res: any) => {
                if (res) {
                    this.mandals = res.mandals;
                }
            });
        }else{
            this.apiService.get(this.apiUrls.getAllMandals).subscribe((res: any) => {
                if (res) {
                    this.mandals = res.mandals;
                }
            });
        }
    }

    getAllUser(): void {
        this.apiService.getAll(this.apiUrls.getAllUsers, this.query).subscribe((res: any) => {
            if (res) {
                this.listOfAllUsers = res.data.data;
            }
        });
    }

    // addUser(): void {
    //     this.userId = '';
    //     this.ngModalService.open(this.addUserModal, {size: 'lg', backdrop: 'static', keyboard: false})
    // }

    saveUser(): void {
        this.errors = [];
        if (!this.data.phoneNumber) {
            this.errors.push('Please enter 10 digit mobile number');
        } else if (!this.data.firstName) {
            this.errors.push('Please enter First Name');
        } else if (!this.data.lastName) {
            this.errors.push('Please enter Last Name');
        } else if (!this.userId && !this.data.password) {
            this.errors.push('Please enter password');
        } else if (!this.userId && this.data.password.length < 6) {
            this.errors.push('Password should be 6 letters or more');
        } else if (!this.data.email) {
            this.errors.push('Please enter Email');
        } else if (!this.data.role) {
            this.errors.push('Please select Role');
        } else {
            if (!this.userId) {
                this.apiService.getAll(this.apiUrls.addUser, this.data).subscribe((res: any) => {
                    if (res) {
                        this.close();
                        Swal.fire('success', 'User added successfully..!', 'success');
                        this.getAllUser();
                        this.data = {};
                    }
                })
            } else {
                delete this.data.password;
                this.apiService.update(this.apiUrls.updateById + this.userId, this.data).subscribe((res: any) => {
                    if (res) {
                        this.close();
                        Swal.fire('success', 'User updated successfully..!', 'success');
                        this.data = {};
                        this.getAllUser();
                    }
                })
            }
        }
    }

    close(): void {
        this.ngModalService.dismissAll();
        this.data.userName = '',
            this.data.password = '',
            this.errors = [];
        this.data = {};
    }


    // editUser(id: any) {
    //     this.userId = id;
    //     this.apiService.get(this.apiUrls.getUserById + this.userId).subscribe((res: any) => {
    //         this.data = res.data;
    //         this.ngModalService.open(this.addUserModal, {size: 'lg', backdrop: 'static', keyboard: false});
    //     })
    // }

    deleteUser(id: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.delete(this.apiUrls.deleteUser + id).subscribe((res: any) => {
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                    )
                    this.getAllUser();
                });
            }
        });
    }

    submitChangePassword(isValid: any): void {
        if (isValid) {
            this.changePassword.id = this.userId;
            if (this.changePassword.id && this.changePassword.password) {
                this.apiService.getAll(this.apiUrls.updatePassword, this.changePassword).subscribe((response: any) => {
                    if (response) {
                        this.changePasswordError = '';
                        this.ngModalService.dismissAll();
                        Swal.fire(
                            'Updated',
                            'Password Updated successfully..!',
                            'success'
                        );
                    }
                });
            }
        } else {
            this.changePasswordError = 'Please enter all mandatory fields';
        }
    }

    resetPass(userInfo: any) {
        this.userName = userInfo.firstName + ' ' + userInfo.lastName;
        this.userId = userInfo._id;
        this.ngModalService.open(this.resetPasswordModal, {backdrop: 'static', keyboard: false,})
    }

    closeModal() {
        this.changePassword = {id: '', password: '', confirmPassword: ''};
        this.ngModalService.dismissAll();
    }

    showAndHidePassword(status: any, type: any): void {
        if (type === 'Password') {
            this.isTrue = status;
            if (status === true) {
                this.showAndHideText = 'text';
            } else {
                this.showAndHideText = 'password';
            }
        } else {
            this.isTrueConfirm = status;
            if (status === true) {
                this.ConfirmPasswordShowAndHideText = 'text';
            } else {
                this.ConfirmPasswordShowAndHideText = 'password';
            }
        }

    }

    goToDashboard(): void {
        this.router.navigate(['dashboard']);
    }

    viewUserDetails(userDetails: any) {
        this.userId = userDetails._id;
        this.userName = userDetails.firstName + ' ' + userDetails.lastName;
        this.apiService.get(this.apiUrls.getUserDetails + this.userId).subscribe((res: any) => {
            this.data = res.data;
            this.ngModalService.open(this.viewUserDetailsModal, {size: 'lg', backdrop: 'static', keyboard: false});
        })
    }

    downloadExcel() {
        this.apiService.downloadExcel('excelDownload', 'listOfUsers', '', '', this.listOfAllUsers);
    }

    resetFilters() {
        this.query = {
            phoneNumber: '',
            state: '',
            district: '',
            mandal: ''
        }
    }

    resetPassword() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.resetPassForm.invalid) {
            return;
        }
        this.apiService.getAll(this.apiUrls.updatePassword + this.userId,
            {password: this.r.password.value})
            .subscribe((res: any) => {
            if (res) {
                this.close();
                Swal.fire('Success', 'Password Updated successfully..!', 'success')
            }
        })
    }

    togglePasswordVisibility(showOrHide: any) {
        this.showPassword = showOrHide;
    }

    toggleConfirmPasswordVisibility(showOrHide: any) {
        this.showConfirmPassword = showOrHide;
    }
}
