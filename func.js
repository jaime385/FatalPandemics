onload();
async function onload() {
    const titulo = await fetch('https://coronavirus-19-api.herokuapp.com/all');
    const cvt = await titulo.json();
    const x = $.getJSON('https://ipapi.co/json/', async function (data) {
        console.log(data);
        const usersCountryDiv = document.createElement('Div');
        usersCountryDiv.setAttribute("id", "usersCountry");
        usersCountryDiv.setAttribute("class", "country");
        usersCountryDiv.textContent = `${data.country_name}`;
        const idCv = document.getElementById('usersCountryData');
        idCv.append(usersCountryDiv);
    });
    const titroot = document.createElement('Div');
    const mg = document.createElement('Div');
    const cg = document.createElement('Div');
    const rg = document.createElement('Div');
    const iconoMuertes = document.createElement('i');
    const breake = document.createElement('br');
    iconoMuertes.setAttribute("class", "fas fa-skull-crossbones fa-lg");
    const iconoCasos = document.createElement('i');
    iconoCasos.setAttribute("class", "fas fa-biohazard fa-lg");
    const iconoRecuperados = document.createElement('i');
    iconoRecuperados.setAttribute("class", "fas fa-hand-holding-medical fa-lg");
    titroot.append(iconoMuertes, mg, iconoCasos, cg, iconoRecuperados, rg, breake);
    mg.textContent = `Total Deaths: ${cvt.deaths}`;
    cg.textContent = `Total Cases: ${cvt.cases}`;
    rg.textContent = `Recovered: ${cvt.recovered}`;
    const cvtt = document.getElementById('cv');
    cvtt.append(titroot);
    document.getElementById("cont a2").appendChild(cvtt);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
        });
    } else {
        //console.log('Geolocation is not available.');
    }
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

function plotting(datax, datay, id, title, dataSetInterval) {
    //Boiler plate code.
    var interval = [];
    if (dataSetInterval == 1) {
        interval[0] = 0;
        interval[1] = 15;
    } if (dataSetInterval == 2) {
        interval[0] = 15;
        interval[1] = 30;
    } if (dataSetInterval == 3) {
        interval[0] = 30;
        interval[1] = 45;
    } if (dataSetInterval == 4) {
        interval[0] = 45;
        interval[1] = 60;
    } if (dataSetInterval == 5) {
        interval[0] = 60;
        interval[1] = 75;
    } if (dataSetInterval == 6) {
        interval[0] = 75;
        interval[1] = 90;
    } if (dataSetInterval == 7) {
        interval[0] = 105;
        interval[1] = 120;
    } if (dataSetInterval == 8) {
        interval[0] = 120;
        interval[1] = 135;
    } if (dataSetInterval == 9) {
        interval[0] = 135;
        interval[1] = 150;
    } if (dataSetInterval == 10) {
        interval[0] = 150;
        interval[1] = 165;
    } if (dataSetInterval == 11) {
        interval[0] = 165;
        interval[1] = 180;
    } if (dataSetInterval == 12) {
        interval[0] = 180;
        interval[1] = 195;
    } if (dataSetInterval == 13) {
        interval[0] = 195;
        interval[1] = 202;
    }

    var ct = document.getElementById(id).getContext('2d');
    //ct.setAttribute("style", "height: 400px;");
    const slicingx = datax.slice(interval[0], interval[1]);
    const slicingy = datay.slice(interval[0], interval[1]);
    var myChart = new Chart(ct, {
        type: 'horizontalBar',
        data: {
            labels: slicingx,
            datasets: [{
                label: `Group: ${dataSetInterval}, Amount`,
                data: slicingy,
                backgroundColor: [
                    'rgba(255, 0, 100, 0.3)', 'rgba(54, 162, 235, 0.3)', 'rgba(255, 206, 86, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(72, 112, 132, 0.3)', 'rgba(167, 162, 235, 0.3)',
                    'rgba(255, 20, 111, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(40, 112, 89, 0.3)', 'rgba(20, 145, 255, 0.3)', 'rgba(255, 0, 100, 0.3)', 'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(72, 112, 132, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 0, 100, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(72, 112, 132, 1)', 'rgba(167, 162, 235, 1)',
                    'rgba(255, 20, 111, 1)', 'rgba(75, 192, 192, 1)', 'rgba(40, 112, 89, 1)', 'rgba(20, 145, 255, 1)', 'rgba(255, 0, 100,1)', 'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(72, 112, 132, 1)'
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
                fontSize: 18
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
        const cases2 = dataToPlot.casos;
        const casosTotales = sumatoriaElementosArray(Object.values(cases2));
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("height", "450px");
        showChartElement.setAttribute("id", "casosGlobalmente");
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('chartsGoHere');
        opSelected.append(showChartElement);
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, cases2, 'casosGlobalmente', `Cases globally: ${casosTotales}`, parseInt(intervalSelected));

        const revGraficoMuertes = document.getElementById("muertesGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertosTotales = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoMuertes) {
            document.getElementById("muertesGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoCriticos) {
                    document.getElementById("criticosGlobalmente").remove();
                } else {
                    if (revGraficoMuertosTotales) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
                }
            }
        }
    } else {
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const cases2 = dataToPlot.casos;
        const casosTotales = sumatoriaElementosArray(Object.values(cases2));
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, cases2, 'casosGlobalmente', `Cases globally: ${casosTotales}`, parseInt(intervalSelected));

        const revGraficoMuertes = document.getElementById("muertesGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertosTotales = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoMuertes) {
            document.getElementById("muertesGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoCriticos) {
                    document.getElementById("criticosGlobalmente").remove();
                } else {
                    if (revGraficoMuertosTotales) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
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
        const muertes = dataToPlot.muertes;
        const muertesTotales = sumatoriaElementosArray(Object.values(muertes));
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "muertesGlobalmente");
        showChartElement.setAttribute("height", 500);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('chartsGoHere');
        opSelected.append(showChartElement);
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, muertes, 'muertesGlobalmente', `Total Deaths: ${muertesTotales}`, parseInt(intervalSelected));
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertes = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoCriticos) {
                    document.getElementById("criticosGlobalmente").remove();
                } else {
                    if (revGraficoMuertes) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
                }
            }
        }
    } else {
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const muertes = dataToPlot.muertes;
        const muertesTotales = sumatoriaElementosArray(Object.values(muertes));
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, muertes, 'muertesGlobalmente', `Total Deaths: ${muertesTotales}`, parseInt(intervalSelected));
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertes = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoCriticos) {
                    document.getElementById("criticosGlobalmente").remove();
                } else {
                    if (revGraficoMuertes) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    } else {
                    }
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
        const critical = dataToPlot.criticos;
        const criticosTotales = sumatoriaElementosArray(Object.values(critical));
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "criticosGlobalmente");
        showChartElement.setAttribute("height", 500);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('chartsGoHere');
        opSelected.append(showChartElement);
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, critical, 'criticosGlobalmente', `People in critical condition: ${criticosTotales}`, parseInt(intervalSelected));
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        const revGraficoMuertosTotales = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoMuertos) {
                    document.getElementById("muertesGlobalmente").remove();
                } else {
                    if (revGraficoMuertosTotales) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
                }
            }
        }
    } else {
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const critical = dataToPlot.criticos;
        const criticosTotales = sumatoriaElementosArray(Object.values(critical));
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, critical, 'criticosGlobalmente', `People in critical condition: ${criticosTotales}`, parseInt(intervalSelected));
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        const revGraficoMuertosTotales = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoMuertos) {
                    document.getElementById("muertesGlobalmente").remove();
                } else {
                    if (revGraficoMuertosTotales) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
                }
            }
        }
    }
}

