import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinflipService {
inRoundValue: number = 0;
roundValue: number = 0;
betValue: number = 0;
playerinRound: boolean = false;
totalWinnings: number = 0;
head:boolean = false;
playerCoin: number = 1;
randomSpins: number = 0;

  constructor() { }

  createRound() {
    this.inRoundValue = 0;
    this.roundValue = 0;
    this.betValue = 0;
    this.playerinRound = false;
  }

  generateRandomCoin() {
    const randomInt = Math.floor(Math.random() * 2) + 1; // Generate a random integer between 1 and 2
    this.inRoundValue += randomInt;
    this.roundValue = randomInt;

  }

  checkWin() {
    if (this.playerCoin == this.roundValue) 
    {
      this.totalWinnings += this.betValue;
      console.log("You won");
    }
    else
    {
      console.log("You lost :(");
    }
  }
}
