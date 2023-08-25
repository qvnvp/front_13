$(function() {
	echarts_1();
	echarts_2();
	echarts_4();
	echarts_31();
	echarts_32();
	echarts_33();
	echarts_5();
	echarts_6();

	function echarts_1() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart1'));
		option = {
			title: {
				text: '',
				subtext: ''
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['男生', '女生'],
				top: '-3%', // 设置图例距离容器顶部的距离
				right: '1%', // 设置图例距离容器右边的距离
				itemWidth: 3, // 设置图例标记的宽度
				itemHeight: 3, // 设置图例标记的高度
				textStyle: { // 设置图例文字样式
					color: '#ffffff', // 更改图例字体颜色
					fontSize: 10 // 更改图例字体大小
				}
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {
						show: false
					},
					magicType: {
						show: false
					},
					restore: {
						show: false
					},
					saveAsImage: {
						show: false
					}
				}
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				data: ['电信', '工能', '环境', '法新', '经管']
			}],
			yAxis: [{
				type: 'value',
				// splitLine: {
				//        show: true,       // 显示网格线
				//        lineStyle: {
				//          color: '#ffffff' // 设置网格线颜色
				//        }
				//      }
			}],
			grid: { // 添加 grid 配置来控制图表区域的位置和大小
				left: '0%', // 距离容器左边距的百分比
				right: '0%', // 距离容器右边距的百分比
				bottom: '0%', // 距离容器底部距离的百分比
				height: '85%',
				containLabel: true // 是否包含刻度标签
			},
			series: [{
					name: '男生',
					type: 'bar',
					data: [120, 80, 90, 60, 45], // 男生人数数据

				},
				{
					name: '女生',
					type: 'bar',
					data: [80, 70, 110, 40, 55], // 女生人数数据

				},

			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}

	function echarts_2() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart2'));

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '0%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['数统学院', '艺术学院', '博雅学院', '医学院', '物理学院'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{

					type: 'bar',
					data: [45, 251, 65, 30, 45],
					barWidth: '35%', //柱子宽度
					// barGap: 1, //柱子之间间距
					itemStyle: {
						normal: {
							color: '#27d08a',
							opacity: 1,
							barBorderRadius: 5,
						}
					}
				}

			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}

	function echarts_5() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart5'));

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},

			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '2%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['重庆', '四川', '河南', '山东', '贵州', '云南'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				type: 'bar',
				data: [168, 130, 67, 78, 36, 53],
				barWidth: '35%', //柱子宽度
				// barGap: 1, //柱子之间间距
				itemStyle: {
					normal: {
						color: '#2f89cf',
						opacity: 1,
						barBorderRadius: 5,
					}
				}
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}

