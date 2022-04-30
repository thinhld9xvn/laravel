export const navbarInfo = {
    navbar_brand : 'Bảng điều khiển',
    navbar_items : [
        {
            name : 'notifications',
            label : 'Hành động gần nhất',
            icon : 'notifications',
            show : false,
            items_list : [
                {
                    label : "Mike John responded to your email",
                    url : "#"
                },
                {
                    label : "You have 5 new tasks",
                    url : "#"
                },
                {
                    label : "You're now friend with Andrew",
                    url : "#"
                },
                {
                    label : "Another Notification",
                    url : "#"
                },
                {
                    label : "Another One",
                    url : "#"
                }
            ]
        },
        {
            name : 'account',
            label : 'Tài khoản',
            icon : 'person',
            show : false,
            items_list : [
                {
                    label : "Hồ sơ thành viên",
                    url : "#"
                },
                {
                    label : "Cài đặt",
                    url : "#"
                },
                {
                    label : "Đăng xuất",
                    url : "#"
                }
            ]
        }
    ],
    navbar_item_active : null
}