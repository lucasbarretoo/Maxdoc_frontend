import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-response.type';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private httpClient: HttpClient
	) {

	}

	login(email: string, password: string){

		return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {email, password})
			.pipe(tap((value) => {
				sessionStorage.setItem("auth-token", value.token);
				sessionStorage.setItem("username", value.name);
			}));
	}
	
	register(name: string, password: string, email: string){

		return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/register`, {name, password, email})
			.pipe(tap((value) => {
				sessionStorage.setItem("auth-token", value.token);
				sessionStorage.setItem("username", value.name);
			}));
	}
}
