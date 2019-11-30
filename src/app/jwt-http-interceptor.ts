
import { LoaderService } from './_services/loader.service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler,HttpEvent,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class JwtHttpInterceptor  implements HttpInterceptor {
     helper = new JwtHelperService();
     IsExpired:any;
    constructor(private route: ActivatedRoute,
        private router: Router,private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.showLoader();

        const baseurl = environment.baseUrl;
       let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
           // console.log(currentUser);
            this.IsExpired = this.helper.isTokenExpired(currentUser.token);
            if(this.IsExpired)
            {
                localStorage.removeItem('currentUser');
                localStorage.clear();
                this.router.navigate(['/login']);
            }

            request = request.clone({
                 url:baseurl+request.url,
                setHeaders: { 
                    'Authorization': `Bearer ${currentUser.token}`,
                    //  extratoken:`our token abcd`,
                    'Content-Type':  'application/json'
                    //  'Access-Control-Allow-Origin':'*'
                     
                }
            
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.onEnd();
            }
          },
            (err: any) => {
              this.onEnd();
            }));
        }
        
  
    


                  private onEnd(): void {
                    this.hideLoader();
                  }
                
                  private showLoader(): void {
                    this.loaderService.show();
                  }
                
                  private hideLoader(): void {
                    this.loaderService.hide();
                  }

	// intercept request and add token  Second Try
    // intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     const baseurl = environment.baseUrl;
    //     if (currentUser && currentUser.token) {
    // 	// modify request
	//     request = request.clone({
    //        // url:baseurl+request.url,
	//       setHeaders: {
    //        'Authorization': `Bearer ${currentUser.token}`,
    //        'Access-Control-Allow-Origin':'*',
    //        'Content-Type':  'application/json',
    //         'Cache-Control': 'no-cache' ,

	//       }
	//     });
	//  	console.log(request);
    //     return next.handle(request)
	//     .pipe(
	//         tap(event => {
	//           if (event instanceof HttpResponse) {
	             
	//             console.log(" all looks good");
	//             // http response status code
	//             console.log(event.status);
	//           }
	//         }, error => {
	//    			// http response status code
	//      	          	console.error(error.status);
	//           	console.error(error.message);
	//         })
	//       ) }

    // };
    

}
