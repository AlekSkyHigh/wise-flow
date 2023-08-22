import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AddFlowsComponent } from './add-flows.component';
import { EntryService } from 'src/app/services/entry.service';
import { SessionService } from 'src/app/services/session.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('AddFlowsComponent', () => {
  let component: AddFlowsComponent;
  let fixture: ComponentFixture<AddFlowsComponent>;
  let entryServiceMock: any;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    entryServiceMock = {
      fetchUserBalance: jasmine.createSpy().and.returnValue(of(100)),
      createEntry: jasmine.createSpy().and.returnValue(of({})),
      updateUserBalance: jasmine.createSpy().and.returnValue(of({})),
    };

    sessionServiceMock = {
      getToken: jasmine.createSpy().and.returnValue({ _id: 'user_id' }),
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AddFlowsComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: EntryService, useValue: entryServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddFlowsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user balance on component initialization', () => {
    expect(entryServiceMock.fetchUserBalance).toHaveBeenCalledWith('user_id');
  });

  it('should create entry and update balance on successful entry creation', () => {
    component.type = 'income';
    component.occurrence = 'monthly';
    component.amount = 50;
    component.date = '2023-08-01';
    component.description = 'Test entry';

    component.createEntry();

    expect(entryServiceMock.createEntry).toHaveBeenCalledWith({
      type: 'income',
      occurrence: 'monthly',
      amount: 50,
      date: '2023-08-01',
      description: 'Test entry',
    });

    expect(entryServiceMock.fetchUserBalance).toHaveBeenCalledWith('user_id');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/add-flows'], {
      skipLocationChange: true,
    });

    // Additional assertions can be made here if needed
  });

  it('should handle error during entry creation', () => {
    const errorMessage = 'Entry creation failed.';
    entryServiceMock.createEntry.and.returnValue(
      new Observable((subscriber) => {
        subscriber.error({ error: { message: errorMessage } });
      })
    );

    component.createEntry();

    expect(entryServiceMock.createEntry).toHaveBeenCalled();
    expect(component.errorMessages).toEqual(errorMessage);
  });

  // TODO tests for ngOnDestroy to unsubscribe subscriptions
});
