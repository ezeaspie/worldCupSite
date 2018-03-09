const express = require('express');
const app = express();
const fetch = require("node-fetch");

app.use(express.static("dist"));

app.get("/", (req,res) => {
  res.render("index.ejs");
});

app.get("/tournament", (req,res) => {
  res.render("tournament.ejs");
});

app.get("/matchinfo", (req,res) => {
  //fetch stuff
  let tableData = [];
  let groupA = "";
  let groupB = "";
  let groupC = "";
  let groupD = "";
  let groupE = "";
  let groupF = "";
  let groupG = "";
  let groupH = "";

  generateTable = (tableData, name) => {
    const sortTable = (data) => {
      return   data.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
    }

    let sortedTable = sortTable(tableData);

    let html = `
    <h3>Group ${name}</h3>
    <table>
      <tr class="headings">
        <th class="pos">POS</th>
        <th class="team">Team</th>
        <th class="gf">GF</th>
        <th class="ga">GA</th>
        <th class="gd">GD</th>
        <th class="pts">PTS</th>
      </tr>`

    let position = 1;

    for (i=0 ; i<4 ; i++) {
      html +=
      `<tr class="row${i}">
        <td class="pos">${position}</td>
        <td class="team">${sortedTable[i].team}</td>
        <td class="gf">${sortedTable[i].goals}</td>
        <td class="ga">${sortedTable[i].goalsAgainst}</td>
        <td class="gd">${sortedTable[i].goalDifference}</td>
        <td class="pts">${sortedTable[i].points}</td>
      </tr>`;
      position++;
    }

    html += "</table>";

    return html;
  }

  fetch("http://api.football-data.org/v1/competitions/467/leagueTable", {
    method: "GET",
    headers: {'X-Auth-Token': 'f27b0743b5f543a1afea5327aa1e6776'},
  })
  .then((response) => {return response.json()})
  .then((response) => {
    groupA = generateTable(response.standings.A ,"A");
    groupB = generateTable(response.standings.B ,"B");
    groupC = generateTable(response.standings.C ,"C");
    groupD = generateTable(response.standings.D ,"D");
    groupE = generateTable(response.standings.E ,"E");
    groupF = generateTable(response.standings.F ,"F");
    groupG = generateTable(response.standings.G ,"G");
    groupH = generateTable(response.standings.H ,"H");
    tableData.push(groupA,groupB,groupC,groupD,groupE,groupF,groupG,groupH);
    console.log(tableData);
    res.render("matchinfo.ejs", {tableData});
    });
});

app.get("/teams", (req,res) => {
  res.send("Here are the 32 teams in Russia.");
});

app.get("/teams/:name", (req,res) => {
  let name = req.params.name;
  res.render(`${name}.ejs`);
});

app.get("/qualification", (req,res) => {
  res.send("Here is each team's journey to Russia.");
});

app.get("*", (req,res) => {
  res.send('that page does not exist :(');
});

app.listen("3000", () => {
  console.log('server running at localhost:3000');
});
