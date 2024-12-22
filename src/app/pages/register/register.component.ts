import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

interface RegisterForm {
	name: FormControl,
	email: FormControl,
	password: FormControl,
	confirm_password: FormControl
}

@Component({
	selector: 'app-register',
	imports: [
		CommonModule, // Necessário para *ngIf e outras diretivas do Angular
		ReactiveFormsModule, // Para formulários reativos
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		RouterModule
	],
	providers: [
		AuthService
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	registerForm: FormGroup<RegisterForm>;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private toastService: ToastrService
	) {
		this.registerForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirm_password: ['', [Validators.required, Validators.minLength(8)]],
		}, {
			validators: this.passwordsMatch
		});
	}

	onSubmit() {

		this.authService.register(
			this.registerForm.value.name, 
			this.registerForm.value.password, 
			this.registerForm.value.email
		).subscribe({
			next: (response) => {
				console.log({response});
				this.toastService.success("Usuário registrado com sucesso!");
			},
			error: (error) => {
				console.log({error});
				this.toastService.error("Falha ao registrar usuário! Tente novamente.");

			}
		});
		console.log(this.registerForm.value);
	}

	passwordsMatch(control: AbstractControl) {
		let password = control.get('password')?.value;
		let confirmPassword = control.get('confirm_password')?.value;

		if (password === confirmPassword) return true;

		control.get('confirm_password')?.setErrors({ passwordNotMatch: true });

		return false;
	}
}
