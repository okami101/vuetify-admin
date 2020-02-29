<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Database\Eloquent\Model;

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

    public function saveFiles(Model $model, $key)
    {
        /* @var \Spatie\MediaLibrary\HasMedia\HasMediaTrait $model */
    }
}
