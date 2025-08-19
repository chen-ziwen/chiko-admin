import { useLang } from '@/features/lang';

const PieChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    legend: {
      bottom: '8%',
      itemStyle: {
        borderWidth: 0
      },
      left: 'center',
      textStyle: {
        color: '#666',
        fontSize: 12
      }
    },
    series: [
      {
        avoidLabelOverlap: false,
        color: ['#ff6b6b', '#4ecdc4', '#45b7aa', '#96ceb4', '#feca57', '#ff9ff3'],
        data: [] as { name: string; value: number }[],
        emphasis: {
          label: {
            fontSize: 14,
            fontWeight: 'bold',
            show: true
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffsetX: 0,
            shadowOffsetY: 2
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderRadius: 8,
          borderWidth: 2
        },
        label: {
          position: 'inside',
          show: false,
          color: '#fff',
          fontSize: 11,
          formatter: '{c}%'
        },
        labelLine: {
          show: false
        },
        name: t('page.home.productDistribution'),
        radius: ['20%', '65%'],
        roseType: 'area',
        type: 'pie',
        center: ['50%', '40%'],
        minAngle: 8
      }
    ],
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#4ecdc4',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%',
      confine: true
    }
  }));

  async function mockData() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    updateOptions(opts => {
      opts.series[0].data = [
        { name: t('page.home.technology'), value: 28 },
        { name: t('page.home.marketing'), value: 22 },
        { name: t('page.home.operations'), value: 18 },
        { name: t('page.home.finance'), value: 16 },
        { name: t('page.home.design'), value: 10 },
        { name: t('page.home.customerService'), value: 6 }
      ];

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.series[0].name = originOpts.series[0].name;

      opts.series[0].data = [
        { name: t('page.home.technology'), value: 28 },
        { name: t('page.home.marketing'), value: 22 },
        { name: t('page.home.operations'), value: 18 },
        { name: t('page.home.finance'), value: 16 },
        { name: t('page.home.design'), value: 10 },
        { name: t('page.home.customerService'), value: 6 }
      ];

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
