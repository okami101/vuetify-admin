<?php

namespace App\Http\Controllers;

use App\Author;
use App\Http\Filters\SearchFilter;
use App\Http\Requests\StoreAuthor;
use App\Http\Requests\UpdateAuthor;
use App\Http\Resources\Author as AuthorResource;
use App\Http\Resources\AuthorCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AuthorCollection
     */
    public function index()
    {
        return new AuthorCollection(
            QueryBuilder::for(Author::class)
                ->allowedFields([
                    'id',
                    'name',
                    'description',
                ])
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['name', 'description'])),
                    AllowedFilter::exact('id'),
                    'name'
                ])
                ->allowedSorts(['id', 'name'])
                ->allowedIncludes(['books'])
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Author  $author
     * @return AuthorResource
     */
    public function show(Author $author)
    {
        return new AuthorResource($author);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return AuthorResource
     */
    public function store(StoreAuthor $request)
    {
        return new AuthorResource(Author::create($request->all()));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Author  $author
     * @return AuthorResource
     */
    public function update(UpdateAuthor $request, Author $author)
    {
        $author->update($request->all());
        return new AuthorResource($author);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Author $author
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Author $author)
    {
        $author->delete();
        return response()->noContent();
    }
}
