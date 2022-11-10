@extends('admin.layout.app')
@section('content')

    <main id="main-container">

        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Edit Subscription Package</h1>
                </div>
            </div>
        </div>
        <!-- END Hero -->

        <!-- Page Content -->
        <div class="content">
            <!-- Elements -->
            <div class="block block-rounded">

                <div class="block-content">
                    <form action="{{ route('admin.subscription.update', $package->id) }}" method="POST" enctype="multipart/form-data" >
                        @csrf
                        @method('PATCH')
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        <!-- Basic Elements -->
                        <div class="row push">
                            <div class="col-lg-8 offset-lg-2">

                                <div class="row">
                                    <div class="mb-4 col-lg-6">
                                        <label class="form-label" for="example-text-input">Name</label>
                                        <input type="text" class="form-control" id="example-text-input" name="name" value="{{ old('name', optional($package)->name) }}">
                                    </div>
                                    <div class="mb-4 col-lg-6">
                                        <label class="form-label" for="example-email-input">Term Days</label>
                                        <input type="number" class="form-control" id="example-email-input" name="term_days" value="{{ old('term_days', optional($package)->term_days) }}" >
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-4 col-lg-6">
                                        <label class="form-label" for="example-password-input">Total Return</label>
                                        <input type="text" class="form-control" id="example-password-input" name="total_return" value="{{ old('total_return', optional($package)->total_return) }}" >
                                    </div>
                                    <div class="mb-4 col-lg-6">
                                        <label class="form-label" for="example-password-input">Min Amount</label>
                                        <input type="number" class="form-control" id="example-password-input" name="amount" value="{{ old('amount', optional($package)->amount) }}" >
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-secondary">Update</button>

                            </div>

                        </div>
                    </form>
                </div>

                <!-- END Basic Elements -->


            </div>
        </div>
        <!-- END Elements -->


        <!-- END Page Content -->
    </main>

@endsection
