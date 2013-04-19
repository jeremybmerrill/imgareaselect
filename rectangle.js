/*
 * Math functions will be used extensively, so it's convenient to make a few
 * shortcuts
 */    
var abs = Math.abs,
    max = Math.max,
    min = Math.min,
    round = Math.round;


function Rectangle(x1, y1, x2, y2){
  this.x1 = min(x1, x2);
  this.x2 = max(x1, x2);
  this.y1 = min(y1, y2);
  this.y2 = max(y1, y2);
  this.width = this.x2 - this.x1;
  this.height = this.y2 - this.y1;
}
Rectangle.prototype.set = function(obj){
  this.x1 = min(obj.x1, obj.x2);
  this.x2 = max(obj.x1, obj.x2);
  this.y1 = min(obj.y1, obj.y2);
  this.y2 = max(obj.y1, obj.y2);
}
Rectangle.prototype.doesOverlap = function(otherRectangle){
    var left_infringement_amount = 0;
    var right_infringement_amount = 0;
    var top_infringement_amount = 0;
    var bottom_infringement_amount = 0;

    if( (this.x2 > otherRectangle.x1 && this.x1 < otherRectangle.x2) && //infringe from the right
            ((this.y1 >= otherRectangle.y1 && this.y1 <= otherRectangle.y2) ||
            (this.y2 >= otherRectangle.y1 && this.y2 <= otherRectangle.y2)||
            (this.y1 <= otherRectangle.y1 && this.y2 >= otherRectangle.y2))){ 
       //console.log("infringes on the left");
        left_infringement_amount = this.x2 - otherRectangle.x1;
    }
    if((this.x1 < otherRectangle.x2 && this.x2 > otherRectangle.x1) && //infringe from the left
            ((this.y1 >= otherRectangle.y1 && this.y1 <= otherRectangle.y2) ||
            (this.y2 >= otherRectangle.y1 && this.y2 <= otherRectangle.y2)||
            (this.y1 <= otherRectangle.y1 && this.y2 >= otherRectangle.y2))){ 
       //console.log("infringes on the right");
        right_infringement_amount = otherRectangle.x2 - this.x1;
    }
    if( (this.y2 > otherRectangle.y1 && this.y1 < otherRectangle.y2)  && //infringe from the top
            ((this.x1 >= otherRectangle.x1 && this.x1 <= otherRectangle.x2) ||
            (this.x2 >= otherRectangle.x1 && this.x2 <= otherRectangle.x2) ||
            (this.x1 <= otherRectangle.x1 && this.x2 >= otherRectangle.x2))){
       //console.log("infringes on the top");
        top_infringement_amount = this.y2 - otherRectangle.y1;
    }
    if((this.y1 < otherRectangle.y2 && this.y2 > otherRectangle.y1) && //infringe from the bottom
            ((this.x1 >= otherRectangle.x1 && this.x1 <= otherRectangle.x2) ||
            (this.x2 >= otherRectangle.x1 && this.x2 <= otherRectangle.x2)||
            (this.x1 <= otherRectangle.x1 && this.x2 >= otherRectangle.x2))){
       //console.log("infringes on the bottom");
        bottom_infringement_amount = otherRectangle.y2 - this.y1;
    }
    if (top_infringement_amount == 0 && bottom_infringement_amount == 0 && left_infringement_amount == 0 && right_infringement_amount == 0){
        return false;
    }else{
        return {top: top_infringement_amount, 
                bottom: bottom_infringement_amount, 
                left: left_infringement_amount, 
                right: right_infringement_amount,
                };
    }
}

Rectangle.prototype.centerPointDistance = function(otherRectangle){
  thisCenterX = this.x1 + (this.width / 2);
  thisCenterY = this.y1 + (this.height / 2);
  otherCenterX = otherRectangle.x1 + (otherRectangle.width / 2);
  otherCenterY = otherRectangle.y1 + (otherRectangle.height / 2);
  return Math.sqrt( Math.pow(thisCenterX + otherCenterX, 2) + Math.pow(thisCenterY + otherCenterY, 2) );
}

