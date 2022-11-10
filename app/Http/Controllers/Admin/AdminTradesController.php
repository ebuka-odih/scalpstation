<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Trade;
use App\User;
use Illuminate\Http\Request;

class AdminTradesController extends Controller
{
    public function openTrades()
    {
        $trades = Trade::where('status', 0)->latest()->paginate(10);
        return view('admin.transactions.trades', compact('trades'));
    }
    public function closeTrades()
    {
        $trades = Trade::where('status', 1)->latest()->paginate(10);
        return view('admin.transactions.close-trades', compact('trades'));
    }

    public function tradeDetails($id)
    {
        $trade = Trade::findOrFail($id);
        return view('admin.transactions.trade-details', compact('trade'));
    }

    public function setTrade(Request $request, $id)
    {
        $trade = Trade::findOrFail($id);
        $trade->profit = $request->profit;
        $trade->percent = $request->percent;
        $trade->save();
        return redirect()->back()->with('updated', "Trade Order Updated Successfully");
    }

    public function closeTrade($id){
        $trade = Trade::findOrFail($id);
        $trade->status = 1;
        $trade->percent = 100;
        $trade->save();
        $user = User::findOrFail($trade->user_id);
        $user->profit += $trade->profit;
        $user->save();
        return redirect()->back()->with('closed', "Trade Closed Successfully");
    }
}
