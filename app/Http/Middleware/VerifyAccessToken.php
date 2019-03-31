<?php

namespace App\Http\Middleware;

use Closure;

class VerifyAccessToken
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
        try
        {
            $response = $this->get($this->getApiRequestUrl('user.get_user'),null, [
                'Authorization' => $this->getAccessToken($request)
            ]);


            // Use as condition in navbar, to show profile or login button
            if($response->success == true){
                session([HttpConstants::KEY_TO_KC_USER_AUTHENTICATED => HttpConstants::KC_USER_VALID]);
                return $next($request);
            }
        }
        catch(\Exception $exception)
        {
            $request->session()->forget(HttpConstants::KEY_TO_KC_USER_AUTHENTICATED);
            return redirect()->route('user.getLogin')->withFailure('Session has expired. Please log in again');
        }
    }
}
