<div class="modal fade" id="modal-block-popin{{ $item->id }}" tabindex="-1" aria-labelledby="modal-block-popin"  aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-popin" role="document">
        <div class="modal-content">
            <div class="block block-rounded block-themed block-transparent mb-0">
                <div class="block-header bg-primary-dark">
                    <h3 class="block-title">Customize Trade</h3>
                    <div class="block-options">
                        <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-fw fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="block-content">
                    <form action="{{ route('admin.setTrade', $item->id) }}" method="POST">
                        @csrf
                        {{--                            @method('PATCH')--}}

                        {{--                                                                                <input type="hidden" name="trade_id" value="{{ $item->id }}">--}}
                        <div class="row">
                            <div class="col-lg-6">
                                <label for="">Profit</label>
                                <input type="text" class="form-control" name="profit" value="{{ old('profit', optional($item)->profit) }}">
                            </div>
                            <div class="col-lg-6">
                                <label for="">Select Percent</label>
                                <select name="percent" id="" class="form-control">
                                    <option value="10">10%</option>
                                    <option value="20">20%</option>
                                    <option value="30">30%</option>
                                    <option value="40">40%</option>
                                    <option value="50">50%</option>
                                    <option value="60">60%</option>
                                    <option value="70">70%</option>
                                    <option value="80">80%</option>
                                    <option value="90">90%</option>
                                    <option value="100">100%</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <button type="submit" class="btn btn-primary col-lg-6 mt-2">Update</button>
                            </div>
                            <div class="col-lg-6">
                                <a href="{{ route('admin.closeTrade', $item->id) }}" class="btn btn-success">Close Trade</a>
                            </div>
                        </div>

                    </form>
                    <br>
                </div>
                <div class="block-content block-content-full text-end bg-body">
                    <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal">Done</button>
                </div>
            </div>
        </div>
    </div>
</div>
