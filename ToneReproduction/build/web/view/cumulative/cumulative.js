/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Cumulative = function() {
   
}

Cumulative.prototype.init = function () {
   $('.knot').draggable();
   $('.graph').droppable({
       drop: function( event, ui ) {

       }
   })
}

