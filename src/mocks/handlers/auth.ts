import { HttpResponse, http } from 'msw';

// 模拟用户数据
const mockUserInfo: Api.Auth.UserInfo = {
  userId: '1',
  userName: 'Chiko',
  buttons: ['home', 'user-management', 'role-management'],
  roles: ['R_SUPER', 'admin']
};

export const authHandlers = [
  // 用户登录
  http.post('/auth/login', async ({ request }) => {
    const { userName, password } = await request.json() as { userName: string; password: string };

    // 支持的用户账户
    const validAccounts = [
      { userName: 'Chiko', password: '123456' },
      { userName: 'Super', password: '123456' },
      { userName: 'Admin', password: '123456' },
      { userName: 'User', password: '123456' }
    ];

    const isValidAccount = validAccounts.some(
      account => account.userName === userName && account.password === password
    );

    if (isValidAccount) {
      const loginToken: Api.Auth.LoginToken = {
        token: `mock-jwt-token-${  Date.now()}`,
        refreshToken: `mock-refresh-token-${  Date.now()}`
      };

      return HttpResponse.json({
        code: '0000',
        message: '登录成功',
        data: loginToken
      });
    }

    return HttpResponse.json({
      code: '1001',
      message: '用户名或密码错误'
    });
  }),

  // 获取用户信息
  http.get('/auth/getUserInfo', ({ request }) => {
    const token = request.headers.get('authorization');

    if (!token) {
      return HttpResponse.json({
        code: '1002',
        message: '未提供认证令牌'
      });
    }

    return HttpResponse.json({
      code: '0000',
      message: '获取用户信息成功',
      data: mockUserInfo
    });
  }),

  // 刷新令牌
  http.post('/auth/refreshToken', async ({ request }) => {
    const { refreshToken } = await request.json() as { refreshToken: string };

    if (!refreshToken) {
      return HttpResponse.json({
        code: '1003',
        message: '刷新令牌不能为空'
      });
    }

    const newTokens: Api.Auth.LoginToken = {
      token: `new-mock-jwt-token-${  Date.now()}`,
      refreshToken: `new-mock-refresh-token-${  Date.now()}`
    };

    return HttpResponse.json({
      code: '0000',
      message: '刷新令牌成功',
      data: newTokens
    });
  }),

  // 自定义后端错误
  http.get('/auth/error', ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code') || '500';
    const msg = url.searchParams.get('msg') || '服务器内部错误';

    return HttpResponse.json(
      {
        code: parseInt(code),
        message: msg
      },
      { status: parseInt(code) }
    );
  })
];
