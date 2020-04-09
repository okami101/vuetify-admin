<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReview;
use App\Http\Requests\UpdateReview;
use App\Http\Resources\Review as ReviewResource;
use App\Review;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Vtec\Crud\Filters\SearchFilter;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Review::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        /**
         * @var User $user
         */
        $user = auth()->user();

        return ReviewResource::collection(
            QueryBuilder::for(Review::class)
                ->allowedFields(['id', 'book_id', 'book.id', 'book.title', 'rating', 'status', 'body', 'author', 'publication_date'])
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['author', 'body'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('book', 'book_id'),
                    AllowedFilter::exact('rating'),
                    AllowedFilter::exact('status'),
                    'author',
                    AllowedFilter::scope('published_before'),
                    AllowedFilter::scope('published_after'),
                ])
                ->allowedSorts(['id', 'rating', 'author', 'publication_date'])
                ->allowedIncludes(['book'])
                ->where(function (Builder $query) use ($user) {
                    if ($user->hasRole('editor')) {
                        $query->whereHas('book', function (Builder $query) use ($user) {
                            $query->whereIn('publisher_id', $user->publishers()->pluck('id'));
                        });
                    }
                    if ($user->hasRole('author')) {
                        $query->whereHas('book.authors', function (Builder $query) use ($user) {
                            $query->whereIn('id', $user->authors()->pluck('id'));
                        });
                    }
                })
                ->exportOrPaginate()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Review  $review
     * @return ReviewResource
     */
    public function show(Review $review)
    {
        return new ReviewResource($review->load(['book']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreReview $request
     * @return ReviewResource
     */
    public function store(StoreReview $request)
    {
        $review = Review::create($request->all());
        return new ReviewResource($review);
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
