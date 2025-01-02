import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TpApiService } from '../../service/tp-api.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-assessment-screen',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './assessment-screen.component.html',
  styleUrl: './assessment-screen.component.css',
})
export class AssessmentScreenComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _cookieServices: CookieService,
    private _tpApi: TpApiService,
    private _toastr: ToastrService,
    private _authService: AuthService
  ) {}

  expiredLink = false;
  emailId!: string;
  password!: string;
  loader = false;

  noAssessment = false;
  loginForm = new FormGroup({
    emailId: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.noAssessment = false;
    this.loginForm;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    this.loader = !this.loader;

    this._tpApi.loginTP(this.emailId, this.password).subscribe(
      (response) => {
        let temp = response;
        console.log(temp.result.document);
        if(temp.result.document == null){
          this._toastr.error('Email Id or Password is incorrect');
          this.loader = !this.loader;
        } else {
          this._tpApi.tpEmail = temp.result.document.email;
          this._authService.signIn(this._tpApi.tpEmail);
          this._toastr.success('You are logged in');
          this.router.navigate(['candidateList']);
          this._tpApi.currentNav = "candidateList";
        }
      },
      (error) => {
        this.loader =!this.loader;
        this._toastr.error(error.error.text);
      }
    );

  }
}
