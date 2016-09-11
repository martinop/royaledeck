import { Component } from '@angular/core';
import { API } from '../../services/API.service'
import { GlobalVars } from  '../../services/globals.service';
import { Router } from '@angular/router'
import { MetaService } from 'ng2-meta';

@Component({
	templateUrl: './profile.component.html',
	selector:"profile"
})
export class ProfileComponent{
	user: Object;
	decks: Array<Object>; 
	constructor(private globals: GlobalVars, private router: Router, private metaService: MetaService){
		this.user = globals.user
		this.decks = globals.getDecks();
	}
}