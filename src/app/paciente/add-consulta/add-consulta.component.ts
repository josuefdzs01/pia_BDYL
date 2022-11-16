import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { PacienteService } from 'src/app/services/paciente.service';
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
        let cita = {
          id_pacConsulta: this.datos.id_pacConsulta,
          id_empConsulta: this.datos.id_empleado,
          fechaCita: Date,
          peso: form.pesoConsulta,
          altura: form.alturaConsulta,
          temperatura: form.temperaturaConsulta,
          padecimiento: form.padecimiento,
          medicamento: form.medicamento
        }
        this._paciente.editCita(cita, cita.id_pacConsulta).then((response:any) => {
          if(response.StatusCode == 200){
            this._toastr.success('Cita editada.');
            this.createPDF();
            this.reloadTable.emit('saveOk');
            this.consultaForm.reset()
            $('#closeModal').click();
          }else if(response.StatusCode == 100) {
            this._toastr.error('Hubo un error al dar de alta el empleado, intenta de nuevo.');
            this._spinner.hide();
          }
        })
  }

  createPDF(){
    var dd = {
      content: [
        {
          image: '../../../assets/img/Medic Search.png',
          width: 150
        },
      ]
    }
    this._spinner.hide();
  }
}
