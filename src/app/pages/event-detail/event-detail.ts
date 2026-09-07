import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarketStore } from '../../data/market/market.store';
import { BetslipStore } from '../../data/betslip/betslip.store';
import { EventService } from '../../data/events/event.service';
import { EventResponse } from '../../data/events/models/event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Market } from '../../data/market/models/market.model';
import { Outcome } from '../../data/market/models/outcome.model';
import { Betslip } from '../../shared/components/betslip/betslip';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [RouterLink, Betslip],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private marketStore = inject(MarketStore);
  private betslipStore = inject(BetslipStore);
  private eventService = inject(EventService);

  readonly markets = this.marketStore.markets;
  readonly loading = this.marketStore.loading;

  event?: EventResponse;

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.marketStore.loadMarkets(eventId);
    this.eventService
      .getEventById(eventId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (event) => (this.event = event),
        error: (err) => console.error('Failed to load event', err),
      });
  }

  addToBetslip(market: Market, outcome: Outcome): void {
    if (!this.event) return;

    this.betslipStore.addSelection({
      outcomeId: outcome.id,
      eventId: market.eventId,
      homeTeam: this.event.homeTeam,
      awayTeam: this.event.awayTeam,
      marketName: market.marketTypeName,
      outcomeName: outcome.outcomeTypeName,
      odds: outcome.odds,
    });
  }
}
