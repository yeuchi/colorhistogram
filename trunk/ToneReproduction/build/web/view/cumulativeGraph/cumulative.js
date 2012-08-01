
var Cumulative = function() {
   
}

Cumulative.prototype.init = function () {
   $('.knot').draggable();
   $('.graph').droppable({
       drop: function( event, ui ) {

       }
   })
}

