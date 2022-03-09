import Graph from "../Graph";
import "@testing-library/jest-dom/";
import { Random } from "random-js";

test("Correctness test both algs 10000 random Graphs", () => {
    const random = new Random();
    for (let i = 0; i < 10000; i++) {
        var g = new Graph(random.integer(5,10));
        g.generateRandomGraph();
        var kruskal_weight = g.kruskal()[3];
        var prim_weight = g.prim(0)[4];
        expect(kruskal_weight).toBe(prim_weight);
    }
})

test("Correctness test both algs 100 random large Graphs", () => {
    const random = new Random();
    for (let i = 0; i < 100; i++) {
        var g = new Graph(random.integer(50,100));
        g.generateRandomGraph();
        var kruskal_weight = g.kruskal()[3];
        var prim_weight = g.prim(0)[4];
        expect(kruskal_weight).toBe(prim_weight);
    }
})

test("Correctness test both algs same graph 10000 times", () => {
    const random = new Random();
    var g = new Graph(random.integer(5,10));
    g.generateRandomGraph();
    for (let i = 0; i < 10000; i++) {
        var kruskal_weight = g.kruskal()[3];
        var prim_weight = g.prim(0)[4];
        expect(kruskal_weight).toBe(prim_weight);
    }
})


