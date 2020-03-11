<?php

namespace App;

use App\ModelTraits\RequestMediaTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Translatable\HasTranslations;

/**
 * App\Author
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $backlinks
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Book[] $books
 * @property-read int|null $books_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Author newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Author newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Author query()
 * @mixin \Eloquent
 */
class Author extends Model implements HasMedia
{
    use HasMediaTrait;
    use RequestMediaTrait;
    use HasTranslations;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'backlinks',
    ];

    protected $casts = [
        'backlinks' => 'array'
    ];

    public $translatable = ['description'];

    protected $with = ['media'];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('photo')->singleFile();
    }

    public function books()
    {
        return $this->belongsToMany(Book::class);
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('small')
            ->width(120)
            ->height(80)
            ->nonOptimized();

        $this->addMediaConversion('medium')
            ->width(400)
            ->height(300)
            ->nonOptimized();

        $this->addMediaConversion('large')
            ->width(800)
            ->height(600)
            ->nonOptimized();
    }
}
