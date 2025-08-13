/**
 * @handle {
 *   "icon": "material-symbols-light:person-search",
 *   "keepAlive": true
 * }
 */

import React from 'react';

import avatar from '@/assets/images/chiko.jpg';

const UserProfile: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <ACard>
        <ARow gutter={24}>
          <ACol span={6}>
            <div style={{ textAlign: 'center' }}>
              <AAvatar
                alt="avatar"
                className="shadow-lg"
                size={120}
                src={avatar}
              />
              <h2 style={{ marginTop: 16 }}>张三</h2>
              <ATag color="blue">超级管理员</ATag>
            </div>
          </ACol>
          <ACol span={18}>
            <ADescriptions title="用户信息">
              <ADescriptions.Item label="用户名">zhangsan</ADescriptions.Item>
              <ADescriptions.Item label="昵称">张三</ADescriptions.Item>
              <ADescriptions.Item label="邮箱">zhangsan@example.com</ADescriptions.Item>
              <ADescriptions.Item label="手机号">13800138000</ADescriptions.Item>
              <ADescriptions.Item label="部门">技术部</ADescriptions.Item>
              <ADescriptions.Item label="职位">前端开发工程师</ADescriptions.Item>
              <ADescriptions.Item label="状态">
                <ATag color="green">在职</ATag>
              </ADescriptions.Item>
              <ADescriptions.Item label="入职时间">2023-01-01</ADescriptions.Item>
              <ADescriptions.Item label="最后登录时间">2025-03-20 10:00:00</ADescriptions.Item>
            </ADescriptions>
          </ACol>
        </ARow>
      </ACard>

      <ACard
        style={{ marginTop: 24 }}
        title="最近操作记录"
      >
        <ADescriptions column={1}>
          <ADescriptions.Item label="2025-03-20 10:00:00">登录系统</ADescriptions.Item>
          <ADescriptions.Item label="2025-03-19 18:00:00">更新个人信息</ADescriptions.Item>
          <ADescriptions.Item label="2025-03-19 16:30:00">修改密码</ADescriptions.Item>
          <ADescriptions.Item label="2025-03-18 14:00:00">查看用户列表</ADescriptions.Item>
        </ADescriptions>
      </ACard>
    </div>
  );
};

export default UserProfile;
