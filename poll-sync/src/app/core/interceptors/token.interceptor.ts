import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage or a service
    const token = localStorage.getItem('token');
    console.log("Bearer Token: ",token)
    // If token exists, clone request and add Authorization header
    if (token) {
      const cloned = req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
      return next(cloned);
    }
  return next(req);
};

