import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.css'],
  providers: [ AuthService]
})
export class HeaderInicioComponent implements OnInit {
  idUsuario:any = '';
  datosUsuario:any = {};
  constructor(private authService: AuthService, private router: Router, private usuarioService:UsuariosService) { }
  
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

  EditarPerfil(): void {
    this.router.navigate(['inicio/perfil']);
  }

  Logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 
}
