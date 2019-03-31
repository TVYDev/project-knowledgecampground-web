<?php

namespace App\Http\Middleware;

use App\Lib\HttpConstants;
use Closure;

class StoreLastRouteRequest
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
        if($request->getMethod() !== 'GET')
            session([HttpConstants::KEY_TO_LAST_POST_ROUTE_STORED => $request->getRequestUri()]);

        return $next($request);
    }
}
