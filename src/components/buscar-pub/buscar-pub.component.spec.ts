import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPubComponent } from './buscar-pub.component';

describe('BuscarPubComponent', () => {
  let component: BuscarPubComponent;
  let fixture: ComponentFixture<BuscarPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
