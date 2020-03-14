<?php

namespace App;

use App\ModelTraits\RequestMediaTrait;
use App\ModelTraits\RequestTranslatableTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

/**
 * App\Publisher
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string $description
 * @property string $founder
 * @property string $headquarter
 * @property string $url
 * @property string $email
 * @property object $address
 * @property bool $active
 * @property string $opening_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Book[] $books
 * @property-read int|null $books_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Publisher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Publisher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Publisher query()
 * @mixin \Eloquent
 */
class Publisher extends Model implements HasMedia
{
    use HasMediaTrait;
    use RequestTranslatableTrait;
    use RequestMediaTrait;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'type',
        'description',
        'founder',
        'headquarter',
        'url',
        'email',
        'active',
        'address',
        'opening_date',
    ];

    protected $casts = [
        'active' => 'boolean',
        'address' => 'object'
    ];

    protected $dates = [
        'opening_date'
    ];

    public $translatable = ['description'];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('logo')->singleFile();
        $this->addMediaCollection('local');
    }

    public function books()
    {
        return $this->hasMany(Book::class);
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
