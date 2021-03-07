import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userlogin: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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
    this.submitted = true;
    console.log("this.userlogin.value: ", this.userlogin.value)
    // stop here if form is invalid
    if (this.userlogin.invalid) {
        return;
    }
    
}

 }

