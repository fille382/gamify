import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CoinflipService } from '../../shared/coinflip.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-coinflip',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './coinflip.component.html',
  styleUrl: './coinflip.component.scss',
  providers: [CoinflipService]
})
export class CoinflipComponent {
  currentDegrees = 0;
  amountRedAmount = 0;
  amountBlueAmount = 0;
  isFlipping = false;
  @ViewChild('coin') coinElement!: ElementRef;
  constructor(private renderer: Renderer2) { }
  
  flipCoin(): void {

    if (this.isFlipping) return;

    this.isFlipping = true;
    const random = Math.floor(Math.random() * 4 + 9); 

    this.currentDegrees += 180 * random;
    this.renderer.setStyle(this.coinElement.nativeElement, 'transform', `rotateY(${this.currentDegrees}deg)`);
    
    if (this.currentDegrees % 360 === 0) {
        this.amountBlueAmount++;
    } else {
        this.amountRedAmount++;
    }

    setTimeout(() => {
        this.isFlipping = false;
    }, 4000);
  }
}
