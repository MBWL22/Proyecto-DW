import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  obtenerUsuarios():Observable<any>{
    return this.httpClient.get('http://localhost:8888/usuarios',{});
  }

  obtenerDatosUsuario(idUsuario):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}`,{});
  }

  editUsuario(userData,idUsuario):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/usuarios/${idUsuario}`,userData);
  }

}
