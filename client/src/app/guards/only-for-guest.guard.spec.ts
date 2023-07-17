import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { onlyForGuestGuard } from './only-for-guest.guard';

describe('onlyForLoggedInGuard', () => {
  let guard: onlyForGuestGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [onlyForGuestGuard]
    });

    guard = TestBed.inject(onlyForGuestGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
