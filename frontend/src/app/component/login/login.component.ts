import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService]
})
export class LoginComponent implements OnInit {
  @Output() usuarioLogin = new EventEmitter();
  formularioLogin = new FormGroup({
    correo:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  });
  errors:any;
  usuario:any = {};
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  get correo(){
    return this.formularioLogin.get('correo');
  }
  get password(){
    return this.formularioLogin.get('password');
  }

  onLogin() {
    this.authService.login(this.formularioLogin.value).subscribe(res => {
      console.log(res);
      this.usuario = res;
      this.usuarioLogin.emit(this.usuario);
      this.router.navigateByUrl('/inicio');
    },error => {
      console.log(error)
      this.errors = error.error.message;
    });
  }
}
