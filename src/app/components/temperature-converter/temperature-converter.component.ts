import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

type TemperatureUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

@Component({
  selector: 'app-temperature-converter',
  templateUrl: './temperature-converter.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule
  ],
  styleUrls: ['../../shared/converter/converter.component.css'],
})
export class TemperatureConverterComponent {
  inputValue: number | null = 0; // Default input value
  outputValue: number | null = 0; // Default output value
  inputUnit: TemperatureUnit = 'Celsius'; // Default input unit
  outputUnit: TemperatureUnit = 'Fahrenheit'; // Default output unit

  constructor() {
    this.convertFromInput(); // Perform initial conversion on component load
  }
  // Convert from input (first field) to output (second field)
  convertFromInput() {
    if (this.inputValue === null) return; // Skip if input is null
    if (this.inputUnit === this.outputUnit) {
      this.outputValue = this.inputValue;
    } else {
      switch (this.inputUnit) {
        case 'Celsius':
          this.outputValue = this.convertFromCelsius(this.outputUnit, this.inputValue);
          break;
        case 'Fahrenheit':
          this.outputValue = this.convertFromFahrenheit(this.outputUnit, this.inputValue);
          break;
        case 'Kelvin':
          this.outputValue = this.convertFromKelvin(this.outputUnit, this.inputValue);
          break;
      }
    }
  }

  // Convert from output (second field) to input (first field)
  convertFromOutput() {
    if (this.outputValue === null) return; // Skip if output is null
    if (this.outputUnit === this.inputUnit) {
      this.inputValue = this.outputValue;
    } else {
      switch (this.outputUnit) {
        case 'Celsius':
          this.inputValue = this.convertFromCelsius(this.inputUnit, this.outputValue);
          break;
        case 'Fahrenheit':
          this.inputValue = this.convertFromFahrenheit(this.inputUnit, this.outputValue);
          break;
        case 'Kelvin':
          this.inputValue = this.convertFromKelvin(this.inputUnit, this.outputValue);
          break;
      }
    }
  }

  // Conversion methods, now using toFixed(2) for rounding to 2 decimal places
  convertFromCelsius(outputUnit: string, value: number): number | null {
    if (value === null) return null;
    if (outputUnit === 'Fahrenheit') {
      return parseFloat(((value * 9) / 5 + 32).toFixed(2));
    } else if (outputUnit === 'Kelvin') {
      return parseFloat((value + 273.15).toFixed(2));
    }
    return value;
  }

  convertFromFahrenheit(outputUnit: string, value: number): number | null {
    if (value === null) return null;
    if (outputUnit === 'Celsius') {
      return parseFloat((((value - 32) * 5) / 9).toFixed(2));
    } else if (outputUnit === 'Kelvin') {
      return parseFloat((((value - 32) * 5) / 9 + 273.15).toFixed(2));
    }
    return value;
  }

  convertFromKelvin(outputUnit: string, value: number): number | null {
    if (value === null) return null;
    if (outputUnit === 'Celsius') {
      return parseFloat((value - 273.15).toFixed(2));
    } else if (outputUnit === 'Fahrenheit') {
      return parseFloat((((value - 273.15) * 9) / 5 + 32).toFixed(2));
    }
    return value;
  }
}
