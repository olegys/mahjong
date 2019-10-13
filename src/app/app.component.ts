import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

//Interfaces
import { ICard } from './card/card.component';

//Services
import { AppService } from './app.service';

//Rxjs
import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title: string = 'Mahjong game';
  public size: number = 18;
  public min: number = 1;
  public max: number = 99;
  public cards: ICard[] = [];
  public isActiveTimer: boolean = false;
  public prevCard: ICard = null;

  constructor(
    private _appService: AppService,
    private _cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.fillCardsArray();
  }

  public fillCardsArray(): void {
    this.cards = [];
    const uniqNumbers: number[] = this._appService.getUniqArray(this.size, this.min, this.max);
    const resultNumbers: number[] = [...uniqNumbers, ...this._appService.getShuffleArray(uniqNumbers)];

    resultNumbers.forEach((n, i) => {
      const card: ICard = {
        index: i,
        value: n,
        isVisible: false,
        isSelected: false,
      };

      this.cards.push(card);
    });
  }

  private setStateForCards(card: ICard, isSelected: boolean, isVisible: boolean): void {
    this.cards[this.prevCard.index] = { ...this.prevCard, isSelected, isVisible };
    this.cards[card.index] = { ...card, isSelected, isVisible };
    this.prevCard = null;
  }

  public onClickCard(card: ICard): void {
    if (this.isActiveTimer || card.isVisible || card.isSelected) return;

    if (!this.prevCard) {
      this.cards[card.index] = { ...card, isSelected: true };
      this.prevCard = { ...card };
      return;
    }

    if (this.prevCard.value !== card.value) {
      this.isActiveTimer = true;
      this.cards[card.index] = { ...card, isSelected: true };

      const delaySubscription = of(false).pipe(delay(300)).subscribe((state) => {
        this.isActiveTimer = state;
        this.setStateForCards(card, false, false);
        this._cdr.detectChanges();
        delaySubscription.unsubscribe();
      });
    } else if (this.prevCard.value === card.value) {
      this.setStateForCards(card, false, true);
    }
  }
}
