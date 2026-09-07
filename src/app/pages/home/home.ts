import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { TreeStore } from '../../data/tree/tree.store';
import { Tree } from './components/tree/tree';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatExpansionModule, MatListModule, Tree],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private store = inject(TreeStore);
  readonly tree = this.store.tree;
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  ngOnInit(): void {
    this.store.loadTree(24);
  }
}