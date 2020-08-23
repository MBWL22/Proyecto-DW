import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [ AuthService]
})
export class PerfilComponent implements OnInit {
  idUsuario:any = '';
  datosUsuario:any = {};
  passwordInvalida:any = false;
  errors:any = '';
  messageUpdate:any = false;

  formularioRegistro = new FormGroup({
    nombreUsuario:new FormControl('', [Validators.required, Validators.minLength(2)]),
    apelidoUsuario:new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo:new FormControl('', [Validators.required,Validators.email]),
    plan:new FormControl('', [Validators.required]),
    fechaNacimiento:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword:new FormControl('',  [Validators.required]),
  });


  constructor(private authService: AuthService, private router: Router, private usuarioService : UsuariosService) { }

  ngOnInit(): void {
    if(this.authService.inSesion() && this.authService.inSesion() !== ''){
      console.log('esta logueado');
      this.idUsuario = localStorage.getItem("idUsuario");
      this.usuarioService.obtenerDatosUsuario(this.idUsuario).subscribe(res => {
        console.log(res);
        this.datosUsuario = res;
        this.formularioRegistro.get('nombreUsuario').setValue(res.nombreUsuario);
        this.formularioRegistro.get('apelidoUsuario').setValue(res.apelidoUsuario);
        this.formularioRegistro.get('correo').setValue(res.correo);
        this.formularioRegistro.get('plan').setValue(res.fechaNacimiento.plan);
        this.formularioRegistro.get('fechaNacimiento').setValue(res.fechaNacimiento);
        this.formularioRegistro.get('password').setValue(res.password);
      },error => {
        console.log(error)
      });
    }else{
        console.log('necesita loguearse');
        this.router.navigate(['/login']);
    }
  }
  
  get nombreUsuario(){
    return this.formularioRegistro.get('nombreUsuario');
  }
  get apelidoUsuario(){
    return this.formularioRegistro.get('apelidoUsuario');
  }

  get correo(){
    return this.formularioRegistro.get('correo');
  }

  get plan(){
    return this.formularioRegistro.get('plan');
  }

  get fechaNacimiento(){
    return this.formularioRegistro.get('fechaNacimiento');
  }
  get password(){
    return this.formularioRegistro.get('password');
  }

  get confirmPassword(){
    return this.formularioRegistro.get('confirmPassword');
  }

  onEditUsuario() {

    if(this.formularioRegistro.valid){
      if(this.password.value === this.confirmPassword.value){
        this.passwordInvalida = false;
        this.usuarioService.editUsuario(this.formularioRegistro.value, this.idUsuario).subscribe(res => {
          console.log(res);
          this.messageUpdate = true;
        },error => {
          console.log(error)
          this.errors = error.error;
        });
      }else{
        this.passwordInvalida = true;
      }
    }
  }
}
