<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    private $impersonate;

    public function __construct($resource, $impersonate = false)
    {
        parent::__construct($resource);
        $this->impersonate = $impersonate;
    }

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

        if ($this->impersonate && $request->hasSession()) {
            $attributes['impersonate'] = $request->session()->has('impersonate');
        }

        return $attributes;
    }
}
