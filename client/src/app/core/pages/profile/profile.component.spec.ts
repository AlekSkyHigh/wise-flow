import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { EntryService } from 'src/app/services/entry.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Entry } from 'src/app/types/entry.model';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let entryServiceMock: any;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    entryServiceMock = jasmine.createSpyObj('EntryService', ['fetchUserBalance', 'fetchUserEntries', 'deleteEntry', 'updateUserBalance']);
    sessionServiceMock = jasmine.createSpyObj('SessionService', ['getToken']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
  
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [SharedModule],
      providers: [
        { provide: EntryService, useValue: entryServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    // Fix for undefined reading ('pipe'):
    // By setting up the entryServiceMock.fetchUserEntries to return an observable using of([]) (an empty array as an example), the "undefined" error when calling the pipe method is prevented.
    entryServiceMock.fetchUserEntries.and.returnValue(of([])); // Mock an empty array as the response
  
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  
    // Mock token data
    const mockTokenData = {
      _id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    };
    sessionServiceMock.getToken.and.returnValue(mockTokenData);
  
    fixture.detectChanges();
  });
  

  it('should create ProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user entries and balance on component initialization', () => {
    const tokenData = { _id: '123', firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
    const mockEntries = [
      { _id: 'entry1', userId: '123', amount: 100, type: 'income', occurrence: 'monthly', date: new Date(), description: 'Test entry' },
    ];

    sessionServiceMock.getToken.and.returnValue(tokenData);
    entryServiceMock.fetchUserBalance.and.returnValue(of(500)); // Mock balance
    entryServiceMock.fetchUserEntries.and.returnValue(of(mockEntries));

    component.ngOnInit();

    expect(sessionServiceMock.getToken).toHaveBeenCalled();
    expect(entryServiceMock.fetchUserBalance).toHaveBeenCalledWith('123');
    expect(entryServiceMock.fetchUserEntries).toHaveBeenCalledWith('123');
    expect(component.firstName).toEqual('John');
    expect(component.lastName).toEqual('Doe');
    expect(component.email).toEqual('john@example.com');
    expect(component.balance).toBeTruthy();
    expect(component.entries).toEqual(mockEntries);
    expect(component.totalItems).toEqual(mockEntries.length);
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 10;
    component.itemsPerPage = 3;

    expect(component.getTotalPages()).toEqual(4);
  });

});
