<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class SearchFilter implements Filter
{
    private $fields;

    public function __construct($fields)
    {
        $this->fields = $fields;
    }

    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function (Builder $query) use ($value) {
            foreach ($this->fields as $field) {
                $query->orWhere($field, 'like', "%$value%");
            }
        });
    }
}
