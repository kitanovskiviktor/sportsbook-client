import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BetslipStore } from '../../../data/betslip/betslip.store';
import { TicketStore } from '../../../data/ticket/ticket.store';
import { AuthStore } from '../../../data/auth/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-betslip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './betslip.html',
  styleUrl: './betslip.scss',
})
export class Betslip {
  private betslipStore = inject(BetslipStore);
  private ticketStore = inject(TicketStore);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  readonly selections = this.betslipStore.selections;
  readonly totalOdds = this.betslipStore.totalOdds;
  readonly potentialWin = this.betslipStore.potentialWin;
  readonly count = this.betslipStore.count;
  readonly stake = this.betslipStore.stake;
  readonly isLoggedIn = this.authStore.isLoggedIn;
  readonly placing = this.ticketStore.placing;
  readonly message = this.ticketStore.message;
  readonly messageType = this.ticketStore.messageType;

  constructor() {
    effect(() => {
      if (this.messageType() === 'success') {
        this.betslipStore.clear();
      }
    });
  }

  onStakeChange(value: number): void {
    this.betslipStore.setStake(value || 0);
  }

  remove(outcomeId: number): void {
    this.betslipStore.removeSelection(outcomeId);
  }

  clear(): void {
    this.betslipStore.clear();
  }

  placeTicket(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.ticketStore.placeTicket({
      stake: this.betslipStore.stake(),
      selections: this.selections().map((s) => ({
        outcomeId: s.outcomeId,
        odds: s.odds,
      })),
    });
  }
}
