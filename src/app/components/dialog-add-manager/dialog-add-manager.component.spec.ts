import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddManagerComponent } from './dialog-add-manager.component';

describe('DialogAddManagerComponent', () => {
  let component: DialogAddManagerComponent;
  let fixture: ComponentFixture<DialogAddManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
