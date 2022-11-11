import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
import { ConsultorioService } from '../services/consultorio.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent implements OnInit {
  gridView: any[] = [];

  nameEmpleado:any ;
  idEmpleado:any ;
  empleadoData: any;

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
      console.log(this.nameEmpleado)
      this.getAllPacientes(this.idEmpleado);
    }
  }

  getAllPacientes(userID:any){
    this._pacientes.getAllPacientes(userID).then((response:any) => {
      console.log(response);
      if(response.length >= 1){
        this.gridView = response;
      }
    })
  }

  onEdit(){
    console.log('Editar')
  }

  onDelete(){
    console.log('Eliminar');
  }

}
