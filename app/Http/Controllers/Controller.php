<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    private $successStatus = 200;
    private $unauthorisedStatus = 401;
    private $badRequestStatus = 400;
    private $notFoundStatus = 404;

    public function successStatus()
    {
    	return $this->successStatus;
    }

    public function unauthorisedStatus()
    {
    	return $this->unauthorisedStatus;
    }

    public function badRequestStatus()
    {
    	return $this->badRequestStatus;
    }

    public function notFoundStatus()
    {
    	return $this->notFoundStatus;
    }
}
