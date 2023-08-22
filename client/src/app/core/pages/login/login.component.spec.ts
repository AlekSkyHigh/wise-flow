import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    sessionServiceMock = jasmine.createSpyObj('SessionService', ['createSession']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should log in user and navigate to home on successful login', () => {
    const formValue = {
      email: 'test@example.com',
      password: 'password',
    };
  
    const form = {
      value: formValue
    };
  
    authServiceMock.login.and.returnValue(of('token'));
  
    component.loginUser(form as NgForm);
  
    expect(authServiceMock.login).toHaveBeenCalledWith(
      formValue.email,
      formValue.password
    );
    expect(sessionServiceMock.createSession).toHaveBeenCalledWith('token');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error message on login failure', () => {
    const formValue = {
      email: 'test@example.com',
      password: 'password',
    };

    const form = {
      value: formValue
    };

    const errorMessage = 'Invalid credentials.';
    authServiceMock.login.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));

    component.loginUser(form as NgForm);

    expect(component.errorMessage).toEqual(errorMessage);
    // Additional assertions related to AuthService and SessionService calls can be added here
  });

});
