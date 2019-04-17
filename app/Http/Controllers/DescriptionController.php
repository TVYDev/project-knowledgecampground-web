<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DescriptionController extends Controller
{
    public function save (Request $request) {
        return response()->json($request);
    }
}
