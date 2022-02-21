import MainNavigaton from "../components/layout/MainNavigation";
import { Container, Accordion, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Centered from "../components/ui/Centered";
import vis from "../images/vis.gif";
import vis2 from "../images/vis2.gif";
import me from "../images/me_walk2.jpg";
import mst from "../images/mst.png";
import gh from "../images/gh.png";
import linkedin from "../images/li.png";
import kruskalimg from "../images/kruskal.jpg";
import primimg from "../images/prim.jpeg";

function AboutPage() {
  return (
    <>
      <MainNavigaton />
      <Container className="pt-5">
        <Centered>
          <h3>About...</h3>
          <Accordion
            defaultActiveKey={["0"]}
            alwaysOpen
            style={{ marginTop: "10px", marginBottom: "50px" }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>This Web Application</Accordion.Header>
              <Accordion.Body>
                <p>
                  VisualMST has been created as the product of a level 4
                  Individual Project at the University of Glasgow.
                </p>

                <p>
                  The aim of the application is provide an interactive platform
                  for users to learn about{" "}
                  <b>minimum spanning tree algorithms</b>. Users will be able to
                  select an algorithm and see a visualisation of it executing.
                  The two algorithms implemented for this project are{" "}
                  <b>Kruskal's Algorithm</b> and <b>Prim's Algorithm</b>.
                </p>

                <p>
                  Please use this application from a desktop for the best
                  experience!
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Minimum Spanning Trees</Accordion.Header>
              <Accordion.Body>
                <p>
                  A Minimum Spanning tree is a subset of the edges of a
                  connected, edge-weighted graph that must follow to the
                  following three criteria.
                </p>
                <ul>
                  <li>All vertices must be connected.</li>
                  <li>There must be no cycles.</li>
                  <li>There must be minimum possible total weight.</li>
                </ul>
                <p>
                  Below we can see an example of a graph with it's minimum
                  spanning tree highlighted in amber, with a minimum total
                  weight of 44. The grey lines represent edges of the graph that
                  were rejected from the minimum spanning tree.
                </p>
                <Image src={mst} style={{width:"80%", margin:"auto", display:"block", marginBottom: "15px"}}/>
                <p>
                  There are a number of algorithms we can use to find the
                  minimum spanning tree of a graph but the two featured here are{" "}
                  <b>Kruskal's Algorithm</b> and <b>Prim's Algorithm</b>.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Kruskal's Algorithm</Accordion.Header>
              <Accordion.Body>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    marginBottom: "30px",
                  }}
                >
                  <div style={{ marginLeft:"20px", width: "60%" }}>
                    <p>
                      Kruskal's Algorithm is an minimum spanning tree algorithm
                      written by Joseph Kruskal in 1956.
                    </p>
                    <p>
                      It is a greedy algorithm as it builds the tree by
                      selecting the lowest weight edge available at each step.
                    </p>
                  </div>
                  <Image
                    src={kruskalimg}
                    style={{ width: "25%", marginLeft: "25px" }}
                  />
                </div>
                <div style={{ alignItems: "center", display: "flex" }}>
                  <Image src={vis2} style={{ width: "50%" }} />
                  <div style={{ width: "50%" }}>
                    <p>The algorithm's steps are as follows:</p>
                    <ol>
                      <li>
                        Sort the edges of the tree by their weight in
                        non-descending order.
                      </li>
                      <li>
                        Take the lowest weight edge and check if it forms a
                        cycle with the tree so far
                        <ul>
                          <li>
                            If cycle is not formed we accept the edge and add it
                            to the spanning tree.
                          </li>
                          <li>If cycle is formed we reject the edge.</li>
                        </ul>
                      </li>
                      <li>
                        Repeat the previous step until there are (n-1) edges in
                        the spanning tree. (n = number of vertices)
                      </li>
                    </ol>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Prim's Algorithm</Accordion.Header>
              <Accordion.Body>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    marginBottom: "15px",
                  }}
                >
                  <Image src={primimg} style={{ width: "20%" }} />
                  <div
                    style={{
                      width: "75%",
                      marginLeft: "15px",
                    }}
                  >
                    <p>
                      Prim's Algorithm (also known as Prim-Jarnik algorithm) is
                      an minimum spanning tree algorithm written by Vojtěch
                      Jarník in 1930 before being rediscovered by Robert Prim in
                      1957.
                    </p>
                    <p>
                      It is also classified as a greedy algorithm as it builds
                      the tree by selecting the lowest weight edge available at
                      each step.
                    </p>
                  </div>
                </div>
                <div style={{ alignItems: "center", display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      marginRight: "15px",
                    }}
                  >
                    <p>The algorithm's steps are as follows:</p>
                    <ol>
                      <li>
                        Choose a starting vertex, add it to the visited set and
                        add its adjacent edges to the queue.
                      </li>
                      <li>
                        Take the vertex which has the lowest edge-weight value
                      </li>
                      <ul>
                        <li>
                          If vertex isn't in the visited set we add it and add its
                          adjacent edges to the queue.
                        </li>
                        <li>
                          If vertex already in the visited set we reject it.{" "}
                        </li>
                      </ul>
                      <li>
                        Repeat the previous step until all vertices are in the
                        visited set.
                      </li>
                    </ol>
                  </div>
                  <Image src={vis} style={{ width: "50%" }} />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>The Developer</Accordion.Header>
              <Accordion.Body>
                <div style={{ alignItems: "center", display: "flex" }}>
                  <div style={{ width: "50%"}}>
                    <p>
                      Hi. I'm Ian, a fourth year Computing Science student at
                      the University of Glasgow.
                    </p>
                    <p>
                      I hope you enjoy using VisualMST, and that it helps you
                      understand minimum spanning tree algorithms a little
                      better!{" "}
                    </p>
                    <Link
                      to={{
                        pathname:
                          "https://www.linkedin.com/in/ian-brown-a164581b7/",
                      }}
                      target="_blank"
                    >
                      <Image src={linkedin} style={{ width: "20%" }} />
                    </Link>
                    <Link
                      to={{ pathname: "https://github.com/ianjbrown" }}
                      target="_blank"
                    >
                      <Image
                        src={gh}
                        style={{ width: "20%", marginLeft: "10px" }}
                      />
                    </Link>
                  </div>
                  <Image src={me} style={{ width: "50%", marginLeft: "15px" }} />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Centered>
      </Container>
    </>
  );
}

export default AboutPage;
