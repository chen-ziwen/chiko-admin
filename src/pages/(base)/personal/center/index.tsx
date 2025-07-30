/**
 * @handle {"icon": "material-symbols-light:person",
 *   "keepAlive": true}
 */

import { EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

const PersonalCenter: React.FC = () => {
  const userInfo = {
    name: '张三',
    role: '前端开发工程师',
    department: '技术部',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    location: '广东省深圳市',
    tags: ['React', 'TypeScript', 'Node.js', 'Webpack']
  };

  const projects = [
    {
      title: 'ChikoAdmin',
      description: '一个现代化的后台管理系统',
      time: '2024-03'
    },
    {
      title: '电商平台',
      description: '基于React的电商平台前端项目',
      time: '2024-02'
    },
    {
      title: '数据可视化平台',
      description: '使用ECharts的数据可视化解决方案',
      time: '2024-01'
    }
  ];

  const activities = [
    {
      content: '完成了Chiko Admin项目的初始化设置',
      time: '2024-03-20 10:00:00'
    },
    {
      content: '更新了个人信息',
      time: '2024-03-19 15:30:00'
    },
    {
      content: '提交了新的代码变更',
      time: '2024-03-19 11:00:00'
    },
    {
      content: '参与了项目评审会议',
      time: '2024-03-18 14:00:00'
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <ARow gutter={24}>
        <ACol span={8}>
          <ACard>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <AAvatar
                icon={<UserOutlined />}
                size={104}
              />
              <h2 style={{ margin: '16px 0 8px' }}>{userInfo.name}</h2>
              <div>
                {userInfo.role} | {userInfo.department}
              </div>
            </div>
            <div>
              <p>
                <MailOutlined style={{ marginRight: 8 }} />
                {userInfo.email}
              </p>
              <p>
                <PhoneOutlined style={{ marginRight: 8 }} />
                {userInfo.phone}
              </p>
              <p>
                <EnvironmentOutlined style={{ marginRight: 8 }} />
                {userInfo.location}
              </p>
              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8 }}>技能标签</div>
                {userInfo.tags.map(tag => (
                  <ATag
                    key={tag}
                    style={{ marginBottom: 8 }}
                  >
                    {tag}
                  </ATag>
                ))}
              </div>
            </div>
          </ACard>
        </ACol>
        <ACol span={16}>
          <ACard>
            <ATabs
              items={[
                {
                  key: 'projects',
                  label: '项目经历',
                  children: (
                    <AList
                      dataSource={projects}
                      itemLayout="horizontal"
                      renderItem={item => (
                        <AList.Item>
                          <AList.Item.Meta
                            description={item.description}
                            title={item.title}
                          />
                          <div>{item.time}</div>
                        </AList.Item>
                      )}
                    />
                  )
                },
                {
                  key: 'activities',
                  label: '最近动态',
                  children: (
                    <ATimeline
                      items={activities.map(item => ({
                        children: (
                          <>
                            <div>{item.content}</div>
                            <div style={{ fontSize: 12, color: '#999' }}>{item.time}</div>
                          </>
                        )
                      }))}
                    />
                  )
                }
              ]}
            />
          </ACard>
        </ACol>
      </ARow>
    </div>
  );
};

export default PersonalCenter;
