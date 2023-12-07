import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})



export class DiceComponent {
  diceValue:number = 0;
  isRolling:boolean = false;
  
  rollDice(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  rollAndDisplayDice(): void {
    if (!this.isRolling) {
        this.isRolling = true;
        const rollInterval = setInterval(() => {
            this.diceValue = this.rollDice();
        }, 100); // Update diceValue with a random number every 100ms
        setTimeout(() => {
            clearInterval(rollInterval); // Stop updating diceValue
            this.isRolling = false;
        }, 1000); // Stop rolling after 1 second
    }
}


}

