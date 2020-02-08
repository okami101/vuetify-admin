<?php

namespace App\Http\Controllers;

use App\Http\Filters\SearchFilter;
use App\Http\Requests\StoreReview;
use App\Http\Requests\UpdateReview;
use App\Http\Resources\Review as ReviewResource;
use App\Http\Resources\ReviewCollection;
use App\Review;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Review::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return ReviewCollection
     */
    public function index()
    {
        return new ReviewCollection(
            QueryBuilder::for(Review::class)
                ->allowedFields(['id', 'book_id', 'body', 'author', 'publication_date'])
                ->allowedFilters([
                    AllowedFilter::custom('search', new SearchFilter(['author', 'body'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('book_id'),
                    AllowedFilter::exact('rating'),
                    'author',
                    AllowedFilter::scope('published_before'),
                    AllowedFilter::scope('published_after'),
                ])
                ->allowedSorts('id', 'rating', 'author', 'publication_date')
                ->allowedIncludes('book')
                ->exportOrPaginate()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreReview $request
     * @return ReviewResource
     */
    public function store(StoreReview $request)
    {
        return new ReviewResource(Review::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Review  $review
     * @return ReviewResource
     */
    public function show(Review $review)
    {
        return new ReviewResource($review->load('book'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateReview $request
     * @param \App\Review $review
     * @return ReviewResource
     */
    public function update(UpdateReview $request, Review $review)
    {
        $review->update($request->all());
        return new ReviewResource($review);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Review $review
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Review $review)
    {
        $review->delete();
        return response()->noContent();
    }
}
