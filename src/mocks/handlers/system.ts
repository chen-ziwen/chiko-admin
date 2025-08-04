import { HttpResponse, http } from 'msw';

// 模拟角色数据
const mockRoles: Api.SystemManage.Role[] = [
  {
    id: 1,
    roleName: '超级管理员',
    roleCode: 'R_SUPER',
    roleDesc: '系统超级管理员，拥有所有权限',
    status: '1',
    createBy: 'system',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'system',
    updateTime: '2025-6-15 10:00:00'
  },
  {
    id: 2,
    roleName: '管理员',
    roleCode: 'admin',
    roleDesc: '系统管理员，拥有大部分权限',
    status: '1',
    createBy: 'admin',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'admin',
    updateTime: '2025-6-15 10:00:00'
  },
  {
    id: 3,
    roleName: '普通用户',
    roleCode: 'user',
    roleDesc: '普通用户，拥有基础权限',
    status: '1',
    createBy: 'admin',
    createTime: '2025-01-03 10:00:00',
    updateBy: 'admin',
    updateTime: '2025-01-03 10:00:00'
  },
  {
    id: 4,
    roleName: '访客',
    roleCode: 'guest',
    roleDesc: '访客用户，只读权限',
    status: '2',
    createBy: 'admin',
    createTime: '2025-01-04 10:00:00',
    updateBy: 'admin',
    updateTime: '2025-01-04 10:00:00'
  }
];

// 模拟用户数据
const mockUsers: Api.SystemManage.User[] = [
  {
    id: 1,
    userName: 'Chiko',
    nickName: '超级管理员',
    userEmail: 'chiko@example.com',
    userPhone: '13800138000',
    userGender: '1',
    userRoles: ['R_SUPER', 'admin'],
    status: '1',
    createBy: 'system',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'system',
    updateTime: '2025-6-15 10:00:00'
  },
  {
    id: 2,
    userName: 'Angle',
    nickName: '管理员',
    userEmail: 'Angle@example.com',
    userPhone: '13800138001',
    userGender: '2',
    userRoles: ['admin'],
    status: '1',
    createBy: 'admin',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'admin',
    updateTime: '2025-6-15 10:00:00'
  },
  {
    id: 3,
    userName: 'user2',
    nickName: '用户2',
    userEmail: 'user2@example.com',
    userPhone: '13800138002',
    userGender: '1',
    userRoles: ['user'],
    status: '1',
    createBy: 'admin',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'admin',
    updateTime: '2025-6-15 10:00:00'
  }
];

// 模拟菜单数据
const mockMenus: Api.SystemManage.Menu[] = [
  {
    id: 1,
    menuName: '首页',
    routeName: 'home',
    routePath: '/home',
    component: 'layout.base$view.home',
    icon: 'mdi:home',
    iconType: '1',
    menuType: '2',
    parentId: 0,
    status: '1',
    createBy: 'system',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'system',
    updateTime: '2025-6-15 10:00:00',
    children: []
  },
  {
    id: 2,
    menuName: '系统管理',
    routeName: 'system',
    routePath: '/system',
    component: 'layout.base',
    icon: 'carbon:settings-adjust',
    iconType: '1',
    menuType: '1',
    parentId: 0,
    status: '1',
    createBy: 'system',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'system',
    updateTime: '2025-6-15 10:00:00',
    children: [
      {
        id: 21,
        menuName: '用户管理',
        routeName: 'system_user',
        routePath: '/system/user',
        component: 'view.system_user',
        icon: 'ic:round-manage-accounts',
        iconType: '1',
        menuType: '2',
        parentId: 2,
        status: '1',
        createBy: 'system',
        createTime: '2025-6-15 10:00:00',
        updateBy: 'system',
        updateTime: '2025-6-15 10:00:00'
      },
      {
        id: 22,
        menuName: '角色管理',
        routeName: 'system_role',
        routePath: '/system/role',
        component: 'view.system_role',
        icon: 'carbon:user-role',
        iconType: '1',
        menuType: '2',
        parentId: 2,
        status: '1',
        createBy: 'system',
        createTime: '2025-6-15 10:00:00',
        updateBy: 'system',
        updateTime: '2025-6-15 10:00:00'
      },
      {
        id: 23,
        menuName: '菜单管理',
        routeName: 'system_menu',
        routePath: '/system/menu',
        component: 'view.system_menu',
        icon: 'material-symbols:menu',
        iconType: '1',
        menuType: '2',
        parentId: 2,
        status: '1',
        createBy: 'system',
        createTime: '2025-6-15 10:00:00',
        updateBy: 'system',
        updateTime: '2025-6-15 10:00:00'
      }
    ]
  },
  {
    id: 3,
    menuName: '多级菜单',
    routeName: 'multi-menu',
    routePath: '/multi-menu',
    component: 'layout.base',
    icon: 'mdi:menu',
    iconType: '1',
    menuType: '1',
    parentId: 0,
    status: '1',
    createBy: 'system',
    createTime: '2025-6-15 10:00:00',
    updateBy: 'system',
    updateTime: '2025-6-15 10:00:00',
    children: [
      {
        id: 31,
        menuName: '二级菜单1',
        routeName: 'multi-menu_first',
        routePath: '/multi-menu/first',
        component: 'layout.base',
        icon: 'mdi:menu',
        iconType: '1',
        menuType: '1',
        parentId: 3,
        status: '1',
        createBy: 'system',
        createTime: '2025-6-15 10:00:00',
        updateBy: 'system',
        updateTime: '2025-6-15 10:00:00',
        children: [
          {
            id: 311,
            menuName: '三级菜单1-1',
            routeName: 'multi-menu_first_child',
            routePath: '/multi-menu/first/child',
            component: 'view.multi-menu_first_child',
            icon: 'mdi:menu',
            iconType: '1',
            menuType: '2',
            parentId: 31,
            status: '1',
            createBy: 'system',
            createTime: '2025-6-15 10:00:00',
            updateBy: 'system',
            updateTime: '2025-6-15 10:00:00'
          }
        ]
      }
    ]
  }
];

