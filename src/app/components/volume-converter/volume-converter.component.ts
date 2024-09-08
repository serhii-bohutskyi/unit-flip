import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

type VolumeUnit = 'liters' | 'milliliters' | 'gallons' | 'cups';

@Component({
  selector: 'app-volume-converter',
  templateUrl: './volume-converter.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule
  ],
  styleUrls: ['../../shared/converter/converter.component.css'],
})
export class VolumeConverterComponent {
  inputValue: number = 1; // Default input value
  outputValue: number = 0; // Result of conversion
  inputUnit: VolumeUnit = 'liters'; // Default input unit
  outputUnit: VolumeUnit = 'milliliters'; // Default output unit

  // Conversion rates relative to 1 liter
  conversionRates: { [key in VolumeUnit]: number } = {
    liters: 1,
    milliliters: 1000,
    gallons: 0.264172,
    cups: 4.22675
  };

  constructor() {
    this.convertFromInput(); // Perform initial conversion on component load
  }

  // Convert from input to output
  convertFromInput() {
    const valueInLiters = this.inputValue / this.conversionRates[this.inputUnit];
    this.outputValue = parseFloat((valueInLiters * this.conversionRates[this.outputUnit]).toFixed(3));
  }

  // Convert from output to input
  convertFromOutput() {
    const valueInLiters = this.outputValue / this.conversionRates[this.outputUnit];
    this.inputValue = parseFloat((valueInLiters * this.conversionRates[this.inputUnit]).toFixed(3));
  }
}
