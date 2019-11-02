<?php

namespace App\Http\Middleware;

use App\Lib\RequestAPI;
use App\Lib\RouteConstants;
use Closure;

class PreventLoginOrRegisterAfterAuthenticated
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
            $previousUrl = url()->previous();
            $response = $this->get($this->getApiRequestUrl('user.verify_authentication'),null,null, [
                'Authorization' => $this->getAccessToken($request)
            ]);

            if($response->success == true){
                $uri = $request->getRequestUri();
                if($uri == '/auth/login' || $uri == '/auth/register'){
                    if(strpos($previousUrl, '/auth/login') !== false || strpos($previousUrl, '/auth/register') !== false){
                        return redirect()->route(RouteConstants::HOME);
                    }
                    return redirect()->back()->withInfo('You are already logged in')->withInput();
                }
            }
            throw new \ErrorException('Unauthenticated');
        }
        catch(\Exception $exception)
        {
            return $next($request);
        }
    }
}
