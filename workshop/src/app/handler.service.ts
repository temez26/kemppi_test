import { Injectable } from '@angular/core';
import { Data } from './data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandlerService {
  private dataSubject = new BehaviorSubject<Data | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor() {}
  // input point for the form data
  initData(totalParticipants: number, groupSize: number): void {
    const newData = new Data(totalParticipants, groupSize);
    this.dataSubject.next(newData);
  }
  // Handle the logic going to next round
  nextRound(): void {
    const currentData = this.dataSubject.value;
    if (currentData && currentData.currentRound < currentData.roundCount - 1) {
      currentData.currentRound++;
      this.dataSubject.next(currentData);
    }
  }
  // Handle the logic going to previus round
  previousRound(): void {
    const currentData = this.dataSubject.value;
    if (currentData && currentData.currentRound > 0) {
      currentData.currentRound--;
      this.dataSubject.next(currentData);
    }
  }
}
