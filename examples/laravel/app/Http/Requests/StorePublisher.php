<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePublisher extends FormRequest
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
            'logo' => 'nullable|image',
            'logo_delete' => 'nullable',
            'local.*' => 'nullable|image',
            'local_delete.*' => 'nullable',
            'name' => 'required',
            'type' => 'required|in:sarl,eurl,sa,sas,sasu,snc,scp',
            'description' => 'required',
            'founder' => 'required',
            'headquarter' => 'required',
            'url' => 'required|url',
            'email' => 'required|email',
            'active' => 'boolean',
            'opening_date' => 'required|date',
        ];
    }
}
