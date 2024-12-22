import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../../services/document/document.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from "ngx-editor";

interface DocForm {
    title: FormControl,
    abbrev: FormControl,
    description: FormControl
}

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
    selector: 'app-document-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        NgxEditorModule
    ],
    templateUrl: './document-form.component.html',
    styleUrl: './document-form.component.scss'
})
export class DocumentFormComponent implements OnInit {

    public docForm!: FormGroup<DocForm>;
    public document!: Document;
    public documentId!: number;
    public editor: Editor;
    public toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        private documentService: DocumentService,
        private toastService: ToastrService
    ) {
        this.docForm = this.fb.group({
            title: ['', [Validators.required]],
            abbrev: ['', [Validators.required]],
            description: [{ value: '', disabled: false }, [Validators.required]],
        });

        this.route.queryParams.subscribe(params => {
            this.documentId = params['id'];
        });
        
        this.editor = new Editor();
    }

    ngOnInit(): void {

        if (this.documentId) {

            this.documentService.findById(this.documentId).subscribe({
                next: (response: Document) => {

                    this.document = response;
                    console.log({ document: this.document });

                    this.docForm.controls.title.setValue(this.document.title);
                    this.docForm.controls.abbrev.setValue(this.document.versions[this.document.versions.length - 1].abbrev);
                    this.docForm.controls.description.setValue(this.document.versions[this.document.versions.length - 1].description);

                    if(this.document.versions[this.document.versions.length - 1].phase != 'Minuta'){
                        this.docForm.controls.title.disable();
                        this.docForm.controls.abbrev.disable();
                        this.docForm.controls.description.disable();
                    }
                },
                error: (error) => {
                    this.toastService.error("Não foi possível obter documento! Tente novamente.")
                    this.router.navigate(['/documents']);
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    onSubmit() {

        console.log("submiting", this.documentId);

        if (this.documentId) {

            console.log(this.docForm.value.description);
            
            this.documentService.update(
                this.documentId,
                this.docForm.value.title,
                this.docForm.value.abbrev,
                this.docForm.value.description
            ).subscribe({
                next: (response) => {

                    console.log({ response });
                    this.toastService.success("Documento atualizado com sucesso!");
                    this.router.navigate(['/documents']);
                },
                error: (error: any) => {
                    console.log({ error });
                    this.toastService.error("Falha ao atualizar documento! Tente novamente.");

                }
            });
        } else {

            this.documentService.create(
                this.docForm.value.title,
                this.docForm.value.abbrev,
                this.docForm.value.description
            ).subscribe({
                next: (response) => {

                    console.log({ response });
                    this.toastService.success("Documento criado com sucesso!");
                    this.router.navigate(['/documents']);
                },
                error: (error: any) => {
                    console.log({ error });
                    this.toastService.error("Falha ao cadastrar documento! Tente novamente.");

                }
            });
        }
    }
}
