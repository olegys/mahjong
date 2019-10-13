import { Component, Input, HostListener, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface ICard {
  value: number;
  isSelected: boolean;
  isVisible: boolean;
  index: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() card: ICard = null;

  @Output() clickCard: EventEmitter<ICard> = new EventEmitter();
  
  @HostListener('click') onClick(): void {
    this.clickCard.emit({ ...this.card });
  }
}
