import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarseComponent } from './registrarse.component';
import Swal from 'sweetalert2';

describe('RegistrarseComponent', () => {
  let component: RegistrarseComponent;
  let fixture: ComponentFixture<RegistrarseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
