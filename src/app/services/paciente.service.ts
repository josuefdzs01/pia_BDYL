import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(private http: HttpClient) { }

  getPacientes(userID: any) {
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

  getPacienteUnique(email: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'pacienteAPI/getPaciente/pacienteID/' + email).subscribe((response: any) => {
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

  registerCita(request: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/registerCita/', request).subscribe((response: any) => {
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

  deleteCita(citaID: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.url + 'pacienteAPI/delete/citaID/' + citaID).subscribe((response: any) => {
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

  editCita(request: any, citaID: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url + 'pacienteAPI/edit/citaID/' + citaID, request).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getConsultas(idConsul: any, empleadoID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'pacienteAPI/getConsultas/idConsul/' + idConsul + '/idDoctor/' + empleadoID).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllConsultas(idConsul: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + 'pacienteAPI/getFullConsultas/idConsul/' + idConsul).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
