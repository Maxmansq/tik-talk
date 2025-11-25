import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);
    cookieService = inject(CookieService);
    baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
    token = null;
    refreshToken = null;
    get isAuth() {
        if (!this.token) {
            this.token = this.cookieService.get('token');
            this.refreshToken = this.cookieService.get('refreshToken');
        }
        return !!this.token;
    }
    login(payload) {
        const fd = new FormData();
        fd.append('username', payload.username);
        fd.append('password', payload.password);
        return this.http.post(`${this.baseApiUrl}token`, fd)
            .pipe(tap(val => this.saveTokens(val)));
    }
    refreshAuthToken() {
        return this.http.post(`${this.baseApiUrl}refresh`, { refresh_token: this.refreshToken }).pipe(tap(val => this.saveTokens(val)), catchError(error => {
            this.logout();
            return throwError(error);
        }));
    }
    logout() {
        this.cookieService.deleteAll();
        this.token = null;
        this.refreshToken = null;
        this.router.navigate(['/login']);
    }
    saveTokens(res) {
        this.token = res.access_token;
        this.refreshToken = res.refresh_token;
        this.cookieService.set('token', this.token);
        this.cookieService.set('refreshToken', this.refreshToken);
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=auth.service.js.map