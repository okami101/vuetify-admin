<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;

/**
 * App\Category
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property int|null $parent_id
 * @property int|null $order_column
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property Category $parent
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @mixin \Eloquent
 */
class Category extends Model implements Sortable
{
    use HasTranslations;
    use SortableTrait;

    protected $fillable = ['name'];

    public $translatable = ['name'];

    protected function getLocale(): string
    {
        return request()->header('locale') ?: app()->getLocale();
    }

    public function parent()
    {
        return $this->belongsTo(Category::class);
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function buildSortQuery()
    {
        return static::query()
            ->where('type', $this->type)
            ->where('parent_id', $this->parent_id);
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }

    public function __toString()
    {
        return $this->name;
    }
}
