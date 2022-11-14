import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from '../services/auth-service.service';
import { ConsultorioService } from '../services/consultorio.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit {
  gridView: any[];

  nameConsultorio:any ;
  idConsultorio:any ;
  empleadoData: any;

  constructor(private _consultorio: ConsultorioService,
    private _auth: AuthServiceService,
    private _toastr: ToastrService,
    private _router: Router,
    private _spinner: NgxSpinnerService) {
      this.gridView = []
     }

  ngOnInit(): void {
    if(this._auth.responseLogin.length == 0){
      this._router.navigate(['/loginConsultorio']);
    }else{
      this.nameConsultorio = this._auth.responseLogin[0]['Nombre'];
      this.idConsultorio = this._auth.responseLogin[0]['ID'];
      this.getAllEmpleados(this.idConsultorio)
    }
  }

  getAllEmpleados(userID:any){
    this._consultorio.getAllEmpleados(userID).then((response:any) => {
      if(response.length >= 1){
        this.gridView = response;
      }
    })
  }

  /**
   * @method reloadTable()
   * @description: Reload the main table
   */
   reloadTable() {
    this.gridView = [];
    this.getAllEmpleados(this.idConsultorio);
  }

  onEdit(data:any){
    this.empleadoData = data;
    $('#editEmpleado').modal('show');
  }

  onDelete(data:any){
    console.log(data);
    this._consultorio.deleteEmpleado(data.id_empleado).then((response:any) => {
      if(response.StatusCode == 200){
        this._toastr.success('Empleado eliminado correctamente');
        this.reloadTable();
      }else{
        this._toastr.error('Hubo un error al eliminar empleado, intente nuevamente');
      }
    })
  }
}
