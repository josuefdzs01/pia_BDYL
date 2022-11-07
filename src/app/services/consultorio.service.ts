import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

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

  getAllEmpleados() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'empleado/getAllEmpleado').subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
        console.log(error)
      });
    });
  }
}
