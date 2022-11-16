import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class PacienteComponent implements OnInit, OnChanges {
  gridView: any[] = [];

  nameEmpleado:any ;
  idEmpleado:any ;
  pacienteData: any;

  datoConsulta: any;
  idConsul: any;

  citaData: any;

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
      this.idConsul = this._auth.responseEmpleado[0]['id_consul'];
      this.nameEmpleado = this._auth.responseEmpleado[0]['name_empleado'];
      this.idEmpleado = this._auth.responseEmpleado[0]['id_empleado'];
      this.getCitas(this.idConsul,this.idEmpleado);
    }
  }

  ngOnChanges(): void {
      this._consultorio.getEmpleados(this.idEmpleado).then((empleados:any) => {
        console.log(empleados)
      })
  }

  getCitas(idConsul:any,empleadoID:any){
    this._pacientes.getConsultas(idConsul, empleadoID).then((response:any) => {
      if(response.length >= 1){
        this.gridView = response;
        console.log(this.gridView);
      }
    })
  }

  onEdit(data:any){
    this.pacienteData = data;
    $('#editPaciente').modal('show');
  }

  onDelete(data:any){
    this.citaData = data;
    this._pacientes.deleteCita(data.id_consulta).then((response:any) => {
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
    })
  }

  reloadTable() {
    this.gridView = [];
    this.getCitas(this.idConsul,this.idEmpleado)
  }

  onConsulta(data:any){
    this.datoConsulta = data;
    $('#addConsulta').modal('show');
  }
}
