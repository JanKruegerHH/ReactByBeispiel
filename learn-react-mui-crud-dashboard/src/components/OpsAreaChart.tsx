import * as React from 'react';
import {LineChart} from "@mui/x-charts";
import {dataset} from "../data/ops-data";

export default function OpsAreaChart() {
    return (
        <LineChart
            dataset={dataset.slice(0, dataset.length)}
            grid={{vertical: true, horizontal: true}}
            xAxis={[
                {
                    id: 'Years',
                    dataKey: 'date',
                    scaleType: 'time',
                    domainLimit: 'strict',
                    valueFormatter: (date) => date.getMonth() + 1 + '/' + date.getFullYear().toString(),
                },
            ]}
            yAxis={[
                {
                    width: 70,
                    label: 'Performance',
                    valueFormatter: (value) => value + '%'
                }
            ]}
            series={[
                {
                    id: 'zrh',
                    label: 'ZRH',
                    dataKey: 'zrh',
                    color: '#1565c0',
                    showMark: true,
                    curve: 'linear',
                },
                {
                    id: 'vie',
                    label: 'VIE',
                    dataKey: 'vie',
                    color: '#1b5e20',
                    showMark: true,
                    curve: 'linear',
                },
                {
                    id: 'bru',
                    label: 'BRU',
                    dataKey: 'bru',
                    color: '#e65100',
                    showMark: true,
                    curve: 'linear',
                },
                {
                    id: 'target',
                    label: 'Target',
                    dataKey: 'target',
                    color: '#FFFF00',
                    showMark: true,
                    curve: 'step',
                },]}
            //width={800}
            height={300}
        />
    )
}
