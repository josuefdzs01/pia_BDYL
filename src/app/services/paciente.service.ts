import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(private http: HttpClient) { }

  getAllPacientes(userID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'pacienteAPI/getAllPaciente/userID/' + userID).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  registerPaciente(request: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/registerEmpleado/', request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  deletePaciente(pacienteID: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.url + 'pacienteAPI/delete/pacienteID/' + pacienteID).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  editPaciente(request: any, pacienteID: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/edit/pacienteID/' + pacienteID, request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
