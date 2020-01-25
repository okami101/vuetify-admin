<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Review
 *
 * @property int $id
 * @property int $book_id
 * @property int $rating
 * @property string|null $body
 * @property string $author
 * @property string $publication_date
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Review newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Review newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Review query()
 * @mixin \Eloquent
 * @property-read \App\Book $book
 */
class Review extends Model
{
    public $timestamps = false;

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
