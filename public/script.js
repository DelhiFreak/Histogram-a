baseurl = "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query="
format = "&format=json&sort_date=y&pageSize=1000&cursorMark=" //&resulttype=idlist
cursorMark= "*"

lpc = 1;

papers_count = []
bpapers = []
// best_paper = {}
years = []
citations = []

function yearsList()
{
  s = parseInt($("#s").val())
  e = parseInt($("#e").val())
  list = []
  for(let i=s;i<=e;i++)
    {
     list.push(i)
    }
  return list
}

function formatter(){
  return 'The value for <b>'+ this.x + '</b> is <b>'+ this.y +'</b>';
}

$("#trigger").click(() => {

  t = $("#t").val()
  s = $("#s").val()
  e = $("#e").val()

  years = yearsList()
  $.get('http://localhost:3000/query/' + s + '&' + e + '&' + t , (rs)=>{
      results = rs.filter(r=> r.length>1)
      for(let i=0;i<results.length;i++){

        papers_count[i] = parseInt(results[i].split('>')[0])
        bpapers[i] = results[i].split('>')[1]
        citations[i] = results[i].split('>')[2]
      }
      Highcharts.chart('container', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Number of papers published'
          },
          subtitle: {
              text: 'Each year'
          },
          xAxis: {
              categories: years,
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Papers Published'
              }
          },
          tooltip:
          {
            formatter: function () {
                var total = '<b>' + this.x + '</b>';
                var year = this.x;
                    $.each(this.points, function (i, point) {
                        total += '<br/>' + point.series.name + ': <b>' + point.y +'</b>';
                        total += '<br/> Paper Title: <b>' + bpapers[parseInt(point.x) - s] + '</b>';
                        total += '<br/> Citations #: <b>' + citations[parseInt(point.x) - s] + '</b>';
                    });
                return total;
            },
            shared: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          },
          series: [{
              name: 'Papers count',
              data: papers_count,
          }]
      });

  })


})
