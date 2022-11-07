import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent implements OnInit {
  gridView: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(){
    console.log('Editar')
  }

  onDelete(){
    console.log('Eliminar');
  }

}
