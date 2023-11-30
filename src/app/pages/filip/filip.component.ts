import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { TwentyoneService } from '../../shared/twentyone.service';
@Component({
  selector: 'app-filip',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './filip.component.html',
  styleUrl: './filip.component.scss',
  providers: [TwentyoneService]
})
export class FilipComponent {
  constructor(public twentyoneService: TwentyoneService) { }
}


