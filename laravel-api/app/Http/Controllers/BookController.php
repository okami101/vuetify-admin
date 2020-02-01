<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Requests\StoreBook;
use App\Http\Requests\UpdateBook;
use App\Http\Resources\Book as BookResource;
use App\Http\Resources\BookCollection;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BookController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Book::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return BookCollection
     */
    public function index(Request $request)
    {
        return new BookCollection(
            QueryBuilder::for(Book::class)
                ->allowedFilters([
                    AllowedFilter::exact('id'),
                    'title',
                    'author'
                ])
                ->allowedSorts('id', 'publication_date')
                ->with('reviews')
                ->paginate(min($request->get('perPage'), 100))
                ->appends($request->query())
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return BookResource
     */
    public function store(StoreBook $request)
    {
        return new BookResource(Book::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Book  $book
     * @return BookResource
     */
    public function show(Book $book)
    {
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
