import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { Auth } from 'ng2-ui-auth';
import { GlobalVars } from  './services/globals.service';
import { API } from  './services/API.service';
@Component({
  selector: 'royale-deck',
  templateUrl: 'app.component.html'
})
export class AppComponent {
	lang: String = "es";
	fulllang: String = "english";
  translate: any;
  constructor(public globals: GlobalVars, translate: TranslateService, private auth: Auth, api: API) {
    this.translate = translate;
    this.translate.use(this.lang);
    if(!globals.user){
      let token = localStorage.getItem("royaldeck_token") || null;
      if(token){
        api.getProfile(token).subscribe(data => {
          globals.user = data.user;
          globals.setDecks(data.decks)
        });
      }      
    }
  }
  changeLang(){
  	this.lang = this.lang == 'es' ? 'en' : 'es';
  	this.fulllang = this.lang == 'es' ? 'english' : 'español'; 
  	this.translate.use(this.lang);
  }
  authenticate(provider: string) {
    this.auth.authenticate(provider).subscribe(
      (data) => {
        this.globals.user = data.json().user
      }
    );
  }
}