async function showActivosSelected() {
    var elementExists = document.getElementById("activosGlobalmente");
    if (elementExists == null) {//Draw
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const activos = dataToPlot.activos;
        const activosTotales = sumatoriaElementosArray(Object.values(activos));
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "activosGlobalmente");
        showChartElement.setAttribute("height", 500);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('chartsGoHere');
        opSelected.append(showChartElement);
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, activos, 'activosGlobalmente', `Active cases: ${activosTotales}`, parseInt(intervalSelected));

        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        const revGraficoMuertosTotales = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoCriticos) {
                document.getElementById("criticosGlobalmente").remove();
            } else {
                if (revGraficoMuertos) {
                    document.getElementById("muertesGlobalmente").remove();
                } else {
                    if (revGraficoMuertosTotales) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
                }
            }
        }
    } else {
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const activos = dataToPlot.activos;
        const activosTotales = sumatoriaElementosArray(Object.values(activos));
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, activos, 'activosGlobalmente', `Active cases: ${activosTotales}`, parseInt(intervalSelected));
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        const revGraficoMuertosTotales = document.getElementById("muertesTotalesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoCriticos) {
                document.getElementById("criticosGlobalmente").remove();
            } else {
                if (revGraficoMuertos) {
                    document.getElementById("muertesGlobalmente").remove();
                } else {
                    if (revGraficoMuertosTotales) {
                        document.getElementById("muertesTotalesGlobalmente").remove();
                    }
                }
            }
        }
    }
}

