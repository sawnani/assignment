import { ApiResponse } from './api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CoffeeService {

    constructor(private http: HttpClient) { }

   
    getCoffeeDetails(): Observable<any> {

        let url = '';
    
    
          url = 'https://random-data-api.com/api/coffee/random_coffee?size=10';
          console.log(url);
    
          return this.http.get<ApiResponse<any>>(url);
    
    
      }
}