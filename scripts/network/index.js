function generateRandomColor() {
  var letters = '456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 12)];
  }
  return color;
}

data = {}
let nodes = new vis.DataSet({});
let edges = new vis.DataSet({});
let i = 0;
let people_to_id = {};

$.getJSON('../../students.json', function(students) {
    for (let person of students) {
        console.log("Adding " + person);
        nodes.add([{id: i, label: person, color: generateRandomColor()}]);
        console.log("Setting " + person + " to " + i + "!");
        people_to_id[person] = i;

        i++;
    }

    $.getJSON('../../database.json', function(data) {
        i = 0;
        for (let person of data.people) {
            for (let like of person.likes) {
                console.log(people_to_id[person.name] + ", " + person.name + " -> " + like + ", "+ people_to_id[like])
                edges.add([{from: people_to_id[person.name], to: people_to_id[like]}]);
            }
        }

        console.log(JSON.stringify(nodes));
        console.log(JSON.stringify(edges));

        // create a network
        var container = document.getElementById('crowded-table');
        var data = {
            nodes: nodes,
            edges: edges
        };

        /* var options = {
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18,
                    avoidOverlap: 1.5
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {
                    enabled: true,
                    iterations: 1000,
                    updateInterval: 25
                }
            }
        }; */
        var options = {
            edges:{
                arrows: {
                    to: {
                        enabled: true,
                        imageHeight: undefined,
                        imageWidth: undefined,
                        scaleFactor: 1,
                        src: undefined,
                        type: "arrow"
                    },
                    length: 200
                }
            },
            physics: {
                // Even though it's disabled the options still apply to network.stabilize().
                solver: "repulsion",
                repulsion: {
                    centralGravity: 0.5,
                    nodeDistance: 400 // Put more distance between the nodes.
                }
            },
            nodes: {
                font: { color: 'white' },
                shape: 'circle',
                widthConstraint: 75,
            }
        };
        var network = new vis.Network(container, data, options);
        network.stabilize();
        network.on("stabilizationIterationsDone", function () {
            network.setOptions( { physics: true } );
        });

        console.log(people_to_id);
    });
});

