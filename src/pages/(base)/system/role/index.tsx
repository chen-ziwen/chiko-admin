// 自动导入已启用，无需手动导入React
import React from 'react';

const RoleManagement: React.FC = () => {
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色标识',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <ATag color={status === '启用' ? 'green' : 'red'}>{status}</ATag>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <ASpace size="middle">
          <AButton type="link">编辑</AButton>
          <AButton type="link">权限设置</AButton>
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
      name: '超级管理员',
      code: 'SUPER_ADMIN',
      description: '系统最高权限角色',
      status: '启用',
      createTime: '2024-03-20 10:00:00'
    },
    {
      key: '2',
      name: '普通用户',
      code: 'NORMAL_USER',
      description: '普通用户角色',
      status: '启用',
      createTime: '2024-03-20 10:00:00'
    },
    {
      key: '3',
      name: '访客',
      code: 'VISITOR',
      description: '访客角色',
      status: '禁用',
      createTime: '2024-03-20 10:00:00'
    }
  ];

  return (
    <ACard>
      <div style={{ marginBottom: 16 }}>
        <ASpace>
          <AButton type="primary">新增角色</AButton>
          <AButton>批量删除</AButton>
        </ASpace>
      </div>
      <ATable
        columns={columns}
        dataSource={data}
      />
    </ACard>
  );
};

export default RoleManagement;
