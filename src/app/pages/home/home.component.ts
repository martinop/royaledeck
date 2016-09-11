import { Component } from '@angular/core';
import { GlobalVars } from  '../../services/globals.service';
import { MetaService } from 'ng2-meta';

@Component({
  templateUrl: './home.component.html',
  selector: "home"
})

export class HomeComponent {

	constructor(public globals: GlobalVars, private metaService: MetaService){
	}
}
