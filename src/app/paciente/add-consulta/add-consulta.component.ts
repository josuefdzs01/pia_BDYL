import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { PacienteService } from 'src/app/services/paciente.service';
import jspfd from 'jspdf'
import html2canvas from 'html2canvas';
import 'jspdf-autotable'
declare var $: any;

@Component({
  selector: 'app-add-consulta',
  templateUrl: './add-consulta.component.html'
})
export class AddConsultaComponent implements OnInit, OnChanges {
  @Input() datoConsulta: any;
  @Output() reloadTable = new EventEmitter();

  datos: any;

  consultaForm = new FormGroup({
    pesoConsulta: new FormControl('', [Validators.required]),
    alturaConsulta: new FormControl('', [Validators.required]),
    temperaturaConsulta: new FormControl('', [Validators.required]),
    padecimiento: new FormControl('', [Validators.required]),
    medicamento: new FormControl('', [Validators.required]),
  })

  constructor(private _authService: AuthServiceService,
    private _consultorio: ConsultorioService,
    private _paciente: PacienteService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.datoConsulta != undefined){
      this.datos = this.datoConsulta;
      console.log(this.datoConsulta);
    };
  }

  onSaveConsulta(form:any){
    const [dateComponents, timeComponents] = this.datos.fechaCita.split(' ');
    const [day,month,year] = dateComponents.split('/');  
    console.log(month,day,year);
        let cita = {
          id_pacConsulta: this.datos.id_pacConsulta,
          id_empConsulta: this.datos.id_empleado,
          fechaCita: year + '/' + month + '/' + day,
          peso: form.pesoConsulta,
          altura: form.alturaConsulta,
          temperatura: form.temperaturaConsulta,
          padecimiento: form.padecimiento,
          medicamento: form.medicamento
        }
        this._paciente.editCita(cita, cita.id_pacConsulta).then((response:any) => {
          if(response.StatusCode == 200){
            this._toastr.success('Cita editada.');
            this.openPDF();
            this._spinner.hide();
            this.reloadTable.emit('saveOk');
            this.consultaForm.reset()
            $('#closeModal').click();
          }else if(response.StatusCode == 100) {
            this._toastr.error('Hubo un error al dar de alta el empleado, intenta de nuevo.');
            this._spinner.hide();
          }
        })
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('consulta');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 150;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('../../../assets/img/Medic Search.png');
      let PDF = new jspfd('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('receta.pdf');
    });
  }
}
