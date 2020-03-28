onload();
async function onload() {
    const titulo = await fetch('https://coronavirus-19-api.herokuapp.com/all');
    const cvt = await titulo.json();
    const titroot = document.createElement('Div');
    const mg = document.createElement('Div');
    const cg = document.createElement('Div');
    const rg = document.createElement('Div');
    titroot.append(mg, cg, rg);
    mg.textContent = `Total Deaths: ${cvt.deaths}`;
    cg.textContent = `Total Cases: ${cvt.cases}`;
    rg.textContent = `Recovered: ${cvt.recovered}`;
    const cvtt = document.getElementById('cv');
    cvtt.append(titroot);
    document.getElementById("cont a2").appendChild(cvtt);
}

async function collectData() {
    const corona = await fetch('https://coronavirus-19-api.herokuapp.com/countries');
    const virus = await corona.json();
    contador = 0;
    var t = [];
    var cas = [];
    var muertes = [];
    var criticos = [];
    var activos = [];
    var muertesHoy = [];
    for (item of virus) {
        /*Datos:*/
        let countries = item.country;
        let casese = item.cases;
        let muert = item.deaths;
        let criti = item.critical;
        let act = item.active;
        let xxx = item.todayDeaths;
        contador++;
        t[contador] = countries;
        cas[contador] = casese;
        muertes[contador] = muert;
        criticos[contador] = criti;
        activos[contador] = act;
        muertesHoy[contador] = xxx;
    }
    return {
        paises: t,
        casos: cas,
        muertes: muertes,
        criticos: criticos,
        activos: activos,
        muertosHoy: muertesHoy
    };
}

function plotting(datax, datay, id, title) {
    var ct = document.getElementById(id).getContext('2d');
    const slicingx = datax.slice(1, 11);
    const slicingy = datay.slice(1, 11);
    var myChart = new Chart(ct, {
        type: 'horizontalBar',
        data: {
            labels: slicingx,
            datasets: [{
                label: 'Amount:',
                data: slicingy,
                backgroundColor: [
                    'rgba(255, 0, 100, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(72, 112, 132, 0.3)',
                    'rgba(167, 162, 235, 0.3)',
                    'rgba(255, 20, 111, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(40, 112, 89, 0.3)',
                    'rgba(20, 145, 255, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 0, 100, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(72, 112, 132, 1)',
                    'rgba(167, 162, 235, 1)',
                    'rgba(255, 20, 111, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(40, 112, 89, 1)',
                    'rgba(20, 145, 255, 1)'
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 14,
                        fontColor: 'yellowgreen'
                    },
                    barPercentage: 0.9,
                    maxBarThickness: 60,
                    minBarThickness: 8
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 14,
                        fontColor: 'yellowgreen',
                        max: datay[0],
                        min: 0,
                        stepSize: 1
                    },
                    barPercentage: 0.9,
                    maxBarThickness: 60,
                    minBarThickness: 8
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'yellowgreen',
                    fontSize: 14
                },
            },
            title: {
                display: true,
                text: `${title}`,
                fontColor: 'yellowgreen',
                fontSize: 20
            },
            /*Problema solucionado gracias a la fuente: https://stackoverflow.com/questions/38304357/is-it-possible-to-add-a-custom-font-to-chart-js*/
            defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Baloo Da 2'"
        }
    });
}

async function showCasesSelected() {
        var elementExists = document.getElementById("casosGlobalmente");
        if (elementExists == null) {//Draw
            const dataToPlot = await collectData();
            const countries = dataToPlot.paises;
            const cases2 = dataToPlot.muertes;
            const divShowChartElement = document.createElement('Div');
            const showChartElement = document.createElement('canvas');
            showChartElement.setAttribute("id", "casosGlobalmente");
            showChartElement.setAttribute("height", 320);
            divShowChartElement.append(showChartElement);
            const opSelected = document.getElementById('showOptionSelected');
            opSelected.append(showChartElement);
            plotting(countries, cases2, 'casosGlobalmente', `Cases`);
    
            const revGraficoMuertes = document.getElementById("muertesGlobalmente");
            const revGraficoActivos = document.getElementById("activosGlobalmente");
            const revGraficoCriticos = document.getElementById("criticosGlobalmente");
            if (revGraficoMuertes) {
                console.log("Se eliminara el grafico de muertes globalmente");
                document.getElementById("muertesGlobalmente").remove();  
            } else {    
                if (revGraficoActivos) {
                    console.log("Se eliminara el grafico de casos activos globalmente");
                    document.getElementById("activosGlobalmente").remove();
                } else {
                    if (revGraficoCriticos) {
                        console.log("Se eliminara el grafico de criticos globalmente");
                        document.getElementById("criticosGlobalmente").remove();
                    } else {
                        //Do nothing
                    }
                }
            }
        } else {
            const revGraficoMuertes = document.getElementById("muertesGlobalmente");
            const revGraficoActivos = document.getElementById("activosGlobalmente");
            const revGraficoCriticos = document.getElementById("criticosGlobalmente");
            if (revGraficoMuertes) {
                console.log("Se eliminara el grafico de muertes globalmente");
                document.getElementById("muertesGlobalmente").remove();  
            } else {    
                if (revGraficoActivos) {
                    console.log("Se eliminara el grafico de casos activos globalmente");
                    document.getElementById("activosGlobalmente").remove();
                } else {
                    if (revGraficoCriticos) {
                        console.log("Se eliminara el grafico de criticos globalmente");
                        document.getElementById("criticosGlobalmente").remove();
                    } else {
                        //Do nothing
                    }
                }
            }
        }
    }

