<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Review
 *
 * @property int $id
 * @property int $book_id
 * @property int $rating
 * @property string|null $body
 * @property string $author
 * @property Carbon $publication_date
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Review newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Review newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Review query()
 * @mixin \Eloquent
 * @property-read \App\Book $book
 */
class Review extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'book_id',
        'rating',
        'body',
        'author',
        'publication_date',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    protected $dates = [
        'publication_date'
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
