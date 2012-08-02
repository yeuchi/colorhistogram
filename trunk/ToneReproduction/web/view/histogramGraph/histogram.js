
$(document).ready(function() {
   
   var barGraph = new BarGraph();
   var dlgControl = new DialogControl();
   
   // not sure why we render 2x at initial.
   barGraph.render();                     // draw histogram
   loadInfo("assets/histogram.json");
});


