import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtemplateComponent } from './listtemplate.component';

describe('ListtemplateComponent', () => {
  let component: ListtemplateComponent;
  let fixture: ComponentFixture<ListtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
