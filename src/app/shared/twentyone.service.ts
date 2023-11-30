import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwentyoneService {
  totalRounds: number = 0;
  totalWins: number = 0;
  inRoundValue: number = 0;
  roundValue: number = 0;
  playerDone: boolean = false;
  tableValue: number = 0;
  constructor() { }

  createRound() {
    this.totalRounds++;
  }

  generateRandomCard() {
    const randomInt = Math.floor(Math.random() * 21) + 1; // Generate a random integer between 1 and 21
    this.inRoundValue += randomInt;
    this.roundValue = randomInt;
  }

  giveCardInRound() {
    if (this.playerDone) {
      this.totalRounds++;
      this.inRoundValue = 0;
      this.roundValue = 0;
      this.playerDone = false;
    }
    if (this.inRoundValue <= 21) {
      this.generateRandomCard();
    } else {
      this.inRoundValue = 0;
      console.log("You lost");
    }
  }
  generateRandomCardForTable(): number {
    const randomInt = Math.floor(Math.random() * 21) + 1; // Generate a random integer between 1 and 21
    return randomInt;
  }
  done() {
    this.playerDone = true;
    if (this.inRoundValue <= 21) {
      const tableNumber = this.generateRandomCardForTable();
      this.tableValue = tableNumber;
      if (this.inRoundValue > tableNumber) {
        this.totalWins++;
        console.log("You won");
      } else {
        console.log("You lost");
      }
    }
  }
}
