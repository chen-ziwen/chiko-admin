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
    userRoles: ['ADMIN'],
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
    userRoles: ['USER'],
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
    userRoles: ['USER'],
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
    userRoles: ['USER'],
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
    userRoles: ['USER'],
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-05 00:00:00',
    updateTime: '2024-01-05 00:00:00'
  }
];

// 完整的角色数据（包含所有字段）
const mockFullRoles: Api.SystemManage.Role[] = [
  {
    id: 1,
    roleCode: 'ADMIN',
    roleName: '系统管理员',
    roleDesc: '系统管理员，拥有所有权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    roleCode: 'USER',
    roleName: '普通用户',
    roleDesc: '普通用户，拥有基本权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-02 00:00:00',
    updateTime: '2024-01-02 00:00:00'
  },
  {
    id: 3,
    roleCode: 'GUEST',
    roleName: '访客用户',
    roleDesc: '访客用户，拥有只读权限',
    status: '1',
    createBy: 'system',
    updateBy: 'system',
    createTime: '2024-01-03 00:00:00',
    updateTime: '2024-01-03 00:00:00'
  }
];

// 用于用户角色选择的简化角色数据
// const mockRoles: Api.SystemManage.AllRole[] = mockFullRoles.map(role => ({
//   id: role.id,
//   roleCode: role.roleCode,
//   roleName: role.roleName
// }));

// 用户管理处理器
export const userHandlers = [
  // 获取用户列表
  http.get('/system/user/list', ({ request }) => {
    console.log('🔶 MSW: 拦截到用户列表请求', request.url);

    const url = new URL(request.url);
    const current = parseInt(url.searchParams.get('current') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const userName = url.searchParams.get('userName');
    const nickName = url.searchParams.get('nickName');
    const userEmail = url.searchParams.get('userEmail');
    const userPhone = url.searchParams.get('userPhone');
    const userGender = url.searchParams.get('userGender');
    const status = url.searchParams.get('status');

    console.log('🔶 MSW: 请求参数:', { current, size, userName, nickName, userEmail, userPhone, userGender, status });
    console.log('🔶 MSW: 原始用户数据数量:', mockUsers.length);

    // 过滤数据
    let filteredUsers = [...mockUsers];

    if (userName && userName !== 'null' && userName !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userName.toLowerCase().includes(userName.toLowerCase())
      );
      console.log('🔶 MSW: 按用户名过滤后数量:', filteredUsers.length);
    }

    if (nickName && nickName !== 'null' && nickName !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.nickName.includes(nickName)
      );
      console.log('🔶 MSW: 按昵称过滤后数量:', filteredUsers.length);
    }

    if (userEmail && userEmail !== 'null' && userEmail !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userEmail.toLowerCase().includes(userEmail.toLowerCase())
      );
      console.log('🔶 MSW: 按邮箱过滤后数量:', filteredUsers.length);
    }

    if (userPhone && userPhone !== 'null' && userPhone !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userPhone.includes(userPhone)
      );
      console.log('🔶 MSW: 按手机号过滤后数量:', filteredUsers.length);
    }

    if (userGender && userGender !== 'null' && userGender !== '') {
      filteredUsers = filteredUsers.filter(user =>
        user.userGender === userGender
      );
      console.log('🔶 MSW: 按性别过滤后数量:', filteredUsers.length);
    }

    if (status && status !== 'null' && status !== '') {
      const statusStr = status;
      filteredUsers = filteredUsers.filter(user =>
        user.status === statusStr
      );
      console.log('🔶 MSW: 按状态过滤后数量:', filteredUsers.length);
    }

    // 分页
    const total = filteredUsers.length;
    const start = (current - 1) * size;
    const end = start + size;
    const records = filteredUsers.slice(start, end);

    console.log('🔶 MSW: 返回用户列表数据', { total, current, size, recordsCount: records.length, start, end });

    return HttpResponse.json({
      code: 200,
      message: 'success',
      data: {
        records,
        total,
        current,
        size,
        pages: Math.ceil(total / size)
      }
    });
  }),

  // 新增用户
  http.post('/system/user/add', async ({ request }) => {
    console.log('🔶 MSW: 拦截到新增用户请求');

    const userData = await request.json() as Omit<Api.SystemManage.User, 'id' | 'createTime' | 'updateTime'>;

    const newUser: Api.SystemManage.User = {
      ...userData,
      id: mockUsers.length + 1,
      createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    mockUsers.push(newUser);

    console.log('🔶 MSW: 用户新增成功', newUser);

    return HttpResponse.json({
      code: 200,
      message: '用户新增成功',
      data: newUser
    });
  }),

  // 编辑用户
  http.put('/system/user/edit/:id', async ({ params, request }) => {
    console.log('🔶 MSW: 拦截到编辑用户请求', params.id);

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

    console.log('🔶 MSW: 用户编辑成功', mockUsers[userIndex]);

    return HttpResponse.json({
      code: 200,
      message: '用户编辑成功',
      data: mockUsers[userIndex]
    });
  }),

  // 删除用户
  http.delete('/system/user/delete/:id', ({ params }) => {
    console.log('🔶 MSW: 拦截到删除用户请求', params.id);

    const id = parseInt(params.id as string);
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return HttpResponse.json({
        code: 404,
        message: '用户不存在'
      }, { status: 404 });
    }

    mockUsers.splice(userIndex, 1);

    console.log('🔶 MSW: 用户删除成功');

    return HttpResponse.json({
      code: 200,
      message: '用户删除成功'
    });
  }),

  // 批量删除用户
  http.delete('/system/user/batchDelete', async ({ request }) => {
    console.log('🔶 MSW: 拦截到批量删除用户请求');

    const { ids } = await request.json() as { ids: number[] };

    ids.forEach(id => {
      const userIndex = mockUsers.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        mockUsers.splice(userIndex, 1);
      }
    });

    console.log('🔶 MSW: 批量删除成功');

    return HttpResponse.json({
      code: 200,
      message: '批量删除成功'
    });
  }),

  // 获取用户详情
  http.get('/system/user/detail/:id', ({ params }) => {
    console.log('🔶 MSW: 拦截到获取用户详情请求', params.id);

    const id = parseInt(params.id as string);
    const user = mockUsers.find(user => user.id === id);

    if (!user) {
      return HttpResponse.json({
        code: 404,
        message: '用户不存在'
      }, { status: 404 });
    }

    console.log('🔶 MSW: 返回用户详情', user);

    return HttpResponse.json({
      code: 200,
      message: 'success',
      data: user
    });
  })
];

