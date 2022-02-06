import Graph from "./year4/proj/src/datastructures/Graph";
import { Random } from "random-js";
const random = new Random();
var g = new Graph(random.integer(5,15));
console.log(g);