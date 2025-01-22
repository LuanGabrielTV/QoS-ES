import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BuscarPubComponent } from './buscar-pub.component';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../domain/Publication';

describe('BuscarPubComponent', () => {
  let component: BuscarPubComponent;
  let fixture: ComponentFixture<BuscarPubComponent>;
  let httpMock: HttpTestingController;

  const mockPublications: Publication[] = [
    { postId: 1, id: 1, name: 'Publication 1', email: 'email1@example.com', body: 'Test Body 1' },
    { postId: 2, id: 2, name: 'Publication 2', email: 'email2@example.com', body: 'Test Body 2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, BuscarPubComponent],
      providers: [PublicationService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(BuscarPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Garantindo as chamadas HTTP
  afterEach(() => {
    httpMock.verify();
  });

  // Testando o fetch com a API
  it('should fetch publications on initialization', () => {
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/comments');
    expect(req.request.method).toBe('GET');
    req.flush(mockPublications);

    expect(component.publications.length).toBe(2);
    expect(component.filteredPublications.length).toBe(2);
  });

});
