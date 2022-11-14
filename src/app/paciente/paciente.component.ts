import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
import { ConsultorioService } from '../services/consultorio.service';
import { PacienteService } from '../services/paciente.service';
declare var $: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent implements OnInit {
  gridView: any[] = [];

  nameEmpleado:any ;
  idEmpleado:any ;
  pacienteData: any;

  datoConsulta: any;

  constructor(private _consultorio: ConsultorioService,
    private _pacientes: PacienteService,
    private _auth: AuthServiceService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(this._auth.responseEmpleado.length == 0){
      this._router.navigate(['/loginEmpleado']);
    }else{
      this.nameEmpleado = this._auth.responseEmpleado[0]['name_empleado'];
      this.idEmpleado = this._auth.responseEmpleado[0]['id_empleado'];
      this.getAllPacientes(this.idEmpleado);
    }
  }

  getAllPacientes(userID:any){
    this._pacientes.getAllPacientes(userID).then((response:any) => {
      if(response.length >= 1){
        this.gridView = response;
      }
    })
  }

  onEdit(data:any){
    this.pacienteData = data;
    $('#editPaciente').modal('show');
  }

  onDelete(data:any){
    console.log(data);
    this._pacientes.deletePaciente(data.id_paciente).then((response:any) => {
      if(response.StatusCode == 200){
        this._pacientes.deleteContacto(data.id_contacto).then((response2:any) => {
          if(response2.StatusCode == 200){
            this._toastr.success("Paciente eliminado correctamente!");
            this.reloadTable()
          }
        })
      }
    })
  }

  reloadTable() {
    this.gridView = [];
    this.getAllPacientes(this.idEmpleado);
  }

  onConsulta(data:any){
    console.log('Consulta');
    this.datoConsulta = data;
    $('#addConsulta').modal('show');
  }
}
