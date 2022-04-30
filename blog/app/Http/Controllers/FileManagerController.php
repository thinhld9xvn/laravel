<?php

namespace App\Http\Controllers;

class FileManagerController extends Controller
{
    public function getFileManager()
    {
    	return view('admin.file-manager.file');
    }
}
