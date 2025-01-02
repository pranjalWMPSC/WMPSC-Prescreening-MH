import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TpApiService {

  constructor(private _http: HttpClient) { }

  tpEmail !: string;
  currentNav!: string;
  loginTP(emailId: string, password: string): Observable<any>{
    let body = {
      userName: emailId,
      password: password
    }
    return this._http.post<any>("https://apiwmpscnetlify.netlify.app/.netlify/functions/api/getTP", body);
  }

  registerTP(tpData: any): Observable<any>{
    return this._http.post<any>("https://apiwmpscnetlify.netlify.app/.netlify/functions/register_TP", tpData);
  }
}