Rectangle.prototype.regenerateWidthAndHeight = function(){
  this.width = abs(this.x2 - this.x1);
  this.height = abs(this.y2 - this.y1);
}

// returns the minimum bounding box of otherSelection and any rectangle recursively within 
// this's size on the `expandDirection` axis in `expandDirection`.
// expandDirection can be 'bottom', 'right', 'left' or 'top', and it's the direction the colliding
// rectangle is coming from, i.e. the opposite direction in which to expand.
// so if a rectangle infringes on the south, expandDirection should be 'n'

//TODO: multiple axes. hold old lcation, see if new location changes one both axes.
// then adjust on those axes for temp_super_bounding_box.
//expand super bounding box to just be the bouding box of those.

Rectangle.prototype.superBoundingBox = function(otherRectangle, allOtherRectangles, movingDirection){
    //var axis =  /left|right|^$/.test(expandDirection) ? 'x' : 'y';
    var my_super_bounding_box = new Rectangle(otherRectangle.x1, otherRectangle.y1, otherRectangle.x2, otherRectangle.y2);

    //temp_bounding_box expands otherRectangle by this's dimensions to find any other rectangles that this could conceivably overlap with when moved.
    var temp_super_bounding_box = new Rectangle(otherRectangle.x1, otherRectangle.y1, otherRectangle.x2, otherRectangle.y2);
    if(/n/.test(movingDirection)){
      temp_super_bounding_box.y1 -= this.height;
      // temp_super_bounding_box.x1 = this.x1;
      // temp_super_bounding_box.x2 = this.x2;
    }else if(/s/.test(movingDirection)){
      temp_super_bounding_box.y2 += this.height;
      // temp_super_bounding_box.x1 = this.x1;
      // temp_super_bounding_box.x2 = this.x2;
    }
    if(/w/.test(movingDirection)){
      temp_super_bounding_box.x1 -= this.width;
      // temp_super_bounding_box.y1 = this.y1;
      // temp_super_bounding_box.y2 = this.y2;
    }else if(/e/.test(movingDirection)){
      temp_super_bounding_box.x2 += this.width;
      // temp_super_bounding_box.y1 = this.y1;
      // temp_super_bounding_box.y2 = this.y2;
    }
    temp_super_bounding_box.regenerateWidthAndHeight();

    console.log("movingDirection", movingDirection);
    //console.log("tsbb", temp_super_bounding_box)
    for(var i=0; i < allOtherRectangles.length; i++){
      otherOtherRectangle = allOtherRectangles[i];
      //console.log("oor", otherOtherRectangle)
      if( temp_super_bounding_box.doesOverlap(otherOtherRectangle)){
        console.log("expanding sbb");
        allOtherOtherRectangles = _(allOtherRectangles).reject(function(r){ return r == otherOtherRectangle });
        my_super_bounding_box.y1 = min(my_super_bounding_box.y1, otherOtherRectangle.y1);
        my_super_bounding_box.y2 = max(my_super_bounding_box.y2, otherOtherRectangle.y2);
        my_super_bounding_box.x1 = min(my_super_bounding_box.x1, otherOtherRectangle.x1);
        my_super_bounding_box.x2 = max(my_super_bounding_box.x2, otherOtherRectangle.x2);
        my_super_bounding_box.regenerateWidthAndHeight();
        if(allOtherOtherRectangles.length > 0){
          my_super_bounding_box = this.superBoundingBox(my_super_bounding_box, allOtherOtherRectangles, movingDirection);
        }else{
          //console.log("base case, not recursing");
        }
      }
    }
    //console.log("return sbb", my_super_bounding_box)
    my_super_bounding_box.regenerateWidthAndHeight();
    return my_super_bounding_box;
}