function echarts_4() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart4'));

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#dddc6b'
                }
            }
        },
        grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: 12
                    },
					
					interval: 10
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#0184d5',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            },
                            {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }
                        ]),
                        shadowColor: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0184d5',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 更新图表数据
    function updateChart() {
        const apiUrl = 'http://nsrs.autumnclouds.cn/api/statistic/dayReportNum';
        axios
            .get(apiUrl)
            .then(res => {
                if (res.data.code === 200) {
                    //console.log('xxxx:', res.data.data);
                    let a_data = [];
                    let b_data = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        a_data.push(res.data.data[i].count);
                        b_data.push(res.data.data[i].report_date);
                    }
                    // 更新数据
                    myChart.setOption({
                        xAxis: [
                            {
                                data: b_data
                            }
                        ],
                        series: [
                            {
                                data: a_data
                            }
                        ]
                    });
                } else {
                    console.error('Failed to fetch student count');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // 初始化时更新一次图表
    updateChart();

    // 定时刷新图表数据（示例为每5秒更新一次）
   setInterval(updateChart, 3000);

    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}

	function echarts_6() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart6'));

		var dataStyle = {
			normal: {
				label: {
					show: false
				},
				labelLine: {
					show: false
				},
				//shadowBlur: 40,
				//shadowColor: 'rgba(40, 40, 40, 1)',
			}
		};
		var placeHolderStyle = {
			normal: {
				color: 'rgba(255,255,255,.05)',
				label: {
					show: false,
				},
				labelLine: {
					show: false
				}
			},
			emphasis: {
				color: 'rgba(0,0,0,0)'
			}
		};
		option = {
			color: ['#0f78d6', '#5ab9d6', '#8383ff'],
			tooltip: {
				show: true,
				formatter: "{a} : {c} "
			},
			legend: {
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 12,
				bottom: '3%',

				data: ['虎溪校区', 'A区', 'B区'],
				textStyle: {
					color: 'rgba(226, 255, 253, 0.6)',
				}
			},

			series: [{
					name: '虎溪校区',
					type: 'pie',
					clockWise: false,
					center: ['50%', '42%'],
					radius: ['59%', '70%'],
					itemStyle: dataStyle,
					hoverAnimation: false,
					data: [{
						value: 686,
						name: '01'
					}, {
						value: 20,
						name: 'invisible',
						tooltip: {
							show: false
						},
						itemStyle: placeHolderStyle
					}]
				}, {
					name: 'A区',
					type: 'pie',
					clockWise: false,
					center: ['50%', '42%'],
					radius: ['49%', '60%'],
					itemStyle: dataStyle,
					hoverAnimation: false,
					data: [{
						value: 313,
						name: '02'
					}, {
						value: 30,
						name: 'invisible',
						tooltip: {
							show: false
						},
						itemStyle: placeHolderStyle
					}]
				},
				{
					name: 'B区',
					type: 'pie',
					clockWise: false,
					hoverAnimation: false,
					center: ['50%', '42%'],
					radius: ['39%', '50%'],
					itemStyle: dataStyle,
					data: [{
						value: 187,
						name: '03'
					}, {
						value: 35,
						name: 'invisible',
						tooltip: {
							show: false
						},
						itemStyle: placeHolderStyle
					}]
				},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}
function echarts_31() {
    var myChart = echarts.init(document.getElementById('fb1'));

    var option = {
        title: [
            {
                text: '年龄分布',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }
            }
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            position: function (p) {
                return [p[0] + 10, p[1] - 10];
            }
        },
        legend: {
            top: '70%',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12'
            }
        },
        series: [
            {
                name: '年龄分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#0682ab', '#06a0ab', '#06b4ab', '#06dcab', '#06f0ab'],
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                data: [] // 数据需要在更新函数中填充
            }
        ]
    };

    myChart.setOption(option);

    function updateChart() {
        const apiUrl = 'http://nsrs.autumnclouds.cn/api/statistic/ageDistrition';
        axios
            .get(apiUrl)
            .then(res => {
                if (res.data.code === 200) {
                    console.log('Data:', res.data.data);
                    let ageCounts = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        ageCounts.push({
                            value: res.data.data[i].age_count,
                            name: res.data.data[i].age // 这里设置了图例的名称
                        });
                    }
                    myChart.setOption({
                        series: [
                            {
                                data: ageCounts
                            }
                        ]
                    });
                } else {
                    console.error('Failed to fetch age distribution data');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    updateChart();

    setInterval(updateChart, 3000);

    window.addEventListener('resize', function () {
        myChart.resize();
    });
}

	function echarts_32() {
	    // 基于准备好的dom，初始化echarts实例
	    var myChart = echarts.init(document.getElementById('fb2'));
	    
	    // 初始化图表的配置
	    var option = {
	        title: [{
	            text: '男女比例',
	            left: 'center',
	            textStyle: {
	                color: '#fff',
	                fontSize: 16
	            }
	        }],
	        tooltip: {
	            trigger: 'item',
	            formatter: "{a} <br/>{b}: {c} ({d}%)",
	            position: function(p) { // 其中p为当前鼠标的位置
	                return [p[0] + 10, p[1] - 10];
	            }
	        },
	        legend: {
	            top: '70%',
	            itemWidth: 10,
	            itemHeight: 10,
	            data: ['男生', '女生'],
	            textStyle: {
	                color: 'rgba(255, 255, 255, 0.5)',
	                fontSize: 12,
	            }
	        },
	        series: [{
	            name: '男女比例',
	            type: 'pie',
	            center: ['50%', '42%'],
	            radius: ['40%', '60%'],
	            color: ['#065aab', '#06f0ab'],
	            label: {
	                show: false
	            },
	            labelLine: {
	                show: false
	            },
	            data: []
	        }]
	    };
	    
	    // 将图表配置应用到echarts实例
	    myChart.setOption(option);
	
	    // 更新图表数据的函数
	    function updateChart() {
	        const apiUrl = 'http://nsrs.autumnclouds.cn/api/statistic/genderRatio';
	        axios.get(apiUrl)
	            .then(res => {
	                if (res.data.code === 200) {
	                    console.log('Data:', res.data.data);
	                    let genderCounts = res.data.data.map(item => ({
	                        value: item.male_count,
	                        name: '男生'
	                    }));
	                    genderCounts.push({
	                        value: res.data.data.reduce((total, item) => total + item.female_count, 0),
	                        name: '女生'
	                    });
	                    myChart.setOption({
	                        series: [{
	                            data: genderCounts
	                        }]
	                    });
	                } else {
	                    console.error('Failed to fetch gender ratio data');
	                }
	            })
	            .catch(error => {
	                console.error('Error fetching data:', error);
	            });
	    }
	
	    // 初始加载图表数据
	    updateChart();
	
	    // 每隔5分钟更新一次图表数据
	    setInterval(updateChart, 3000);
	
	    // 监听窗口大小变化，自动调整图表尺寸
	    window.addEventListener('resize', function () {
	        myChart.resize();
	    });
	}

function echarts_33() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb3'));
    
    // 初始化图表的配置
    var option = {
        title: {
            text: '兴趣分布',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            top: '70%',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 12,
            },
            data: [] // 数据项名称将在数据获取后动态添加
        },
        series: [{
            name: '兴趣分布',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab',
                '#06dcab', '#06f0ab'
            ],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [] // 数据将在数据获取后动态添加
        }]
    };
    
    // 将图表配置应用到echarts实例
    myChart.setOption(option);

    // 更新图表数据的函数
    function updateChart() {
        const apiUrl = 'http://nsrs.autumnclouds.cn/api/statistic/hobbiesDistri';
        axios.get(apiUrl)
            .then(res => {
                if (res.data.code === 200) {
                    console.log('Data:', res.data.data);
                    let interests = Object.entries(res.data.data).map(([interest, count]) => ({
                        value: count,
                        name: interest
                    }));
                    myChart.setOption({
                        legend: {
                            data: interests.map(item => item.name)
                        },
                        series: [{
                            data: interests
                        }]
                    });
                } else {
                 //   console.error('Failed to fetch interests distribution data');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // 初始加载图表数据
    updateChart();

    // 每隔5分钟更新一次图表数据
    setInterval(updateChart, 3000);

    // 监听窗口大小变化，自动调整图表尺寸
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}

})