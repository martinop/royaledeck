
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { API } from './API.service';
import { GlobalVars } from './globals.service';

@Injectable()

export class AuthResolver implements Resolve<any> {
  constructor(private api: API, private globals: GlobalVars, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot): any {
    return new Observable(observer => {
      if(this.globals.user){
        observer.next();
        observer.complete();
      }
      else{
        let token = localStorage.getItem("royaldeck_token") || null;
        if(token){
            this.api.getProfile(token).subscribe(data => {
              if(data.user){
                this.globals.user = data.user;
                this.globals.setDecks(data.decks)
                observer.next();
                observer.complete();
              }
              else{
                Observable.empty();
                this.router.navigate(['/']);
              }
            });
        }
        else{
          Observable.empty();
          this.router.navigate(['/']);
        }   
      }  
    });
  }
}
