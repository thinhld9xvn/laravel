@extends('admin.layout.layout')
@section('content')     
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-11">
                <h1 class="page-header">Quản lý file
                    <small>Danh Sách</small>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
            <iframe id="ifrFiles" 
                    src="laravel-filemanager?type=Images&CKEditor=demo&CKEditorFuncNum=1&langCode=en"></iframe>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- #Page Content -->
@endsection
