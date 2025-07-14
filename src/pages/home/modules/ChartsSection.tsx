import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { m } from 'motion/react';
import { useEffect, useRef } from 'react';

interface ChartCardProps {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
  delay: number;
}

const ChartCard = ({ title, icon, color, children, delay }: ChartCardProps) => {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <ACard
        bodyStyle={{ padding: '24px' }}
        className="h-full border-0 shadow-lg"
        title={
          <div className="flex items-center">
            <div
              className="mr-3 h-8 w-8 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon
                className="text-lg"
                icon={icon}
                style={{ color }}
              />
            </div>
            <span>{title}</span>
          </div>
        }
      >
        {children}
      </ACard>
    </m.div>
  );
};

const LineChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: echarts.ECharts | null = null;

    const initChart = () => {
      if (!chartRef.current) return;

      // 确保容器有尺寸
      const container = chartRef.current;
      if (container.offsetWidth === 0 || container.offsetHeight === 0) {
        setTimeout(initChart, 100);
        return;
      }

      chart = echarts.init(container);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1200, 1380, 1500, 1600],
            itemStyle: {
              color: '#1890ff'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                { offset: 1, color: 'rgba(24, 144, 255, 0.05)' }
              ])
            }
          },
          {
            name: '销售额',
            type: 'line',
            smooth: true,
            data: [620, 732, 701, 734, 1090, 1130, 1120, 1250, 1000, 1180, 1300, 1400],
            itemStyle: {
              color: '#52c41a'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
                { offset: 1, color: 'rgba(82, 196, 26, 0.05)' }
              ])
            }
          }
        ]
      };

      chart.setOption(option);

      const handleResize = () => {
        chart?.resize();
      };

      window.addEventListener('resize', handleResize);
    };

    initChart();

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []);

  return (
    <div
      className="h-80 min-h-[320px] w-full"
      ref={chartRef}
      style={{ height: '320px' }}
    />
  );
};

const PieChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    // 确保容器有尺寸
    const container = chartRef.current;
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
      return undefined;
    }

    const chart = echarts.init(container);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        bottom: '0%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎', itemStyle: { color: '#1890ff' } },
            { value: 735, name: '直接访问', itemStyle: { color: '#52c41a' } },
            { value: 580, name: '邮件营销', itemStyle: { color: '#fa8c16' } },
            { value: 484, name: '联盟广告', itemStyle: { color: '#eb2f96' } },
            { value: 300, name: '视频广告', itemStyle: { color: '#722ed1' } }
          ]
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div
      className="h-80 min-h-[320px] w-full"
      ref={chartRef}
      style={{ height: '320px' }}
    />
  );
};

const BarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    // 确保容器有尺寸
    const container = chartRef.current;
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
      return undefined;
    }

    const chart = echarts.init(container);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'Go']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '使用频率',
          type: 'bar',
          data: [95, 88, 65, 85, 80, 70, 60],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' }
            ])
          },
          barWidth: '60%'
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div
      className="h-80 min-h-[320px] w-full"
      ref={chartRef}
      style={{ height: '320px' }}
    />
  );
};

export const ChartsSection = () => {
  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size="large"
    >
      <m.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <ATypography.Title
          className="flex items-center"
          level={2}
        >
          <Icon
            className="mr-3 text-blue-500"
            icon="material-symbols:analytics"
          />
          数据分析
        </ATypography.Title>
      </m.div>

      <ARow gutter={[24, 24]}>
        <ACol
          lg={12}
          md={24}
          xs={24}
        >
          <ChartCard
            color="#1890ff"
            delay={0.1}
            icon="material-symbols:trending-up"
            title="访问趋势"
          >
            <LineChart />
          </ChartCard>
        </ACol>

        <ACol
          lg={12}
          md={24}
          xs={24}
        >
          <ChartCard
            color="#52c41a"
            delay={0.2}
            icon="material-symbols:pie-chart"
            title="访问来源"
          >
            <PieChart />
          </ChartCard>
        </ACol>

        <ACol xs={24}>
          <ChartCard
            color="#fa8c16"
            delay={0.3}
            icon="material-symbols:bar-chart"
            title="技术栈使用情况"
          >
            <BarChart />
          </ChartCard>
        </ACol>
      </ARow>
    </ASpace>
  );
};
