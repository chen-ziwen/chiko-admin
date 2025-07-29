// 自动导入已启用，无需手动导入React
import React from 'react';

const SystemSettings: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <ACard title="基本设置">
        <AForm layout="vertical">
          <AForm.Item
            required
            label="系统名称"
          >
            <AInput
              defaultValue="Chiko Admin"
              placeholder="请输入系统名称"
            />
          </AForm.Item>
          <AForm.Item label="系统描述">
            <AInput.TextArea
              defaultValue="一个现代化的后台管理系统"
              placeholder="请输入系统描述"
              rows={4}
            />
          </AForm.Item>
          <AForm.Item label="系统Logo">
            <AInput placeholder="请输入Logo URL" />
          </AForm.Item>
          <AForm.Item label="版权信息">
            <AInput
              defaultValue="© 2024 Chiko Admin"
              placeholder="请输入版权信息"
            />
          </AForm.Item>
        </AForm>
      </ACard>

      <ACard
        style={{ marginTop: 24 }}
        title="界面设置"
      >
        <AForm layout="vertical">
          <AForm.Item label="主题模式">
            <ARadio.Group defaultValue="light">
              <ARadio.Button value="light">亮色模式</ARadio.Button>
              <ARadio.Button value="dark">暗色模式</ARadio.Button>
              <ARadio.Button value="auto">跟随系统</ARadio.Button>
            </ARadio.Group>
          </AForm.Item>
          <AForm.Item label="主题色">
            <AInput
              defaultValue="#1890ff"
              style={{ width: 60 }}
              type="color"
            />
          </AForm.Item>
          <AForm.Item label="导航模式">
            <ARadio.Group defaultValue="side">
              <ARadio.Button value="side">侧边菜单</ARadio.Button>
              <ARadio.Button value="top">顶部菜单</ARadio.Button>
              <ARadio.Button value="mix">混合菜单</ARadio.Button>
            </ARadio.Group>
          </AForm.Item>
          <AForm.Item label="标签页模式">
            <ASelect
              defaultValue="chrome"
              style={{ width: 200 }}
              options={[
                { value: 'chrome', label: 'Chrome风格' },
                { value: 'card', label: '卡片风格' },
                { value: 'simple', label: '简约风格' }
              ]}
            />
          </AForm.Item>
          <AForm.Item
            label="固定头部"
            valuePropName="checked"
          >
            <ASwitch defaultChecked />
          </AForm.Item>
          <AForm.Item
            label="固定侧边栏"
            valuePropName="checked"
          >
            <ASwitch defaultChecked />
          </AForm.Item>
        </AForm>
      </ACard>

      <ACard
        style={{ marginTop: 24 }}
        title="系统性能"
      >
        <AForm layout="vertical">
          <AForm.Item label="请求超时时间(ms)">
            <AInputNumber
              defaultValue={10000}
              max={60000}
              min={1000}
            />
          </AForm.Item>
          <AForm.Item label="最大标签页数量">
            <AInputNumber
              defaultValue={30}
              max={100}
              min={1}
            />
          </AForm.Item>
          <AForm.Item
            label="开启页面缓存"
            valuePropName="checked"
          >
            <ASwitch defaultChecked />
          </AForm.Item>
          <AForm.Item
            label="开启页面动画"
            valuePropName="checked"
          >
            <ASwitch defaultChecked />
          </AForm.Item>
        </AForm>
      </ACard>

      <ADivider />

      <div style={{ textAlign: 'center' }}>
        <ASpace size="large">
          <AButton
            size="large"
            type="primary"
          >
            保存设置
          </AButton>
          <AButton size="large">重置</AButton>
        </ASpace>
      </div>
    </div>
  );
};

export default SystemSettings;
