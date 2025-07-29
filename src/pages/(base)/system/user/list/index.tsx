// 自动导入已启用，无需手动导入antd组件
import React from 'react';

const UserList: React.FC = () => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <ASpace size="middle">
          <AButton type="link">编辑</AButton>
          <AButton
            danger
            type="link"
          >
            删除
          </AButton>
        </ASpace>
      )
    }
  ];

  const data = [
    {
      key: '1',
      username: 'admin',
      nickname: '管理员',
      email: 'admin@example.com',
      role: '超级管理员',
      status: '启用'
    },
    {
      key: '2',
      username: 'user1',
      nickname: '用户1',
      email: 'user1@example.com',
      role: '普通用户',
      status: '启用'
    }
  ];

  return (
    <ACard>
      <div style={{ marginBottom: 16 }}>
        <ASpace>
          <AInput.Search
            placeholder="请输入搜索关键词"
            style={{ width: 200 }}
          />
          <AButton type="primary">新增用户</AButton>
        </ASpace>
      </div>
      <ATable
        columns={columns}
        dataSource={data}
      />
    </ACard>
  );
};

export default UserList;
