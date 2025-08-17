/**
 * @handle {
 *   "roles": ["R_ADMIN"]
 * }
 */

import { Suspense, lazy } from 'react';

import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { ATG_MAP } from '@/constants/common';
import { TableHeaderOperation, useTable, useTableOperate, useTableScroll } from '@/features/table';
import { fetchBatchDeleteUser, fetchDeleteUser, fetchGetUserList } from '@/services/api';

import UserSearch from './modules/UserSearch';

const UserOperateDrawer = lazy(() => import('./modules/UserOperateDrawer'));

const tagUserGenderMap: Record<Api.SystemManage.UserGender, string> = {
  1: 'processing',
  2: 'error'
};

const UserManage = () => {
  const { t } = useTranslation();

  const { scrollConfig, tableWrapperRef } = useTableScroll();

  const nav = useNavigate();

  const isMobile = useMobile();

  const { columnChecks, data, run, searchProps, setColumnChecks, tableProps } = useTable(
    {
      apiFn: fetchGetUserList,
      apiParams: {
        current: 1,
        nickName: null,
        size: 10,
        status: null,
        userEmail: null,
        userGender: null,
        userName: null,
        userPhone: null
      },
      columns: () => [
        {
          align: 'center',
          dataIndex: 'index',
          key: 'index',
          title: t('common.index'),
          width: 64
        },
        {
          align: 'center',
          dataIndex: 'userName',
          key: 'userName',
          minWidth: 100,
          title: t('page.system.user.userName')
        },
        {
          align: 'center',
          dataIndex: 'userGender',
          key: 'userGender',
          render: (_, record) => {
            if (record?.userGender === null) {
              return null;
            }

            const label = t(userGenderRecord[record.userGender]);

            return <ATag color={tagUserGenderMap[record.userGender]}>{label}</ATag>;
          },
          title: t('page.system.user.userGender'),
          width: 100
        },
        {
          align: 'center',
          dataIndex: 'nickName',
          key: 'nickName',
          minWidth: 100,
          title: t('page.system.user.nickName')
        },
        {
          align: 'center',
          dataIndex: 'userPhone',
          key: 'userPhone',
          title: t('page.system.user.userPhone'),
          width: 120
        },
        {
          align: 'center',
          dataIndex: 'userEmail',
          key: 'userEmail',
          minWidth: 200,
          title: t('page.system.user.userEmail')
        },
        {
          align: 'center',
          dataIndex: 'status',
          key: 'status',
          render: (_, record) => {
            if (record.status === null) {
              return null;
            }
            const label = t(enableStatusRecord[record.status]);
            return <ATag color={ATG_MAP[record.status]}>{label}</ATag>;
          },
          title: t('page.system.user.userStatus'),
          width: 100
        },
        {
          align: 'center',
          key: 'operate',
          render: (_, record) => (
            <div className="flex-center gap-8px">
              <AButton
                ghost
                size="small"
                type="primary"
                onClick={() => edit(record.id)}
              >
                {t('common.edit')}
              </AButton>
              <AButton
                size="small"
                onClick={() => nav(`/system/user/${record.id}`)}
              >
                详情
              </AButton>
              <APopconfirm
                title={t('common.confirmDelete')}
                onConfirm={() => handleDelete(record.id)}
              >
                <AButton
                  danger
                  size="small"
                >
                  {t('common.delete')}
                </AButton>
              </APopconfirm>
            </div>
          ),
          title: t('common.operate'),
          width: 195
        }
      ]
    },
    { showQuickJumper: true }
  );

  const { checkedRowKeys, generalPopupOperation, handleAdd, handleEdit, onBatchDeleted, onDeleted, rowSelection } =
    useTableOperate(data, run, async (res, type) => {
      if (type === 'add') {
        console.log(res);
      } else {
        console.log(res);
      }
    });

  async function handleBatchDelete() {
    try {
      await fetchBatchDeleteUser(checkedRowKeys as number[]);
      window.$message?.success?.(t('common.batchDeleteSuccess'));
      onBatchDeleted();
      run();
    } catch (error) {
      console.error('批量删除失败:', error);
      window.$message?.error?.(t('common.batchDeleteFailed'));
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetchDeleteUser(id);
      window.$message?.success?.(t('common.deleteSuccess'));
      onDeleted();
      run();
    } catch (error) {
      console.error('删除失败:', error);
      window.$message?.error?.(t('common.deleteFailed'));
    }
  }

  function edit(id: number) {
    handleEdit(id);
  }
  
  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: <UserSearch {...searchProps} />,
            key: '1',
            label: t('common.search')
          }
        ]}
      />

      <ACard
        className="flex-col-stretch card-wrapper sm:flex-1-hidden"
        ref={tableWrapperRef}
        title={t('page.system.user.title')}
        variant="borderless"
        extra={
          <TableHeaderOperation
            add={handleAdd}
            columns={columnChecks}
            disabledDelete={checkedRowKeys.length === 0}
            loading={tableProps.loading}
            refresh={run}
            setColumnChecks={setColumnChecks}
            onDelete={handleBatchDelete}
          />
        }
      >
        <ATable
          rowSelection={rowSelection}
          scroll={scrollConfig}
          size="small"
          {...tableProps}
        />
        <Suspense>
          <UserOperateDrawer {...generalPopupOperation} />
        </Suspense>
      </ACard>
    </div>
  );
};

export default UserManage;
