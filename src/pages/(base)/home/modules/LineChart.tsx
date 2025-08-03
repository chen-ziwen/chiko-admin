import { useLang } from '@/features/lang';


const LineChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    grid: {
      bottom: '3%',
      containLabel: true,
      left: '3%',
      right: '4%'
    },
    legend: {
      data: [t('page.home.salesData'), t('page.home.userGrowth')]
    },
    series: [
      {
        areaStyle: {
          color: {
            colorStops: [
              {
                color: '#597ef7',
                offset: 0.25
              },
              {
                color: '#fff',
                offset: 1
              }
            ],
            type: 'linear',
            x: 0,
            x2: 0,
            y: 0,
            y2: 1
          }
        },
        color: '#597ef7',
        data: [] as number[],
        emphasis: {
          focus: 'series'
        },
        name: t('page.home.salesData'),
        smooth: true,
        stack: 'Total',
        type: 'line'
      },
      {
        areaStyle: {
          color: {
            colorStops: [
              {
                color: '#36cfc9',
                offset: 0.25
              },
              {
                color: '#fff',
                offset: 1
              }
            ],
            type: 'linear',
            x: 0,
            x2: 0,
            y: 0,
            y2: 1
          }
        },
        color: '#36cfc9',
        data: [],
        emphasis: {
          focus: 'series'
        },
        name: t('page.home.userGrowth'),
        smooth: true,
        stack: 'Total',
        type: 'line'
      }
    ],
    tooltip: {
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        type: 'cross'
      },
      trigger: 'axis'
    },
    xAxis: {
      boundaryGap: false,
      data: [] as string[],
      type: 'category'
    },
    yAxis: {
      type: 'value'
    }
  }));

  async function mockData() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    updateOptions((opts: echarts.EChartsOption) => {
      if (!opts.xAxis || !opts.series) {
        return opts;
      }

      const xAxis = Array.isArray(opts.xAxis) ? opts.xAxis[0] : opts.xAxis;
      const series = Array.isArray(opts.series) ? opts.series : [opts.series];

      if (xAxis.type === 'category') {
        (xAxis as any).data = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月'];
      }

      if (series[0]) {
        (series[0] as any).data = [3200, 4500, 5800, 7200, 8500, 7800, 6500, 9200, 8700, 9800];
      }

      if (series[1]) {
        (series[1] as any).data = [2100, 3200, 4500, 6000, 7200, 6800, 7500, 8200, 8900, 9500];
      }

      return opts;
    });
  }

  function init() {
    mockData();
  }

  function updateLocale() {
    updateOptions((opts: echarts.EChartsOption, factory: () => echarts.EChartsOption) => {
      const originOpts = factory();

      if (!opts.legend || !opts.series || !originOpts.legend || !originOpts.series) {
        return opts;
      }

      const legend = Array.isArray(opts.legend) ? opts.legend[0] : opts.legend;
      const originLegend = Array.isArray(originOpts.legend) ? originOpts.legend[0] : originOpts.legend;
      const series = Array.isArray(opts.series) ? opts.series : [opts.series];
      const originSeries = Array.isArray(originOpts.series) ? originOpts.series : [originOpts.series];

      (legend as any).data = (originLegend as any).data;
      if (series[0] && originSeries[0]) {
        (series[0] as any).name = (originSeries[0] as any).name;
      }
      if (series[1] && originSeries[1]) {
        (series[1] as any).name = (originSeries[1] as any).name;
      }

      return opts;
    });
  }
  // init

  useMount(() => {
    init();
  });

  useUpdateEffect(() => {
    updateLocale();
  }, [locale]);
  return (
    <ACard
      className="card-wrapper"
      title={t('page.home.salesAnalysis')}
      variant="borderless"
    >
      <div
        className="h-360px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default LineChart;
