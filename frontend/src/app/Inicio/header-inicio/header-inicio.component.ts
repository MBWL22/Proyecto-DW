import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.css'],
  providers: [ AuthService]
})
export class HeaderInicioComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {

  }

  EditarPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  Logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 
}
