<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UsersPermissionRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next,...$roles)
    {
//        if (in_array(auth()->user()->roles['role'],$roles)){
//            return $next($request);
//        }
        if (auth()->user()->roles['role']!=null){
            return $next($request);
        }

        return redirect()->intended('/login');
    }
}
