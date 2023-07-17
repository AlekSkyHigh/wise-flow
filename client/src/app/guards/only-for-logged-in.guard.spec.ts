import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { onlyForLoggedInGuard } from './only-for-logged-in.guard';

describe('onlyForLoggedInGuard', () => {
  let guard: onlyForLoggedInGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [onlyForLoggedInGuard]
    });

    guard = TestBed.inject(onlyForLoggedInGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
