import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LandingComponent } from './component/landing/landing.component';
import { RegisterComponent } from './component/register/register.component';
import { AppLandingComponent } from './app-landing/app-landing.component';
import { AppInicioComponent } from './app-inicio/app-inicio.component';
import { ProyectoComponent } from './inicio/proyecto/proyecto.component';
import { RepositorioComponent } from './inicio/repositorio/repositorio.component';

const routes: Routes = [
  { path: '', component: AppLandingComponent, children: [
    { path: '', component: LandingComponent},
    { path:'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }] 
  },
  { path: 'inicio', component: AppInicioComponent, children: [
    { path:'', component: ProyectoComponent},
    { path:'repositorio', component: RepositorioComponent}, 
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
