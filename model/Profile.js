const ChartJsImage = require('chartjs-to-image');
const fs = require('fs');
const TypeQuestion = require('./TypeQuestion');

class Profile {

    constructor(name, mc, tf, m, mw, num, oq) {
        this.name = name,
        this.mc = mc;
        this.tf = tf;
        this.m = m;
        this.mw = mw;
        this.num = num;
        this.oq = oq;
    }

    // generate a png chart of a profile and store it in the charts directory
    async visualize() {
        const values = [
            this.mc,
            this.tf,
            this.m,
            this.mw,
            this.num,
            this.oq   
        ]

        const labels = [
            TypeQuestion.MULTIPLE_CHOICE,
            TypeQuestion.TRUE_FALSE,
            TypeQuestion.MATCHING,
            TypeQuestion.MISSING_WORD,
            TypeQuestion.NUMERIC,
            TypeQuestion.OPEN_QUESTION
        ]
        
        const data = {
            labels: labels,
            datasets: [{
              label: 'Hisogram ' + this.name + ' Profile',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)'
              ],
              borderWidth: 1
            }]
        };

        var options = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            }
        }

        const config = {
            type: 'bar',
            data: data,
            options: options
        };

        const myChart = new ChartJsImage();
        myChart.setConfig(config);
        myChart.setWidth(1000).setHeight(500);

        await myChart.toFile('./charts/chart-' + this.name.replace(/\s/g, '-') + '.png');
    }

    createDirectory(directoryPath) {
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
          if (err) {
            console.error('Error creating directory:', err);
          }
        });
      }

    // makes a comparison report between 2 profiles
    compare(otherProfile) {
        console.log('\nProfiles comparison report\n');

        // multiple choice
        console.log('Multiple Choice:');
        if (this.mc > otherProfile.mc) {
            console.log('The ' + this.name + ' profile has more questions of type multiple choice.');
        } else if (this.mc < otherProfile.mc) {
            console.log('The ' + otherProfile.name + ' profile has more questions of type multiple choice.');
        } else {
            console.log('Both profiles have the same number of questions of type multiple choice.');
        }

        // true-false
        console.log('True-False:');
        if (this.tf > otherProfile.tf) {
            console.log('The ' + this.name + ' profile has more questions of type true-false.');
        } else if (this.tf < otherProfile.tf) {
            console.log('The ' + otherProfile.name + ' profile has more questions of type true-false.');
        } else {
            console.log('Both profiles have the same number of questions of type true-false.');
        }

        // matching
        console.log('Matching:');
        if (this.m > otherProfile.m) {
            console.log('The ' + this.name + ' profile has more questions of type matching.');
        } else if (this.m < otherProfile.m) {
            console.log('The ' + otherProfile.name + ' profile has more questions of type matching.');
        } else {
            console.log('Both profiles have the same number of questions of type matching.');
        }

        // missing-word
        console.log('Missing-Word:');
        if (this.mw > otherProfile.mw) {
            console.log('The ' + this.name + ' profile has more questions of type missing-word.');
        } else if (this.mw < otherProfile.mw) {
            console.log('The ' + otherProfile.name + ' profile has more questions of type missing-word.');
        } else {
            console.log('Both profiles have the same number of questions of type missing-word.');
        }
        
        // numeric
        console.log('Numeric:');
        if (this.num > otherProfile.num) {
            console.log('The ' + this.name + ' profile has more questions of type numeric.');
        } else if (this.num < otherProfile.num) {
            console.log('The ' + otherProfile.name + ' profile has more questions of type numeric.');
        } else {
            console.log('Both profiles have the same number of questions of type matching.');
        }

        // open-question
        console.log('Open Question:');
        if (this.oq > otherProfile.oq) {
            console.log('The ' + this.name + ' profile has more questions of type open-question.');
        } else if (this.oq < otherProfile.oq) {
            console.log('The ' + otherProfile.name + ' profile has more questions of type open-question.');
        } else {
            console.log('Both profiles have the same number of questions of type open-question.');
        }

        const labels = [
            this.name + ' profile',
            otherProfile.name + ' profile'
        ]

        const types = [
            TypeQuestion.MULTIPLE_CHOICE,
            TypeQuestion.TRUE_FALSE,
            TypeQuestion.MATCHING,
            TypeQuestion.MISSING_WORD,
            TypeQuestion.NUMERIC,
            TypeQuestion.OPEN_QUESTION
        ]

        const bgColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ];

        const bdColor = [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
        ]

        var options = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            }
        }

        const dirName = './charts/comparison-' + this.name.replace(/\s/g, '-') + '-' + otherProfile.name.replace(/\s/g, '-') + '/';
        this.createDirectory(dirName);

        types.forEach(async type => {
            var values;
            var title = 'Comparison ' + type;
            switch (type) {
                case TypeQuestion.MULTIPLE_CHOICE:
                    values = [
                        this.mc,
                        otherProfile.mc
                    ]
                    break;
                case TypeQuestion.TRUE_FALSE:
                    values = [
                        this.tf,
                        otherProfile.tf
                    ]
                    break;
                case TypeQuestion.MATCHING:
                    values = [
                        this.m,
                        otherProfile.m
                    ]
                    break;
                case TypeQuestion.MISSING_WORD:
                    values = [
                        this.mw,
                        otherProfile.mw
                    ]
                    break;
                case TypeQuestion.NUMERIC:
                    values = [
                        this.num,
                        otherProfile.num
                    ]
                    break;
                case TypeQuestion.OPEN_QUESTION:
                    values = [
                        this.oq,
                        otherProfile.oq
                    ]
                    break;
            }

            const data = {
                labels: labels,
                datasets: [{
                  label: title,
                  data: values,
                  backgroundColor: bgColor,
                  borderColor: bdColor,
                  borderWidth: 1
                }]
            };
    
            const config = {
                type: 'bar',
                data: data,
                options: options
            };

            const myChart = new ChartJsImage();
            myChart.setConfig(config);
    
            await myChart.toFile(dirName + 'chart-' + type + '.png');
        })
    }
};

module.exports = Profile;