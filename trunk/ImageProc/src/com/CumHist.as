package com {
	
	import flash.geom.Point;
	
	public class CumHist extends HistTable {
		
		protected var curve:Array;			// cummulative histogram
		
		public function CumHist(table:Array):void {
			super(Point(table[0]).x, table.length);
			
			curve = new Array();
			var sum:Number=0;
			for ( var i:int=this.StartPos; i<=this.EndPos; i++) {
				this.setPoint(new Point(i, Point(table[i]).y));
				sum += Point(table[i]).y;
				curve.push(new Point(i, sum));
			}
		}
		
		public function get table():Array{
			return curve;
		}
		
		public function set table(points:Array):void {
			curve = points;
		}
		
		public function getY(x:int):Number{
			if ( curve == null )
				return -1;
				
			return Number(Point(curve[x]).y);
		} 
		
		public function setAnchor(x:int,
								 y:int
								 ):void {
								 	
	 	}
	 	
	 	/////////////////////////////////////////////////////
	 	// Auto table correction
	 	
	 	// ------------------------------------------------------------------------------
	 	// Create a smooth gamma curve base on 3 points, boundaries and 50% gray.
	 	// Create an inverse from the normal of 50% (127, 127).
	 	public function autoGama():Boolean {
	 		var pts:Array = new Array [	new Point(this.StartPos, this.StartPos), 
										new Point(this.EndPos, this.EndPos)];
										
			var interpolate:Interpolate = new Interpolate(pts);
			var midPt:Number = this.getY(127) / this.Sum * 255;
	 		interpolate.addAnchor(new Point(127, 127-midPt));	
	 		return true;
	 	}
	 	
	 	public function autoQuarterPts():Boolean {
	 		
	 		return true;
	 	}
	 	
	 	public function autoLinearize():Boolean {
	 		return true;
	 	}
								 
	}
}