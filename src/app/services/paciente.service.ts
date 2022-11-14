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

  getAllContactos(emailContacto: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'pacienteAPI/getAllContacto/emailCont/' + emailContacto).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  registerPaciente(request: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/registerPaciente/', request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  registerContacto(request: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/registerContacto/', request).subscribe((response: any) => {
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

  deleteContacto(contactoID: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.url + 'pacienteAPI/delete/contactoID/' + contactoID).subscribe((response: any) => {
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

  editContacto(request: any, contactoID: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/edit/contactoID/' + contactoID, request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
