import { useLang } from '@/features/lang';

const LineChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    grid: {
      bottom: '8%',
      containLabel: true,
      left: '5%',
      right: '5%',
      top: '15%'
    },
    legend: {
      data: [t('page.home.salesData'), t('page.home.userGrowth')],
      textStyle: {
        color: '#666',
        fontSize: 12
      },
      top: '5%'
    },
    series: [
      {
        areaStyle: {
          color: {
            colorStops: [
              {
                color: 'rgba(64, 158, 255, 0.8)',
                offset: 0
              },
              {
                color: 'rgba(64, 158, 255, 0.1)',
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
        color: '#409eff',
        data: [] as number[],
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderColor: '#409eff',
            borderWidth: 2
          }
        },
        name: t('page.home.salesData'),
        smooth: true,
        type: 'line',
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(64, 158, 255, 0.3)',
          shadowBlur: 10
        },
        symbol: 'circle',
        symbolSize: 8
      },
      {
        color: '#4ecdc4',
        data: [],
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderColor: '#4ecdc4',
            borderWidth: 2
          }
        },
        name: t('page.home.userGrowth'),
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            colorStops: [
              {
                color: '#4ecdc4',
                offset: 0
              },
              {
                color: '#45b7aa',
                offset: 1
              }
            ],
            type: 'linear',
            x: 0,
            x2: 0,
            y: 0,
            y2: 1
          }
        }
      }
    ],
    tooltip: {
      axisPointer: {
        label: {
          backgroundColor: '#409eff',
          color: '#fff'
        },
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#409eff',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      trigger: 'axis',
      confine: true,
      position (point, params, dom, rect, size) {
        // 获取容器尺寸
        const containerWidth = size.viewSize[0];
        const containerHeight = size.viewSize[1];

        // 获取tooltip尺寸
        const tooltipWidth = size.contentSize[0];
        const tooltipHeight = size.contentSize[1];

        // 计算最佳位置
        let x = point[0];
        let y = point[1];

        // 水平位置调整
        if (x + tooltipWidth > containerWidth) {
          x = x - tooltipWidth;
        }
        if (x < 0) {
          x = 10;
        }

        // 垂直位置调整
        if (y + tooltipHeight > containerHeight) {
          y = y - tooltipHeight;
        }
        if (y < 0) {
          y = 10;
        }

        return [x, y];
      }
    },
    xAxis: {
      boundaryGap: true,
      data: [] as string[],
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 11
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#666',
        fontSize: 11
      },
      axisTick: {
        show: false
      }
    }
  }));

  async function mockData() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    updateOptions(opts => {
      opts.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      opts.series[0].data = [2800, 4200, 5500, 6800, 8200, 7500, 6200, 8800, 9200, 10500, 9800, 11200];
      opts.series[1].data = [1800, 2800, 4200, 5800, 7200, 6500, 5800, 7500, 8200, 9500, 8800, 10200];

      return opts;
    });
  }

  function init() {
    mockData();
  }

  function updateLocale() {
    updateOptions((opts,factory) => {
      const originOpts = factory();
      opts.legend.data = originOpts.legend.data;
      opts.series[0].name = originOpts.series[0].name;
      opts.series[1].name = originOpts.series[1].name;

      return opts;
    });
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
