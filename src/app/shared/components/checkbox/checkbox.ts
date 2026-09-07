import { Component, input, output, computed } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxState } from './enum/CheckboxState';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss'
})
export class Checkbox {
  state = input<CheckboxState>(CheckboxState.NOT_SELECTED);
  toggle = output<void>();

  checked = computed(() => this.state() === CheckboxState.SELECTED);
  indeterminate = computed(() => this.state() === CheckboxState.PARTLY_SELECTED);

  onChange(): void {
    this.toggle.emit();
  }
}