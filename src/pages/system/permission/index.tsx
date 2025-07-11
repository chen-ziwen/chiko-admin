// 自动导入已启用，无需手动导入antd组件
import type { DataNode } from 'antd/es/tree';
import React from 'react';

const PermissionManagement: React.FC = () => {
  const treeData: DataNode[] = [
    {
      title: '系统管理',
      key: 'system',
      children: [
        {
          title: '用户管理',
          key: 'user',
          children: [
            {
              title: '查看用户列表',
              key: 'user:list'
            },
            {
              title: '新增用户',
              key: 'user:create'
            },
            {
              title: '编辑用户',
              key: 'user:edit'
            },
            {
              title: '删除用户',
              key: 'user:delete'
            }
          ]
        },
        {
          title: '角色管理',
          key: 'role',
          children: [
            {
              title: '查看角色列表',
              key: 'role:list'
            },
            {
              title: '新增角色',
              key: 'role:create'
            },
            {
              title: '编辑角色',
              key: 'role:edit'
            },
            {
              title: '删除角色',
              key: 'role:delete'
            }
          ]
        }
      ]
    },
    {
      title: '个人中心',
      key: 'personal',
      children: [
        {
          title: '个人信息',
          key: 'personal:info'
        },
        {
          title: '修改密码',
          key: 'personal:password'
        }
      ]
    }
  ];

  return (
    <ACard>
      <ARow gutter={24}>
        <ACol span={6}>
          <ACard title="权限列表">
            <AInput.Search
              placeholder="请输入权限名称"
              style={{ marginBottom: 8 }}
            />
            <ATree
              checkable
              defaultExpandAll
              treeData={treeData}
            />
          </ACard>
        </ACol>
        <ACol span={18}>
          <ACard title="权限详情">
            <AForm layout="vertical">
              <AForm.Item
                required
                label="权限名称"
              >
                <AInput placeholder="请输入权限名称" />
              </AForm.Item>
              <AForm.Item
                required
                label="权限标识"
              >
                <AInput placeholder="请输入权限标识" />
              </AForm.Item>
              <AForm.Item label="权限描述">
                <AInput.TextArea
                  placeholder="请输入权限描述"
                  rows={4}
                />
              </AForm.Item>
              <AForm.Item>
                <ASpace>
                  <AButton type="primary">保存</AButton>
                  <AButton>重置</AButton>
                </ASpace>
              </AForm.Item>
            </AForm>
          </ACard>
        </ACol>
      </ARow>
    </ACard>
  );
};

export default PermissionManagement;
