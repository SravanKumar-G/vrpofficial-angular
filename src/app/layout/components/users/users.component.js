import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { Validators } from "@angular/forms";
let UsersComponent = class UsersComponent {
    constructor(apiService, apiUrls, ngModalService, formBuilder) {
        this.apiService = apiService;
        this.apiUrls = apiUrls;
        this.ngModalService = ngModalService;
        this.formBuilder = formBuilder;
        this.listOfAllUsers = [];
        this.query = {
            page: 1,
            count: 10,
            fullName: ''
        };
        this.data = {
            userName: '',
            fullName: '',
            email: '',
            role: '',
            clientId: '',
            siteIds: []
        };
        this.allSites = [];
        this.changePassword = { id: '', password: '', confirmPassword: '' };
        this.showAndHideText = 'password';
        this.ConfirmPasswordShowAndHideText = 'password';
        this.isTrue = false;
        this.isTrueConfirm = false;
    }
    ngOnInit() {
        this.getAllUser();
        this.getAllClients();
        // this.getSitesForClients();
        this.changePasswordForm = this.formBuilder.group({
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }
    getAllUser() {
        this.apiService.getAll(this.apiUrls.getAllUsers, this.query).subscribe((res) => {
            if (res) {
                this.listOfAllUsers = res.data.data;
            }
        });
    }
    addUser() {
        this.getAllClients();
        this.userId = '';
        this.ngModalService.open(this.addUserModal, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    saveUser() {
        this.errors = [];
        if (!this.data.userName) {
            this.errors.push('Please enter 10 digit mobile number');
        }
        else if (!this.data.fullName) {
            this.errors.push('Please enter Full Name');
        }
        else if (!this.userId && !this.data.password) {
            this.errors.push('Please enter password');
        }
        else if (!this.userId && this.data.password.length < 6) {
            this.errors.push('Password should be 6 letters or more');
        }
        else if (!this.data.email) {
            this.errors.push('Please enter Email');
        }
        else if (!this.data.clientId) {
            this.errors.push('Please select Client');
        }
        else if (!this.data.siteIds) {
            this.errors.push('Please select Sites');
        }
        else if (!this.data.role) {
            this.errors.push('Please select Role');
        }
        else {
            if (!this.userId) {
                this.apiService.getAll(this.apiUrls.addUser, this.data).subscribe((res) => {
                    if (res) {
                        this.close();
                        Swal.fire('success', 'User added successfully..!', 'success');
                        this.getAllUser();
                        this.data = {};
                    }
                });
            }
            else {
                delete this.data.password;
                this.apiService.getAll(this.apiUrls.updateById + this.userId, this.data).subscribe((res) => {
                    if (res) {
                        this.close();
                        Swal.fire('success', 'User updated successfully..!', 'success');
                        this.data = {};
                        this.getAllUser();
                    }
                });
            }
        }
    }
    close() {
        this.ngModalService.dismissAll();
        this.data.userName = '',
            this.data.password = '',
            this.errors = [];
        this.data = {};
    }
    getAllClients() {
        this.apiService.get(this.apiUrls.getAllClients).subscribe((res) => {
            if (res) {
                this.clientNames = res.result;
            }
        });
    }
    getSitesForClients() {
        this.apiService.getAll(this.apiUrls.getSitesForClients, { clientId: this.data.clientId }).subscribe((res) => {
            if (res) {
                this.allSites = res.sites;
            }
        });
    }
    selectAll() {
        this.data.siteIds = this.allSites.map(x => x._id);
    }
    unselectAll() {
        this.data.siteIds = [];
    }
    editUser(id) {
        this.userId = id;
        this.apiService.get(this.apiUrls.getUserById + this.userId).subscribe((res) => {
            this.data = res.data;
            if (!this.data.clientId) {
                this.data.siteIds = [];
            }
            else {
                this.getSitesForClients();
            }
            this.ngModalService.open(this.addUserModal, { size: 'lg', backdrop: 'static', keyboard: false });
        });
    }
    deleteUser(id) {
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
                this.apiService.delete(this.apiUrls.deleteUser + id).subscribe((res) => {
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    this.getAllUser();
                });
            }
        });
    }
    submitChangePassword(isValid) {
        if (isValid) {
            this.changePassword.id = this.userId;
            if (this.changePassword.id && this.changePassword.password) {
                this.apiService.getAll(this.apiUrls.updatePassword, this.changePassword).subscribe((response) => {
                    if (response) {
                        this.changePasswordError = '';
                        this.ngModalService.dismissAll();
                        Swal.fire('Updated', 'Password Updated successfully..!', 'success');
                    }
                });
            }
        }
        else {
            this.changePasswordError = 'Please enter all mandatory fields';
        }
    }
    resetPass(_id) {
        this.userId = _id;
        this.ngModalService.open(this.resetPasswordModal, { backdrop: 'static', keyboard: false, });
    }
    closeModal() {
        this.changePassword = { id: '', password: '', confirmPassword: '' };
        this.ngModalService.dismissAll();
    }
    confirmPasswordC(password, confirmPassword) {
        if (password !== confirmPassword) {
            this.passwordErrorValid = true;
            this.passwordSuccessValid = false;
            this.passwordValid = true;
            this.passwordConfirmValid = false;
        }
        else {
            this.passwordErrorValid = false;
            this.passwordSuccessValid = true;
            this.passwordValid = false;
            this.passwordConfirmValid = true;
        }
    }
    showAndHidePassword(status, type) {
        if (type === 'Password') {
            this.isTrue = status;
            if (status === true) {
                this.showAndHideText = 'text';
            }
            else {
                this.showAndHideText = 'password';
            }
        }
        else {
            this.isTrueConfirm = status;
            if (status === true) {
                this.ConfirmPasswordShowAndHideText = 'text';
            }
            else {
                this.ConfirmPasswordShowAndHideText = 'password';
            }
        }
    }
};
__decorate([
    ViewChild('addUserModal')
], UsersComponent.prototype, "addUserModal", void 0);
__decorate([
    ViewChild('resetPasswordModal')
], UsersComponent.prototype, "resetPasswordModal", void 0);
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss']
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map