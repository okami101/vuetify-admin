<?php

namespace App\ModelTraits;

use Spatie\Translatable\HasTranslations;

trait RequestTranslatableTrait
{
    use HasTranslations;

    protected function getLocale(): string
    {
        return request()->get('locale') ?: config('app.locale');
    }
}
