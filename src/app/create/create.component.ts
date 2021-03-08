import { Component, OnInit } from '@angular/core';

import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import swal from 'sweetalert';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userCreate: FormGroup;

  roles: any[] = [
    { role: 'Administrador' },
    { role: 'Recepcionista' },
    { role: 'Sistemas' },
    { role: 'Ventas' }
];

status = '';

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { 

    this.userCreate = formBuilder.group({
      fontSize: 12,
    });
  } 

  ngOnInit() {
    this.userCreate = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmation: ['', [Validators.required, Validators.minLength(1)]],
      role: ['', [Validators.required]]
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
    if (this.userCreate.value.password !== this.userCreate.value.confirmation ) {
      swal("", "La contraseña no coincide" , "error");
      return 0
    }
    
    // stop here if form is invalid
    if (this.userCreate.invalid) {
        return;
    } else {
      delete this.userCreate.value.confirmation
      this.http.post('http://localhost:3000/user/register', this.userCreate.value)
    //.subscribe(() => this.status = 'Delete successful');
    .subscribe({
      next: data => {
          this.status = 'Delete successful';
          swal("", "Usuario creado con exito", "success");
          this.router.navigate(['/home']);
      },
      error: error => { console.log("error", error);
          this.status = error.message;
          swal("", error.error, "error");
         
      }
  });
    }

    

    
    
}

}
