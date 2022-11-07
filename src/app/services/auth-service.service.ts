import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  registerConsultorio(request: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'auth/registerConsul/', request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  loginConsultorio(request: any) {
    console.log(request);
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'auth/loginConsul/user/' + request.email_consul +'/password/' + request.password_consul).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
        console.log(error)
      });
    });
  }

  loginEmpleado(request: any) {
    console.log(request);
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'empleado/loginEmpleado/user/' + request.email_consul +'/password/' + request.password_consul).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
        console.log(error)
      });
    });
  }

  consultaConsultorio(request: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'Consultorio/getAllConsultorio/').subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  forgotPassword(request:any){
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'Consultorio/getAllConsultorio/').subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
