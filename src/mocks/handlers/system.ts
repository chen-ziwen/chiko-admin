import { HttpResponse, http } from 'msw';

// 模拟数据
const mockUsers: Api.SystemManage.User[] = [
  {
    id: 1,
    userName: 'admin',
    nickName: '系统管理员',
    userEmail: 'admin@example.com',
    userPhone: '13800138000',
    userGender: '1',
    status: '1',
    userRoles: ['R_ADMIN'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    userName: 'user001',
    nickName: '张三',
    userEmail: 'zhangsan@example.com',
    userPhone: '13800138001',
    userGender: '1',
    status: '1',
    userRoles: ['R_USER'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-02 00:00:00',
    updateTime: '2024-01-02 00:00:00'
  },
  {
    id: 3,
    userName: 'user002',
    nickName: '李四',
    userEmail: 'lisi@example.com',
    userPhone: '13800138002',
    userGender: '2',
    status: '1',
    userRoles: ['R_USER'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-03 00:00:00',
    updateTime: '2024-01-03 00:00:00'
  },
  {
    id: 4,
    userName: 'user003',
    nickName: '王五',
    userEmail: 'wangwu@example.com',
    userPhone: '13800138003',
    userGender: '1',
    status: '1',
    userRoles: ['R_USER'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-04 00:00:00',
    updateTime: '2024-01-04 00:00:00'
  },
  {
    id: 5,
    userName: 'user004',
    nickName: '赵六',
    userEmail: 'zhaoliu@example.com',
    userPhone: '13800138004',
    userGender: '2',
    status: '1',
    userRoles: ['R_USER'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-05 00:00:00',
    updateTime: '2024-01-05 00:00:00'
  },
  {
    id: 6,
    userName: 'super',
    nickName: '超级管理员',
    userEmail: 'super@example.com',
    userPhone: '13800138005',
    userGender: '1',
    status: '1',
    userRoles: ['R_SUPER', 'R_ADMIN'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-06 00:00:00',
    updateTime: '2024-01-06 00:00:00'
  },
  {
    id: 7,
    userName: 'chiko',
    nickName: 'Chiko',
    userEmail: 'chiko@example.com',
    userPhone: '13800138006',
    userGender: '1',
    status: '1',
    userRoles: ['R_SUPER', 'R_ADMIN'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-07 00:00:00',
    updateTime: '2024-01-07 00:00:00'
  }
];

// 完整的角色数据（包含所有字段）
const mockFullRoles: Api.SystemManage.Role[] = [
  {
    id: 1,
    roleCode: 'R_SUPER',
    roleName: '超级管理员',
    roleDesc: '超级管理员，拥有所有权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    roleCode: 'R_ADMIN',
    roleName: '系统管理员',
    roleDesc: '系统管理员，拥有大部分权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-02 00:00:00',
    updateTime: '2024-01-02 00:00:00'
  },
  {
    id: 3,
    roleCode: 'R_USER',
    roleName: '普通用户',
    roleDesc: '普通用户，拥有基本权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-03 00:00:00',
    updateTime: '2024-01-03 00:00:00'
  },
  {
    id: 4,
    roleCode: 'GUEST',
    roleName: '访客用户',
    roleDesc: '访客用户，拥有只读权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-04 00:00:00',
    updateTime: '2024-01-04 00:00:00'
  }
];

// 用户管理处理器
export const userHandlers = [
  // 获取用户列表
  http.get('/system/user/list', ({ request }) => {
    const url = new URL(request.url);
    const current = parseInt(url.searchParams.get('current') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const userName = url.searchParams.get('userName');
    const nickName = url.searchParams.get('nickName');
    const userEmail = url.searchParams.get('userEmail');
    const userPhone = url.searchParams.get('userPhone');
    const userGender = url.searchParams.get('userGender');
    const status = url.searchParams.get('status');

    // 过滤数据
    let filteredUsers = [...mockUsers];

    if (userName && userName !== 'null' && userName !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userName.toLowerCase().includes(userName.toLowerCase())
      );
    }

    if (nickName && nickName !== 'null' && nickName !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.nickName.includes(nickName)
      );
    }

    if (userEmail && userEmail !== 'null' && userEmail !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userEmail.toLowerCase().includes(userEmail.toLowerCase())
      );
    }

    if (userPhone && userPhone !== 'null' && userPhone !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userPhone.includes(userPhone)
      );
    }

    if (userGender && userGender !== 'null' && userGender !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userGender === userGender
      );
    }

    if (status && status !== 'null' && status !== '') {
      const statusStr = status;
      filteredUsers = filteredUsers.filter(user =>
        user.status === statusStr
      );
    }

    // 分页
    const total = filteredUsers.length;
    const start = (current - 1) * size;
    const end = start + size;
    const records = filteredUsers.slice(start, end);

    return HttpResponse.json({
      code: 200,
      message: '获取用户列表成功',
      data: {
        records,
        total,
        current,
        size
      }
    });
  }),

  // 新增用户
  http.post('/system/user/add', async ({ request }) => {
    const userData = await request.json() as Omit<Api.SystemManage.User, 'id' | 'createTime' | 'updateTime'>;

    const newUser: Api.SystemManage.User = {
      ...userData,
      id: mockUsers.length + 1,
      createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    mockUsers.push(newUser);

    return HttpResponse.json({
      code: 200,
      message: '用户新增成功',
      data: newUser
    });
  }),

  // 编辑用户
  http.put('/system/user/edit/:id', async ({ params, request }) => {
    const id = parseInt(params.id as string);
    const userData = await request.json() as Partial<Api.SystemManage.User>;

    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return HttpResponse.json({
        code: 404,
        message: '用户不存在'
      }, { status: 404 });
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
      updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    return HttpResponse.json({
      code: 200,
      message: '用户编辑成功',
      data: mockUsers[userIndex]
    });
  }),

  // 删除用户
  http.delete('/system/user/delete/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return HttpResponse.json({
        code: 404,
        message: '用户不存在'
      }, { status: 404 });
    }

    mockUsers.splice(userIndex, 1);

    return HttpResponse.json({
      code: 200,
      message: '用户删除成功'
    });
  }),

  // 批量删除用户
  http.delete('/system/user/batchDelete', async ({ request }) => {
    const { ids } = await request.json() as { ids: number[] };

    ids.forEach(id => {
      const userIndex = mockUsers.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        mockUsers.splice(userIndex, 1);
      }
    });

    return HttpResponse.json({
      code: 200,
      message: '批量删除成功'
    });
  }),

  // 获取用户详情
  http.get('/system/user/detail/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const user = mockUsers.find(user => user.id === id);

    if (!user) {
      return HttpResponse.json({
        code: 404,
        message: '用户不存在'
      }, { status: 404 });
    }

    return HttpResponse.json({
      code: 200,
      message: '获取用户详情成功',
      data: user
    });
  })
];

