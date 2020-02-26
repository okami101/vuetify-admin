<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePublisher extends FormRequest
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
            'name' => 'sometimes|required',
            'type' => 'sometimes|required|in:sarl,eurl,sa,sas,sasu,snc,scp',
            'description' => 'sometimes|required',
            'founder' => 'sometimes|required',
            'headquarter' => 'sometimes|required',
            'active' => 'sometimes|boolean',
            'opening_date' => 'sometimes|required|date',
        ];
    }
}
