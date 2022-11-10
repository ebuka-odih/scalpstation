@extends('dashboard.layout.app')
@section('content')

    <div class="content-wrapper">
        <div class="container-full">
            <h4 class="text-center mb-3">My Portfolio Balance</h4>
            <div class="col-xl-12 col-12">
                <div class="row">
                    @foreach($balance as $item)
                    <div class="col-lg-3 col-12">
                        <div class="box pull-up">
                            <div class="box-body">
                                <h5 class="mb-0">
                                    <span class="text-uppercase font-size-18">
                                         <img height="50" width="50" src="{{ asset('img/balance.svg') }}" alt="">
                                        {{ $item->name }}
                                    </span>
                                </h5>
                                <br>
                                <div class="d-flex justify-content-between">
                                    <p class="font-size-24">{{ $item->value }}</p>
                                </div>
                            </div>
                            <div class="box-body p-0">
                                <div id="spark1"></div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>

            </div>
        </div>
    </div>

@endsection
