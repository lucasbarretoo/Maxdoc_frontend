import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ContentComponent } from './components/content/content.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        SidenavComponent,
        ContentComponent,
        CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    public isSidenavCollapsed: boolean = false;
    public screenWidth: number = 0;
    public showLayout:boolean = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event:any) => event instanceof NavigationEnd))
            .subscribe(() => {
                const childRoute = this.getChild(this.activatedRoute);
                this.showLayout = childRoute.snapshot.data['showLayout'] ?? true;
                console.log({showLayout: this.showLayout});
                
            });
    }

    private getChild(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

    public onToggleSidenav(data: SideNavToggle) {
        this.screenWidth = data.screenWidth;
        this.isSidenavCollapsed = data.collapsed;
    }
}