export const systemHandlers = [
  // 获取角色列表
  http.get('/systemManage/getRoleList', ({ request }) => {
    const url = new URL(request.url);
    const current = parseInt(url.searchParams.get('current') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const keyword = url.searchParams.get('keyword') || '';

    let filteredRoles = mockRoles;
    if (keyword) {
      filteredRoles = mockRoles.filter(role =>
        role.roleName.includes(keyword) || role.roleCode.includes(keyword)
      );
    }

    const start = (current - 1) * size;
    const end = start + size;
    const records = filteredRoles.slice(start, end);

    return HttpResponse.json({
      code: '0000',
      message: '获取角色列表成功',
      data: {
        records,
        current,
        size,
        total: filteredRoles.length
      }
    });
  }),

  // 获取所有角色
  http.get('/systemManage/getAllRoles', () => {
    const allRoles: Api.SystemManage.AllRole[] = mockRoles
      .filter(role => role.status === '1')
      .map(role => ({
        id: role.id,
        roleCode: role.roleCode,
        roleName: role.roleName
      }));

    return HttpResponse.json({
      code: '0000',
      message: '获取所有角色成功',
      data: allRoles
    });
  }),

  // 获取用户列表
  http.get('/systemManage/getUserList', ({ request }) => {
    const url = new URL(request.url);
    const current = parseInt(url.searchParams.get('current') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const keyword = url.searchParams.get('keyword') || '';

    let filteredUsers = mockUsers;
    if (keyword) {
      filteredUsers = mockUsers.filter(user =>
        user.userName.includes(keyword) ||
        user.nickName.includes(keyword) ||
        user.userEmail.includes(keyword)
      );
    }

    const start = (current - 1) * size;
    const end = start + size;
    const records = filteredUsers.slice(start, end);

    return HttpResponse.json({
      code: '0000',
      message: '获取用户列表成功',
      data: {
        records,
        current,
        size,
        total: filteredUsers.length
      }
    });
  }),

  // 获取菜单列表 v2
  http.get('/systemManage/getMenuList/v2', () => {
    return HttpResponse.json({
      code: '0000',
      message: '获取菜单列表成功',
      data: mockMenus
    });
  }),

  // 获取所有页面
  http.get('/systemManage/getAllPages', () => {
    const pages: string[] = [
      'view.home',
      'view.system_user',
      'view.system_role',
      'view.system_menu',
      'view.multi-menu_first_child',
      'view.about'
    ];

    return HttpResponse.json({
      code: '0000',
      message: '获取所有页面成功',
      data: pages
    });
  }),

  // 获取菜单树
  http.get('/systemManage/getMenuTree', () => {
    const menuTree: Api.SystemManage.MenuTree[] = [
      { id: 1, label: '首页', pId: 0 },
      { id: 2, label: '系统管理', pId: 0 },
      { id: 21, label: '用户管理', pId: 2 },
      { id: 22, label: '角色管理', pId: 2 },
      { id: 23, label: '菜单管理', pId: 2 },
      { id: 3, label: '多级菜单', pId: 0 },
      { id: 31, label: '二级菜单1', pId: 3 },
      { id: 311, label: '三级菜单1-1', pId: 31 }
    ];

    return HttpResponse.json({
      code: '0000',
      message: '获取菜单树成功',
      data: menuTree
    });
  })
];
