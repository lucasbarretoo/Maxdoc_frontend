import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DocumentService } from '../../../services/document/document.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DocumentVersion {
    id: number,
    description: string,
    version: number,
    phase: string,
    abbrev: string
}
export interface Document {
    id: number,
    title: string,
    versions: DocumentVersion[]
}

@Component({
    selector: 'app-document-list',
    imports: [
        MatButtonModule,
        MatIcon,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './document-list.component.html',
    styleUrl: './document-list.component.scss'
})

export class DocumentListComponent implements OnInit{
    
    public documentList: Document[] = [];

    constructor(
        private documentService: DocumentService,
        private toastService: ToastrService,
        private router: Router
    ){

    }

    ngOnInit(): void {
        
        this.loadDocumentList();
        
    }

    private loadDocumentList() {
        this.documentService.findAll().subscribe({
            next: (response: Document[]) => {
                console.log(response);
                
                this.documentList = response;
            },
            error: (error:any) => {
                
                console.log({error});
                
                this.toastService.error("Falha ao buscar documentos! Tente novamente.");
                this.router.navigate(['/home']);

            }
        });
    }

    openFormDoc(id: number | null = null){
        
        this.router.navigate(['/documents/form'], { queryParams: { id: id } });

    }

    deleteDoc(id: number){

        this.documentService.delete(id).subscribe({
            next: (response) => {
                
                this.toastService.success("Documento removido com sucesso!");
                this.loadDocumentList();

            },
            error: (error:any) => {
                
                this.toastService.error("Falha ao remover documento! Tente novamente.");
            }
        });
    }

    submitDoc(id: number){

        this.documentService.submit(id).subscribe({
            next: (response) => {
                
                this.toastService.success("Documento submetido com sucesso!");
                this.loadDocumentList();

            },
            error: (error:any) => {
                
                this.toastService.error("Falha ao submeter documento! Tente novamente.");
            }
        });
    }

    obsoleteDoc(id: number){

        this.documentService.obsolete(id).subscribe({
            next: (response) => {
                
                this.toastService.success("Documento obsoletado com sucesso!");
                this.loadDocumentList();

            },
            error: (error:any) => {
                
                this.toastService.error("Falha ao obsoletar documento! Tente novamente.");
            }
        });
    }

    createFromCurrentVersion(id: number){

        this.documentService.createFromCurrentVersion(id).subscribe({
            next: (response) => {
                
                this.toastService.success("Documento criado com sucesso!");
                this.loadDocumentList();

            },
            error: (error:any) => {
                
                this.toastService.error("Falha ao criar documento! Tente novamente.");
            }
        });
    }
}
