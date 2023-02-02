import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getSecondHouse } from '../../apis/second-house';
import "./index.less";
import { AREA_LIST, SECOND_HOUSE_TYPE } from './constant';
import { Select } from 'antd';


const HomePage = () => {

  const [type, setType] = useState('quoted_price')
  const { data } = useRequest(getSecondHouse)

  const option = useMemo(() => {
    return {
      title: {
        text: SECOND_HOUSE_TYPE.find((item) => item.value === type)?.label
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
        min: (value: any) => {
          return value.min - 20
        },
      },
      series: data?.[type] || []
    }
  }, [data, type])

  return (
    <div className='home-page'>
      <Select options={SECOND_HOUSE_TYPE} value={type} onChange={setType} />
      <ReactECharts option={option} />
    </div>
  )
}

export default HomePage