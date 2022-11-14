import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-consulta',
  templateUrl: './add-consulta.component.html'
})
export class AddConsultaComponent implements OnInit, OnChanges {
  @Input() datoConsulta: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      console.log(this.datoConsulta);
  }
}
