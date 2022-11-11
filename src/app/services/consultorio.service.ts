import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

  datosEmpleado: any[] = [];

  constructor(private http: HttpClient) { }

  registerEmpleado(request: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'empleado/registerEmpleado/', request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllEmpleados(userID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'empleado/getAllEmpleado/userID/' + userID).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  deleteEmpleado(userID: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.url + 'empleado/delete/userID/' + userID).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  editEmpleado(request: any, userID: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'empleado/edit/userID/' + userID, request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
