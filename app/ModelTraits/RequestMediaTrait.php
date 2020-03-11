<?php

namespace App\ModelTraits;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\FileAdder\FileAdder;
use Spatie\MediaLibrary\MediaCollection\MediaCollection;
use Spatie\MediaLibrary\Models\Media;

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
                /* @var \Spatie\MediaLibrary\HasMedia\HasMediaTrait $model */

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
