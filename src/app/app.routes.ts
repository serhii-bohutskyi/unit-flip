// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LengthConverterComponent } from './components/length-converter/length-converter.component';
import { WeightConverterComponent } from './components/weight-converter/weight-converter.component';
import { VolumeConverterComponent } from './components/volume-converter/volume-converter.component';
import { TemperatureConverterComponent } from './components/temperature-converter/temperature-converter.component';

export const routes: Routes = [
  { path: '', redirectTo: '/length', pathMatch: 'full' },
  { path: 'length', component: LengthConverterComponent },
  { path: 'weight', component: WeightConverterComponent },
  { path: 'volume', component: VolumeConverterComponent },
  { path: 'temperature', component: TemperatureConverterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
