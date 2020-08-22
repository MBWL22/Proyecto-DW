import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ AuthService]
})
export class RegisterComponent implements OnInit {

  formularioRegistro = new FormGroup({
    nombreUsuario:new FormControl('', [Validators.required, Validators.minLength(2)]),
    apelidoUsuario:new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo:new FormControl('', [Validators.required,Validators.email]),
    plan:new FormControl('', [Validators.required]),
    fechaNacimiento:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword:new FormControl('',  [Validators.required]),
  });

  passwordInvalida:Boolean = false;
  errors:any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
    return this.formularioRegistro.get('correo');
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

  onRegister(){
    console.log('Formulario válido:' , this.formularioRegistro.valid);

    if(this.formularioRegistro.valid){
      if(this.password.value === this.confirmPassword.value){
        this.passwordInvalida = false;
        this.authService.register(this.formularioRegistro.value).subscribe(res => {
          console.log(res);
          this.router.navigateByUrl('/inicio');
        },error => {
          console.log(error)
          this.errors = error.error;
          ;
        });
      }else{
        this.passwordInvalida = true;
      }
    }
   
  }

}
