<?php

namespace App\Http\Controllers;

use App\Http\Filters\SearchFilter;
use App\Http\Requests\StorePublisher;
use App\Http\Requests\UpdatePublisher;
use App\Http\Resources\Publisher as PublisherResource;
use App\Http\Resources\PublisherCollection;
use App\Publisher;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

class PublisherController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Publisher::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return PublisherCollection
     */
    public function index()
    {
        return new PublisherCollection(
            QueryBuilder::for(Publisher::class)
                ->allowedFields('id', 'name', 'description', 'founder', 'headquarter', 'opening_date')
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name', 'founder', 'headquarter', 'description'])),
                    AllowedFilter::exact('id'),
                    'name',
                    'founder',
                    'headquarter',
                ])
                ->allowedIncludes([
                    AllowedInclude::count('books_count'),
                ])
                ->allowedSorts('id', 'name', 'founder', 'headquarter', 'opening_date', 'books_count')
                ->exportOrPaginate()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return PublisherResource
     */
    public function store(StorePublisher $request)
    {
        return new PublisherResource(Publisher::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Publisher  $publisher
     * @return PublisherResource
     */
    public function show(Publisher $publisher)
    {
        return new PublisherResource($publisher->loadCount('books'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdatePublisher $request
     * @param \App\Publisher $publisher
     * @return PublisherResource
     */
    public function update(UpdatePublisher $request, Publisher $publisher)
    {
        $publisher->update($request->all());
        return new PublisherResource($publisher);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Publisher $publisher
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Publisher $publisher)
    {
        $publisher->delete();
        return response()->noContent();
    }
}
