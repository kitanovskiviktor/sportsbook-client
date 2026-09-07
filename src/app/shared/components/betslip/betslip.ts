import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BetslipStore } from '../../../data/betslip/betslip.store';

@Component({
  selector: 'app-betslip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './betslip.html',
  styleUrl: './betslip.scss'
})
export class Betslip {
  private betslipStore = inject(BetslipStore);

  readonly selections = this.betslipStore.selections;
  readonly totalOdds = this.betslipStore.totalOdds;
  readonly potentialWin = this.betslipStore.potentialWin;
  readonly count = this.betslipStore.count;
  readonly stake = this.betslipStore.stake;

  onStakeChange(value: number): void {
    this.betslipStore.setStake(value || 0);
  }

  remove(outcomeId: number): void {
    this.betslipStore.removeSelection(outcomeId);
  }

  clear(): void {
    this.betslipStore.clear();
  }
}