import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterColisComponent } from './consulter-colis.component';

describe('ConsulterColisComponent', () => {
  let component: ConsulterColisComponent;
  let fixture: ComponentFixture<ConsulterColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterColisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
