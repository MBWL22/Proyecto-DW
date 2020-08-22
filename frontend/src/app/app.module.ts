import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HeaderInicioComponent } from './inicio/header-inicio/header-inicio.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { LandingComponent } from './component/landing/landing.component';
import { RegisterComponent } from './component/register/register.component';
import { RepositorioComponent } from './inicio/repositorio/repositorio.component';
import { AppLandingComponent } from './app-landing/app-landing.component';
import { AppInicioComponent } from './app-inicio/app-inicio.component';
import { ProyectoComponent } from './inicio/proyecto/proyecto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProyectoComponent,
    RegisterComponent,
    LandingComponent,
    AppLandingComponent,
    AppInicioComponent,
    HeaderInicioComponent,
    RepositorioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ValidateEqualModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
