// ==================================================================
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
//
// Copyright (c) 2009 C.T.Yeung

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
// ==================================================================
package colorHistogram.com {
	import flash.geom.Point;
	
	// --------------------------------------------------------------------------
	public class HistTable 
	// --------------------------------------------------------------------------
	{
		
		[Bindable] private var table:Array;
		
		// --------------------------------------------------------------------------
		public function HistTable(	startPos:int,
									count:int ):void 
		// --------------------------------------------------------------------------
		{
			init(startPos, count);
		}
		
		// --------------------------------------------------------------------------
		public function init(startPos:int,
							 count:int):void 
		// --------------------------------------------------------------------------
		{
			table = new Array();
			for (var i:int=startPos; i<startPos+count; i++) {
				table.push(new Point(i, 0));
			}
		}
		
		// --------------------------------------------------------------------------
		public function get Table():Array 
		// --------------------------------------------------------------------------
		{
			return table;
		}
		
		// --------------------------------------------------------------------------
		public function setPoint(pt:Point):Boolean 
		// --------------------------------------------------------------------------
		{
			if (( pt.x < Point(table[0]).x) || 
				(pt.x > Point(table[table.length-1]).x))
				return false;
			
			Point(table[pt.x]).y = pt.y;
			return true;
		}
		
		// --------------------------------------------------------------------------
		public function increment (index:int):Boolean 
		// --------------------------------------------------------------------------
		{
			if ((table == null) ||
				(index < Point(table[0]).x)||
				(index > Point(table[table.length-1]).x))
				return false;
				
			Point(table[index]).y ++;
			return true;
		}
		
		// --------------------------------------------------------------------------
		public function decrement (index:int):Boolean 
		// --------------------------------------------------------------------------
		{
			if ((table == null) ||
				(index < Point(table[0]).x)||
				(index > Point(table[table.length-1]).x))
				return false;
				
			Point(table[index]).y --;
			return true;
		}
		
		// --------------------------------------------------------------------------
		public function get StartPos():int 
		// --------------------------------------------------------------------------
		{
			return( table == null )? -1 : int(Point(table[0]).x);
		}
		
		// --------------------------------------------------------------------------
		public function get EndPos():int 
		// --------------------------------------------------------------------------
		{
			return( table == null )? -1 : int(Point(table[table.length-1]).x);
		}
		
		// --------------------------------------------------------------------------
		public function get Sum():Number 
		// --------------------------------------------------------------------------
		{
			if ( table == null )
				return -1;
			
			var sum:Number=0;		
			for ( var i:int=0; i<table.length; i++)
				sum += Point(table[i]).y;
				
			return sum;
		}
		
		// --------------------------------------------------------------------------
		public function get Mode():Point 
		// --------------------------------------------------------------------------
		{
			if(table==null)
				return null;
				
			var mode:int =0;
			var max:Number = 0;
			for (var i:int=0; i<table.length; i++) {
				if ( Point(table[i]).y > max ) {
					mode = i;
					max = Point(table[i]).y;
				}
			}
			var pt:Point = new Point(mode, max);
			return pt;
		}
		
		// --------------------------------------------------------------------------
		public function get Median():int 
		// --------------------------------------------------------------------------
		{
			var sum:Number = this.Sum;
			var count:Number = 0;
			for (var i:int=0; i<table.length; i++) {
				count += Point(table[i]).y;
				if ( count >= sum )
					return i;
			}
			return -1;
		}
		
		// --------------------------------------------------------------------------
		public function get Mean():Number 
		// --------------------------------------------------------------------------
		{
			return (table == null )?-1:( Sum / table.length );
		}
		
		// --------------------------------------------------------------------------
		public function getCount(index:int):Number 
		// --------------------------------------------------------------------------
		{
			try {
				if ( table == null )
					return 0;
				
				return ( Point(table[index]).y );
			}
			catch (e:Error) {}
			return -1;
		}
		
		// --------------------------------------------------------------------------
		public function clear():void 
		// --------------------------------------------------------------------------
		{
			table = null;
		}
		
	}
}