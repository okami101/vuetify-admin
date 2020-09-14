<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUser;
use App\Http\Requests\UpdateUser;
use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Okami101\LaravelAdmin\Filters\SearchFilter;
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
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name', 'email'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('active'),
                    AllowedFilter::partial('roles'),
                ])
                ->allowedSorts(['id', 'name', 'email'])
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user->load(['publishers', 'authors']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUser $request
     * @return UserResource
     */
    public function store(StoreUser $request)
    {
        $user = User::make($request->all());
        $user->password = Hash::make($request->input('password'));
        $user->save();
        $user->publishers()->sync($request->input('publisher_ids'));
        $user->authors()->sync($request->input('author_ids'));

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUser $request
     * @param \App\Models\User $user
     * @return UserResource
     */
    public function update(UpdateUser $request, User $user)
    {
        $user->update($request->except('password'));
        if ($password = $request->input('password')) {
            $user->password = Hash::make($password);
        }
        $user->publishers()->sync($request->input('publisher_ids'));
        $user->authors()->sync($request->input('author_ids'));

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
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
        session()->put('impersonate', $user->id);

        return response()->noContent();
    }

    public function stopImpersonate()
    {
        session()->forget('impersonate');

        return response()->noContent();
    }
}
