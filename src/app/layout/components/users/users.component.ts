import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from "@app/services/api-service.service";
import {ApiUrlsService} from "@app/services/api-urls.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ConfirmPasswordValidator} from "@app/services/ConfirmPassword.validator";
import {OnlynumberDirective} from "@app/directives/onlynumber.directive";

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
        size: 10,
        pageSizes: [],
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
    public usersCount: any;

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
                this.usersCount = res.data.total;
                OnlynumberDirective.pagination(res.data.total, this.query);
            }
        });
    }

    // addUser(): void {
    //     this.userId = '';
    //     this.ngModalService.open(this.addUserModal, {size: 'lg', backdrop: 'static', keyboard: false})
    // }


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

    handlePageChange(event: any): void {
        this.query.page = event;
        this.getAllUser();
    }

    handlePageSizeChange(event: any): void {
        console.log(event);
        this.query.size = event;
        this.query.page = 1;
        this.getAllUser();
    }
}
