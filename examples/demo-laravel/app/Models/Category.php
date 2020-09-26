<?php

namespace App\Models;

use App\Utils\TreeCollection;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
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
 * @property int|null $depth
 * @property int|null $order_column
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Category $parent
 * @property Collection|Category[] $children
 * @method static Builder|Category newModelQuery()
 * @method static Builder|Category newQuery()
 * @method static Builder|Category query()
 * @mixin Eloquent
 */
class Category extends Model implements Sortable
{
    use HasTranslations;
    use SortableTrait;

    protected $fillable = ['name', 'type', 'parent_id'];

    public $translatable = ['name'];

    protected $visible = ['id'];

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

    /**
     * Create a Eloquent Collection instance with tree support.
     *
     * @param  array  $models
     * @return Collection
     */
    public function newCollection(array $models = [])
    {
        return new TreeCollection($models);
    }

    public function moveToPosition($targetPosition)
    {
        $orderColumnName = $this->determineOrderColumnName();
        $oldOrder = $this->$orderColumnName;
        if ($oldOrder === $targetPosition) {
            return $this;
        }

        if ($oldOrder >= $targetPosition) {
            $this->buildSortQuery()
                ->where($orderColumnName, '>=', $targetPosition)
                ->where($orderColumnName, '<', $oldOrder)
                ->increment($orderColumnName);
        } else {
            $this->buildSortQuery()
                ->where($orderColumnName, '<=', $targetPosition)
                ->where($orderColumnName, '>', $oldOrder)
                ->decrement($orderColumnName);
        }

        $this->$orderColumnName = $targetPosition;
        $this->save();

        return $this;
    }

    public function toArray()
    {
        $attributes = parent::toArray();

        $attributes += [
            'name' => str_repeat('├──', $this->depth) . $this->name,
        ];

        return $attributes;
    }

    public function __toString()
    {
        return $this->name;
    }
}
