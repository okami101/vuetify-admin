<?php

namespace App\Http\Resources;

use Okami101\LaravelVuetifyAdmin\Http\Resources\BaseResource;

class MonsterChild extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
