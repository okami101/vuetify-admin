<?php

namespace App\ModelTraits;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\MediaCollections\FileAdder;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * Trait RequestMediaTrait
 * @package App\ModelTraits
 *
 * @mixin Model
 */
trait RequestMediaTrait
{
    /**
     * Auto attach media via request
     */
    public static function bootRequestMediaTrait(): void
    {
        static::saved(static function (Model $model) {
            $model->registerMediaCollections();

            collect($model->mediaCollections)->each(function (MediaCollection $collection) use ($model) {
                /**
                 * Media to delete
                 */
                $ids = request()->input("{$collection->name}_delete");
                $model->getMedia($collection->name)->filter(function (Media $media) use ($ids) {
                    return in_array($media->id, is_array($ids) ? $ids : [$ids], false);
                })->each->delete();

                /**
                 * Media to add
                 */
                if (request()->hasFile("{$collection->name}_file")) {
                    $model->addMultipleMediaFromRequest(["{$collection->name}_file"])
                        ->each(function (FileAdder $file) use ($collection) {
                            $file->toMediaCollection($collection->name);
                        });
                }
            });
        });
    }
}
