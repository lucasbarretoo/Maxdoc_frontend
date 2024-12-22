import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-content',
    imports: [
        CommonModule
    ],
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss'
})
export class ContentComponent {

    @Input() collapsed = false;
    @Input() screenWidth = 0;

    public getContentClass(): string {
        let styleClass: string = '';

        if(this.collapsed && this.screenWidth > 768){
            styleClass = 'content-trimmed';
        } else {
            styleClass = 'content-full';
        }

        return styleClass;
    }
}
