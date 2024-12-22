import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(
        private httpClient: HttpClient
    ) { 

    }
    
    create(title: string, abbrev: string, description:string ): Observable<any> {

        return this.httpClient.post(`${environment.apiUrl}/documents`, {
            title,
            abbrev,
            description
        });
    }

    update(id: number, title: string, abbrev: string, description:string ): Observable<any> {

        return this.httpClient.put(`${environment.apiUrl}/documents/${id}`, {
            title,
            abbrev,
            description
        });
    }

    createFromCurrentVersion(id: number): Observable<any> {

        return this.httpClient.put(`${environment.apiUrl}/documents/${id}/create-from-current-version`, null);
    }

    submit(id: number): Observable<any> {

        return this.httpClient.put(`${environment.apiUrl}/documents/${id}/submit`, null);
    }

    obsolete(id: number): Observable<any> {

        return this.httpClient.put(`${environment.apiUrl}/documents/${id}/obsolete`, null);
    }

    delete(id: number): Observable<any>{
        return this.httpClient.delete(`${environment.apiUrl}/documents/${id}`);
    }

    findAll(): Observable<any> {

        return this.httpClient.get(`${environment.apiUrl}/documents`);
    }

    findById(id: number): Observable<any> {

        return this.httpClient.get(`${environment.apiUrl}/documents/${id}`);
    }
}
