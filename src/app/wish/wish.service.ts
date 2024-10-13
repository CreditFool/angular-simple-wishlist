import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  constructor(private http: HttpClient) {}

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      console.error(`There is an issue with client network: ${error.error}`);
    } else {
      console.error(`Server side error: ${error.error}`);
    }

    return throwError(() => new Error('Cannot retrive data from server'));
  }

  getWishes() {
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json',
      },
    });

    return this.http
      .get('assets/wishes.json', options)
      .pipe(catchError(this.handleError));
  }

  addWish() {
    let options = this.getStandardOptions();
    options.headers = options.headers.set('Authorization', 'token-autorisasi');

    return this.http.post('asset/wishes.json', options);
  }
}
