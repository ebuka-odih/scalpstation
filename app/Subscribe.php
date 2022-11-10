<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Subscribe extends Model
{
    protected $guarded = [];
    protected $appends = ['end_date'];

    public function ending_date()
    {
        $date = Carbon::parse($this->created_at);
        return $date->addDays($this->subscription->term_days - 1);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        if ($this->status == 1){
            return "<span class='badge badge-warning'>Running</span>";
        }elseif ($this->status > 1){
            return "<span class='badge badge-success '>Ended</span>";
        }else{
            return "<span class='badge badge-danger'>Cancelled</span>";
        }
    }

    public function adminStatus()
    {
        if ($this->status == 0){
            return "<span class='badge bg-warning text text-uppercase'>Pending</span>";
        }elseif ($this->status > 0){
            return "<span class='badge bg-success text text-uppercase'>Successful</span>";
        }else{
            return "<span class='badge bg-danger text text-uppercase'>Cancelled</span>";
        }
    }

//    public function daily()
//    {
//        $expected_percent = $this->subscription()->daily_interest  * $this->amount;
//        $profit_percent =  number_format((float)$expected_percent / 100, 2, '.', '');
//        return $profit_percent;
//    }
}
