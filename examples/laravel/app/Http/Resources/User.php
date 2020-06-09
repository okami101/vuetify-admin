<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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

        $attributes['publishers'] = Publisher::collection($this->whenLoaded('publishers'));
        $attributes['authors'] = Author::collection($this->whenLoaded('authors'));

        return $attributes;
    }
}
