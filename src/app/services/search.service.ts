import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl = 'https://abitus-api.pjc.mt.gov.br/v1/pessoas/aberto/filtro';
  constructor(private http: HttpClient) {}
  getPessoas(
    perPage: number,
    pagina?: number,
    idadeFinal?: string,
    idadeInicial?: string,
    nome?: string,
    sexo?: string
  ): Observable<any> {
    const url = `${this.apiUrl}?faixaIdadeFinal=${idadeFinal}&faixaIdadeInicial=${idadeInicial}&nome=${nome}&porPagina=${perPage}&sexo=${sexo}&status=DESAPARECIDO&pagina=${pagina}`;

    return this.http.get(url);
  }
  getPessoaByID(ID: string): Observable<any> {
    const url = `https://abitus-api.pjc.mt.gov.br/v1/pessoas/${ID}`;

    return this.http.get(url);
  }
}
