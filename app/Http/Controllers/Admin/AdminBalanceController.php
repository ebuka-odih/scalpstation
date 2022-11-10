<?php

namespace App\Http\Controllers\Admin;

use App\Balance;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class AdminBalanceController extends Controller
{

//    public function userDetails($id)
//    {
//        $user = User::findOrFail($id);
//        return view('admin.user.add-balance', compact('user'));
//    }

    public function index()
    {
        return view('admin.user.add-balance');
    }


    public function createBalance($id)
    {
        $wallets = Balance::all();
        $user = User::findOrFail($id);
        $users = User::all();
        return view('admin.user.add-balance', compact('wallets', 'user', 'users'));
    }


    public function store(Request $request)
    {
        $data = $this->getData($request);
        $data['user_id'] = $request->user_id;
        Balance::create($data);
        return redirect()->back()->with('success', "Wallet Created Successfully");
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        $wallet = Balance::findOrFail($id);
        return view('admin.edit-wallet', compact('wallet'));
    }


    public function update(Request $request, $id)
    {
        $wallet = Balance::findOrFail($id);
        $data = $this->getData($request);
        $wallet->update($data);
        return redirect()->route('admin.wallet.create');

    }


    public function destroy($id)
    {
        $wallet = Balance::findOrFail($id);
        $wallet->delete();
        return redirect()->back();
    }

    protected function getData(Request $request)
    {
        $rules = [
            'name' => 'required',
            'value' => 'required',
        ];
        return $request->validate($rules);
    }

}
