import { Component, inject, input, signal } from '@angular/core';
import { SportTree, CategoryTree, LeagueTree } from '../../../../data/tree/models/tree.model';
import { TreeSelectionStore } from '../../../../data/tree-selection/tree-selection.store';
import { CheckboxState } from '../../../../shared/components/checkbox/enum/CheckboxState';
import { Checkbox } from '../../../../shared/components/checkbox/checkbox';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [Checkbox],
  templateUrl: './tree.html',
  styleUrl: './tree.scss',
})
export class Tree {
  private treeSelection = inject(TreeSelectionStore);

  sports = input<SportTree[]>([]);

  expandedSports = signal<Record<number, boolean>>({});
  expandedCategories = signal<Record<number, boolean>>({});

  leagueState(league: LeagueTree): CheckboxState {
    return this.treeSelection.selectedLeagues()[league.id]
      ? CheckboxState.SELECTED
      : CheckboxState.NOT_SELECTED;
  }

  categoryState(category: CategoryTree): CheckboxState {
    const leagueIds = category.leagues.map((l) => l.id);
    return this.deriveState(leagueIds);
  }

  sportState(sport: SportTree): CheckboxState {
    const leagueIds = sport.categories.flatMap((c) => c.leagues.map((l) => l.id));
    return this.deriveState(leagueIds);
  }

  private deriveState(leagueIds: number[]): CheckboxState {
    const selected = this.treeSelection.selectedLeagues();
    const selectedCount = leagueIds.filter((id) => selected[id]).length;

    if (selectedCount === 0) return CheckboxState.NOT_SELECTED;
    if (selectedCount === leagueIds.length) return CheckboxState.SELECTED;
    return CheckboxState.PARTLY_SELECTED;
  }

  onLeagueToggle(league: LeagueTree): void {
    this.treeSelection.toggleLeague(league.id);
  }

  onCategoryToggle(category: CategoryTree): void {
    const leagueIds = category.leagues.map((l) => l.id);
    const newValue = this.categoryState(category) !== CheckboxState.SELECTED;
    this.treeSelection.setLeagues(leagueIds, newValue);
  }

  onSportToggle(sport: SportTree): void {
    const leagueIds = sport.categories.flatMap((c) => c.leagues.map((l) => l.id));
    const newValue = this.sportState(sport) !== CheckboxState.SELECTED;
    this.treeSelection.setLeagues(leagueIds, newValue);
  }

  toggleSportExpand(sportId: number): void {
    const current = this.expandedSports();
    this.expandedSports.set({ ...current, [sportId]: !current[sportId] });
  }

  toggleCategoryExpand(categoryId: number): void {
    const current = this.expandedCategories();
    this.expandedCategories.set({ ...current, [categoryId]: !current[categoryId] });
  }
}
