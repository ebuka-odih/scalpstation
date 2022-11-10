<?php

namespace App\Http\Controllers;

use App\Deposit;
use App\Mail\DepositAlert;
use App\PaymentMethod;
use App\Subscribe;
use App\Subscription;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SubscribeController extends Controller
{
    public function plans()
    {
        $plans = Subscription::all();
        return view('dashboard.subscription.plans', compact('plans'));
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'amount' => 'required'
        ]);
        $sub_id = $request->subscription_id;
        $sub_plan = Subscription::findOrFail($sub_id);
        $sub = new Subscribe();
        if ($request->amount > \auth()->user()->balance){
            return redirect()->back()->with('insufficient', "Insufficient balance! proceed to make deposit");
        }else{

            if ($request->amount < $sub_plan->amount){
                return redirect()->back()->with('declined', "Amount entered is less than the minimum amount");
            }
            $sub->amount = $request->amount;
            $sub->user_id = Auth::id();
            $sub->subscription_id = $request->subscription_id;
            $sub->save();
            return redirect()->route('user.sub.deposit', $sub->id);
        }
    }

    public function deposit($id)
    {
        $wallets = PaymentMethod::all();
        $sub_plan = Subscribe::findOrFail($id);
        return view('dashboard.subscription.deposit', compact('wallets', 'sub_plan'));
    }

    public function processDeposit(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'payment_method_id' => 'required',
        ]);

        $sub_id = $request->subscription_id;
        $sub_plan = Subscribe::findOrFail($sub_id);
        $deposit = new Deposit();
//        return $sub_plan->amount;
        if ($request->amount < $sub_plan->amount){
            return redirect()->back()->with('declined', "Amount entered is less than the minimum amount");
        }
        $deposit->user_id = Auth::id();
        $deposit->amount = $request->amount;
        $deposit->payment_method_id = $request->payment_method_id;
        $deposit->save();
        Mail::to($deposit->user->email)->send(new DepositAlert($deposit));
        return redirect()->route('user.payment', $deposit->id);
//        return redirect()->back()->with('declined', "You can only deposit 50 USD and above");

    }

    public function payment($id)
    {
        $deposit = Deposit::findOrFail($id);
        return view('dashboard.subscription.payment', compact('deposit'));
    }



    public function Subsuccess($id)
    {
        return view('dashboard.subscription.success');
    }

    public function history()
    {
        $sub = Subscribe::whereUserId(\auth()->id())->get();
        return view('dashboard.subscription.history', compact('sub'));
    }

    public function details($id){
        $sub = Subscribe::findOrFail($id);
        $user = User::findOrFail($sub->user_id);
        return view('dashboard.subscription.details', compact('user', 'sub'));
    }
}
