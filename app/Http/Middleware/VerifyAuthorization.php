<?php

namespace App\Http\Middleware;

use App\Http\Support\Permission;
use App\Lib\RouteConstants;
use Closure;

class VerifyAuthorization
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
        $isAuthorized = false;
        $incomingRouteName = $request->route()->getName();
        $routes = [
            RouteConstants::USER_GET_CHANGE_PASSWORD,
            RouteConstants::USER_POST_CHANGE_PASSWORD
        ];
        if(in_array($incomingRouteName, $routes)) {
            if(Permission::can(Permission::CAN_CHANGE_PASSWORD)) {
                $isAuthorized = true;
            }
        }else {
            $isAuthorized = true;
        }

        if($isAuthorized) {
            return $next($request);
        }
        return redirect()->route(RouteConstants::HOME)->withFailure('You are not authorized to access the page you requested');
    }
}
