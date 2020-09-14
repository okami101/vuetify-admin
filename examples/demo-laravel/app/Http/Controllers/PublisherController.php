<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublisher;
use App\Http\Requests\UpdatePublisher;
use App\Http\Resources\Publisher as PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Okami101\LaravelAdmin\Filters\SearchFilter;
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
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PublisherResource::collection(
            QueryBuilder::for(Publisher::class)
                ->allowedFields(['id', 'name'])
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name', 'founder', 'headquarter', 'description'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('type'),
                    'name',
                    'founder',
                    'headquarter',
                    AllowedFilter::exact('active'),
                ])
                ->allowedIncludes([
                    'books',
                    'media',
                    AllowedInclude::count('books_count'),
                ])
                ->allowedSorts(['id', 'name', 'founder', 'headquarter', 'opening_date', 'books_count'])
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Publisher  $publisher
     * @return PublisherResource
     */
    public function show(Publisher $publisher)
    {
        return new PublisherResource($publisher->load(['media', 'users'])->loadCount(['books']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return PublisherResource
     */
    public function store(StorePublisher $request)
    {
        $publisher = Publisher::create($request->all());

        if ($request->has('user_ids')) {
            $publisher->users()->sync($request->input('user_ids'));
        }

        return new PublisherResource($publisher);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdatePublisher $request
     * @param \App\Models\Publisher $publisher
     * @return PublisherResource
     */
    public function update(UpdatePublisher $request, Publisher $publisher)
    {
        $publisher->update($request->all());

        if ($request->has('user_ids')) {
            $publisher->users()->sync($request->input('user_ids'));
        }

        return new PublisherResource($publisher);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Publisher $publisher
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Publisher $publisher)
    {
        $publisher->delete();

        return response()->noContent();
    }
}
