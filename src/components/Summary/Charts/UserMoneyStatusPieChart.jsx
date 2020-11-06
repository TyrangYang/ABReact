import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useUserName } from '../../../hooks/useUserName';

const nextColor = (function () {
    // console.log('next color fun');
    const COLOR_LIST = [
        '#efb4c1',
        '#c8707e',
        '#5aa08d',
        '#e28fad',
        '#e48e58',
        '#f0c7ab',
        '#edaa7d',
        '#a8c879',
        '#678fae',
        '#ac99c1',
        '#96b1d0',
        '#ada759',
        '#c08863',
        '#4c92b1',
        '#c8c2bd',
    ];
    let idx = 0;

    return () => {
        let next = COLOR_LIST[idx];
        idx = (idx + 1) % COLOR_LIST.length;
        return next;
    };
})();
const HOVER_COLOR = 'rgba(54, 162, 235, 0.6)';
const options = {
    legend: {
        position: 'left',

        labels: {
            fontSize: 20,

            generateLabels: (chart) => {
                let {
                    data: { datasets },
                } = chart;
                let res = [];

                datasets.forEach((eachSet) => {
                    res = res.concat(
                        eachSet.labels.map((e, idx) => {
                            return {
                                text: e,
                                fillStyle: eachSet.backgroundColor[idx],
                            };
                        })
                    );
                });
                return res;
            },
        },
    },
    tooltips: {
        bodyFontSize: 20,
        callbacks: {
            label: (tooltipItem, data) => {
                let label =
                    data.datasets[tooltipItem.datasetIndex].labels[
                        tooltipItem.index
                    ];
                let value =
                    data.datasets[tooltipItem.datasetIndex].data[
                        tooltipItem.index
                    ];
                return value < 0
                    ? `${label} need spend $${-value}`
                    : `${label} will receive $${value}`;
            },
        },
    },
};

const UserMoneyStatusPieChart = ({ payerList, receiverList }) => {
    const getNameById = useUserName();

    const renderData = useMemo(() => {
        return {
            datasets: [
                {
                    label: 'will receive',
                    data: receiverList.map((e) => e[1] / 100),
                    labels: receiverList.map((e) => getNameById(e[0])),
                    backgroundColor: receiverList.map(() => nextColor()),
                    borderColor: '#fff',
                    borderWidth: 8,
                    hoverBackgroundColor: HOVER_COLOR,
                },
                {
                    label: 'need spend',
                    data: payerList.map((e) => e[1] / 100),
                    labels: payerList.map((e) => getNameById(e[0])),
                    backgroundColor: payerList.map(() => nextColor()),
                    borderColor: '#fff',
                    borderWidth: 4,
                    hoverBackgroundColor: HOVER_COLOR,
                },
            ],
        };
    }, [payerList, receiverList, getNameById]);

    if (payerList.length === 0 || receiverList.length === 0) return <div></div>;

    return (
        <div data-testid="pieChart">
            <Pie data={renderData} options={options} />
        </div>
    );
};

export default React.memo(UserMoneyStatusPieChart);
