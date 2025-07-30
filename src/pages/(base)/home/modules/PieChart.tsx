import { useLang } from '@/features/lang';

const PieChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    legend: {
      bottom: '1%',
      itemStyle: {
        borderWidth: 0
      },
      left: 'center'
    },
    series: [
      {
        avoidLabelOverlap: false,
        color: ['#1890ff', '#52c41a', '#fa8c16', '#f5222d'],
        data: [] as { name: string; value: number }[],
        emphasis: {
          label: {
            fontSize: '12',
            show: true
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderRadius: 10,
          borderWidth: 1
        },
        label: {
          position: 'center',
          show: false
        },
        labelLine: {
          show: false
        },
        name: t('page.home.productDistribution'),
        radius: ['45%', '75%'],
        type: 'pie'
      }
    ],
    tooltip: {
      trigger: 'item'
    }
  }));

  async function mockData() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    updateOptions(opts => {
      if (!opts.series) {
        return opts;
      }

      const series = Array.isArray(opts.series) ? opts.series : [opts.series];
      if (series[0]) {
        (series[0] as any).data = [
          { name: t('page.home.technology'), value: 35 },
          { name: t('page.home.marketing'), value: 25 },
          { name: t('page.home.operations'), value: 20 },
          { name: t('page.home.finance'), value: 20 }
        ];
      }

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      if (!opts.series || !originOpts.series) {
        return opts;
      }

      const series = Array.isArray(opts.series) ? opts.series : [opts.series];
      const originSeries = Array.isArray(originOpts.series) ? originOpts.series : [originOpts.series];

      if (series[0] && originSeries[0]) {
        (series[0] as any).name = (originSeries[0] as any).name;

        (series[0] as any).data = [
          { name: t('page.home.technology'), value: 35 },
          { name: t('page.home.marketing'), value: 25 },
          { name: t('page.home.operations'), value: 20 },
          { name: t('page.home.finance'), value: 20 }
        ];
      }

      return opts;
    });
  }

  async function init() {
    mockData();
  }

  useMount(() => {
    init();
  });

  useUpdateEffect(() => {
    updateLocale();
  }, [locale]);
  return (
    <ACard
      className="card-wrapper"
      title={t('page.home.productAnalysis')}
      variant="borderless"
    >
      <div
        className="h-360px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default PieChart;