async function showDeathsSelected() {
        var elementExists = document.getElementById("muertesGlobalmente");
        if (elementExists == null) {//Draw
            const dataToPlot = await collectData();
            const countries = dataToPlot.paises;
            const cases2 = dataToPlot.muertes;
            const divShowChartElement = document.createElement('Div');
            const showChartElement = document.createElement('canvas');
            showChartElement.setAttribute("id", "muertesGlobalmente");
            showChartElement.setAttribute("height", 320);
            divShowChartElement.append(showChartElement);
            const opSelected = document.getElementById('showOption1Selected');
            opSelected.append(showChartElement);
            plotting(countries, cases2, 'muertesGlobalmente', `Deaths`);
    
            const revGraficoCasos = document.getElementById("casosGlobalmente");
            const revGraficoActivos = document.getElementById("activosGlobalmente");
            const revGraficoCriticos = document.getElementById("criticosGlobalmente");
            if (revGraficoCasos) {
                console.log("Se eliminara el grafico de casos globalmente");
                document.getElementById("casosGlobalmente").remove();  
            } else {    
                if (revGraficoActivos) {
                    console.log("Se eliminara el grafico de casos activos globalmente");
                    document.getElementById("activosGlobalmente").remove();
                } else {
                    if (revGraficoCriticos) {
                        console.log("Se eliminara el grafico de criticos globalmente");
                        document.getElementById("criticosGlobalmente").remove();
                    } else {
                        //Do nothing
                    }
                }
            }
        } else {
            const revGraficoCasos = document.getElementById("casosGlobalmente");
            const revGraficoActivos = document.getElementById("activosGlobalmente");
            const revGraficoCriticos = document.getElementById("criticosGlobalmente");
            if (revGraficoCasos) {
                console.log("Se eliminara el grafico de casos globalmente");
                document.getElementById("casosGlobalmente").remove();  
            } else {    
                if (revGraficoActivos) {
                    console.log("Se eliminara el grafico de casos activos globalmente");
                    document.getElementById("activosGlobalmente").remove();
                } else {
                    if (revGraficoCriticos) {
                        console.log("Se eliminara el grafico de criticos globalmente");
                        document.getElementById("criticosGlobalmente").remove();
                    } else {
                        //Do nothing
                    }
                }
            }
        }
    }

async function showCriticalSelected() {
    var elementExists = document.getElementById("criticosGlobalmente");
    if (elementExists == null) {//Draw
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const cases2 = dataToPlot.criticos;
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "criticosGlobalmente");
        showChartElement.setAttribute("height", 320);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('showOption2Selected');
        opSelected.append(showChartElement);
        plotting(countries, cases2, 'criticosGlobalmente', `Critical`);

        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        //console.log(revGraficoCasos);
        if (revGraficoCasos) {
            console.log("Se eliminara el grafico de casos globalmente");
            document.getElementById("casosGlobalmente").remove();  
        } else {    
            if (revGraficoActivos) {
                console.log("Se eliminara el grafico de casos activos globalmente");
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoMuertos) {
                    console.log("Se eliminara el grafico de muertes globalmente");
                    document.getElementById("muertesGlobalmente").remove();
                } else {
                    //Do nothing
                }
            }
        }
    } else {
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        //console.log(revGraficoCasos);
        if (revGraficoCasos) {
            console.log("Se eliminara el grafico de casos globalmente");
            document.getElementById("casosGlobalmente").remove();  
        } else {    
            if (revGraficoActivos) {
                console.log("Se eliminara el grafico de casos activos globalmente");
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoMuertos) {
                    console.log("Se eliminara el grafico de casos criticos globalmente");
                    document.getElementById("muertesGlobalmente").remove();
                } else {
                    //Do nothing
                }
            }
        }
    }
}