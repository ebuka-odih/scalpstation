@extends('admin.layout.app')
@section('content')
    <style>
        .bg {
            background: url('img/bg.avif') no-repeat, #282d37;
        }
    </style>

    <main id="main-container">

        <!-- Hero -->
        <div class="bg-image bg" >
            <div class="bg-black-25">
                <div class="content content-full">
                    <div class="py-5 text-center">
                        <a class="img-link" >
                            <img class="img-avatar img-avatar96 img-avatar-thumb" src="{{ asset('admin/assets/media/avatars/avatar10.jpg') }}" alt="">
                        </a>
                        <h1 class="fw-bold my-2 text-white">{{ $user->name }}</h1>
                        <h2 class="h4 fw-bold text-white-75">
                            <a class="text-primary-lighter" href="javascript:void(0)">{{ $user->email }}</a>
                        </h2>
                        <h2 class="h4 fw-bold text-white-75">
                            Account Balance <a class="text-primary-lighter" href="javascript:void(0)">${{ $user->balance ? : "0.0" }}</a>
                        </h2>

                        <a href="{{ route('admin.userDetails', $user->id) }}" class="btn btn-sm btn-secondary m-1">
                            <i class="fa fa-fw fa-user opacity-50 me-1"></i> Personal Details
                        </a>
                        <a href="{{ route('admin.createBalance', $user->id) }}" class="btn btn-sm btn-info m-1">
                            <i class="fa fa-fw fa-dollar-sign opacity-50 me-1"></i> Add Coin Bal
                        </a>
                        @if($user->status == 1)
                            <a href="{{ route('admin.suspend', $user->id) }}" class="btn btn-sm  btn-outline-danger m-1">
                                <i class="fa fa-times fa-dollar-sign opacity-50 me-1"></i> Suspend User
                            </a>
                        @else
                            <a href="{{ route('admin.unsuspend', $user->id) }}" class="btn btn-sm  btn-outline-success m-1">
                                <i class="fa fa-times fa-dollar-sign opacity-50 me-1"></i> Unsuspend User
                            </a>
                        @endif
                        <form method="POST" action="{!! route('admin.deleteUser', $user->id) !!}" accept-charset="UTF-8">
                            <input name="_method" value="DELETE" type="hidden">
                            {{ csrf_field() }}

                            <div class="btn-group btn-group-xs pull-right" role="group">
                                <button type="submit" class="btn btn-sm btn-danger m-1 js-bs-tooltip-enabled" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" onclick="return confirm(&quot;Delete Package?&quot;)">
                                    <i class="fa fa-times fa-dollar-sign opacity-50 me-1"></i> Delete User
                                </button>

                            </div>

                        </form>

                        {{--                        <a href="{{ route('admin.fund') }}" class="btn btn-sm btn-danger m-1">--}}
                        {{--                            <i class="fa fa-times fa-dollar-sign opacity-50 me-1"></i> Delete User--}}
                        {{--                        </a>--}}
                    </div>
                </div>
            </div>
        </div>
        <!-- END Hero -->

        <!-- Page Content -->
        <div class="content content-full content-boxed">

            <form action="{{ route('admin.balance.store') }}" method="POST" enctype="multipart/form-data" >
                <!-- Basic Elements -->
                @csrf
                @if(session()->has('success'))
                    <div class="alert alert-success">
                        {{ session()->get('success') }}
                    </div>
                @endif
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <div class="row push">
                    <input type="hidden" name="user_id" value="{{ $user->id }}">

                    <div class="col-lg-6 col-xl-6">
                        <div class="mb-4">
                            <label class="form-label" for="example-text-input">Coin Name</label>
                            <input type="text" class="form-control" id="example-text-input" name="name">
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-6">
                        <div class="mb-4">
                            <label class="form-label" for="example-email-input">Coin Balance</label>
                            <input type="text" class="form-control" id="example-email-input" name="value" >
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" class="btn btn-secondary">Create</button>
                    </div>
                </div>

                <!-- END Basic Elements -->


            </form>

        </div>

        <div class="content content-full content-boxed">
            <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <h3 class="block-title">Wallets <small>Full</small></h3> </div>
                <div class="block-content block-content-full">
                    <!-- DataTables init on table by adding .js-dataTable-full class, functionality is initialized in js/pages/be_tables_datatables.min.js which was auto compiled from _js/pages/be_tables_datatables.js -->
                    <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered table-striped table-vcenter js-dataTable-full dataTable no-footer" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                                    <thead>
                                    <tr>
                                        <th class="text-center sorting sorting_asc" style="width: 30px;" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending">#</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending">Coin Name</th>
                                        <th class="d-none d-sm-table-cell sorting" style="width: 30%;" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending">Coin Balance</th>
                                        <th style="width: 15%;" class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Registered: activate to sort column ascending">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($wallets as $index => $item)
                                        <tr class="odd">
                                            <td class="text-center sorting_1">{{ $index + 1 }}</td>
                                            <td class="fw-semibold"> {{ $item->name }}</td>
                                            <td class="d-none d-sm-table-cell"> {{ $item->value }}</td>
                                            <td>
                                                <a class="btn btn-sm btn-primary mb-2" href="{{ route('admin.wallet.edit', $item->id) }}">Edit</a>
                                                <form method="POST" action="{!! route('admin.wallet.destroy', $item->id) !!}" accept-charset="UTF-8">
                                                    <input name="_method" value="DELETE" type="hidden">
                                                    {{ csrf_field() }}

                                                    <div class="btn-group btn-group-xs pull-right" role="group">
                                                        <button data-toggle="tooltip" data-placement="top" type="submit" class="btn  btn-sm btn-danger" onclick="return confirm(&quot;Delete Wallet?&quot;)">
                                                            <span class="fa flaticon-delete" aria-hidden="true"></span>Delete
                                                        </button>

                                                    </div>

                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- END Page Content -->
    </main>
@endsection
