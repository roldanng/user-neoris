import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
import {Session} from "../../core/models/session.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private basePath = 'http://localhost:3000/user/login';
  

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath, loginObj, {responseType: 'text' as 'json'});
  }



}

