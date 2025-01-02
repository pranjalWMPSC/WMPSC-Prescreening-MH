import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CandidateApiService } from '../../service/candidate-api.service';
import { TpApiService } from '../../service/tp-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css',
})
export class CandidateListComponent implements OnInit {
  constructor(
    private _candidateApi: CandidateApiService,
    private _tpApi: TpApiService,
    private _toastr: ToastrService,
    private _authService: AuthService
  ) {}

  candidateList!: any;
  totalCount = 0;
  pageNumber = 1;


  ngOnInit(): void {
    let emailID = localStorage.getItem('email') || "null";

    this._candidateApi.getCandidate(this.pageNumber, emailID).subscribe(
      (response) => {
        let temp = response;
        this.candidateList = temp.result.documents;
        this.totalCount = Math.floor(this.candidateList.count % 25);
      },
      (error) => {
        console.log(error.error.text);
        this._toastr.error(error.error.text);
      }
    );
  }

  signOut() {
    this._authService.signOut();
  }

  nextPage() {}

  previousPage() {}
}
