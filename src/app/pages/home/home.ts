import { Component, inject, effect, signal } from '@angular/core';
import { Tree } from './components/tree/tree';
import { TreeStore } from '../../data/tree/tree.store';
import { TreeSelectionStore } from '../../data/tree-selection/tree-selection.store';
import { EventStore } from '../../data/events/event.store';
import { RouterLink } from '@angular/router';
import { Betslip } from '../../shared/components/betslip/betslip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Tree, RouterLink, Betslip],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private treeStore = inject(TreeStore);
  private selection = inject(TreeSelectionStore);
  private eventStore = inject(EventStore);

  private selectedTreeHours = signal<number>(24);

  readonly tree = this.treeStore.tree;
  readonly events = this.eventStore.events;
  readonly eventsLoading = this.eventStore.loading;

  constructor() {
    this.treeStore.loadTree(this.selectedTreeHours());

    effect(() => {
      const ids = this.selection.selectedLeagueIds();
      if (ids.length > 0) {
        this.eventStore.loadEvents({ leagueIds: ids, hours: this.selectedTreeHours() });
      } else {
        this.eventStore.clearEvents();
      }
    });
  }

    onHoursChanged(hours: number): void {
    this.selectedTreeHours.set(hours);        
    this.treeStore.loadTree(hours); 
  }
}
