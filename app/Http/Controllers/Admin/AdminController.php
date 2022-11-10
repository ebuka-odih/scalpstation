<?php

namespace App\Http\Controllers\Admin;

use App\Deposit;
use App\Http\Controllers\Controller;
use App\Investment;
use App\Rules\MatchOldPassword;
use App\User;
use App\Withdraw;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function dashboard()
    {
        $users = User::where('admin', 0)->paginate(5);
        $total_users = User::where('admin', 0)->count();
        $deposits = Deposit::where('status', 1)->sum('amount');
        $withdrawal = Withdraw::where('status', 1)->sum('amount');
        return view('admin.index', compact('users','total_users', 'deposits', 'withdrawal'));
    }

    public function security()
    {
        return view('admin.user.security');
    }

    public function storePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => ['required'],
            'new_confirm_password' => ['same:new_password'],
        ]);

        User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);
        return redirect()->back()->with('success', "Password Changed Successfully");
    }

    public function editDate(Request $request)
    {
        $id = $request->user_id;
        $user = User::findOrFail($id);
        $user->update(['created_at' => $request->created_at]);
        return redirect()->back();
    }

    public function editBalance(Request $request)
    {
        $id = $request->user_id;
        $user = User::findOrFail($id);
        $user->update(['balance' => $request->balance]);
        return redirect()->back()->with('success', "Balance Updated");
    }
    public function editProfit(Request $request)
    {
        $id = $request->user_id;
        $user = User::findOrFail($id);
        $user->update(['profit' => $request->profit]);
        return redirect()->back()->with('profit', "Profit Updated");
    }

}
