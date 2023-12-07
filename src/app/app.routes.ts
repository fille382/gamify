import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FilipComponent } from './pages/filip/filip.component';
import { CoinflipComponent } from './pages/coinflip/coinflip.component';
import { DiceComponent } from './pages/dice/dice.component';
import { ThreeComponent } from './pages/three/three.component';
import { CannonComponent } from './pages/cannon/cannon.component';
import { BarahehanComponent } from './pages/barahehan/barahehan.component';

export const routes: Routes = [
    { path: '',component: HomeComponent},
    { path: 'about',component: AboutComponent},
    { path: 'filip',component: FilipComponent},
    { path: 'coinflip',component: CoinflipComponent},
    {path: 'dice',component: DiceComponent},
    {path: 'three',component: ThreeComponent},
    {path: 'cannon',component: CannonComponent},
    {path: 'barahehan',component: BarahehanComponent},

];
