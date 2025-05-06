import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.Service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    
    const requiredRole = route.data['role']; // can be string or string[]

    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          // Not logged in → redirect to login with return URL
          return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
          });
        }

        // If route has role restriction, check it
        if (requiredRole && !this.checkUserRole(user.role, requiredRole)) {
          // Logged in but wrong role → redirect to correct dashboard
          return this.redirectToDashboard(user.role);
        }

        // All good
        return true;
      })
    );
  }

  private checkUserRole(userRole: string, requiredRole: string | string[]): boolean {
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    return userRole === requiredRole;
  }

  private redirectToDashboard(role: string): UrlTree {
    const dashboardRoutes: Record<string, string> = {
      'admin': '/admin',
      'conducteur': '/conducteur',
      'passager': '/passager'
    };
    return this.router.createUrlTree([dashboardRoutes[role] || '/home']);
  }
}
