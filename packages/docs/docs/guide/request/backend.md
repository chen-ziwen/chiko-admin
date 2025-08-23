---
sidebar_position: 1
---

# 后端请求

ChikoAdmin 基于 `@chiko-admin/axios` 封装了完整的 HTTP 请求系统，支持统一的错误处理、认证管理和响应转换。

## 请求实例

### 主服务请求

项目使用 `createFlatRequest` 创建主请求实例：

```typescript
// src/services/request/index.ts
export const request = createFlatRequest<App.Service.Response, RequestInstanceState>(
  {
    baseURL: globalConfig.serviceBaseURL,
    headers: {}
  },
  {
    isBackendSuccess(response) {
      return String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    async onBackendFail(response, instance) {
      await backEndFail(response, instance, request);
    },
    onError(error) {
      handleError(error, request);
    },
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });
      return config;
    },
    transformBackendResponse(response) {
      return response.data.data;
    }
  }
);
```

### 其他服务请求

当需要连接多个后端服务时，可以创建额外的请求实例：

```typescript
export const demoRequest = createRequest<App.Service.DemoResponse>(
  {
    baseURL: globalConfig.serviceOtherBaseURL.demo
  },
  {
    isBackendSuccess(response) {
      return response.data.status === '200';
    },
    transformBackendResponse(response) {
      return response.data.result;
    }
  }
);
```

## API 服务

### 认证相关 API

```typescript
// src/services/api/auth.ts
import { request } from '../request';

export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    data: { password, userName },
    method: 'post',
    url: '/auth/login'
  });
}

export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });
}

export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    data: { refreshToken },
    method: 'post',
    url: '/auth/refreshToken'
  });
}
```

### 系统管理 API

```typescript
// src/services/api/system.ts
export function fetchGetRoleList(params: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    params,
    url: '/system/role/getRoleList'
  });
}

export function fetchGetUserList(params: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    params,
    url: '/system/user/getUserList'
  });
}
```

## 请求配置

### 基础配置

- **baseURL**: 从环境变量获取服务地址
- **headers**: 自动添加认证头
- **timeout**: 请求超时时间

### 拦截器配置

- **onRequest**: 自动添加 Authorization 头
- **onResponse**: 统一处理响应数据
- **onError**: 统一错误处理
- **onBackendFail**: 处理后端业务错误

## 类型定义

### 响应类型

```typescript
// src/types/api.d.ts
declare namespace Api {
  namespace Common {
    interface PaginatingQueryRecord<T = any> {
      current: number;
      size: number;
      total: number;
      records: T[];
    }
  }

  namespace Auth {
    interface LoginToken {
      refreshToken: string;
      token: string;
    }

    interface UserInfo {
      buttons: string[];
      roles: string[];
      userId: string;
      userName: string;
    }
  }
}
```

### 请求状态类型

```typescript
export interface RequestInstanceState {
  errMsgStack: string[];
  refreshTokenFn: Promise<boolean> | null;
}
```

## 使用方式

### 发送请求

```tsx
import { fetchGetUserInfo } from '@/services/api/auth';

function UserProfile() {
  const [userInfo, setUserInfo] = useState<Api.Auth.UserInfo | null>(null);

  useEffect(() => {
    fetchGetUserInfo()
      .then(data => setUserInfo(data))
      .catch(error => console.error('获取用户信息失败:', error));
  }, []);

  return (
    <div>
      {userInfo && <p>欢迎，{userInfo.userName}</p>}
    </div>
  );
}
```

### 分页查询

```tsx
import { fetchGetUserList } from '@/services/api/system';

function UserList() {
  const [users, setUsers] = useState<Api.SystemManage.UserList | null>(null);

  const loadUsers = (params: Api.SystemManage.UserSearchParams) => {
    fetchGetUserList(params)
      .then(data => setUsers(data))
      .catch(error => console.error('获取用户列表失败:', error));
  };

  return (
    <div>
      <button onClick={() => loadUsers({ current: 1, size: 10 })}>
        加载用户列表
      </button>
      {users && (
        <div>
          <p>共 {users.total} 条记录</p>
          {users.records.map(user => (
            <div key={user.id}>{user.userName}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 错误处理

### 自动错误处理

请求实例会自动处理常见错误：

- 网络错误
- 认证失败
- 后端业务错误
- 响应格式错误

### 自定义错误处理

```typescript
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ 
    params: { code, msg }, 
    url: '/auth/error' 
  });
}
```

## 常见问题

### Q: 请求失败怎么办？

A: 检查网络连接、认证状态和后端服务是否正常。

### Q: 如何处理认证失败？

A: 系统会自动处理 token 过期，尝试刷新 token 或跳转到登录页。

### Q: 如何添加新的 API 接口？

A: 在 `src/services/api/` 目录下创建新的文件，定义接口函数和类型。