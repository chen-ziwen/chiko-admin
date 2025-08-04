import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

type EChartsOption = echarts.EChartsOption;
type ECharts = echarts.ECharts;
type UpdateOptionsFn = (options: EChartsOption, factory: () => EChartsOption) => EChartsOption;

/**
 * 使用 echarts 的 hook
 *
 * @param options echarts 配置项
 */
export function useEcharts(options: () => EChartsOption) {
  const domRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts | null>(null);

  const optionsFactory = useRef(options);

  function getOptions() {
    return optionsFactory.current();
  }

  function initChart() {
    const el = domRef.current;
    if (!el) {
      return;
    }

    // 确保容器有尺寸
    if (el.offsetWidth === 0 || el.offsetHeight === 0) {
      setTimeout(initChart, 100);
      return;
    }

    chartRef.current = echarts.init(el);
    const opts = getOptions();
    chartRef.current.setOption(opts);
  }

  function updateOptions(fn?: UpdateOptionsFn) {
    if (!chartRef.current) {
      return;
    }

    let opts: EChartsOption;

    if (fn) {
      opts = fn(chartRef.current.getOption() as EChartsOption, getOptions);
    } else {
      opts = getOptions();
    }

    chartRef.current.setOption(opts);
  }

  function resizeChart() {
    chartRef.current?.resize();
  }

  useEffect(() => {
    initChart();

    window.addEventListener('resize', resizeChart);

    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return {
    domRef,
    getOptions,
    updateOptions
  };
}

export default useEcharts;
