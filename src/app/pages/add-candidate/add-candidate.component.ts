import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ICandidate } from '../../models/ICandidate';
import { CandidateApiService } from '../../service/candidate-api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-candidate',
  standalone: true,
  imports: [FormsModule, NgbModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-candidate.component.html',
  styleUrl: './add-candidate.component.css',
})
export class AddCandidateComponent implements OnInit {
  constructor(
    private _candidateApi: CandidateApiService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  candidateForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    aadhar: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$'),
    ]),
    mobile: new FormControl('', [Validators.required]),
    jobrole: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.email]),
  });

  loader = false;

  ngOnInit(): void {
    this.candidateForm;
  }

  candidateData: ICandidate = {
    firstName: '',
    lastName: '',
    email: '',
    aadhar: '',
    marks: 0,
    jobRole: '',
    tpUser: '',
    createdAt: Date(),
  };

  get candidateFormControl() {
    return this.candidateForm.controls;
  }

  submit() {
    this.loader = !this.loader;
    this.candidateData.tpUser = localStorage.getItem('email') || "null";
    if(this.candidateData.tpUser == "null"){
      this._toastr.error("Internal Server Error");
      this.loader = !this.loader;
    } else {
      this._candidateApi.checkCandidate(this.candidateData.aadhar).subscribe(
        (response) => {
          let temp = response;
          let candTempData = temp.result.documents;
          if (candTempData.length > 0) {
            this._toastr.error('Aadhar already exist');
            this.loader = !this.loader;
          } else {
            this._candidateApi.candidateData = this.candidateData;
            this._router.navigate(['assessmentStart']);
            this.loader = !this.loader;
          }
        },
        (error) => {
          this._toastr.error("Internal Server Error");
          this.loader = !this.loader;
        }
      );
    }
  }
}
