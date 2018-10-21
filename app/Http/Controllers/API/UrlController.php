<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User;
use App\Url; 
use Illuminate\Support\Facades\Auth; 
use Validator;

class UrlController extends Controller 
{
    public function getAllUrls(){ 
        //get loggedin user's urls then return in response
        $urls = Url::where('user_id', Auth::user()->id)->get();
        if($urls != null)
        {
            foreach ($urls as $url) {
                $url->status = $this->checkOnline($url->url)?'online':'offline';
            }
        }
        $success['data'] =  $urls; 

        return response()->json(['success' => $success], $this->successStatus());  
    }

    public function createUrl(Request $request) 
    { 
        //url input validation
        $validator = Validator::make($request->all(), [ 
            'url' => array(
                    'required',
                    'regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/'
            )
        ]);

        if ($validator->fails()) { 
            //validation error(s) occured
            return response()->json(['error' => $validator->errors()], $this->badRequestStatus());            
        }
        //if pass validation test create url
        $input = $request->all(); 
        $input['user_id'] = Auth::user()->id; 
        $url = Url::create($input); 
        $success['url_id'] =  $url->id;

        return response()->json(['success' => $success], $this->successStatus()); 
    }

    public function getUrl($id)
    {
        //get single url by id
        $url = Url::where('id', $id)->where('user_id',  Auth::user()->id)->first();
        if ($url == null)
        {
            return response()->json(['error' => 'url not found or not belongs to user'], $this->notFoundStatus());
        }
        $url->status = $this->checkOnline($url->url)?'online':'offline';
        $success['url'] =  $url;

        return response()->json(['success' => $success], $this->successStatus());
    }

    public function deleteUrl($id)
    {
        //check if url belongs to loggedin user first
        $url = Url::where('id', $id)->where('user_id',  Auth::user()->id)->first();

        if ($url !== null)
        {
            //delete it
            $affectedRows = $url->delete();
        } else{
            $affectedRows = false;
        }
        $success['affected_rows'] = $affectedRows;

        return response()->json(['success' => $success], $this->successStatus());
    }

    public function updateUrl($id, Request $request)
    {
        //url input validation
        $validator = Validator::make($request->all(), [ 
            'url' => array(
                    'regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/'
            )
        ]);

        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], $this->badRequestStatus());            
        }

        $url = Url::where('id', $id)->where('user_id',  Auth::user()->id)->first();

        if ($url != null)
        {
            $url->update($request->all());
            $success['url'] =  $url;
            return response()->json(['success' => $success], $this->successStatus());
        }

        return response()->json(['error'=>'url not found or not belongs to user'], $this->notFoundStatus());
    }

    private function checkOnline($domain) {
       $curlInit = curl_init($domain);
       curl_setopt($curlInit,CURLOPT_CONNECTTIMEOUT,10);
       curl_setopt($curlInit,CURLOPT_HEADER,true);
       curl_setopt($curlInit,CURLOPT_NOBODY,true);
       curl_setopt($curlInit,CURLOPT_RETURNTRANSFER,true);

       //get answer
       $response = curl_exec($curlInit);

       curl_close($curlInit);
       if ($response) return true;
       return false;
    }
}