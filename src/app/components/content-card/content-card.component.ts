import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { ionTvOutline } from '@ng-icons/ionicons';
@Component({
  selector: 'app-content-card',
  imports: [CommonModule, NgIcon],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.css',
  providers:[provideIcons({ionTvOutline})]
})
export class ContentCardComponent {
  @Input() content: any;
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }
  getCategories(): string[] {
    // Split by comma and trim whitespace from each item
    return this.content.listed_in 
      ? this.content.listed_in.split(', ').filter(Boolean)
      : [];
  }
}
