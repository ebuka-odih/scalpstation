@extends('admin.layout.app')
@section('content')


    <main id="main-container">

        <!-- Hero -->
        <div class="content">
            <div class="d-md-flex justify-content-md-between align-items-md-center py-3 pt-md-3 pb-md-0 text-center text-md-start">
                <div>
                    <h1 class="h3 mb-1">
                        Open Trades History
                    </h1>
                </div>
            </div>
        </div>
        <!-- END Hero -->

        <!-- Page Content -->
        <div class="content">
            <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <div class="block-content block-content-full">
                        <!-- DataTables init on table by adding .js-dataTable-full class, functionality is initialized in js/pages/be_tables_datatables.min.js which was auto compiled from _js/pages/be_tables_datatables.js -->
                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

                            <div class="row">
                                <div class="col-lg-12">
                                    @if(session()->has('success'))
                                        <div class="alert alert-success">
                                            {{ session()->get('success') }}
                                        </div>
                                    @endif
                                    @if(session()->has('closed'))
                                        <div class="alert alert-success">
                                            {{ session()->get('closed') }}
                                        </div>
                                    @endif
                                    @if(session()->has('updated'))
                                        <div class="alert alert-success">
                                            {{ session()->get('updated') }}
                                        </div>
                                    @endif
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped ">
                                            <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>User</th>
                                                <th>Symbol</th>
                                                <th>Amount</th>
                                                <th>Leverage</th>
                                                <th>Time Frame</th>
                                                <th>TP/SL</th>
                                                <th>Status</th>
                                                <th>Progress</th>
                                                <th>Profit</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            @foreach($trades as $item)
                                                <tr>
                                                    <td>{{ date('d M, Y', strtotime($item->created_at)) }}</td>
                                                    <td>{{ optional($item->user)->name }}</td>
                                                    <td>{{ $item->symbol }}</td>
                                                    <td>$@convert($item->amount)</td>
                                                    <td>{{ $item->leverage }}</td>
                                                    <td>{{ $item->execution_time }} Secs</td>
                                                    <td>{{ $item->tp ? : "" }}/ {{ $item->sl ? : "" }}</td>
                                                    <td class="-pull-right">{!! $item->adminStatus() !!}</td>
                                                    @if($item->percent != 100)
                                                        <td class="pull-right text-danger">{{ $item->percent ? : "1" }}%</td>
                                                    @else
                                                        <td class="pull-right text-success">{{ $item->percent  }}%</td>
                                                    @endif
                                                    <td>@convert($item->profit)</td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <a href="{{ route('admin.tradeDetails', $item->id) }}"  class="btn btn-sm btn-primary push">Action</a>
{{--                                                                <a type="button" class="btn btn-sm btn-primary push" data-bs-toggle="modal" data-bs-target="#modal-block-popin{{ $item->id }}">Action</a>--}}
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>


                                            @endforeach

                                            </tbody>
                                        </table>

                                        {{ $trades->links() }}
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END Page Content -->
    </main>





@endsection
