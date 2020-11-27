let df = [];
let dfAeroqual = [];
let dfSinaica = [];

    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "plumelabs_report.csv",
            dataType: "text",
            success: function(data) { buildChart(data);}
        });
    });

    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "Aeroqual_2020-10-30_Data.csv",
            dataType: "text",
            success: function(data) { buildChartAeroqual(data);}
        });
    });

    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "sinaica_dataframe.csv",
            dataType: "text",
            success: function(data) { buildChartSinaica(data);}
        });
    });

    function buildChart(csv) {
        processRawData(csv);

        let sensorData = df.filter(measure => measure["Sensor"] == "13781");
        let chart = d3_timeseries()
            .addSerie(sensorData,{x:'DateTime',y:'PM10'},{interpolate:'step-before'})
            .addSerie(null,{x:'DateTime',y:'PM2.5'}, {interpolate:'linear'})
            .addSerie(null,{x:'DateTime',y:'PM1'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-13781')



        sensorData = df.filter(measure => measure["Sensor"] == "13779");

        chart = d3_timeseries()
            .addSerie(sensorData,{x:'DateTime',y:'PM10'},{interpolate:'step-before'})
            .addSerie(null,{x:'DateTime',y:'PM2.5'}, {interpolate:'linear'})
            .addSerie(null,{x:'DateTime',y:'PM1'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-13779')

    }

    function buildChartSinaica(csv) {
        processRawSinaicaData(csv);
        
        let sensorData = dfSinaica.filter(measure => measure["Sensor"] == "172");
        console.log(sensorData[0]['PM10'])
        let chart = d3_timeseries()
            .addSerie(sensorData,{x:'Timestamp',y:'PM10'},{interpolate:'step-before'})
            .addSerie(null,{x:'Timestamp',y:'CO'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'O3'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'SO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'NO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'PM2.5'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-SINAICA1')

        sensorData = dfSinaica.filter(measure => measure["Sensor"] == "174");

        chart = d3_timeseries()
            .addSerie(sensorData,{x:'Timestamp',y:'PM10'},{interpolate:'step-before'})
            .addSerie(null,{x:'Timestamp',y:'CO'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'O3'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'SO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'NO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'PM2.5'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-SINAICA2')

        sensorData = dfSinaica.filter(measure => measure["Sensor"] == "427");

        chart = d3_timeseries()
            .addSerie(sensorData,{x:'Timestamp',y:'PM10'},{interpolate:'step-before'})
            .addSerie(null,{x:'Timestamp',y:'CO'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'O3'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'SO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'NO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'PM2.5'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-SINAICA3')

        sensorData = dfSinaica.filter(measure => measure["Sensor"] == "171");

        chart = d3_timeseries()
            .addSerie(sensorData,{x:'Timestamp',y:'PM10'},{interpolate:'step-before'})
            .addSerie(null,{x:'Timestamp',y:'CO'}, {interpolate:'step-before'})
            .addSerie(null,{x:'Timestamp',y:'O3'}, {interpolate:'step-before'})
            .addSerie(null,{x:'Timestamp',y:'SO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'NO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Timestamp',y:'PM2.5'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-SINAICA4')


    }


    function buildChartAeroqual(csv) {
        processRawAeroqualData(csv);
        //let sensorData = dfAeroqual.filter(measure => measure["Inlet"] == "Aeroqual");
        let  chart = d3_timeseries()
            .addSerie(dfAeroqual,{x:'Time',y:'DP'},{interpolate:'step-before'})
            .addSerie(null,{x:'Time',y:'NO2'}, {interpolate:'linear'})
            .addSerie(null,{x:'Time',y:'O3'}, {interpolate:'linear'})
            .addSerie(null,{x:'Time',y:'PM2.5'}, {interpolate:'linear'})
            .addSerie(null,{x:'Time',y:'RH'}, {interpolate:'linear'})
            .addSerie(null,{x:'Time',y:'TEMP'}, {interpolate:'linear'})
            .margin.left(70)
            .width(820)
        chart('#plume-Aeroqual')
    }

/*processRaw FLOW */
    function processRawData(csv) {
        let csvRows = csv.split(/\r\n|\n/);
        let headers = csvRows[0].split(',');
        let currentLine;
        for (let i = 1 ; i < csvRows.length ; i++) {
            currentLine = csvRows[i].split(',');
            let tmpRow = {};
            for (let j = 0 ; j < currentLine.length ; j ++) {
                if (currentLine[j] == "") currentLine[j] = 0;

                if (headers[j] == "DateTime")
                    tmpRow[headers[j]] = new Date( Date.parse(currentLine[j]) );
                else if (headers[j] != "Sensor")
                    tmpRow[headers[j]] = parseFloat(currentLine[j]);
                else tmpRow[headers[j]] = currentLine[j];
            }
            df.push(tmpRow);
        }
        //console.log("DataFrame => ", df);
        for (let i = 0 ; i < df.length ; i++)
            if (df[i]["Sensor"] == 0) {
                df.splice(i, 1); 
                i--; 
            }
    }
/*processRaw  Aeroqual*/
    function processRawAeroqualData(csv) {
        let csvRows = csv.split(/\r\n|\n/);
        let headers = csvRows[0].split(',');
        let currentLine;
        for (let i = 1 ; i < csvRows.length ; i++) {
            currentLine = csvRows[i].split(',');
            let tmpRow = {};
            for (let j = 0 ; j < currentLine.length ; j ++) {
                if (currentLine[j] == "") currentLine[j] = 0;

                if (headers[j] == "Time")
                    tmpRow[headers[j]] = new Date( Date.parse(currentLine[j]) );
                else tmpRow[headers[j]] = currentLine[j];
            }
            dfAeroqual.push(tmpRow);
        }
        //console.log("DataFrame => ", dfAeroqual);
        for (let i = 0 ; i < dfAeroqual.length ; i++)
            if (dfAeroqual[i]["DP"] == 0) {
                dfAeroqual.splice(i, 1); 
                i--; 
            }
    }

/*processRaw  Sinaica*/

    function processRawSinaicaData(csv) {
        let csvRows = csv.split(/\r\n|\n/);
        let headers = csvRows[0].split(',');
        let currentLine;
        for (let i = 1 ; i < csvRows.length ; i++) {
            currentLine = csvRows[i].split(',');
            let tmpRow = {};
            for (let j = 0 ; j < currentLine.length ; j ++) {
                if (currentLine[j] == "") currentLine[j] = 0;

                if (headers[j] == "Timestamp")
                    tmpRow[headers[j]] = new Date( Date.parse(currentLine[j]) );
                else if (headers[j] != "Sensor")
                    tmpRow[headers[j]] = parseFloat(currentLine[j]);
                else tmpRow[headers[j]] = currentLine[j];
            }
            dfSinaica.push(tmpRow);
        }
        dfSinaica.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.Timestamp) - new Date(a.Timestamp);
          });
        console.log(dfSinaica);
        for (let i = 0 ; i < dfSinaica.length ; i++)
            if (dfSinaica[i]["Sensor"] == 0) {
                dfSinaica.splice(i, 1); 
                i--; 
            }
    }


