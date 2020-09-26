<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * User infos
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \App\Http\Resources\User
     */
    public function index(Request $request)
    {
        return new UserResource($request->user());
    }
}
