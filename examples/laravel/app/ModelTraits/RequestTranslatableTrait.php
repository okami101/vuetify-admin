<?php

namespace App\ModelTraits;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

/**
 * Trait RequestTranslatableTrait
 * @package App\ModelTraits
 *
 * @mixin Model
 */
trait RequestTranslatableTrait
{
    use HasTranslations;

    protected function getLocale(): string
    {
        return request()->get('locale') ?: config('app.locale');
    }
}
