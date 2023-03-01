import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from "@app/services/api-service.service";
import {ApiUrlsService} from "@app/services/api-urls.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listOfAllUsers: Array<any> = [];
  query: any = {
    page: 1,
    count: 10,
    fullName: ''
  }
  data: any = {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: false
  }
  userId: any;
  clientNames: any;
  public userName: any;
  @ViewChild('addUserModal') addUserModal: any;
  @ViewChild('resetPasswordModal') resetPasswordModal: any;
  public allSites: Array<any> = [];
  public errors: any[] | undefined;


  public changePassword = { id: '', password: '', confirmPassword: '' };
  public modalPass: any;
  // @ts-ignore
  public changePasswordError: string;
  // @ts-ignore
  public passwordValid: boolean;
  // @ts-ignore
  public changePasswordForm: FormGroup;
  // @ts-ignore
  // @ts-ignore
  public passwordConfirmValid: boolean;
  public showAndHideText = 'password';
  public ConfirmPasswordShowAndHideText = 'password';
  isTrue: boolean = false;
  isTrueConfirm : boolean = false;



  constructor(public apiService: ApiServiceService,
              private apiUrls: ApiUrlsService,
              private ngModalService: NgbModal,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.apiService.getAll(this.apiUrls.getAllUsers, this.query).subscribe((res: any) => {
      if (res) {
        this.listOfAllUsers = res.data.data;
      }
    });
  }

  addUser(): void {
    this.userId = '';
    this.ngModalService.open(this.addUserModal, {size: 'lg', backdrop: 'static', keyboard: false})
  }

  saveUser(): void {
    this.errors = [];
    if (!this.data.phoneNumber) {
      this.errors.push('Please enter 10 digit mobile number');
    } else if (!this.data.firstName) {
      this.errors.push('Please enter First Name');
    }else if (!this.data.lastName) {
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
    this.data.password= '',
    this.errors = [];
    this.data = {};
  }




  editUser(id: any) {
    this.userId = id;
    this.apiService.get(this.apiUrls.getUserById + this.userId).subscribe((res: any) => {
      this.data = res.data;
      this.ngModalService.open(this.addUserModal, {size: 'lg', backdrop: 'static', keyboard: false});
    })
  }

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
  resetPass(_id: any) {
    this.userId = _id;
    this.ngModalService.open(this.resetPasswordModal, {backdrop: 'static', keyboard: false, })
  }

  closeModal() {
  this.changePassword = { id: '', password: '', confirmPassword: '' };
    this.ngModalService.dismissAll();
  }
  showAndHidePassword(status: any, type: any): void{
    if ( type === 'Password'){
      this.isTrue = status;
      if (status === true){
        this.showAndHideText = 'text';
      } else {
        this.showAndHideText = 'password';
      }
    }else{
      this.isTrueConfirm = status;
      if (status === true){
        this.ConfirmPasswordShowAndHideText = 'text';
      } else {
        this.ConfirmPasswordShowAndHideText = 'password';
      }
    }

  }
  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
