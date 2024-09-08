import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

// Define a union type for the allowed units
type WeightUnit = 'kilograms' | 'grams' | 'pounds' | 'ounces';

@Component({
  selector: 'app-weight-converter',
  templateUrl: './weight-converter.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule
  ],
  styleUrls: ['../../shared/converter/converter.component.css'],
})
export class WeightConverterComponent {
  inputValue: number = 1; // Default input value
  outputValue: number = 0; // Result of conversion
  inputUnit: WeightUnit = 'kilograms'; // Default input unit
  outputUnit: WeightUnit = 'grams'; // Default output unit

  // Conversion rates relative to 1 kilogram
  conversionRates: { [key in WeightUnit]: number } = {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274
  };

  constructor() {
    this.convertFromInput(); // Perform initial conversion on component load
  }

  // Method to perform the conversion from input to output
  convertFromInput() {
    // Convert input to kilograms first
    const valueInKilograms = this.inputValue / this.conversionRates[this.inputUnit];

    // Convert from kilograms to the output unit and limit to 2 decimal places
    this.outputValue = parseFloat((valueInKilograms * this.conversionRates[this.outputUnit]).toFixed(3));
  }

  // Method to perform the conversion from output to input
  convertFromOutput() {
    // Convert output to kilograms first
    const valueInKilograms = this.outputValue / this.conversionRates[this.outputUnit];

    // Convert from kilograms to the input unit and limit to 2 decimal places
    this.inputValue = parseFloat((valueInKilograms * this.conversionRates[this.inputUnit]).toFixed(3));
  }
}
