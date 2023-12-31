import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Auth, authState, signInAnonymously , signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';

@Component({
  selector: 'app-login',
  template: `<p>
    Auth!
    <code>{{ (user|async)?.uid }}</code>
    <button (click)="login()" *ngIf="showLoginButton">Log in with Google</button>
    <button (click)="loginAnonymously()" *ngIf="showLoginButton">Log in anonymously</button>
  </p>`,
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;
  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }

}