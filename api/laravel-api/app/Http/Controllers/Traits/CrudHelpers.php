<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\FileAdder\FileAdder;
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
        /* @var \Spatie\MediaLibrary\HasMedia\HasMediaTrait $model */

        /**
         * Media to delete
         */
        $ids = request()->input("{$key}_delete");
        $model->getMedia($collection)->filter(function (Media $media) use ($ids) {
            return in_array($media->id, is_array($ids) ? $ids : [$ids], false);
        })->each->delete();

        /**
         * Media to add
         */
        if (request()->hasFile("{$key}_file")) {
            if (!$model->files[$key]['multiple']) {
                // Remove old file if no multiple field
                $model->clearMediaCollection($collection);
            }
            $model->addMultipleMediaFromRequest(["{$key}_file"])->each(function (FileAdder $file) use ($collection) {
                $file->toMediaCollection($collection);
            });
        }
    }
}
