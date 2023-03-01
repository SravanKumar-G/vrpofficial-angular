import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {
    // mainUrl = environment.url;
  mainUrl = 'http://localhost:9999';

//   Apiurls
  register = "/api/v1/auth/register";

//  User API's
  addUser =  '/api/clientUser/add';
  getAllUsers =  '/api/v1/user/getAllUsers';
  getUserById = '/api/v1/user/getUser/';
  updateById ='/api/v1/user/updateUser/';
  deleteUser ='/api/v1/user/deleteUser/';
  updatePassword ='/api/v1/user/updatePassword';

}
