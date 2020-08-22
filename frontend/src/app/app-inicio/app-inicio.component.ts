import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-app-inicio',
  templateUrl: './app-inicio.component.html',
  styleUrls: ['./app-inicio.component.css'],
  providers: [AuthService]
})
export class AppInicioComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
