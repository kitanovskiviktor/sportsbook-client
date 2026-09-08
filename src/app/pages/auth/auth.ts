import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../../data/auth/auth.store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  readonly loading = this.authStore.loading;
  readonly error = this.authStore.error;

  isLoginMode = signal(true);

  username = '';
  email = '';
  password = '';

  constructor() {
    effect(() => {
      if (this.authStore.isLoggedIn()) {
        this.router.navigate(['/']);
      }
    });
  }

  toggleMode(): void {
    this.isLoginMode.set(!this.isLoginMode());
  }

  submit(): void {
    if (this.isLoginMode()) {
      this.authStore.login({ username: this.username, password: this.password });
    } else {
      this.authStore.register({
        username: this.username,
        email: this.email,
        password: this.password,
      });
    }
  }
}
