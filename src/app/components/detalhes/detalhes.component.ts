import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, ShareButtonsModule, ShareIconsModule, MatIconModule],
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css', './responsiveDetalhes.css'],
})
export class DetalhesComponent implements OnInit {
  nomeCompleto: string = '';
  primeiroNome: string = '';
  itemId: string = '';
  idData: any;
  constructor(
    private route: ActivatedRoute,
    private api: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.getDatabyID(this.itemId);
    });
  }
  getDatabyID(id: any) {
    this.api.getPessoaByID(id).subscribe((response) => {
      this.idData = response;
      this.nomeCompleto = this.idData.nome;
      this.primeiroNome = this.nomeCompleto.split(' ')[0];
    });
  }
  voltarHome() {
    this.router.navigate(['/home']);
  }
}
