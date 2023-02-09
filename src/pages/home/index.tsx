import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getSecondHouse } from '../../apis/second-house';
import "./index.less";
import { AREA_LIST, SECOND_HOUSE_TYPE } from './constant';
import { Select } from 'antd';

const areaFieldNames = {
  label: "name",
  value: "name"
}


const HomePage = () => {

  const [type, setType] = useState('quoted_price')
  const [area, setArea] = useState('重庆')
  const { data = {} } = useRequest(getSecondHouse)

  const option = useMemo(() => {
    return {
      title: {
        text: AREA_LIST.find((item) => item.name === type)?.label
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
        axisLabel: {
          formatter: "{yyyy}-{MM}-{dd}"
        },
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

  const areaOption = useMemo(() => {
    const areaData: any = {}
    AREA_LIST.map((areatItem, index) => {
      areaData[areatItem.name] = []
      // { '重庆': [{type: 'line', name: 'quoted_price', data: []}]}
      SECOND_HOUSE_TYPE.map((typeItem) => {
        areaData[areatItem.name].push({
          type: "line",
          name: typeItem.label,
          data: data[typeItem.value]?.[index]?.data
        })
      })
    })
    console.log(areaData)
    console.log(areaData?.[area])
    return {
      title: {
        text: area
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
        axisLabel: {
          formatter: "{yyyy}-{MM}-{dd}"
        },
      },
      yAxis: {
        type: 'value',
        min: (value: any) => {
          return value.min - 20
        },
      },
      series: areaData?.[area] || []
    }
  }, [data, area])
  console.log(option)
  console.log(areaOption)
  return (
    <div className='home-page'>
      <Select options={SECOND_HOUSE_TYPE} value={type} onChange={setType} />
      <ReactECharts option={option} />
      <br />
      <Select options={AREA_LIST} value={area} onChange={setArea} fieldNames={areaFieldNames} />
      <ReactECharts option={areaOption} />
    </div>
  )
}

export default HomePage