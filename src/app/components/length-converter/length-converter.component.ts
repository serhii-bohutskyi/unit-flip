import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

type LengthUnit = 'meters' | 'feet' | 'inches' | 'kilometers' | 'miles';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['../../shared/converter/converter.component.css'],
  imports: [
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class LengthConverterComponent {
  inputValue: number = 1; // Default input value
  outputValue: number = 0; // Default output value, updated on init
  inputUnit: LengthUnit = 'meters'; // Default input unit
  outputUnit: LengthUnit = 'feet';  // Default output unit

  conversionRates: { [key in LengthUnit]: number } = {
    meters: 1,
    feet: 3.28084,
    inches: 39.3701,
    kilometers: 0.001,
    miles: 0.000621371
  };

  constructor() {
    this.convertFromInput(); // Perform initial conversion on component load
  }

  // Convert from input to output
  convertFromInput() {
    const valueInMeters = this.inputValue / this.conversionRates[this.inputUnit];
    this.outputValue = parseFloat((valueInMeters * this.conversionRates[this.outputUnit]).toFixed(3));
  }

  // Convert from output to input
  convertFromOutput() {
    const valueInMeters = this.outputValue / this.conversionRates[this.outputUnit];
    this.inputValue = parseFloat((valueInMeters * this.conversionRates[this.inputUnit]).toFixed(3));
  }
}
