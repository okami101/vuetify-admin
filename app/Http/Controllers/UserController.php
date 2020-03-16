<?php

namespace App\Http\Controllers;

use App\Http\Filters\SearchFilter;
use App\Http\Requests\StoreUser;
use App\Http\Requests\UpdateUser;
use App\Http\Resources\User as UserResource;
use App\User;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(
            QueryBuilder::for(User::class)
                ->allowedFields(['id', 'name', 'email', 'active', 'roles', 'created_at', 'updated_at'])
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name', 'email'])),
                    AllowedFilter::partial('roles'),
                ])
                ->allowedSorts(['id', 'name', 'email'])
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUser $request
     * @return UserResource
     */
    public function store(StoreUser $request)
    {
        $user = User::create($request->all());
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUser $request
     * @param \App\User $user
     * @return UserResource
     */
    public function update(UpdateUser $request, User $user)
    {
        $user->update($request->all());
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }

    public function impersonate(User $user)
    {
        auth()->user()->setImpersonating($user->id);
        return new UserResource($user);
    }

    public function stopImpersonate()
    {
        auth()->user()->stopImpersonating();
        return response()->noContent();
    }
}
