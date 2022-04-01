// Program for generating graphs and results for peer collaboration exercise

import Graph from "./Graph.js";
import { Random } from "random-js";
import fs from "fs";

const random = new Random();
var matches = 0;
for (let i = 0; i < 1000; i++) {
  var g = new Graph(random.integer(5, 100));
  g.generateGraph();
  var kruskal_weight = g.kruskal()[3];
  var prim_weight = g.prim(0)[3];
  if (kruskal_weight === prim_weight) {
      matches += 1;
  }
  fs.writeFile(`./GraphFiles/Graphs/${i}.txt`, g.toString(), function (err) {
    if (err) throw err;
  });
  fs.appendFile("./GraphFiles/kruskal_results.txt", kruskal_weight + "\n", function(err) {
    if (err) throw err;
  })
  fs.appendFile("./GraphFiles/prim-results.txt", prim_weight + "\n", function(err) {
    if (err) throw err;
  })
  console.log("Number of matches = " + matches);
}


