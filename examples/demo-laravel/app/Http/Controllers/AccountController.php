<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use Vtec\Crud\Traits\AccountTrait;

class AccountController extends Controller
{
    use AccountTrait;

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

    /**
     * Update account infos
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return UserResource
     * @throws \Illuminate\Validation\ValidationException
     *
     */
    public function update(Request $request)
    {
        $user = $this->updateLoggedUser($request);

        return new UserResource($user);
    }

    /**
     * Change password
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function password(Request $request)
    {
        $this->changePassword($request);

        return response()->noContent();
    }
}
