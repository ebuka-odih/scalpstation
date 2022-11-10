@component('mail::message')
# Dear {{ $withdraw->user['name'] }}

You have successfully received your withdrawal from <a href="prepStation.co">PrepStation</a> to your  wallet

<p>Amount: $@convert($withdraw->amount)</p>

<p>Wallet Address: {{ $withdraw->wallet_address }}</p>

<p>Be informed that any deposit made on our VIP plan package attracts and instant bonus of $1000 instantly withdraw- able.
    <br>Please chat our live customer support for more details</p>



Thanks,<br>
{{ config('app.name') }}
@endcomponent