// 角色管理处理器
export const roleHandlers = [
  // 获取所有角色
  http.get('/system/role/all', () => {
    console.log('🔶 MSW: 拦截到获取所有角色请求');

    return HttpResponse.json({
      code: 200,
      message: 'success',
      data: mockFullRoles
    });
  }),

  // 获取角色列表
  http.get('/system/role/list', ({ request }) => {
    console.log('🔶 MSW: 拦截到获取角色列表请求');

    const url = new URL(request.url);
    const current = parseInt(url.searchParams.get('current') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const roleCode = url.searchParams.get('roleCode');
    const roleName = url.searchParams.get('roleName');
    const status = url.searchParams.get('status');

    console.log('🔶 MSW: 角色列表请求参数:', { current, size, roleCode, roleName, status });
    console.log('🔶 MSW: 原始角色数据数量:', mockFullRoles.length);

    // 过滤数据
    let filteredRoles = [...mockFullRoles];

    if (roleCode && roleCode !== 'null' && roleCode !== '') {
      filteredRoles = filteredRoles.filter(role =>
        role.roleCode.toLowerCase().includes(roleCode.toLowerCase())
      );
      console.log('🔶 MSW: 按角色代码过滤后数量:', filteredRoles.length);
    }

    if (roleName && roleName !== 'null' && roleName !== '') {
      filteredRoles = filteredRoles.filter(role =>
        role.roleName.includes(roleName)
      );
      console.log('🔶 MSW: 按角色名称过滤后数量:', filteredRoles.length);
    }

    if (status && status !== 'null' && status !== '') {
      const statusStr = status;
      filteredRoles = filteredRoles.filter(role =>
        role.status === statusStr
      );
      console.log('🔶 MSW: 按状态过滤后数量:', filteredRoles.length);
    }

    // 分页
    const total = filteredRoles.length;
    const start = (current - 1) * size;
    const end = start + size;
    const records = filteredRoles.slice(start, end);

    console.log('🔶 MSW: 返回角色列表数据', { total, current, size, recordsCount: records.length, start, end });

    return HttpResponse.json({
      code: 200,
      message: 'success',
      data: {
        records,
        total,
        current,
        size,
        pages: Math.ceil(total / size)
      }
    });
  }),

  // 新增角色
  http.post('/system/role/add', async ({ request }) => {
    console.log('🔶 MSW: 拦截到新增角色请求');

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
    console.log('🔶 MSW: 拦截到编辑角色请求', params.id);

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
    console.log('🔶 MSW: 拦截到删除角色请求', params.id);

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
