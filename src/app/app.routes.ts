import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FilipComponent } from './pages/filip/filip.component';
import { CoinflipComponent } from './pages/coinflip/coinflip.component';


export const routes: Routes = [
    { path: '',component: HomeComponent},
    { path: 'about',component: AboutComponent},
    { path: 'filip',component: FilipComponent},
    { path: 'coinflip',component: CoinflipComponent},
];
