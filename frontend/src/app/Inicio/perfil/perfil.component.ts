import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css'],
  providers: [ AuthService]
})
export class RepositorioComponent implements OnInit {

  formularioLogin = new FormGroup({
    correo:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.inSesion() && this.authService.inSesion() !== ''){
      console.log('esta logueado');
  }else{
      console.log('necesita loguearse');
      this.router.navigate(['/login']);
  }
  }
  
  onLogin() {
    this.authService.login(this.formularioLogin.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/');
    });
  }
}
