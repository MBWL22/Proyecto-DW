import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css'],
  providers: [ AuthService]
})
export class AppLandingComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
