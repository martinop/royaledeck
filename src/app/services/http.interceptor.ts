import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class HttpClient {
  constructor(private http: Http) {}

  getHeaders(){
    let headers = new Headers();
    let token = localStorage.getItem("royaldeck_token");
    headers.append('Content-Type', 'application/json');

    if(token){
      headers.append('Authorization', 'royaledeck_token '+token); 
    }

    return headers;
  }

  get(url, params) {
    let data = params ? this.toURLParams(params) : "";
    let headers = this.getHeaders();
    return this.http.get(url, {
      search: data,
      headers: headers,
      body: ""
    })
  }

  post(url, data) {
    let headers = this.getHeaders();
    return this.http.post(url, JSON.stringify(data), { headers: headers});
  }

  toURLParams(data){
    let url = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    return url;
  }
}