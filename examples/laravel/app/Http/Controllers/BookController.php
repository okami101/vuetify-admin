<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Requests\StoreBook;
use App\Http\Requests\UpdateBook;
use App\Http\Resources\Book as BookResource;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Vtec\Crud\Filters\SearchFilter;

class BookController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Book::class);
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

        return BookResource::collection(
            QueryBuilder::for(Book::class)
                ->allowedFields([
                    'id',
                    'publisher_id',
                    'publisher.id',
                    'publisher.name',
                    'isbn',
                    'title',
                    'category',
                    'description',
                    'formats',
                    'price',
                    'commentable',
                    'tags',
                    'publication_date',
                    'authors.id',
                    'authors.name',
                    'reviews.id',
                    'reviews.book_id',
                    'reviews.author',
                ])
                ->allowedFilters([
                    AllowedFilter::custom('q', new SearchFilter(['isbn', 'title', 'description'])),
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('publisher', 'publisher_id'),
                    AllowedFilter::callback('authors', function (Builder $query, $value) {
                        $query->whereHas('authors', function (Builder $query) use ($value) {
                            $query->whereIn('id', is_array($value) ? $value : [$value]);
                        });
                    }),
                    AllowedFilter::exact('commentable'),
                    'title',
                    AllowedFilter::exact('category'),
                    AllowedFilter::exact('formats'),
                    AllowedFilter::scope('pricer_than'),
                    AllowedFilter::scope('cheaper_than'),
                    AllowedFilter::scope('published_before'),
                    AllowedFilter::scope('published_after'),
                ])
                ->allowedSorts(['id', 'isbn', 'title', 'price', 'publication_date'])
                ->allowedIncludes(['publisher', 'authors', 'reviews', 'media'])
                ->where(function (Builder $query) use ($user) {
                    if ($user->hasRole('editor')) {
                        $query->whereIn('publisher_id', $user->publishers()->pluck('id'));
                    }
                    if ($user->hasRole('author')) {
                        $query->whereHas('authors', function (Builder $query) use ($user) {
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
     * @param  \App\Book  $book
     * @return BookResource
     */
    public function show(Book $book)
    {
        return new BookResource($book->load(['publisher', 'authors', 'reviews', 'media']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return BookResource
     */
    public function store(StoreBook $request)
    {
        $book = Book::create($request->all());
        $book->authors()->sync($request->input('author_ids'));
        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateBook $request
     * @param \App\Book $book
     * @return BookResource
     */
    public function update(UpdateBook $request, Book $book)
    {
        $book->update($request->all());
        $book->authors()->sync($request->input('author_ids'));
        return new BookResource($book);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Book $book
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
    }
}
