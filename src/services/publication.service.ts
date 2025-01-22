import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../domain/Publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  url = "https://jsonplaceholder.typicode.com/comments";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getPublications() {
    return this.httpClient.get<Publication[]>(this.url);
  }

}