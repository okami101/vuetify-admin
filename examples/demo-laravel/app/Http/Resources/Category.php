<?php

namespace App\Http\Resources;

use Vtec\Crud\Http\Resources\BaseResource;

class Category extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $attributes = parent::toArray($request);

        $attributes['name'] = str_repeat('├──', $this->depth) . $this->name;

        return $attributes;
    }
}
