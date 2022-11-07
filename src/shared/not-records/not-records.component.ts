import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-records',
  templateUrl: './not-records.component.html'
})
export class NotRecordsComponent implements OnInit {
  @Input() label:any;

  constructor() { }

  ngOnInit(): void {
    if(this.label === null || this.label === undefined || this.label === ''){
      this.label = "No hay resultados que mostrar."
    }
  }

}
