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

  noAssessment = false;
  loginForm = new FormGroup({
    emailId: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    // console.log(this._cookieServices.get('id_token'));
    // console.log('Console working');
    // this.activateRoute.queryParams.forEach((params: Params) => {
    //   // this.firstName = params['firstName'];
    //   // this.lastName = params['lastName'];
    //   // this.emailId = params['emailId'];
    //   // this.jobRole = params['jobRole'];
    //   // this.time = params['time'];
    //   this.code = params['code'];
    //   // this.code = this.code.replace(/^"(.+(?="$))"$/, '$1');
    //   // console.log(this.code);
    //   // console.log("BJuLIVn1vhAVcjqknThVpoXS2ezf9Edvy3NtCkq0iXB3SiDFdSPpjMp/G9YhE5sVi0dg8xSmhAOhvJnDyETNN3FD7PZ1UheAyjewZ4/kGMIAyQq363v904pBnCHfSL1kr4UdMFrk1zMUJUB0aR5XNIZo2RZ1dkhzyUMysJkPQV1oL0uPH5fp1os6tOLHt30AOXQgkV9KcH5yBjjQToud19tQHVbRqr2d6wX97Cx0L55BO1RZPAL8TBZPzPHL48uIf6ATkDcxL4tlPOPpuBXRKQGzCHQVfBvjI7d04c7wDyIHacve+qKk2smzSymosps46vfhD8aYfckjElsvlgzmJFXDKswRYQQ0pJFEYDlJoBkJajaBP7NqomS2kKw2DB4CBsMUTcvClACIQO3E4TD72W9MwGUcKVR1nVSFsnoorYoU6DVKZ5CJwLgzC+eSa+BJkfAQTNeb1PBGFMo9bnNAyhMvpNlv3BNckYQ5cLSliLt9jvkI8T91rztphpl7Nt1oB5g/tScxzNpQ03Lid+TSAH3sgbvuBN3ufc6jNcufljN7BoQ7nJsA604KkxB0VXoMm+OTY1TdHY7he1tBxpykMQ==");
    // });

    // // if (this.firstName === undefined || this.lastName === undefined || this.emailId === undefined || this.jobRole === undefined){
    // //   this.noAssessment = true;
    // // }
    // if (this.code === undefined) {
    //   this.noAssessment = true;
    // } else {
    //   this.decrypt();
    // }
    this.noAssessment = false;

    this.loginForm;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    this._tpApi.loginTP(this.emailId, this.password).subscribe(
      (response) => {
        let temp = response;

        this._tpApi.tpEmail = temp.result.document.email;

        console.log(response);
        this._authService.signIn(this._tpApi.tpEmail);
        this._toastr.success('You are logged in');
        this.router.navigate(['candidateList']);
        this._tpApi.currentNav = "candidateList";
      },
      (error) => {
        this._toastr.error(error.error.text);
        console.log(error.error.text);
      }
    );

  }

  // decrypt() {
  //   console.log(this.code);
  //   this._apiService.decrypt(this.code).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.firstName = response.result.firstName;
  //       this.lastName = response.result.lastName;
  //       this.emailId = response.result.emailId;
  //       this.jobRole = response.result.jobRole;
  //       this._apiService.captureCode = this.code;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
