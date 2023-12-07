import { Injectable } from '@angular/core';
import * as CANNON from 'cannon';

@Injectable({
  providedIn: 'root'
})
export class PhysicsService {
  world: CANNON.World;

  constructor() { 
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
  }
    // Add methods to handle physics interactions, such as adding bodies, updating the world, etc.
}
