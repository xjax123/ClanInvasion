define(['js/lib/d3.min', 'js/btplanets','js/node_modules/d3-delaunay/dist/d3-delaunay.min'], function (d3, btplanets, d3_delaunay) {
    //I really have no idea why this code is set up like this but might as well keep it consistent
    return {
        points: [],
        boundaries:[-600,-600,900,600],
        pointToState: new Map(),
        init: function() {
        },
        generateDiagram : function(){
            const dalaunay = d3_delaunay.Delaunay.from(this.points);
            const voronoi = dalaunay.voronoi(this.boundaries);
            
            var lineFunction = d3.svg.line()
                .x(function(d){return d[0]})
                .y(function(d){return -d[1]})
                .interpolate("linear");

            polygons = []
            for(var i = 0; i < this.points.length; i++)
            {   
                polygon = voronoi.cellPolygon(i);
                if(polygon)
                {
                    polygons.push({points: polygon, center: this.points[i]});
                }
            }
            const me = this;

            d3.json('./data/states.json', function (error, json) {
                if(error) {
                    return console.warn(error);
                }
                var statecolors = new Map();
                statecolors.set()
                    .set('no-record','none')
                    .set('?','none')
                    .set('default','none');
                var states = json;
                for(var i = 0; i < states.length; i++){
                    statecolors.set(states[i].name,states[i].color);
                }
                d3.select('svg.map').selectAll('g.voronoi-border').data(polygons)
                .enter().append("path")
                    .attr("d", function(d){return lineFunction(d.points)})
                    .attr("stroke", "none")
                    .attr("fill-opacity", 0.3)
                    .attr("pointer-events", "none")
                    .attr("fill", function(d){
                        return statecolors.get(me.pointToState.get(d.center));
                    })
                    .classed('voronoi-border',true)
                
            });

            
        },
        putPlanet : function(point, state){
            this.points.push(point);
            this.pointToState.set(point,state);
        }
    }
});