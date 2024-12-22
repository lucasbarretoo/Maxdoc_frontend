import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AppComponent } from './app.component';
import { DocumentListComponent } from './pages/documents/document-list/document-list.component';
import { DocumentFormComponent } from './pages/documents/document-form/document-form.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        data: { showLayout: false }
    },
    {
        path: "register",
        component: RegisterComponent,
        data: { showLayout: false }
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuardService],
        data: { showLayout: true }
    },
    {
        path: "",
        component: AppComponent,
        canActivate: [AuthGuardService],
        data: { showLayout: true }
    },
    {
        path: "documents",
        component: DocumentListComponent,
        canActivate: [AuthGuardService],
        data: { showLayout: true }
    },
    {
        path: "documents/form",
        component: DocumentFormComponent,
        canActivate: [AuthGuardService],
        data: { showLayout: true }
    }
];
