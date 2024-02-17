import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '../services/loading-service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      this.loadingService.setLoading(true);
      return next.handle(request).pipe(
        delay(1500), // Delay the response 1,5 segundos para visualizar el spinner
        finalize(() => this.loadingService.setLoading(false))
      );
    }
  
    return next.handle(request);
  }
}
