import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'makecode-frontend';
  regionVisible:string = '';
  
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  goLogin() {
    this.router.navigate(['/login']);
  }
  // verArtista(id){
  //   this.regionVisible = 'artistas';
  //   console.log('Ver artista con ID: ' + id);
  // }

  // verPlaylist(id){
  //   this.regionVisible = 'playlists';
  //   console.log('Ver playlist con ID: ' + id);
  // }
}
