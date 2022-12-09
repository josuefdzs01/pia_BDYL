import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  responseLogin: any[] = [];
  responseEmpleado: any[] = [];

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
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'auth/loginConsul/user/' + request.email_consul +'/password/' + request.password_consul).subscribe((response: any) => {
        this.responseLogin = JSON.parse(response.body);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  loginEmpleado(request: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'auth/loginEmpleado/user/' + request.email_consul +'/password/' + request.password_consul).subscribe((response: any) => {
        this.responseEmpleado = JSON.parse(response.body);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllCiudad() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'Consultorio/getAllCiudad/').subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllPuesto() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'Consultorio/getAllPuesto/').subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllTurno() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'Consultorio/getAllTurno/').subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
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
