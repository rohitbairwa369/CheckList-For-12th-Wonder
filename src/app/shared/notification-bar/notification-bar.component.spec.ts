import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBarComponent } from './notification-bar.component';

describe('NotificationBarComponent', () => {
  let component: NotificationBarComponent;
  let fixture: ComponentFixture<NotificationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
