import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiUrlsService} from "@app/services/api-urls.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private apiUrls: ApiUrlsService, private route: Router) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loggedInOMSUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): string {
    // @ts-ignore
    return localStorage.getItem('loggedInOMSUser');
  }

  logIn(phoneNumber: string, password: string): any {
    return this.http.post<any>(this.apiUrls.mainUrl + '/api/v1/auth/login', {phoneNumber, password})
      .pipe(map(response => {
        if (response) {
          localStorage.setItem('loggedInOMSUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logOut(): any {
    // @ts-ignore
    localStorage.clear('loggedInOMSUser');
    this.route.navigate(['/home']);
    this.currentUserSubject.next(null);
  }
}
