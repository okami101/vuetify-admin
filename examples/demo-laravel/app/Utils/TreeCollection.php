<?php


namespace App\Utils;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class TreeCollection extends Collection
{
    protected function flattenTree(Collection $groupedNodes, $parentId = null, $depth = 0)
    {
        foreach ($groupedNodes->get($parentId, []) as $node) {
            $node->depth = $depth;
            $this->push($node);

            $this->flattenTree($groupedNodes, $node->getKey(), $depth + 1);
        }

        return $this;
    }

    protected function linkNodes()
    {
        if ($this->isEmpty()) {
            return $this;
        }

        $groupedNodes = $this->groupBy('parent_id');

        foreach ($this->items as $node) {
            /** @var Model $node */
            $node->makeVisible('children');
            $node->children = $groupedNodes->get($node->getKey(), []);
        }

        return $this;
    }

    public function toFlatTree()
    {
        $result = new static;

        if ($this->isEmpty()) {
            return $result;
        }

        $groupedNodes = $this->groupBy('parent_id');

        return $result->flattenTree($groupedNodes);
    }

    public function toTree()
    {
        if ($this->isEmpty()) {
            return new static;
        }

        $this->linkNodes();

        $items = [];

        foreach ($this->items as $node) {
            if ($node->parent_id === null) {
                $items[] = $node;
            }
        }

        return new static($items);
    }
}
