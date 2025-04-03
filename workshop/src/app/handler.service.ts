import { Injectable } from '@angular/core';
import { Data } from './data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandlerService {
  // BehaviorSubject holds a Data instance, starting with null before initialization.
  private dataSubject = new BehaviorSubject<Data | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor() {}

  // Initialize Data with form values and push it into the observable.
  initData(totalParticipants: number, groupSize: number): void {
    const newData = new Data(totalParticipants, groupSize);
    // Optionally, add method calls to generate rounds if needed.
    this.dataSubject.next(newData);
  }

  // Advance to the next round if available and update the observable.
  nextRound(): void {
    const currentData = this.dataSubject.value;
    if (currentData && currentData.currentRound < currentData.roundCount - 1) {
      currentData.currentRound++;
      // Optionally update round assignments here.
      this.dataSubject.next(currentData);
    }
  }
}
