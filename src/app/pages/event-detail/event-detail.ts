import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarketStore } from '../../data/market/market.store';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss'
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private marketStore = inject(MarketStore);

  readonly markets = this.marketStore.markets;
  readonly loading = this.marketStore.loading;

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.marketStore.loadMarkets(eventId);
  }
}