import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {AuthenticationService} from "./shared/authentication.service";
import {StorageService} from "../core/services/storage.service";
import {LoginObject} from "./shared/login-object.model";
import {Session} from "../core/models/session.model";
import {Router} from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userlogin: FormGroup;
  submitted = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.userlogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email valido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  hide = true;

  onSubmit() {
    
    //this.error = null;


    // stop here if form is invalid
    if (this.userlogin.invalid) {
        return;
    }

    this.authenticationService.login(new LoginObject(this.userlogin.value)).subscribe(
      data => {
        this.correctLogin(data)},
      error => {
        console.log('Error: ', error);
        this.error = error;
      }
    );
    
}

private correctLogin(data: Session){
  this.storageService.setCurrentSession(data);
  this.router.navigate(['/home']);
}

 }

