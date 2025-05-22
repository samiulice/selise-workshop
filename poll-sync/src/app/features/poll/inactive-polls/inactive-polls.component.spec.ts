import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivePollsComponent } from './inactive-polls.component';

describe('InactivePollsComponent', () => {
  let component: InactivePollsComponent;
  let fixture: ComponentFixture<InactivePollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactivePollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivePollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
