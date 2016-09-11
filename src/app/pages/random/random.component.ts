import { Component, OnInit} from '@angular/core';
import { GlobalVars } from "../../services/globals.service"
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { ActivatedRoute } from '@angular/router';
import { MetaService } from 'ng2-meta';

declare var $:any;

@Component({
  templateUrl: './random.component.html',
  selector: "random"
})

export class RandomComponent implements OnInit{
	canRandomize:boolean = true;
	currentArena: number = 1;
	actives: number = 0;
	preSelection: Array<Object>;
	arenas: Array<Object> = []
	random: Array<Object> = []
	preCards: Array<Object> = []
	elixir = 0;
	originalCards: Array<Object> = [];

	options: Array<Object> = [
		{name: "All comuns cards", active: true, type: "comun"},
		{name: "All epics cards",active: true, type: "epic"},
		{name: "All specials cards", active: true, type: "special"},
		{name: "All legendaries cards", active: true, type: "legendary"},
		{name: "All troops cards", active: true, type: "troop"},
		{name: "All spells cards", active: true, type: "spell"},
		{name: "All builds cards",active: true, type: "build"},
		{name: "Only comuns cards",active: false, type: "comun"},
		{name: "Only epics cards",active: false, type: "epic"},
		{name: "Only specials cards", active: false, type: "special"},
		{name: "Only troops cards",active: false, type: "troop"},
		{name: "Only spells cards",active: false, type: "spell"},
		{name: "Only builds cards",active: false, type: "build"}
	]

	constructor(private globals: GlobalVars, private route: ActivatedRoute, private metaService: MetaService){
		this.arenas = globals.arenas;
	}

	changeOption(option: any):void{
		for(let card of this.preCards){
			if(!option["active"]){
				if(card["type"] == option["type"] || card["movement"] == option["type"]){
					card["active"] = true;					
				}
				else{
					if(option.name.indexOf("Solo") != -1){
						card["active"] = false;
					}
				}
			}
			else{
				if(card["type"] == option["type"] || card["movement"] == option["type"])
					card["active"] = false;	
			}
		}
		this.evalOptions();
		this.evalActives()		
	}

	evalActives():void {
		let regex = new RegExp("true","g")
		let match = JSON.stringify(this.preCards).match(regex)
		this.actives = match ? match.length : 0;
	}
	evalOptions():void {
		for(let opt of this.options){
			let num = 0;
			let flag = false;
			this.preCards.forEach( (card, index) => {
				if(card["type"] == opt["type"] && card["active"] || card["movement"] == opt["type"] && card["active"]){
					num += 1;
				}
				if(opt["type"] != card["type"] && opt["type"] != card["movement"]){
					flag = true;
				}
			})
			opt["active"] = num == opt["num"] ? true : false;

			if(opt["name"].indexOf("Solo") != -1){
				if(flag)
					opt["active"] = false;
			}
		}
	}

	changeArena(arena: string):void{
		for(let element of this.arenas){
			element["active"] = element["arena"] <= arena["arena"] ? true : false;
		}

		this.preCards = this.originalCards.map( card => {
			card["active"] = card["arena"] <= arena["arena"] ? true : false;
			return card;
		})

		for(let opt of this.options){
			let regex = new RegExp(opt["type"],"g")
			let match = JSON.stringify(this.preCards).match(regex)
			let num = match ? match.length : 0;
			opt["num"] = num;
		}
		this.currentArena = arena["arena"]
		this.evalActives()
	}

	cardState(card):void{
		card["active"] = card["active"] ? false : true;
		this.evalOptions()
		this.evalActives()		
	}
	lastState():void{
		$('ul.setup-panel li:eq(2)').removeClass('disabled');
		$('ul.setup-panel li a[href="#step-3"]').trigger('click');

		this.initRandomize();
		
	}

	initRandomize():void {
		this.preSelection = this.preCards.filter( card => {
			return card["active"]
		})
		this.random = this.globals.getRandom();
		this.elixir = 0;
		this.canRandomize = false;
		this.randomize(0);
	}
	randomize(y:number):void {
		if(y < 8){
			var that = this;
			for(let i = 0; i<5; i++){
				setTimeout(function(x){
					return function(){
						let random = Math.floor(Math.random() * that.preSelection.length)
						that.random[y] = that.preSelection[random]
						if(x == 4){
							that.elixir += that.random[y]["elixir"];
							that.preSelection.splice(random, 1)
							if(y == 7){
								that.canRandomize = true;
							}
							let inte = y+1
							that.randomize(inte)
						} 					
					}
				}(i), 500*i)
			}	
		}
		
	}
	ngOnInit() {
		if(!this.globals.originalCards){
			this.globals.setOCards(this.route.snapshot.data['cards']);
		}
		this.originalCards = this.globals.getOCards();
		this.preCards = this.originalCards.filter( card => {
			if(card["arena"] <= 1){
				card["active"] = true;
			}
			return true;
		})
		$(document).ready(function() {
		    
		    var navListItems = $('ul.setup-panel li a'),
		        allWells = $('.setup-content');

		    allWells.hide();

		    navListItems.click(function(e)
		    {
		        e.preventDefault();
		        var $target = $($(this).attr('href')),
		            $item = $(this).closest('li');
		        
		        if (!$item.hasClass('disabled')) {
		            navListItems.closest('li').removeClass('active');
		            $item.addClass('active');
		            allWells.hide();
		            $target.show();
		        }
		    });
		    
		    $('ul.setup-panel li.active a').trigger('click');
		    
		    
		    $('#activate-step-2').on('click', function(e) {
		        $('ul.setup-panel li:eq(1)').removeClass('disabled');
		        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
		       // $(this).remove();
		    })    
		    // DEMO ONLY //
		   /* $('#activate-step-3').on('click', function(e) {
		        $('ul.setup-panel li:eq(2)').removeClass('disabled');
		        $('ul.setup-panel li a[href="#step-3"]').trigger('click');
		        $(this).remove();

		    })  */  
		});
	}
}