async function showTodayDeathsSelected() {
    var elementExists = document.getElementById("muertesTotalesGlobalmente");
    if (elementExists == null) {//Draw
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const muertosHoy = dataToPlot.muertosHoy;
        const muertosHoyTotales = sumatoriaElementosArray(Object.values(muertosHoy));
        console.log(muertosHoyTotales);
        const divShowChartElement = document.createElement('Div');
        const showChartElement = document.createElement('canvas');
        showChartElement.setAttribute("id", "muertesTotalesGlobalmente");
        showChartElement.setAttribute("height", 500);
        divShowChartElement.append(showChartElement);
        const opSelected = document.getElementById('chartsGoHere');
        opSelected.append(showChartElement);
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, muertosHoy, 'muertesTotalesGlobalmente', `Total Deaths today: ${muertosHoyTotales}`, parseInt(intervalSelected));

        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoCriticos) {
                    document.getElementById("criticosGlobalmente").remove();
                } else {
                    if (revGraficoMuertos) {
                        document.getElementById("muertesGlobalmente").remove();
                    }
                }
            }
        }
    } else {
        const dataToPlot = await collectData();
        const countries = dataToPlot.paises;
        const muertosHoy = dataToPlot.muertosHoy;
        const muertosHoyTotales = sumatoriaElementosArray(Object.values(muertosHoy));
        const intervalSelected = document.getElementById("navigationInput").textContent;
        plotting(countries, muertosHoy, 'muertesTotalesGlobalmente', `Total Deaths today: ${muertosHoyTotales}`, parseInt(intervalSelected));
        const revGraficoCasos = document.getElementById("casosGlobalmente");
        const revGraficoActivos = document.getElementById("activosGlobalmente");
        const revGraficoCriticos = document.getElementById("criticosGlobalmente");
        const revGraficoMuertos = document.getElementById("muertesGlobalmente");
        if (revGraficoCasos) {
            document.getElementById("casosGlobalmente").remove();
        } else {
            if (revGraficoActivos) {
                document.getElementById("activosGlobalmente").remove();
            } else {
                if (revGraficoCriticos) {
                    document.getElementById("criticosGlobalmente").remove();
                } else {
                    if (revGraficoMuertos) {
                        document.getElementById("muertesGlobalmente").remove();
                    }
                }
            }
        }
    }
}

function sumatoriaElementosArray(array) {
    var sumatoria = 0;
    for (i = 0; i <= array.length - 1; i++) {
        sumatoria = sumatoria + array[i];
    }
    return sumatoria;
};

function setIntervalButtonLeft() {
    var intervalSelected = parseInt(document.getElementById("navigationInput").textContent);
    if (intervalSelected > 1) {
        document.getElementById("navigationInput").textContent = intervalSelected - 1;
    } else {
        document.getElementById("navigationInput").textContent = 1;
    }
}

function setIntervalButtonRight() {
    var intervalSelected = parseInt(document.getElementById("navigationInput").textContent);
    if (intervalSelected < 13) {
        document.getElementById("navigationInput").textContent = intervalSelected + 1;
    } else {
        document.getElementById("navigationInput").textContent = 13;
    }
}

function menuClicked() {
    const divMenu = document.createElement('Div');
    divMenu.setAttribute("class", "menuShowingUp")
    divMenu.setAttribute("id", "menuContent")
    divMenu.setAttribute("style", "height: 400px; background-color: rgba(0, 0, 0, 0.5);");

    const divMenuChild1 = document.createElement('Div');
    divMenuChild1.setAttribute("class", "menuShowingUpChild1");
    divMenuChild1.setAttribute("id", "menuShowingUpChild1");
    const divMenuChild1Button = document.createElement('button');
    divMenuChild1Button.setAttribute("id", "divMenuChild1Button");
    divMenuChild1Button.setAttribute("class", "menuLinkButtons");

    const divMenuChild2 = document.createElement('Div');
    divMenuChild2.setAttribute("class", "menuShowingUpChild2");
    divMenuChild2.setAttribute("id", "menuShowingUpChild2");
    const divMenuChild2Button = document.createElement('button');
    divMenuChild2Button.setAttribute("id", "divMenuChild2Button");
    divMenuChild2Button.setAttribute("class", "menuLinkButtons");


    const divMenuChild3 = document.createElement('Div');
    divMenuChild3.setAttribute("class", "menuShowingUpChild3");
    divMenuChild3.setAttribute("id", "menuShowingUpChild3");
    const divMenuChild3Button = document.createElement('button');
    divMenuChild3Button.setAttribute("id", "divMenuChild3Button");
    divMenuChild3Button.setAttribute("class", "menuLinkButtons");

    const divMenuChild4 = document.createElement('Div');
    divMenuChild4.setAttribute("class", "menuShowingUpChild4");
    divMenuChild4.setAttribute("id", "menuShowingUpChild4");
    const divMenuChild4Button = document.createElement('button');
    divMenuChild4Button.setAttribute("id", "divMenuChild4Button");
    divMenuChild4Button.setAttribute("class", "menuLinkButtons");

    const headContentId = document.getElementById("menuContent");
    if (headContentId == null) {
        document.getElementById("headContent").append(divMenu);
        const aboutsIcon = document.createElement('i');
        aboutsIcon.setAttribute("class", "fas fa-skull-crossbones fa-lg");
        document.getElementById("menuContent").append(divMenuChild1);
        document.getElementById("menuShowingUpChild1").append(divMenuChild1Button);
        document.getElementById("divMenuChild1Button").textContent = `About `;
        document.getElementById("divMenuChild1Button").appendChild(aboutsIcon);
        divMenuChild1Button.setAttribute("onClick", "aboutButton()");

        document.getElementById("menuContent").append(divMenuChild2);
        document.getElementById("menuShowingUpChild2").append(divMenuChild2Button);

        const locationIcon = document.createElement('i');
        locationIcon.setAttribute("class", "fas fa-map-pin fa-lg");
        document.getElementById("menuContent").append(divMenuChild3);
        document.getElementById("menuShowingUpChild3").append(divMenuChild3Button);
        document.getElementById("divMenuChild3Button").textContent = `Data at ${document.getElementById("usersCountryData").textContent} `;
        document.getElementById("divMenuChild3Button").appendChild(locationIcon);
        divMenuChild3Button.setAttribute("onClick", "dataAtButton()");

        const closesIcon = document.createElement('i');
        closesIcon.setAttribute("class", "fas fa-times fa-lg");
        document.getElementById("menuContent").append(divMenuChild4);
        document.getElementById("menuShowingUpChild4").append(divMenuChild4Button);
        document.getElementById("divMenuChild4Button").textContent = `Close `;
        document.getElementById("divMenuChild4Button").appendChild(closesIcon);
        divMenuChild4Button.setAttribute("onClick", "closeButton()");
    } else {
        document.getElementById("menuContent").remove();
    }
}

