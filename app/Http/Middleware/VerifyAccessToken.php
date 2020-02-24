<?php

namespace App\Http\Middleware;

use App\Lib\HttpConstants;
use App\Lib\RequestAPI;
use App\Lib\RouteConstants;
use Closure;

class VerifyAccessToken
{
    use RequestAPI;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try
        {
            $response = $this->get($this->getApiRequestUrl('user.verify_authentication'),null,null, [
                'Authorization' => $this->getAccessToken($request)
            ]);

            // Use as condition in navbar, to show profile or login button
            if($response->success == true){
                session([HttpConstants::KEY_TO_KC_USER_AUTHENTICATED => HttpConstants::KC_USER_VALID]);
                return $next($request);
            }

            throw new \ErrorException('Unauthenticated');
        }
        catch(\Exception $exception)
        {
            $request->session()->forget(HttpConstants::KEY_TO_KC_USER_AUTHENTICATED);
            return redirect()->route(RouteConstants::USER_GET_LOGIN)->withFailure('Please log in to continue');
        }
    }
}
