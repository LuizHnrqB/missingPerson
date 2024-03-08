import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    CommonModule,
    ShareButtonsModule,
    ShareIconsModule,
    NgOptimizedImage,
  ],
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.css',
    './responsiveList480.css',
    './responsiveList1024.css',
  ],
})
export class ListComponent {
  constructor(private api: SearchService, private router: Router) {
    if (typeof localStorage !== 'undefined') {
      this.perPage = +localStorage.getItem('perPage')! || 8;
      this.pagina = +localStorage.getItem('pagina')! || 0;
      this.idadeFinal = localStorage.getItem('idadeFinal') || '';
      this.idadeInicial = localStorage.getItem('idadeInicial') || '';
      this.nome = localStorage.getItem('nome') || '';
      this.sexo = localStorage.getItem('sexo') || '';
    } else {
      this.perPage = 8;
      this.pagina = 0;
      this.idadeFinal = '';
      this.idadeInicial = '';
      this.nome = '';
      this.sexo = '';
    }
  }
  sexoMasculino: boolean = false;
  sexoFeminino: boolean = false;
  id: string = '';
  data: any;
  idadeInicial: string = '';
  idadeFinal: string = '';
  nome: string = '';
  sexo: string = '';
  perPage: number = 8;
  pagina: number = 0;

  ngOnInit(): void {
    this.buscarPessoas();
  }

  passarPagina(): void {
    this.pagina = this.pagina + 1;
    this.buscarPessoas();
  }
  voltarPagina(): void {
    this.pagina = this.pagina - 1;
    this.buscarPessoas();
  }

  passarPagina10(): void {
    this.pagina = this.pagina + 10;
    this.buscarPessoas();
  }
  voltarPagina10(): void {
    this.pagina = this.pagina - 10;
    this.buscarPessoas();
  }
  getPageNumbers(): number[] {
    const start = Math.max(0, this.pagina - 3);
    const end = Math.min(start + 6, 99);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  trocarPerPage(event: any) {
    this.perPage = event;
    this.buscarPessoas();
  }
  setPagina(page: number): void {
    this.pagina = page;
    this.buscarPessoas();
  }
  buscarPessoas(): void {
    this.api
      .getPessoas(
        this.perPage,
        this.pagina,
        this.idadeFinal,
        this.idadeInicial,
        this.nome,
        this.sexo
      )
      .subscribe(
        (response) => {
          this.data = response.content;
          localStorage.setItem('perPage', this.perPage.toString());
          localStorage.setItem('pagina', this.pagina.toString());
          localStorage.setItem('idadeFinal', this.idadeFinal);
          localStorage.setItem('idadeInicial', this.idadeInicial);
          localStorage.setItem('nome', this.nome);
          localStorage.setItem('sexo', this.sexo);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  redirectToDetails(id: any) {
    this.router.navigate(['/detalhes', id]);
  }
  handleCheckboxChange() {
    if (this.sexoMasculino && this.sexoFeminino) {
      this.sexo = '';
    } else if (this.sexoMasculino) {
      this.sexo = 'MASCULINO';
    } else if (this.sexoFeminino) {
      this.sexo = 'FEMININO';
    } else {
      this.sexo = '';
    }
    this.buscarPessoas();
  }
}
