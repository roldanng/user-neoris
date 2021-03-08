import { Component, OnInit } from '@angular/core';
import {StorageService} from "../core/services/storage.service";
import {User} from "../core/models/user.model";
import {AuthenticationService} from "../login/shared/authentication.service";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user: User;


  displayedColumns: string[] = [ 'name', 'email', 'role', 'date', 'edit', 'delete'];
  dataSource = [];



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

}
