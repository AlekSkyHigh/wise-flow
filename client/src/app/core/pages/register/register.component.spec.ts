import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register', 'login']);
    sessionServiceMock = jasmine.createSpyObj('SessionService', ['createSession']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should register user and navigate to home on successful registration', () => {
    const formValue = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    };
  
    // Create a form object with 'value' property
    const form = {
      value: formValue
    };
  
    authServiceMock.register.and.returnValue(of({}));
    authServiceMock.login.and.returnValue(of('token'));
  
    component.registerUser(form as NgForm);
  
    expect(authServiceMock.register).toHaveBeenCalledWith(
      formValue.email,
      formValue.password,
      formValue.firstName,
      formValue.lastName
    );
    expect(authServiceMock.login).toHaveBeenCalledWith(formValue.email, formValue.password);
    expect(sessionServiceMock.createSession).toHaveBeenCalledWith('token');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error messages on registration failure', () => {
    const formValue = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    };

    const form = {
      value: formValue
    };

    const errorMessage = 'An error occurred.';
    authServiceMock.register.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));

    component.registerUser(form as NgForm);

    expect(component.errorMessages).toEqual(errorMessage);
    // Additional assertions related to AuthService and SessionService calls can be added here
  });
  
});