function closeButton() {
    document.getElementById("menuContent").remove();
}


function aboutButton() {
    alert("This website presents information about the Covid-19 pandemic.");
}

async function dataAtButton() {
    const countryForApiCall = document.getElementById("usersCountryData").textContent;
    const divVerification = document.getElementById("usersCountryDataChild").textContent;
    if (divVerification == "") {
        console.log("Div vacio");
        const dataUsersCountry = await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${countryForApiCall}`);
        const dataCountry = await dataUsersCountry.json();
        //console.log(dataCountry);
        const country = document.createElement('Div');
        const countrysCases = document.createElement('Div');
        const countrysTodayCases = document.createElement('Div');
        const countrysDeaths = document.createElement('Div');
        const countrysRecovered = document.createElement('Div');
        const countrysActive = document.createElement('Div');
        const countrysCritical = document.createElement('Div');
        const countrysCasesPerMillion = document.createElement('Div');
        country.setAttribute("class" , "estado");
        countrysCases.setAttribute("class" , "estado");
        countrysTodayCases.setAttribute("class" , "estado");
        countrysDeaths.setAttribute("class" , "estado");
        countrysRecovered.setAttribute("class" , "estado");
        countrysActive.setAttribute("class" , "estado");
        countrysCritical.setAttribute("class" , "estado");
        countrysCasesPerMillion.setAttribute("class" , "estado");
        country.textContent = `${dataCountry.country}`;
        countrysCases.textContent = `Cases: ${dataCountry.cases}`;
        countrysTodayCases.textContent = `Today's new Cases: ${dataCountry.todayCases}`;
        countrysDeaths.textContent = `Deaths: ${dataCountry.deaths}`;
        countrysRecovered.textContent = `Recovered: ${dataCountry.recovered}`;
        countrysActive.textContent = `Active: ${dataCountry.active}`;
        countrysCritical.textContent = `Critical: ${dataCountry.critical}`;
        countrysCasesPerMillion.textContent = `Cases per one million: ${dataCountry.casesPerOneMillion}`;
        const breaking = document.createElement('br');
        document.getElementById("usersCountryDataChild").append(country,countrysCases,countrysTodayCases,countrysDeaths,countrysRecovered,countrysActive,countrysCritical,countrysCasesPerMillion,breaking);
    }
    closeButton();
}



/*Must understand this code.
document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Control') {
      // do not alert when only Control key is pressed.
      return;
    }

    if (event.ctrlKey) {
      // Even though event.key is not 'Control' (e.g., 'a' is pressed),
      // event.ctrlKey may be true if Ctrl key is pressed at the same time.
      alert(`Combination of ctrlKey + ${keyName}`);
    } else {
      alert(`Key pressed ${keyName}`);
    }
  }, false);

  document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    // As the user releases the Ctrl key, the key is no longer active,
    // so event.ctrlKey is false.
    if (keyName === 'Control') {
      alert('Control key was released');
    }
  }, false);
  */