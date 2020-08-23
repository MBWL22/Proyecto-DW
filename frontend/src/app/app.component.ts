import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoComponent } from './Inicio/proyecto/proyecto.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('proyecto') proyectoComponent : ProyectoComponent;
  title = 'makecode-frontend';
  
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  onLogin(usuario){
    console.log('Usuario', usuario)
  }
}
