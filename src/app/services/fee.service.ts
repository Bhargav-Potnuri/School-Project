import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeeService {
  private baseUrl = 'https://worthy-bullfrog-nominally.ngrok-free.app/';

  constructor(private http: HttpClient) {}

  submitFeeData(formData: any): Observable<any> {
    const url = `${this.baseUrl}regular_fees`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(url, formData, { headers })
      .pipe(catchError(this.handleError));
  }
  // extra Fee data
  submitExtraFeeData(formData: any): Observable<any> {
    const url = `${this.baseUrl}extra_curicullar_fees`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(url, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  downloadReceipt(receiptNumber: string, feeType: string): Observable<Blob> {
    const apiUrl =
      feeType === 'regular'
        ? 'https://worthy-bullfrog-nominally.ngrok-free.app/download-receipt-regularFee'
        : 'https://worthy-bullfrog-nominally.ngrok-free.app/download-extra-curricular-fee';

    return this.http.post(apiUrl, { receiptNumber }, { responseType: 'blob' });
  }
}
