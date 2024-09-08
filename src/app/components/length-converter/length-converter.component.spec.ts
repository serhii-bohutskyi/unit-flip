import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LengthConverterComponent } from './length-converter.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('LengthConverterComponent', () => {
  let component: LengthConverterComponent;
  let fixture: ComponentFixture<LengthConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LengthConverterComponent, // Import the standalone component
        FormsModule,
        TranslateModule.forRoot() // Import the necessary modules
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Ensure the component is created successfully
  });

  it('should have default input value as 1 meter', () => {
    expect(component.inputValue).toEqual(1); // Default input value is 1
    expect(component.inputUnit).toEqual('meters'); // Default input unit is meters
  });

  it('should have default output unit as feet', () => {
    expect(component.outputUnit).toEqual('feet'); // Default output unit is feet
  });

  it('should correctly convert meters to feet', () => {
    component.inputValue = 1; // 1 meter
    component.inputUnit = 'meters';
    component.outputUnit = 'feet';
    component.convertFromInput();

    expect(component.outputValue).toBeCloseTo(3.281, 3); // 1 meter = 3.281 feet (rounded to 3 decimals)
  });

  it('should correctly convert feet to meters', () => {
    component.outputValue = 3.281; // 3.281 feet
    component.inputUnit = 'meters';
    component.outputUnit = 'feet';
    component.convertFromOutput();

    expect(component.inputValue).toBeCloseTo(1, 3); // 3.281 feet = 1 meter
  });

  it('should correctly convert kilometers to miles', () => {
    component.inputValue = 1; // 1 kilometer
    component.inputUnit = 'kilometers';
    component.outputUnit = 'miles';
    component.convertFromInput();

    expect(component.outputValue).toBeCloseTo(0.621, 3); // 1 kilometer = 0.621 miles
  });

  it('should correctly convert miles to kilometers', () => {
    component.inputValue = 1; // 1 mile
    component.inputUnit = 'miles';
    component.outputUnit = 'kilometers';
    component.convertFromInput();

    expect(component.outputValue).toBeCloseTo(1.609, 3); // 1 mile = 1.609 kilometers
  });

  it('should handle conversion between the same units', () => {
    component.inputValue = 5; // Any value
    component.inputUnit = 'meters';
    component.outputUnit = 'meters';
    component.convertFromInput();

    expect(component.outputValue).toEqual(5); // Same value if the units are the same
  });

  it('should update output value when input value changes', () => {
    component.inputValue = 2; // Change input value
    component.convertFromInput();

    expect(component.outputValue).not.toEqual(0); // Output value should update
  });

  it('should update input value when output value changes', () => {
    component.outputValue = 6.562; // Set output value to 6.562 feet (2 meters)
    component.convertFromOutput();

    expect(component.inputValue).toBeCloseTo(2, 3); // Should convert back to 2 meters
  });
});
