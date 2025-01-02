import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TpApiService } from './tp-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public isAuth = new BehaviorSubject<boolean>(false);

    constructor(private router: Router, private _tpApi: TpApiService) {
        this.autoSignIn();
    }

    autoSignIn() {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('email')) {
            this.isAuth.next(true);
            this.router.navigate(['/candidateList']);
        } else {
          this.router.navigate(['/assessment']);
        }
      }
    }

    signIn(email: string) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('email', email);
        this.isAuth.next(true);
        this.router.navigate(['/candidateList']);
      }
    }

    signOut() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('email');
        this.isAuth.next(false);
        this.router.navigate(['/assessment']);
      }
    }
}
