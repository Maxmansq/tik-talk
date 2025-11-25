import { HttpClient } from '@angular/common/http';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class AuthService {
    http: HttpClient;
    router: Router;
    cookieService: CookieService;
    baseApiUrl: string;
    token: string | null;
    refreshToken: string | null;
    get isAuth(): boolean;
    login(payload: {
        username: string;
        password: string;
    }): import("rxjs").Observable<TokenResponse>;
    refreshAuthToken(): import("rxjs").Observable<TokenResponse>;
    logout(): void;
    saveTokens(res: TokenResponse): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
