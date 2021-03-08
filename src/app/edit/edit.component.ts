import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import swal from 'sweetalert';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userEdit: FormGroup;
  dataSource = [];
  roles: any[] = [
    { role: 'Administrador' },
    { role: 'Recepcionista' },
    { role: 'Sistemas' },
    { role: 'Ventas' }
];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.userEdit = formBuilder.group({
        fontSize: 12,
      });
     }

  ngOnInit() {

    this.userEdit = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      role: ['', [Validators.required]]
  });

  this.activatedRoute.params.subscribe((params: Params) => {
    if (params.uid){
      console.log("params:", params.uid);
      this.http.get<any>('http://localhost:3000/user/'+ params.uid +'/only').subscribe(data => {
        this.dataSource = data;
        this.userEdit.get('role').setValue(this.dataSource.role);
        this.userEdit.get('password').setValue(this.dataSource.password);
        this.userEdit.get('name').setValue(this.dataSource.name);
        this.userEdit.get('email').setValue(this.dataSource.email);

    })

    

    }
  })

   

}
    

  
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email valido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  hide = true;
  status = "";
  onSubmit() {
    // stop here if form is invalid
    if (this.userEdit.invalid) {
      return;
    } else {
    console.log("update:", this.userEdit.value);

    this.http.put('http://localhost:3000/user/update', this.userEdit.value)
    //.subscribe(() => this.status = 'Delete successful');
    .subscribe({
      next: data => {
          this.status = 'Delete successful';
          swal("", "Actualizacion correctamente", "success");
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
