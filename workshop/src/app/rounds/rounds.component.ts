import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../handler.service';
import { Data } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rounds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rounds.component.html',
  styleUrl: './rounds.component.scss',
})
export class RoundsComponent implements OnInit {
  data!: Data | null;

  constructor(private handlerService: HandlerService) {}

  ngOnInit(): void {
    this.handlerService.data$.subscribe((value) => {
      this.data = value;
      if (this.data) {
        this.data.generateRounds();
      }
      console.log(this.data);
    });
  }

  nextRound(): void {
    this.handlerService.nextRound();
  }

  previousRound(): void {
    this.handlerService.previousRound();
  }
}
