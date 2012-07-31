/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var EVENT_MAIN_MODEL_LOADED = "onEventLoadMainModel";

var EVENT_IMAGE_LOAD_COMPLETE = "onEventImageLoadComplete";
var EVENT_BUTTON_REVERT = "onEventButtonRevert";
var EVENT_COMBO_IMAGE = "onEventComboImage";
var EVENT_BUTTON_HISTOGRAM = "onEventButtonHistogram";
var EVENT_BUTTON_CUMULATIVE = "onEventButtonCumulative";
var EVENT_BUTTON_TOGGLE = "onEventButonToggle";

var EVENT_BUTTON_HISTOGRAM_OK = "onEventButtonHistogramOk";
var EVENT_BUTTON_HISTOGRAM_CANCEL = "onEventButtonHistogramCancel";

// function to dispatch event !
var dispatchEvent = function(eventType) {
    $(document).trigger(eventType);        
    /*  if we want to be a purist....
    var event = document.createEvent('UIEvents');
    event.initEvent(eventType, true, true);
    document.dispatchEvent(event);
    */
}