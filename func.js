onload();
async function onload() {
    const titulo = await fetch('https://coronavirus-19-api.herokuapp.com/all');
    const cvt = await titulo.json();
    const titroot = document.createElement('Div');
    const mg = document.createElement('Div');
    const cg = document.createElement('Div');
    const rg = document.createElement('Div');
    titroot.append(mg, cg, rg);
    mg.textContent = `Total de muertes: ${cvt.deaths}`;
    cg.textContent = `Total de casos: ${cvt.cases}`;
    rg.textContent = `Recuperados: ${cvt.recovered}`;
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
plot();
async function plot() {
    const x = await collectData();
    const datax = x.paises;
    const cases = x.casos;
    const deaths = x.muertes;
    const critical = x.criticos;
    const ac = x.activos;
    const mh = x.muertosHoy;
    //plotting(datax, cases,'casos','Casos');
    //plotting(datax, deaths,'muertes','Muertes totales');
    //plotting(datax, critical,'criticos','Pacientes críticos actualmente');
    //plotting(datax, ac,'activos','Pacientes activos');
    //plotting(datax, mh, 'muertosHoy', `Today's Deaths`);
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
    var elementExists = document.getElementById("casosGlobalmente"); // null when page is loaded.
    if (elementExists == null){
        const revGraficos = document.getElementById("muertesGlobalmente");
        //console.log(revGraficos);
        if (revGraficos) {
            console.log("Se eliminara el otro grafico");
            document.getElementById("muertesGlobalmente").remove();
        } else {
            console.log("No Existe el grafico de muertes globalmente");
        }
        console.log('No existe el grafico de casos globalmente');
        //console.log(elementExists); --> Debugging.
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const cases2 = dataToPlot.casos;
        //document.querySelector('.botonDatos').style.transform = 'rotate(90deg)';
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "casosGlobalmente");
        showChartElement.setAttribute("height", 240);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('showOptionSelected');
        opSelected.append(showChartElement);
        plotting(countries, cases2, 'casosGlobalmente', 'Cases');
        //document.getElementById("muertosHoy").remove();
        var elementExists = document.getElementById("casosGlobalmente");//When button has been clicked at least one this line is not == null
        //console.log(elementExists);
    } else {
        console.log('Si existe el grafico de casos globalmente.');
    }
}

async function showDeathsSelected() {
    var elementExists = document.getElementById("muertesGlobalmente"); // null when page is loaded.
    if (elementExists == null){
        const revGraficos = document.getElementById("casosGlobalmente");
        //console.log(revGraficos);
        if (revGraficos) {
            console.log("Se eliminara el otro grafico");
            document.getElementById("casosGlobalmente").remove();
        } else {
            console.log("No Existe el grafico de casos globalmente");
        }
        //document.getElementById("muertosHoy").remove();
        console.log('No existe el grafico de muertes globalmente');
        //console.log(elementExists); --> Debugging.
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const cases2 = dataToPlot.muertosHoy;
        //document.querySelector('.botonDatos').style.transform = 'rotate(90deg)';
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "muertesGlobalmente");
        showChartElement.setAttribute("height", 240);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('showOption1Selected');
        opSelected.append(showChartElement);
        plotting(countries, cases2, 'muertesGlobalmente', `Today's Deaths`);
        //document.getElementById("muertosHoy").remove();
        var elementExists = document.getElementById("muertesGlobalmente");//When button has been clicked at least one this line is not == null
        //console.log(elementExists);
    } else {
        console.log('Si existe el grafico de muertes globalmente.');
    }
}