// ==================================================================
// Copyright (c) 1998, 1999, 2000 Thai Open Source Software Center Ltd

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// Module:		colorHistogramDemo.as
//
// Description:	demonstrate the color histogram component
//
// Input:		bitmapData
// Output:		bitmapData - color corrected
//
// Author(s):	C.T. Yeung			cty
//
// History:
// 15Jul08		Basic functionality v.5.0						cty
// 24Dec08		Using BitmapData.palette() method instead of
//				walking pixels manually.						cty
// 18Feb09		Bug fix, requantize curve out of bound values 	cty
// ==================================================================
package colorHistogram.com {
	
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