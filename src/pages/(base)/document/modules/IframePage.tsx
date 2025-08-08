import { useBoolean } from 'ahooks';
import { Skeleton } from 'antd';

import { useRoute } from '@/features/router';

const IFramePage = () => {
  const [loading, { setFalse: endLoading }] = useBoolean(true);

  const { handle: { url } } = useRoute();

  return (
    <>
      {loading && <Skeleton active />}
      {url && (
        <div className={loading ? 'h-0' : 'h-full'}>
          <iframe
            className="size-full"
            id="iframePage"
            src={url}
            onLoad={endLoading}
          />
        </div>
      )}
    </>
  );
};

export default IFramePage;
