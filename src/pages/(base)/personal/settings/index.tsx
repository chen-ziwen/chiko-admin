import { UserOutlined } from '@ant-design/icons';
import React from 'react';

const PersonalSettings: React.FC = () => {
  const baseSettings = (
    <AForm layout="vertical">
      <AForm.Item label="头像">
        <AUpload
          listType="picture-circle"
          name="avatar"
          showUploadList={false}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UserOutlined style={{ fontSize: 32 }} />
          </div>
        </AUpload>
      </AForm.Item>
      <AForm.Item
        required
        label="用户名"
      >
        <AInput placeholder="请输入用户名" />
      </AForm.Item>
      <AForm.Item label="昵称">
        <AInput placeholder="请输入昵称" />
      </AForm.Item>
      <AForm.Item label="个人简介">
        <AInput.TextArea
          placeholder="请输入个人简介"
          rows={4}
        />
      </AForm.Item>
      <AForm.Item
        required
        label="邮箱"
      >
        <AInput placeholder="请输入邮箱" />
      </AForm.Item>
      <AForm.Item label="手机号码">
        <AInput placeholder="请输入手机号码" />
      </AForm.Item>
      <AForm.Item>
        <AButton type="primary">保存修改</AButton>
      </AForm.Item>
    </AForm>
  );

  const securitySettings = (
    <AForm layout="vertical">
      <AForm.Item
        required
        label="当前密码"
      >
        <AInput.Password placeholder="请输入当前密码" />
      </AForm.Item>
      <AForm.Item
        required
        label="新密码"
      >
        <AInput.Password placeholder="请输入新密码" />
      </AForm.Item>
      <AForm.Item
        required
        label="确认新密码"
      >
        <AInput.Password placeholder="请再次输入新密码" />
      </AForm.Item>
      <ADivider />
      <AForm.Item label="安全设置">
        <div style={{ marginBottom: 16 }}>
          <ASpace
            size="large"
            style={{ marginBottom: 16 }}
          >
            <span>开启两步验证</span>
            <ASwitch />
          </ASpace>
        </div>
        <div>
          <ASpace size="large">
            <span>登录通知</span>
            <ASwitch defaultChecked />
          </ASpace>
        </div>
      </AForm.Item>
      <AForm.Item>
        <AButton type="primary">保存修改</AButton>
      </AForm.Item>
    </AForm>
  );

  const notificationSettings = (
    <AForm layout="vertical">
      <AForm.Item label="系统通知">
        <ARadio.Group defaultValue="all">
          <ARadio value="all">所有通知</ARadio>
          <ARadio value="important">重要通知</ARadio>
          <ARadio value="none">关闭通知</ARadio>
        </ARadio.Group>
      </AForm.Item>
      <AForm.Item label="通知方式">
        <ASpace direction="vertical">
          <div>
            <ASpace size="large">
              <span>邮件通知</span>
              <ASwitch defaultChecked />
            </ASpace>
          </div>
          <div>
            <ASpace size="large">
              <span>站内信通知</span>
              <ASwitch defaultChecked />
            </ASpace>
          </div>
          <div>
            <ASpace size="large">
              <span>短信通知</span>
              <ASwitch />
            </ASpace>
          </div>
        </ASpace>
      </AForm.Item>
      <AForm.Item>
        <AButton type="primary">保存修改</AButton>
      </AForm.Item>
    </AForm>
  );

  return (
    <ACard>
      <ATabs
        items={[
          {
            key: 'base',
            label: '基本设置',
            children: baseSettings
          },
          {
            key: 'security',
            label: '安全设置',
            children: securitySettings
          },
          {
            key: 'notification',
            label: '通知设置',
            children: notificationSettings
          }
        ]}
      />
    </ACard>
  );
};

export default PersonalSettings;
