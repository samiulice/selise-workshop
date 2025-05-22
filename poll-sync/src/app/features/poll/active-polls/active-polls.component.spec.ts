import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePollsComponent } from './active-polls.component';

describe('ActivePollsComponent', () => {
  let component: ActivePollsComponent;
  let fixture: ComponentFixture<ActivePollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivePollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
