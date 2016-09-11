import {Injectable} from '@angular/core';
import {HttpClient} from './http.interceptor';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class API {

  constructor(private http: HttpClient) {
  }

  getProfile(token: any): Observable<any> { 
    return this.http.get('http://royaledeck.net/api/auth/profile',"")
    .map(res => res.json());
  }
  getCards(): Observable<any>{
    return this.http.get("http://royaledeck.net/api/cards","")
    .map(res => res.json());
  }
  createDeck(data): Observable<any>{

    return this.http.post("http://royaledeck.net/api/deck", data)
    .map(res => res.json())
  }

  getDecks(data): Observable<any>{
    return this.http.get("http://royaledeck.net/api/decks",data)
    .map(res => res.json());
  }
  getUserDecks(username: string): Observable<any>{
    return this.http.get("http://royaledeck.net/api/decks/"+username, null)
    .map(res => res.json())
  }
  getDeck(username: string, id: number): Observable<any>{
    return this.http.get("http://royaledeck.net/api/deck/"+username+"/"+id, null)
    .map(res => res.json())
  }
}
