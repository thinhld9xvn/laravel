@if( Auth::user() ) 
    <?php $user = Auth::User(); ?>
    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                <li class="sidebar-logo">
                    <img src="/admin/logo.svg" 
                            alt="logo">
                </li>            
                <li class="sidebar-profile">
                    <div class="avatar">
                        <img src="{{ $user->avatar }}" alt="avatar" />
                    </div>
                    <div class="profile">
                        <div class="name">{{ $user->name }}</div>
                        <div class="email">{{ $user->email }}</div>
                    </div>
                </li>
                <li class="sidebar-entry">
                    <figcaption>Dashboards</figcaption>
                    <small>Phần tổng hợp && thống kê</small>
                </li>
                
                <li class="item-menu">
                    <a href="admin/dashbroad"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                </li>

                <li class="sidebar-entry">
                    <figcaption>Pages</figcaption>
                    <small>Các trang quản trị hệ thống</small>
                </li>

                <li class="item-menu">
                    <a href="admin/profile"><i class="fa fa-user fa-fw"></i> Cá Nhân</a>
                </li>
                <li class="item-menu item-menu-has-childrens">
                    <a href="admin/post"><i class="fa fa-pencil fa-fw"></i> Bài viết<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="admin/post"> Danh Sách Bài Viết</a>
                        </li>
                        <li>
                            <a href="admin/post/add"> Thêm Bài Viết</a>
                        </li>
                    </ul>
                    <!-- /.nav-second-level -->
                </li>
                @if($user->role=='admin')
                <li class="item-menu item-menu-has-childrens">
                    <a href="admin/category"><i class="fa fa-table fa-fw"></i> Chuyên Mục<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="admin/category">Danh Sách Chuyên Mục</a>
                        </li>
                        <li>
                            <a href="admin/category/add">Thêm Chuyên Mục</a>
                        </li>
                    </ul>
                    <!-- /.nav-second-level -->
                </li>

                <li class="item-menu">
                    <a href="admin/file-manager">
                        <i class="fa fa-file-image-o fa-fw"></i> 
                        Tệp tin
                    </a>
                </li>

                <li class="item-menu">
                    <a href="admin/tag"><i class="fa fa-tags fa-fw"></i> Tags</a>
                    <!-- /.nav-second-level -->
                </li>

                <li class="item-menu">
                    <a href="admin/author"><i class="fa fa-users fa-fw"></i> Quản lý Author</a>
                </li>
                @endif
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
@endif