const ChartJsImage = require('chartjs-to-image');
const fs = require('fs');
const TypeQuestion = require('./TypeQuestion');

class Profile {

    constructor(mc, tf, m, mw, num, oq) {
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
              label: 'Hisogram profile question bank',
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

        const date = Date.now().toString();
        await myChart.toFile('./charts/chart-' + date + '.png');
    }

    // makes a comparison report between 2 profiles
    compare(anotherProfile) {
        console.log("Profiles comparison report\n");

        // multiple choice
        console.log("Multiple Choice:");
        if (this.mc > anotherProfile.mc) {
            console.log("The first profile has more questions of type multiple choice.");
        } else if (this.mc < anotherProfile.mc) {
            console.log("The second profile has more questions of type multiple choice.");
        } else {
            console.log("Both profiles have the same number of questions of type multiple choice.");
        }

        // true-false
        console.log("True-False:");
        if (this.tf > anotherProfile.tf) {
            console.log("The first profile has more questions of type true-false.");
        } else if (this.tf < anotherProfile.tf) {
            console.log("The second profile has more questions of type true-false.");
        } else {
            console.log("Both profiles have the same number of questions of type true-false.");
        }

        // matching
        console.log("Matching:");
        if (this.m > anotherProfile.m) {
            console.log("The first profile has more questions of type matching.");
        } else if (this.m < anotherProfile.m) {
            console.log("The second profile has more questions of type matching.");
        } else {
            console.log("Both profiles have the same number of questions of type matching.");
        }

        // missing-word
        console.log("Missing-Word:");
        if (this.mw > anotherProfile.mw) {
            console.log("The first profile has more questions of type missing-word.");
        } else if (this.mw < anotherProfile.mw) {
            console.log("The second profile has more questions of type missing-word.");
        } else {
            console.log("Both profiles have the same number of questions of type missing-word.");
        }
        
        // numeric
        console.log("Numeric:");
        if (this.num > anotherProfile.num) {
            console.log("The first profile has more questions of type numeric.");
        } else if (this.num < anotherProfile.num) {
            console.log("The second profile has more questions of type numeric.");
        } else {
            console.log("Both profiles have the same number of questions of type matching.");
        }

        // open-question
        console.log("Open Question:");
        if (this.oq > anotherProfile.oq) {
            console.log("The first profile has more questions of type open-question.");
        } else if (this.oq < anotherProfile.oq) {
            console.log("The second profile has more questions of type open-question.");
        } else {
            console.log("Both profiles have the same number of questions of type open-question.");
        }
    }
};

module.exports = Profile;