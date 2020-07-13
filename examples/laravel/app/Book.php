<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Book extends Model
{
    use HasTranslations;

    protected $fillable = ['isbn', 'category', 'title', 'description', 'summary', 'author', 'price', 'commentable', 'formats', 'publication_date'];

    protected $casts = ['price' => 'float', 'commentable' => 'boolean', 'formats' => 'array', 'publication_date' => 'date'];

    public $translatable = ['title', 'description', 'summary'];
}
