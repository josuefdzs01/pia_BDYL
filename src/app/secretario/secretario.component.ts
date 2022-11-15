import { PacienteService } from './../services/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
import { ConsultorioService } from '../services/consultorio.service';
declare var $: any;

@Component({
  selector: 'app-secretario',
  templateUrl: './secretario.component.html'
})
export class SecretarioComponent implements OnInit {
  gridView: any[] = [];

  nameEmpleado:any ;
  idEmpleado:any ;

  nameConsultorio:any ;
  idConsultorio:any ;
  empleadoData: any;
  
  pacienteData: any;
  datoConsulta: any;

  constructor(private _consultorio: ConsultorioService,
    private _auth: AuthServiceService,
    private _empleado: PacienteService,
    private _toastr: ToastrService,
    private _router: Router,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(this._auth.responseEmpleado.length == 0){
      this._router.navigate(['/loginConsultorio']);
    }else{
      this.nameEmpleado = this._auth.responseEmpleado[0]['name_empleado'];
      this.idConsultorio = this._auth.responseEmpleado[0]['id_consul'];
      this.idEmpleado = this._auth.responseEmpleado[0]['id_consul'];
      // this.getEmpleados(this.idConsultorio)
      this.getAllPacientes(this.idConsultorio);
    }
  }

  // getEmpleados(userID:any){
  //   this._consultorio.getEmpleados(userID).then((response:any) => {
  //     if(response.length >= 1){
  //       this.gridView = response;
  //     }
  //   })
  // }

  getAllPacientes(idConsultorio: any){
    this._empleado.getPacientes(idConsultorio).then((response:any) => {
      if(response.length >= 1){
        this.gridView = response;
      }
    })
  }

  onEdit(data:any){
    this.pacienteData = data;
    $('#editCita').modal('show');
  }

  onDelete(data:any){
    this._empleado.deletePaciente(data.id_paciente).then((response:any) => {
      if(response.StatusCode == 200){
        this._empleado.deleteContacto(data.id_contacto).then((response2:any) => {
          if(response2.StatusCode == 200){
            this._toastr.success("Paciente eliminado correctamente!");
            this.reloadTable()
          }
        })
      }
    })
  }

    /**
   * @method reloadTable()
   * @description: Reload the main table
   */
     reloadTable() {
      this.gridView = [];
      this.getAllPacientes(this.idConsultorio);
    }
}
