<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMonsterChild;
use App\Http\Requests\UpdateMonsterChild;
use App\Http\Resources\MonsterChild as MonsterChildResource;
use App\MonsterChild;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Vtec\Crud\Filters\SearchFilter;

class MonsterChildController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(MonsterChild::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return MonsterChildResource::collection(
            QueryBuilder::for(MonsterChild::class)
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('monster', 'monster_id'),
                ])
                ->allowedSorts(['name', 'created_at', 'updated_at'])
                ->allowedIncludes(['monster'])
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MonsterChild  $monsterChild
     * @return MonsterChildResource
     */
    public function show(MonsterChild $monsterChild)
    {
        return new MonsterChildResource($monsterChild->load(['monster']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return MonsterChildResource
     */
    public function store(StoreMonsterChild $request)
    {
        $monsterChild = MonsterChild::create($request->all());

        return new MonsterChildResource($monsterChild);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MonsterChild  $monsterChild
     * @return MonsterChildResource
     */
    public function update(UpdateMonsterChild $request, MonsterChild $monsterChild)
    {
        $monsterChild->update($request->all());

        return new MonsterChildResource($monsterChild);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MonsterChild  $monsterChild
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(MonsterChild $monsterChild)
    {
        $monsterChild->delete();

        return response()->noContent();
    }
}
