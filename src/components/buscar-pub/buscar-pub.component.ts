import { Component, OnInit, ViewChild } from '@angular/core';
import { Publication } from '../../domain/Publication';
import { PublicationService } from '../../services/publication.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-pub',
  standalone: true,
  imports: [CommonModule, DecimalPipe, NgbPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './buscar-pub.component.html',
  styleUrl: './buscar-pub.component.scss'
})
export class BuscarPubComponent implements OnInit {

  displayedPublications!: Publication[];
  filteredPublications!: Publication[];
  publications!: Publication[];

  page = 1;
  pageSize = 10;
  collectionSize!: number;

  formName = "";
  formEmail = "";
  formBody = "";

  constructor(private publicationService: PublicationService) {
  }

  ngOnInit() {
    this.publicationService.getPublications().subscribe((data) => {
      this.publications = data;
      this.filteredPublications = this.publications;
      this.refreshPublications();
    });
  }

  refreshPublications() {
    // extrai as publicações exibidas de um subconjunto das publicações filtradas pela pesquisa.
    this.displayedPublications = this.filteredPublications.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
    this.collectionSize = this.filteredPublications.length;
  }

  filterPublications() {

    // Essa ordem deve ser mantida.

    // se não há nenhuma filtragem, faz as publicações filtradas voltarem a ser todo o conjunto.
    if (this.formName.length == 0 || this.formEmail.length == 0 || this.formBody.length == 0) {
      this.filteredPublications = this.publications;
    }

    // filtragem por nome
    if (this.formName.length != 0) {
      this.filteredPublications = this.filteredPublications.filter((publication) => publication.name!.toLowerCase().includes(this.formName.toLowerCase()));
    }

    // filtragem por email
    if (this.formEmail.length != 0) {
      this.filteredPublications = this.filteredPublications.filter((publication) => publication.email!.toLowerCase().includes(this.formEmail.toLowerCase()));
    }

    // filtragem por body
    if (this.formBody.length != 0) {
      this.filteredPublications = this.filteredPublications.filter((publication) => publication.body!.toLowerCase().includes(this.formBody.toLowerCase()));
    }

    this.refreshPublications();
  }

  clearFilters() {
    this.formName = "";
    this.formEmail = "";
    this.formBody = "";

    // reseta a filtragem
    this.filteredPublications = this.publications;
    this.refreshPublications();
  }
}