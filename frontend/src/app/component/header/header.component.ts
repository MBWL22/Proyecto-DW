import { Component, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  

  ngOnInit(): void {
    // this.usuariosService.obtenerUsuarios().subscribe(
    //   res=>{
    //     this.usuarios = res;
    //     console.log('Usuarios', this.usuarios);
    //   },
    //   error=>{
    //     console.log(error);
    //   }
    // )
  }

 
}
