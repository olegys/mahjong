import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public getRandomInteger(min: number, max: number): number {
    let rand: number = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }

  public getShuffleArray(arr: number[]): number[] {
    const a: number[] = [...arr];

    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }

    return a;
  }

  public getUniqArray(size: number, min: number, max: number): number[] {
    const uniqNumbers: number[] = [];

    while (uniqNumbers.length < size) {
      const random = this.getRandomInteger(min, max);
      if (uniqNumbers.indexOf(random) === -1) uniqNumbers.push(random);
    }

    return uniqNumbers;
  }
}
