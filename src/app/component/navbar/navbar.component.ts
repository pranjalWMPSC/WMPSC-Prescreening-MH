import { Component, OnInit } from '@angular/core';
import { TpApiService } from '../../service/tp-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public _tpApi: TpApiService, public _authService: AuthService){}

  ngOnInit(): void {

  }

  addCandidate(){
    this._tpApi.currentNav = 'addCandidate';
  }

}
