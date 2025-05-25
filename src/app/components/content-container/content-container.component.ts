import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContentCardComponent } from '../content-card/content-card.component';
@Component({
  selector: 'app-content-container',
  imports: [ContentCardComponent, CommonModule],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.css'
})
export class ContentContainerComponent {
  @Input() contentData: any[] = [];
  @Input() query: string = '';
  @Input() isEmpty: boolean = false;
}
