import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit,faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css'],
  providers: [ AuthService]
})
export class RepositorioComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  formularioLogin = new FormGroup({
    correo:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    if(this.authService.inSesion() && this.authService.inSesion() !== ''){
      console.log('esta logueado');
  }else{
      console.log('necesita loguearse');
      this.router.navigate(['/login']);
  }
  }
  
  guardarNuevaCarpeta() {
    this.authService.login(this.formularioLogin.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/');
    });
  }

  
  agregarARepositorio(modalGuardarEnRepo){
    this.modalService.open(modalGuardarEnRepo,
      {
        size:'xs',
        centered:true
      }
    );
  }
}
