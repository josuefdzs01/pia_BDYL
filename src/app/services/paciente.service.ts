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
      this.http.get(environment.url + 'empleado/getAllPaciente/userID/' + userID).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
