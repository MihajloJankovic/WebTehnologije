import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {ApiService} from "../api-service.service";
import {UserServiceService} from "../user-service.service";
import {ConfigServiceService} from "./config-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(  public jwtHelper: JwtHelperService,
                private apiService: ApiService,
                private userService: UserServiceService,
                private config: ConfigServiceService,
                private router: Router,
                private route: ActivatedRoute,) { }

  create(user:any) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    // const body = `username=${user.username}&password=${user.password}`;
    const body = {
      'tekst': user.post,


    };
    return this.apiService.post(this.config._postcreate_url, JSON.stringify(body), loginHeaders)
      .subscribe((res) => {
        if(res.body == "NOT_ACCEPTABLE" || res.name == "HttpErrorResponse")
        {
          alert("wrong Details")
        }else {
          alert("Creation success");
          let returnUrl : String;
          returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl + "/HomePage"]);
        }
      });
  }
  public g : any;
  getAll() {



     return this.apiService.get(this.config._postAll_url);

  }
}