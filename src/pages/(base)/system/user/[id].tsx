/**
 * @handle {
 *  "hideInMenu": true
 * }
 */

import type { DescriptionsProps } from 'antd';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import LookForward from '@/components/LookForward';
import { fetchGetUserDetail } from '@/services/api';

type Item<T> = T extends any[] ? T[number] : T;

type ValuesOf<T> = T[keyof T];

type Values = ValuesOf<Api.SystemManage.User>;

function formatValue(value: unknown) {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value as any;
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function transformDataToItem<T extends string, U extends Values>(
  tuple: [T, U]
): NonNullable<Item<DescriptionsProps['items']>> {
  return {
    children: formatValue(tuple[1]),
    key: tuple[0],
    label: tuple[0]
  };
}

const Component = () => {
  const data = useLoaderData() as Api.SystemManage.User | undefined;

  const { t } = useTranslation();

  if (!data) {
    return <LookForward />;
  }

  const items = Object.entries(data).map(transformDataToItem);

  return (
    <ACard
      className="h-full"
      title="User Info"
    >
      <ADescriptions
        bordered
        items={items}
      />
      <div className="mt-16px text-center text-18px">{t('page.system.userDetail.explain')}</div>

      <div className="mt-16px text-center text-18px">{t('page.system.userDetail.content')}</div>
    </ACard>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const id = parseInt(params.id as string);
    const response = await fetchGetUserDetail(id);

    if (response.error === null) {
      return response.data ?? null;
    }
    
    console.error('Failed to fetch user detail:', response.error);
    return null;
  } catch (error) {
    console.error('Failed to fetch user detail:', error);
    return null;
  }
}

export default Component;
