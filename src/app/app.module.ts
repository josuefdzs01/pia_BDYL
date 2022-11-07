import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginConsultorioComponent } from './login-consultorio/login-consultorio.component';
import { LoginEmpleadoComponent } from './login-empleado/login-empleado.component';
import { RegisterComponent } from './register/register.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AddPacienteComponent } from './paciente/add-paciente/add-paciente.component';
import { AddEmpleadoComponent } from './empleado/add-empleado/add-empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    AppComponent,
    LoginConsultorioComponent,
    LoginEmpleadoComponent,
    RegisterComponent,
    EmpleadoComponent,
    PacienteComponent,
    AddPacienteComponent,
    AddEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-circus' }),
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
