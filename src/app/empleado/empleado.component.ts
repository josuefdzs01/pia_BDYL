import { Component, OnInit } from '@angular/core';
import { ConsultorioService } from '../services/consultorio.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit {
  gridView: any[] = [];

  constructor(private _consultorio: ConsultorioService) { }

  ngOnInit(): void {
    this.getAllEmpleados()
  }

  getAllEmpleados(){
    this._consultorio.getAllEmpleados().then((response:any) => {
      console.log(response)
      this.gridView = response;
    })
  }

  onEdit(){
    console.log('Editar')
  }

  onDelete(){
    console.log('Eliminar');
  }

}
