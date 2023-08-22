import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from './navigation.component';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { of, throwError } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let sessionServiceMock: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['logout', 'isAuthenticated']);
    sessionServiceMock = jasmine.createSpyObj('SessionService', ['clearSession']);

    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SessionService, useValue: sessionServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NavigationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.logout and clear session when logout is called', () => {
    const logoutResponse = 'Logout successful';
    authServiceMock.logout.and.returnValue(of(logoutResponse));

    component.logout();

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(sessionServiceMock.clearSession).toHaveBeenCalled();
  });

  it('should handle error when authService.logout throws an error', () => {
    const errorMessage = 'Logout failed';
    authServiceMock.logout.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error'); // Spy on console.error to check if it's called
    component.logout();

    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });
});
