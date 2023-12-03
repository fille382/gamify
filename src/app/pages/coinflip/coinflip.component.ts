import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CoinflipService } from '../../shared/coinflip.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coinflip',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatIconModule,FormsModule],
  templateUrl: './coinflip.component.html',
  styleUrl: './coinflip.component.scss',
  providers: [CoinflipService]
})
export class CoinflipComponent {
  currentDegrees = 0;
  amountRedAmount = 0;
  amountBlueAmount = 0;
  playerScore = 0;
  playerWallet = 10000;
  isFlipping = false;
  buttonColor = '#007BFF';
  sliderValue = this.playerWallet;
  previousWalletValue = this.playerWallet;
  showPopup = false;
  winAmount = 0;
  @ViewChild('coin') coinElement!: ElementRef;
  constructor(private renderer: Renderer2) { }

  checkWalletIncrease(): void {
    console.log("POPUP");
    if (this.playerWallet > this.previousWalletValue) {
        this.winAmount = this.playerWallet - this.previousWalletValue;
        this.showPopup = true;
        setTimeout(() => this.showPopup = false, 10000); // Hide popup after 3 seconds
    }
    this.previousWalletValue = this.playerWallet;
  }

  addWinnings(): void {
    this.playerWallet += this.sliderValue;
    this.playerScore++;
    console.log("PlayerWallet: " + this.playerWallet);
    console.log("PlayerScore: " + this.playerScore);
    this.checkWalletIncrease();
  }
  removeWinnings(): void {
    this.playerWallet -= this.sliderValue;
    console.log("PlayerWallet: " + this.playerWallet);
    console.log("PlayerScore: " + this.playerScore);
    this.checkWalletIncrease();
}

  changeButtonColor(): void {
    this.buttonColor = this.buttonColor === '#007BFF' ? '#FF6347' : '#007BFF';
  }
  flipCoin(): void {
    if (this.isFlipping) return;
  
    this.isFlipping = true;
    const random = Math.floor(Math.random() * 4 + 9); 
  
    // Generate random values
    let randomTime = Math.random() * 10; // Random time between 0 and 10 seconds
    let randomBezierValues = Array.from({length: 4}, () => Math.random().toFixed(2)); // Random cubic-bezier values
  
    // Set the transition property
    this.renderer.setStyle(this.coinElement.nativeElement, 'transition', `transform ${randomTime}s cubic-bezier(${randomBezierValues.join(',')})`);
  
    this.currentDegrees += 180 * random;
    this.renderer.setStyle(this.coinElement.nativeElement, 'transform', `rotateY(${this.currentDegrees}deg)`);
  
    setTimeout(() => {
      this.isFlipping = false;

      if (this.currentDegrees % 360 === 0) {
        this.amountBlueAmount++;
        if (this.buttonColor === '#007BFF') {
            this.addWinnings();
            console.log("PlayerScore: " + this.playerScore);
        }
        else {
            this.removeWinnings();
            console.log("PlayerScore: " + this.playerScore);
        }
        } else {
        this.amountRedAmount++;
        if (this.buttonColor === '#FF6347') {
            this.addWinnings();
            console.log("PlayerScore: " + this.playerScore);
        }
        else {
            this.removeWinnings();
            console.log("PlayerScore: " + this.playerScore);
        }
    }
  
      console.log("PlayerScore: " + this.playerScore);
  }, randomTime * 1000); // Convert to milliseconds
  }
}
