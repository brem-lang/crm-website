<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SendDemoRequestCredentialsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'url' => ['required', 'url', 'max:2048'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:1', 'max:255'],
        ];
    }
}
