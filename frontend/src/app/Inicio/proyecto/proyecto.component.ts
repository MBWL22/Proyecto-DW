import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ScriptsService } from 'src/app/scripts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [ AuthService]
})


export class ProyectoComponent implements OnInit {

  formularioLogin = new FormGroup({
    correo:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private _scripts: ScriptsService) { 
    _scripts.load(["index/proyecto"])
  }

  ngOnInit(): void {
  }

}
