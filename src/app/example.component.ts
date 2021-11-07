import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Dropdowns {
  d1: Dropdown;
  d2: Dropdown;
  d3: Dropdown;
  d4: Dropdown;
  d5: Dropdown;
}

interface Dropdown {
  id: string;
  logic: DropdownLogicConfig;
  template: DropdownTemplateConfig;
}

interface DropdownLogicConfig {
  triggerEvent: string;
  dependants: string[];
}

interface DropdownTemplateConfig {
  elems: string[];
  label: string;
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  // Dropdown list elements.
  d1Elems = ['a1', 'a2', 'a3', 'a4', 'a5'];
  d2Elems = ['b1', 'b2', 'b3', 'b4', 'b5'];
  d3Elems = ['c1', 'c2', 'c3', 'c4', 'c5'];
  d4Elems = ['d1', 'd2', 'd3', 'd4', 'd5'];
  d5Elems = ['e1', 'e2', 'e3', 'e4', 'e5'];

  dropdowns: Dropdowns;
  // dropdownLogicConfigurations: DropdownLogicConfig[];
  // dropdowTemplateConfigurations: DropdownTemplateConfig[];

  form: FormGroup;

  constructor() {
    // window['a'] = this;
    this.dropdowns = this.createDropdowns();
    // this.dropdownLogicConfigurations = this.createDropdownsConfiguration();
    this.form = this.createForm(this.dropdowns);
    this.createSubscribes();
  }

  // Configurations.
  private createDropdowns(): Dropdowns {
    return {
      d1: {
        id: 'd1',
        logic: { triggerEvent: 'd1Data', dependants: ['d2'] },
        template: { elems: this.d1Elems, label: 'Dropdown 1' },
      },
      d2: {
        id: 'd2',
        logic: { triggerEvent: 'd2Data', dependants: ['d3'] },
        template: { elems: this.d2Elems, label: 'Dropdown 2' },
      },
      d3: {
        id: 'd3',
        logic: { triggerEvent: 'd3Data', dependants: ['d4'] },
        template: { elems: this.d3Elems, label: 'Dropdown 3' },
      },
      d4: {
        id: 'd4',
        logic: { triggerEvent: 'd4Data', dependants: ['d5'] },
        template: { elems: this.d4Elems, label: 'Dropdown 4' },
      },
      d5: {
        id: 'd5',
        logic: { triggerEvent: 'd5Data', dependants: [] },
        template: { elems: this.d5Elems, label: 'Dropdown 5' },
      },
    };
  }

  /*   private createDropdownsConfiguration(): DropdownLogicConfig[] {
    let config = null;

    if (!this.validateConfiguration()) {
      console.warn('Wrong configuration: backup to default config.');
      config = this.createDefaultDropdownsConfig();
    } else {
      config = [];
    }

    return config;
  }

  private createDefaultDropdownsConfig(): DropdownLogicConfig[] {
    return [
      { id: 'd1', triggerEvent: 'd1Data', dependants: ['d2'] },
      { id: 'd2', triggerEvent: 'd2Data', dependants: ['d3'] },
      { id: 'd3', triggerEvent: 'd3Data', dependants: ['d4'] },
      { id: 'd4', triggerEvent: 'd4Data', dependants: ['d5'] },
      { id: 'd5', triggerEvent: 'd5Data', dependants: [] },
    ];
  } */

  private createDropdownTemplateConfigurations() {
    return [];
  }

  // Form.
  private createForm(dropdowns: Dropdowns): FormGroup {
    const formGroup = new FormGroup({});

    Object.values(dropdowns).forEach((v) => {
      formGroup.addControl(v.id, new FormControl());
    });

    return formGroup;
  }

  private createSubscribes() {
    Object.entries(this.form.controls).forEach(([k, v]) => {
      console.log(k, ' - ', v);
      v.valueChanges.subscribe((v1) => {
        console.log('Selected value: ', v1);
      });
    });
  }

  // Others.
  private validateConfiguration() {
    let valid = false;
    return valid;
  }
}
