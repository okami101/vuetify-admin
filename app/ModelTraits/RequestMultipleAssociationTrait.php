<?php

namespace App\ModelTraits;

use Illuminate\Database\Eloquent\Model;

trait RequestMultipleAssociationTrait
{
    /**
     * Auto multiple association via request
     */
    public static function bootRequestMultipleAssociationTrait(): void
    {
        static::saved(static function ($model) {
            /** @var self $model */
            collect($model->associations)->each(function ($association, $key) use ($model) {
                $ids = collect(request()->input($key));

                /**
                 * Delete missing models
                 */
                $model->hasMany($association)->get()->filter(function (Model $model) use ($ids) {
                    return ! $ids->contains($model->id);
                })->each->delete();

                /**
                 * Attach many models
                 */
                $model->hasMany($association)->saveMany($association::findMany($ids));
            });
        });
    }
}
