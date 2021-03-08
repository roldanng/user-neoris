import { Component, OnInit } from '@angular/core';
import {StorageService} from "../core/services/storage.service";
import {User} from "../core/models/user.model";
import {AuthenticationService} from "../login/shared/authentication.service";
import {HttpClient} from "@angular/common/http";
import {SelectionModel} from "@angular/cdk/collections";
import swal from 'sweetalert';

const initialSelection = [];
const allowMultiSelect = false;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user: User;


  displayedColumns: string[] = [ 'name', 'email', 'role', 'date', 'edit', 'delete'];
  dataSource = [];
  selection = new SelectionModel<Element>(true, []);
  status = '';

  constructor(private storageService: StorageService,
              private authenticationService: AuthenticationService,
              private http: HttpClient) { }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    this.http.get<any>('http://localhost:3000/user/users').subscribe(data => {
        this.dataSource = data;
    })

  }

  public logout(): void{
    {this.storageService.logout();}
  }

  public createUser () : void{

  }
 
deleteUser(element){
console.log(element);

swal({
  title: "Esta seguro de que desea eliminarlo?",
  text: "",
  icon: "warning",
  buttons: 1,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
this.http.delete('http://localhost:3000/user/'+ element._id + '/only')
    //.subscribe(() => this.status = 'Delete successful');
    .subscribe({
      next: data => {
          this.status = 'Delete successful';
          swal("", "Se ha eliminado correctamente", "success");
          this.ngOnInit();
      },
      error: error => {
          this.status = error.message;
          swal("", "Ha ocurrido un error", "error");
          this.ngOnInit();
      }
  });
    
  }
});
}



}
