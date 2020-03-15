<?php

namespace App\Http\Middleware;

use Closure;

class Impersonate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($id = $request->session()->get('impersonate')) {
            auth()->onceUsingId($id);
        }

        return $next($request);
    }
}
