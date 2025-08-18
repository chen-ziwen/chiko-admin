/**
 * @handle {
 *  "icon": "lucide:database",
 *  "order": 5
 * }
 */

import { useState } from 'react';
import { fetchGetUserList } from '@/services/api';

export default function Mock() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTestApi = async () => {
    setLoading(true);
    try {
      const response = await fetchGetUserList({
        current: 1,
        size: 5
      });

      if (response.error === null) {
        const { records, total, current, size } = response.data;
        const simplifiedData = records.map(user => ({
          id: user.id,
          userName: user.userName,
          nickName: user.nickName,
          userEmail: user.userEmail
        }));

        setModalContent(JSON.stringify({
          total,
          current,
          size,
          users: simplifiedData
        }, null, 2));
        setModalOpen(true);
      } else {
        const error = response.error;
        setModalContent(`请求失败: ${error.message || '未知错误'}`);
        setModalOpen(true);
      }
    } catch (error: unknown) {
      const err = error as Error;
      setModalContent(`请求异常: ${err.message || '未知错误'}`);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ASpace direction="vertical" className="w-full">
      <ACard title="MSW 介绍">
        <p className="mb-16px">
          MSW (Mock Service Worker) 是一种模拟后端 API 接口的技术，通过拦截 Ajax 请求并返回预设的响应数据，
          让前端工程师可以独立于后端进行开发和测试。
        </p>
        <p className="mb-16px">
          本演示站的登录、权限获取、用户管理等功能都是通过 MSW 实现的。
        </p>
        <AButton
          type="primary"
          href="https://mswjs.io/docs/"
          target="_blank"
        >
          查看 MSW 官方文档
        </AButton>
      </ACard>

      <ACard title="如何自己写 MSW 接口？">
        <p className="mb-16px">
          前端工程师可以自己编写 MSW 接口：
        </p>
        <ul className="mb-16px list-disc pl-20px">
          <li>在 <code className="rounded bg-gray-100 px-4px py-2px dark:bg-gray-700">src/mocks/handlers/</code> 目录下创建处理器文件</li>
          <li>使用 <code className="rounded bg-gray-100 px-4px py-2px dark:bg-gray-700">http.get()</code>、<code className="rounded bg-gray-100 px-4px py-2px dark:bg-gray-700">http.post()</code> 等方法定义接口</li>
          <li>使用 <code className="rounded bg-gray-100 px-4px py-2px dark:bg-gray-700">HttpResponse.json()</code> 返回模拟数据</li>
          <li>在 <code className="rounded bg-gray-100 px-4px py-2px dark:bg-gray-700">src/mocks/handlers/index.ts</code> 中导出你的处理器</li>
        </ul>
        <p>
          这样就可以让前端自己写模拟接口，独立于后端进行开发了。
        </p>
      </ACard>

      <ACard title="接口测试">
        <p className="mb-16px">
          点击下面的按钮测试 MSW 接口，将调用用户列表接口并显示部分返回数据。
        </p>
        <AButton
          type="primary"
          onClick={handleTestApi}
          loading={loading}
        >
          测试 MSW 接口
        </AButton>
      </ACard>

      <AModal
        title="接口测试结果"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
        width={600}
      >
        <pre className="max-h-400px overflow-x-auto rounded bg-gray-100 p-12px text-14px dark:bg-gray-700">
          {modalContent}
        </pre>
      </AModal>
    </ASpace>
  );
}
