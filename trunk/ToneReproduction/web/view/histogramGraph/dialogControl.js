/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var DialogControl = function() {
   $(".divHistogram").draggable();
   
   $(".btnOK").bind("click", this.onHistogramOk)
   $(".btnCancel").bind("click", this.onHistogramCancel);
}

DialogControl.prototype.dispose = function() {
   this.onHistogramCancel = null;
   this.onHistogramOk = null;
}
   
DialogControl.prototype.onHistogramOk = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_OK);
   $(".divDialog div").remove();
}
   
DialogControl.prototype.onHistogramCancel = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_CANCEL);
   $(".divDialog div").remove();
}



