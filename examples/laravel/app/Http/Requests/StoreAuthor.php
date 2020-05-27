<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuthor extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'photo' => 'nullable|image',
            'photo_delete' => 'nullable',
            'name' => 'required',
            'description' => 'required',
            'backlinks.*.date' => 'required|date',
            'backlinks.*.url' => 'required|url',
        ];
    }
}
