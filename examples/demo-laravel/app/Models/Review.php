<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Review
 *
 * @property int $id
 * @property int $book_id
 * @property int $rating
 * @property string $status
 * @property string|null $body
 * @property string $author
 * @property Carbon $publication_date
 * @method static Builder|Review newModelQuery()
 * @method static Builder|Review newQuery()
 * @method static Builder|Review query()
 * @mixin Eloquent
 * @property-read Book $book
 * @method static Builder|Review publishedAfter($date)
 * @method static Builder|Review publishedBefore($date)
 */
class Review extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'book_id',
        'rating',
        'status',
        'body',
        'author',
        'publication_date',
    ];

    protected $casts = [
        'rating' => 'integer',
        'publication_date' => 'datetime:Y-m-d',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function scopePublishedBefore(Builder $query, $date): Builder
    {
        return $query->where('publication_date', '<=', Carbon::parse($date));
    }

    public function scopePublishedAfter(Builder $query, $date): Builder
    {
        return $query->where('publication_date', '>=', Carbon::parse($date));
    }
}
