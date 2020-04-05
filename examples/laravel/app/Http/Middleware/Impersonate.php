<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Pipeline;

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
        if ($request->hasSession() && ($id = $request->session()->get('impersonate'))) {
            auth()->onceUsingId($id);

            return $next($request);
        }

        return (new Pipeline(app()))->send($request)->through([
            \App\Http\Middleware\Authenticate::class . ':sanctum'
        ])->then(function ($request) use ($next) {
            return $next($request);
        });
    }
}
