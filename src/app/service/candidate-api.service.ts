import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICandidate } from '../models/ICandidate';
import { TpApiService } from './tp-api.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient, private _tpApi: TpApiService) {}

  candidateData!: ICandidate;

  getCandidate(pageNumber: number, tpUser: string): Observable<any> {
    return this._http.get<any>(
      'https://apiwmpscnetlify.netlify.app/.netlify/functions/api/getCandidate?pageNumber=' +
        pageNumber +
        '&tpUser=' +
        tpUser
    );
  }

  checkCandidate(aadhar: string): Observable<any> {
    return this._http.get<any>(
      'https://apiwmpscnetlify.netlify.app/.netlify/functions/api/checkCandidate?aadhar=' +
        aadhar )
  }

  // addCandidate(candidateDataInput: any): Observable<any> {
  //   debugger;
  //   let body = { body: candidateDataInput };
  //   return this._http.post<any>(
  //     'http://localhost:8888/.netlify/functions/addCandidate',
  //     body,
  //     this.httpOptions
  //   );
  // }

  addCandidate(candidateDataInput: ICandidate): Observable<any> {
    let body = {
      firstName: candidateDataInput.firstName,
      lastName: candidateDataInput.lastName,
      email: candidateDataInput.email,
      mobile: candidateDataInput.mobile,
      aadhar: candidateDataInput.aadhar,
      result: candidateDataInput.result,
      answers: candidateDataInput.result,
      marks: candidateDataInput.marks,
      jobRole: candidateDataInput.jobRole,
      tpUser: "tp@gmail.in",
      createdAt: candidateDataInput.createdAt,
    };
    const raw = JSON.stringify(candidateDataInput);
    return this._http.post<any>(
      'https://apiwmpscnetlify.netlify.app/.netlify/functions/api/addCandidate',
      candidateDataInput,
      this.httpOptions
    );
  }
}
