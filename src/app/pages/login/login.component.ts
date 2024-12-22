import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
	email: FormControl,
	password: FormControl
}

@Component({
	selector: 'app-login',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		RouterModule
	],
	providers: [
		AuthService
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {

	public loginForm!: FormGroup<LoginForm>;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private toastService: ToastrService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		});
	}

	onSubmit() {

		this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
			.subscribe({
				next: (response) => {
					console.log({response});
					this.toastService.success("Login realizado com sucesso!");
					this.router.navigate(['/home']);
				},
				error: (error) => {
					console.log({error});
					this.toastService.error("Falha ao realizar login! Tente novamente.");

				}
			});
		console.log(this.loginForm.value);
	}
}
