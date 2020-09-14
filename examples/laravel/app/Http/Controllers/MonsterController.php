<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMonster;
use App\Http\Requests\UpdateMonster;
use App\Http\Resources\Monster as MonsterResource;
use App\Models\Monster;
use Okami101\LaravelAdmin\Filters\SearchFilter;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MonsterController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Monster::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return MonsterResource::collection(
            QueryBuilder::for(Monster::class)
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name', 'label', 'description'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::partial('name'),
                    AllowedFilter::partial('label'),
                    AllowedFilter::exact('active'),
                    AllowedFilter::exact('level'),
                    AllowedFilter::exact('rating'),
                    AllowedFilter::exact('category'),
                ])
                ->allowedSorts(['name', 'label', 'level', 'rating', 'price', 'publication_date', 'created_at', 'updated_at'])
                ->allowedIncludes(['media'])
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Monster  $monster
     * @return MonsterResource
     */
    public function show(Monster $monster)
    {
        return new MonsterResource($monster->load(['media']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return MonsterResource
     */
    public function store(StoreMonster $request)
    {
        $monster = Monster::create($request->all());

        return new MonsterResource($monster);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Monster  $monster
     * @return MonsterResource
     */
    public function update(UpdateMonster $request, Monster $monster)
    {
        $monster->update($request->all());

        return new MonsterResource($monster);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Monster  $monster
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Monster $monster)
    {
        $monster->delete();

        return response()->noContent();
    }
}
