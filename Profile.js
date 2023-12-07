const ChartJsImage = require('chartjs-to-image');
const fs = require('fs');

class Profile {

    constructor(mc, tf, m, mw, num, oq) {
        this.mc = mc;
        this.tf = tf;
        this.m = m;
        this.mw = mw;
        this.num = num;
        this.oq = oq;
    }

    // createAverageProfile(questionBank) {
    //     this.mc = 0;
    //     this.tf = 0;
    //     this.m = 0;
    //     this.mw = 0;
    //     this.num = 0;
    //     this.oq = 0;
    //     questionBank.questions.forEach(question => {
    //         switch (question.typeQuestion) {
    //             case TypeQuestion.MULTIPLE_CHOICE:
    //                 this.mc++;
    //                 break;
    //             case TypeQuestion.TRUE_FALSE:
    //                 this.tf++;
    //                 break;
    //             case TypeQuestion.MATCHING:
    //                 this.m++;
    //                 break;
    //             case TypeQuestion.MISSING_WORD:
    //                 this.mw++;
    //                 break;
    //             case TypeQuestion.NUMERIC:
    //                 this.num++;
    //                 break;
    //             case TypeQuestion.OPEN_QUESTION:
    //                 this.oq++;
    //                 break;
    //         }
    //     });
    // }

    // create histogram
    visualize() {

    }
    // generate a png chart of a profile
    async generateComparisonChart(otherProfile) {
        const dataThisProfile = {
            profile: "first profile",
            multipleChoice: this.mc,
            trueFalse: this.tf,
            matching: this.m,
            missingWord: this.mw,
            numeric: this.num,
            openQuestion: this.oq   
        }

        const dataOtherProfile = {
            profile: "second profile",
            multipleChoice: otherProfile.mc,
            trueFalse: otherProfile.tf,
            matching: otherProfile.m,
            missingWord: otherProfile.mw,
            numeric: otherProfile.num,
            openQuestion: otherProfile.oq   
        }

        const jsonThisProfile = JSON.stringify(dataThisProfile);
        const jsonOtherProfile = JSON.stringify(dataOtherProfile);

        console.log(jsonThisProfile);
        console.log(jsonOtherProfile);

        const data = [jsonThisProfile, jsonOtherProfile];

        const labels = ['First profile', 'Second profile'];
        const values = [this.mc, otherProfile.mc];
        
        const dataMC = {
            labels: labels,
            datasets: [{
              label: 'Multiple Choice comparison',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)'
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
                        max: 50,
                        min: 0
                    }
                }]
            }
        }

        const config = {
            type: 'bar',
            data: dataMC,
            options: options
          };

        const myChart = new ChartJsImage();
        myChart.setConfig(config);
        myChart.setWidth(500).setHeight(300);

        await myChart.toFile('./charts/chart.png');
    }
};

module.exports = Profile;