import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

interface SideNavToggle {
	screenWidth: number;
	collapsed: boolean;
}

@Component({
	selector: 'app-sidenav',
	imports: [
		CommonModule,
		RouterModule,
		MatIcon
	],
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

	@Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter;
	
	public collapsed:boolean = false;
	public navData = navData;
	public screenWidth = 0;

	ngOnInit(): void {
		this.screenWidth = window.innerWidth;
	}

	toggleSidenav(): void{
		this.collapsed = !this.collapsed;
		this.onToggleSidenav.emit({
			screenWidth: this.screenWidth,
			collapsed: this.collapsed
		});
	}
	closeSidenav(): void{
		this.collapsed = true;
		this.onToggleSidenav.emit({
			screenWidth: this.screenWidth,
			collapsed: this.collapsed
		});
	}
}
