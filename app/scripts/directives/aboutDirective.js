'use strict';

angular.module('testingApp')
  .directive('aboutDirective', [ function() {
    return {
          restrict: 'E',
          replace: true,
          scope: {
            data: '='
          },

          link: function(){
            var links = [

              {source: "GrandPa", target: 'E & J Masha', type: 'resolved'},
              /*{source: 'GrandMo', target: 'E & J Masha', type: 'resolved'},

              {source: 'E & J Masha', target: 'Enicah', type: 'licensing'},
              {source: 'E & J Masha', target: 'Congress', type: 'licensing'},
              {source: 'E & J Masha', target: 'Meneka', type: 'licensing'},



              {source: 'Johannes', target: 'E & J Mathebula', type: 'resolved'},
              {source: 'Enicah', target: 'E & J Mathebula', type: 'resolved'},


              {source: 'E & J Mathebula', target: 'William', type: 'licensing'},
              {source: 'E & J Mathebula', target: 'Mpho', type: 'licensing'},
              {source: 'E & J Mathebula', target: 'John', type: 'licensing'},
              {source: 'E & J Mathebula', target: 'Nicolas', type: 'licensing'},
              {source: 'E & J Mathebula', target: 'Thabo', type: 'suit'},
              {source: 'E & J Mathebula', target: 'Tiny', type: 'suit'},
              {source: 'E & J Mathebula', target: 'Maria', type: 'suit'},


              {source: 'Maria', target: 'E & M Mphogo', type: 'resolved'},
              {source: 'Elmon', target: 'E & M Mphogo', type: 'resolved'},

              {source: 'E & M Mphogo', target: 'Ofentse', type: 'suit'},
              {source: 'E & M Mphogo', target: 'Dinorego', type: 'licensing'},
              {source: 'E & M Mphogo', target: 'Lebo', type: 'suit'},

              {source: 'Tiny', target: 'Kgahliso', type: 'licensing'},
              {source: 'Tiny', target: 'Thina', type: 'licensing'},
              {source: 'Tiny', target: 'Kondi', type: 'suit'},

              {source: 'Thabo', target: 'Dimpho', type: 'suit'},
              {source: 'Thabo', target: 'Lehutso', type: 'suit'},
              {source: 'Thabo', target: 'Tsiamo', type: 'licensing'},*/

            ];

              var nodes = {};

            // ComaboutDirectivepute the distinct nodes from the links.
            links.forEach(function(link) {
              link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
              link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
            });

            var width = 960,
                height = 800;

            var force = d3.layout.force()
                .nodes(d3.values(nodes))
                .links(links)
                .size([width, height])
                .linkDistance(100)
                .charge(-500)
                .on("tick", tick)
                .start();

            var svg = d3.select("div").append('svg')
                .attr('width', width)
                .attr('height', height);

            // Per-type markers, as they don't inherit styles.
            svg.append('defs').selectAll('marker')
                .data(['suit', 'licensing', 'resolved'])
              .enter().append('marker')
                .attr('id', function(d) { return d; })
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 15)
                .attr('refY', -1.5)
                .attr('markerWidth', 6)
                .attr('markerHeight', 6)
                .attr('orient', 'auto')
              .append('path')
                .attr('d', 'M0,-5L10,0L0,5');

            var path = svg.append('g').selectAll('path')
                .data(force.links())
              .enter().append('path')
                .attr('class', function(d) { return 'link ' + d.type; })
                .attr('marker-end', function(d) { return 'url(#' + d.type + ')'; });

            var circle = svg.append('g').selectAll('circle')
                .data(force.nodes())
              .enter().append('circle')
                .attr('r', 6)
                .call(force.drag);

            var text = svg.append('g').selectAll('text')
                .data(force.nodes())
              .enter().append('text')
                .attr('x', 8)
                .attr('y', '.31em')
                .text(function(d) { return d.name; });

            // Use elliptical arc path segments to doubly-encode directionality.
            function tick() {
              path.attr('d', linkArc);
              circle.attr('transform', transform);
              text.attr('transform', transform);
            }

            function linkArc(d) {
              var dx = d.target.x - d.source.x,
                  dy = d.target.y - d.source.y,
                  dr = Math.sqrt(dx * dx + dy * dy);
              return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
            }

            function transform(d) {
              return 'translate(' + d.x + ',' + d.y + ')';
            }
          }
       };
  }]);
