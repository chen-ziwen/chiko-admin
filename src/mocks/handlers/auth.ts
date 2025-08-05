import { HttpResponse, http } from 'msw';

interface UserInfo {
  password: string;
  userInfo: Api.Auth.UserInfo;
  token: string;
  refreshToken: string
}

// 模拟用户数据
const chikoUser: UserInfo = {
  password: '123456',
  userInfo: {
    userId: '1',
    userName: 'Super',
    buttons: ['home', 'user-management', 'role-management', 'dashboard'],
    roles: ['R_SUPER', 'admin']
  },
  token: 'token-super',
  refreshToken: 'refresh-super'
};

const mockUsers: Record<string, UserInfo> = {
  Chiko: chikoUser,
  Super: chikoUser,
  Admin: {
    password: '123456',
    userInfo: {
      userId: '2',
      userName: 'Admin',
      buttons: ['home', 'user-management'],
      roles: ['admin']
    },
    token: 'token-admin',
    refreshToken: 'refresh-admin'
  },
  User: {
    password: '123456',
    userInfo: {
      userId: '3',
      userName: 'User',
      buttons: ['home'],
      roles: ['user']
    },
    token: 'token-user',
    refreshToken: 'refresh-user'
  }
};

export const authHandlers = [
  // 用户登录
  http.post('/auth/login', async ({ request }) => {
    const { userName, password } = await request.json() as { userName: string; password: string };

    const user = mockUsers[userName];
    if (user && user.password === password) {
      const loginToken: Api.Auth.LoginToken = {
        token: user.token,
        refreshToken: user.refreshToken
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
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    let userInfo: Api.Auth.UserInfo | undefined;
    if (token === 'token-super') {
      userInfo = mockUsers.Super.userInfo;
    } else if (token === 'token-admin') {
      userInfo = mockUsers.Admin.userInfo;
    } else if (token === 'token-user') {
      userInfo = mockUsers.User.userInfo;
    }

    if (!token || !userInfo) {
      return HttpResponse.json({
        code: '1002',
        message: '未提供认证令牌或无效令牌'
      });
    }

    return HttpResponse.json({
      code: '0000',
      message: '获取用户信息成功',
      data: userInfo
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

    const user = Object.values(mockUsers).find(u => u.refreshToken === refreshToken);
    if (!user) {
      return HttpResponse.json({
        code: '1004',
        message: '无效的刷新令牌'
      });
    }
    user.token = `token-${user.userInfo.userName.toLowerCase()}-${Date.now()}`;
    user.refreshToken = `refresh-${user.userInfo.userName.toLowerCase()}-${Date.now()}`;

    const newTokens: Api.Auth.LoginToken = {
      token: user.token,
      refreshToken: user.refreshToken
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
