<?php

namespace App\Exceptions;

use Exception;

class KCValidationException extends Exception
{
    private $redirectToRoute;
    private $redirectWithInput;
    private $validatorObj;

    public function __construct($redirectToRoute, $redirectWithInput, $validatorObj, $message = null,
                                $code = 0, Exception $previous = null) {
        $this->redirectToRoute = $redirectToRoute;
        $this->redirectWithInput = $redirectWithInput;
        $this->validatorObj = $validatorObj;

        // make sure everything is assigned properly
        parent::__construct($message, $code, $previous);
    }

    public function getRedirectedRoute() {
        return $this->redirectToRoute;
    }

    public function getValidatorObject() {
        return $this->validatorObj;
    }

    public function isRedirectWithInput() {
        return $this->redirectWithInput;
    }

}
