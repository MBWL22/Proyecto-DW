import { Component, OnInit, } from '@angular/core';
import { Router,  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ScriptsService } from 'src/app/scripts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [ AuthService, ]
})


export class ProyectoComponent implements OnInit {
  idUsuario:any = '';
  datosUsuario:any = '';
  formularioLogin = new FormGroup({
    correo:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private _scripts: ScriptsService, private usuarioService : UsuariosService) { 
    _scripts.load(["index/proyecto"])
  }

  ngOnInit(): void {
    if(this.authService.inSesion() && this.authService.inSesion() !== ''){
      console.log('esta logueado');
      this.idUsuario = localStorage.getItem("idUsuario");
      this.usuarioService.obtenerDatosUsuario(this.idUsuario).subscribe(res => {
        console.log(res);
        this.datosUsuario = res;
      },error => {
        console.log(error)
      });

  }else{
      console.log('necesita loguearse');
      this.router.navigate(['/login']);
  }
  }

}
