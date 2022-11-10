<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminSubscribers extends Controller
{
    public function subscribers()
    {
        $deposits = Subscribe::all();
        return view('admin.transactions.subscribers', compact('deposits'));
    }

    public function approve_subscribers($id)
    {
        $deposit = Subscribe::findOrFail($id);
        $user = \App\User::findOrFail($deposit->user_id);
        $user->balance -= $deposit->amount;
        $user->save();
        $deposit->status = 1;
        $deposit->save();
//        Mail::to($user->email)->send(new ApproveDeposit($deposit));
        return redirect()->back()->with('success', "Deposit approved successfully");
    }

    public function deleteSubscribers($id)
    {
        $deposit = Subscribe::findOrFail($id);
        $deposit->delete();
        return redirect()->back();
    }
}
