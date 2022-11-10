@component('mail::message')
# Hello Admin

A new deposit alert

<p>Name: {{ $deposit->user->fullname() }}</p>
<p>Deposit Amount: {{ $deposit->amount }}</p>
<p>Deposit Method: {{ $deposit->payment_method->name }}</p>

Login your dashboard for verification

Thanks,<br>
{{ config('app.name') }}
@endcomponent