// 角色管理处理器
export const roleHandlers = [
  // 获取所有角色
  http.get('/system/role/all', () => {
    // 返回简化的角色数据用于选择
    const allRoles = mockFullRoles.map(role => ({
      id: role.id,
      roleCode: role.roleCode,
      roleName: role.roleName
    }));

    return HttpResponse.json({
      code: 200,
      message: '获取所有角色成功',
      data: allRoles
    });
  }),

  // 获取角色列表
  http.get('/system/role/list', ({ request }) => {
    const url = new URL(request.url);
    const current = parseInt(url.searchParams.get('current') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const roleCode = url.searchParams.get('roleCode');
    const roleName = url.searchParams.get('roleName');
    const status = url.searchParams.get('status');

    // 过滤数据
    let filteredRoles = [...mockFullRoles];

    if (roleCode && roleCode !== 'null' && roleCode !== '') {
      filteredRoles = filteredRoles.filter(role =>
        role.roleCode.toLowerCase().includes(roleCode.toLowerCase())
      );
    }

    if (roleName && roleName !== 'null' && roleName !== '') {
      filteredRoles = filteredRoles.filter(role =>
        role.roleName.includes(roleName)
      );
    }

    if (status && status !== 'null' && status !== '') {
      const statusStr = status;
      filteredRoles = filteredRoles.filter(role =>
        role.status === statusStr
      );
    }

    // 分页
    const total = filteredRoles.length;
    const start = (current - 1) * size;
    const end = start + size;
    const records = filteredRoles.slice(start, end);

    return HttpResponse.json({
      code: 200,
      message: '获取角色列表成功',
      data: {
        records,
        total,
        current,
        size
      }
    });
  }),

  // 新增角色
  http.post('/system/role/add', async ({ request }) => {
    const roleData = await request.json() as Omit<Api.SystemManage.Role, 'id' | 'createTime' | 'updateTime'>;

    const newRole: Api.SystemManage.Role = {
      ...roleData,
      id: mockFullRoles.length + 1,
      createBy: 'system',
      updateBy: 'system',
      createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    mockFullRoles.push(newRole);

    return HttpResponse.json({
      code: 200,
      message: '角色新增成功',
      data: newRole
    });
  }),

  // 编辑角色
  http.put('/system/role/edit/:id', async ({ params, request }) => {
    const id = parseInt(params.id as string);
    const roleData = await request.json() as Partial<Api.SystemManage.Role>;

    const roleIndex = mockFullRoles.findIndex(role => role.id === id);
    if (roleIndex === -1) {
      return HttpResponse.json({
        code: 404,
        message: '角色不存在'
      }, { status: 404 });
    }

    mockFullRoles[roleIndex] = {
      ...mockFullRoles[roleIndex],
      ...roleData,
      updateBy: 'system',
      updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    return HttpResponse.json({
      code: 200,
      message: '角色编辑成功',
      data: mockFullRoles[roleIndex]
    });
  }),

  // 删除角色
  http.delete('/system/role/delete/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const roleIndex = mockFullRoles.findIndex(role => role.id === id);

    if (roleIndex === -1) {
      return HttpResponse.json({
        code: 404,
        message: '角色不存在'
      }, { status: 404 });
    }

    mockFullRoles.splice(roleIndex, 1);

    return HttpResponse.json({
      code: 200,
      message: '角色删除成功'
    });
  })
];
