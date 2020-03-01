<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;

trait CrudHelpers
{
    public function saveMultiple(Model $model, $association, $key)
    {
        $ids = collect(request()->input($key));

        $model->hasMany($association)->get()->filter(function (Model $model) use ($ids) {
            return ! $ids->contains($model->id);
        })->each->delete();
        $association::findMany($ids)->each->update([
            'book_id' => $model->id
        ]);
    }

    public function saveFiles(Model $model, $key, $collection)
    {
        /**
         * Media to delete
         */
        Media::destroy(request()->input("{$key}_delete"));

        /**
         * Media to add
         */
        /* @var \Spatie\MediaLibrary\HasMedia\HasMediaTrait $model */
        if (request()->hasFile("{$key}_file")) {
            if (!$model->files[$key]['multiple']) {
                // Remove old file if no multiple field
                $model->clearMediaCollection($collection);
            }
            $model->addMediaFromRequest("{$key}_file")->toMediaCollection($collection);
        }
    }
}
