import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {
    // mainUrl = environment.url;
  // mainUrl = 'http://localhost:9999';
  mainUrl = 'http://registration.vrpofficial.com';

//   Apiurls
  register = "/api/v1/auth/register";

//  User API's
  addUser =  '/api/clientUser/add';
  getAllUsers =  '/api/v1/user/getAllUsers';
  getUserById = '/api/v1/user/getUser/';
  getUserDetails = '/api/v1/user/viewUserDetails/';
  updateById ='/api/v1/user/updateUser/';
  deleteUser ='/api/v1/user/deleteUser/';
  updatePassword ='/api/v1/user/updatePassword/';
  getAllStates ='/api/v1/noauth/getStates';
  getAllDistricts ='/api/v1/noauth/getAllDistricts';
  getAllMandals ='/api/v1/noauth/getAllMandals';
  getDistrictsByState ='/api/v1/noauth/getDistrictsByStateId/';
  getMandalsByDistrict ='/api/v1/noauth/getMandalsByDistrict/';
  getConstituenciesByDistrict ='/api/v1/noauth/getConstituenciesByDistrict/';
  getParliamentConst ='/api/v1/noauth/getParliamentConst';
  getAllConstituencies ='/api/v1/noauth/getAllConstituencies/';

}
