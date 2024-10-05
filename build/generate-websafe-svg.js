/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/* global exports */
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
function SwatchSvg() {
  const HEIGHT = 24;
  this.x = 0;
  this.y = 0;
  this.slack = 0;
  this.output = "";
  this.columns = 7;
  this.width = HEIGHT + 80;
  this.totalheight = 0;
  this.separateRow = function() {
    if(this.x > 0) {
      this.y += 1;
      this.x = 0;
    }
    this.slack += HEIGHT / 2;
  };
  this.addSwatch = function(color, name) {
    const cname = name !== null && typeof name !== "undefined" ? name : color;
    const svgx = this.x * this.width;
    let svgy;
    if (typeof cname === "undefined" || cname === null || cname == color) {
      svgy = this.y * HEIGHT + this.slack;
      this.totalheight = Math.max(this.totalheight, svgy + HEIGHT + this.slack + 4);
      this.output += "<rect x='" + (svgx + 2) + "' y='" + (svgy + 2) + "' width='" + (HEIGHT - 4) + "'" +
    " height='" + (HEIGHT - 4) + "' style='stroke:black;stroke-width:1px;" +
    " fill:" + color + "'/><text x='" + (svgx + HEIGHT) + "' y='" + (svgy + HEIGHT - 2) + "'" +
    " width='" + (this.width - HEIGHT - 2) + "' height='" + (HEIGHT - 4) + "'" +
    " style='font-size:" + (HEIGHT - 4) * 8 / 10 + "px;color:currentColor'>" +
    "<tspan>" + color + "</tspan></text>\n";
    } else {
      const ht = HEIGHT * 1.5;
      svgy = this.y * ht + this.slack;
      this.totalheight = Math.max(this.totalheight, svgy + ht + this.slack + 4);
      this.output += "<rect x='" + (svgx + 2) + "' y='" + (svgy + 2) + "' width='" + (HEIGHT - 4) + "'" +
    " height='" + (ht - 4) + "' style='stroke:black;stroke-width:1px;" +
    " fill:" + color + "'/><text x='" + (svgx + HEIGHT) + "' y='" + (svgy + ht / 2.0 - 4) + "'" +
    " width='" + (this.width - HEIGHT - 2) + "' height='" + (ht / 2.0 - 4) + "'" +
    " style='font-size:" + (ht / 2.0 - 4) * 9 / 10 + "px;color:currentColor'>" +
    "<tspan>" + cname + "</tspan></text><text x='" + (svgx + HEIGHT) + "' y='" + (svgy + ht - 4) + "'" +
    " width='" + (this.width - HEIGHT - 2) + "' height='" + (ht / 2.0 - 4) + "'" +
    " style='font-size:" + (ht / 2.0 - 4) * 9 / 10 + "px;color:currentColor'>" +
    "<tspan>" + color + "</tspan></text>\n";
    }
    this.x += 1;
    if (this.x >= this.columns) {
      this.y += 1;
      this.x = 0;
    }
  };
  this.toString = function() {
    const svgx = this.columns * this.width;
    const svgy = this.totalheight;
    const head = "<svg width='" + svgx + "' height='" + svgy + "' xmlns='http://www.w3.org/2000/svg'>\n";
    return head + this.output + "</svg>";
  };
}

function generateSvg() {
  const webcolors = [
    "#FFFFFF #CCCCCC #999999 #666666 #333333 #000000".split(" "),
    "#FF0000 #FF3333 #FF6666 #FF9999 #FFCCCC #CC0000 #CC3333 #CC6666 #CC9999 #990000 #993333 #996666 #660000 #663333 #330000".split(" "),
    "#FF3300 #FF6633 #CC3300 #FF9966 #CC6633 #993300 #FF6600 #CC9966 #FF9933 #CC6600 #663300 #FFCC99 #996633 #FF9900 #CC9933 #FFCC66 #996600 #CC9900 #FFCC33 #FFCC00".split(" "),
    "#FFFF00 #FFFF33 #FFFF66 #FFFF99 #FFFFCC #CCCC00 #CCCC33 #CCCC66 #CCCC99 #999900 #999933 #999966 #666600 #666633 #333300".split(" "),
    "#CCFF00 #CCFF33 #99CC00 #CCFF66 #669900 #99CC33 #99FF00 #99FF33 #CCFF99 #66CC00 #99CC66 #669933 #336600 #66FF00 #339900 #99FF66 #66CC33 #66FF33 #33CC00 #33FF00 #00FF00 #33FF33 #66FF66 #99FF99 #CCFFCC #00CC00 #33CC33 #66CC66 #99CC99 #009900 #339933 #669966 #006600 #336633 #003300 #00FF33 #33FF66 #00CC33 #66FF99 #33CC66 #009933 #00FF66 #33FF99 #99FFCC #00CC66 #66CC99 #339966 #006633".split(" "),
    "#00FF99 #33CC99 #66FFCC #009966 #33FFCC #00CC99 #00FFCC #00FFFF #33FFFF #66FFFF #99FFFF #CCFFFF #00CCCC #33CCCC #66CCCC #99CCCC #009999 #339999 #669999 #006666 #336666 #003333 #00CCFF #33CCFF #0099CC #66CCFF #006699 #3399CC #0099FF #3399FF #99CCFF #0066CC #6699CC #336699 #003366 #0066FF #3366CC #003399 #6699FF #3366FF #0033CC #0033FF #0000FF #3333FF #6666FF #9999FF #CCCCFF #0000CC #3333CC #6666CC #9999CC #000099 #333399 #666699 #000066 #333366 #000033 #3300FF #6633FF #3300CC".split(" "),
    "#9966FF #6633CC #330099 #6600FF #9933FF #CC99FF #6600CC #9966CC #663399 #330066 #9900FF #9933CC #CC66FF #660099 #CC33FF #9900CC #CC00FF".split(" "),
    "#FF00FF #FF33FF #FF66FF #FF99FF #FFCCFF #CC00CC #CC33CC #CC66CC #CC99CC #990099 #993399 #996699 #660066 #663366 #330033 #FF00CC #FF33CC #CC0099 #FF66CC #CC3399 #990066 #FF0099 #FF3399 #FF99CC #CC0066 #CC6699 #993366 #660033 #FF0066 #FF6699 #CC3366 #990033 #FF3366 #CC0033 #FF0033".split(" ")
  ];

  const svg = new SwatchSvg();
  let i;
  for (i = 0; i < webcolors.length; i++) {
    webcolors[i].forEach((c) => svg.addSwatch(c));
    if (i + 1 < webcolors.length)svg.separateRow();
  }
  return svg.toString();
}

function generateColorNameSvg() {
  const colornames = "aliceblue,f0f8ff,antiquewhite,faebd7,aqua,00ffff,aquamarine,7fffd4,azure,f0ffff,beige,f5f5dc,bisque,ffe4c4,black,000000,blanchedalmond,ffebcd,blue,0000ff," +
"blueviolet,8a2be2,brown,a52a2a,burlywood,deb887,cadetblue,5f9ea0,chartreuse,7fff00,chocolate,d2691e,coral,ff7f50,cornflowerblue,6495ed,cornsilk,fff8dc," +
"crimson,dc143c,cyan,00ffff,darkblue,00008b,darkcyan,008b8b,darkgoldenrod,b8860b,darkgray,a9a9a9,darkgreen,006400,darkkhaki,bdb76b,darkmagenta,8b008b," +
"darkolivegreen,556b2f,darkorange,ff8c00,darkorchid,9932cc,darkred,8b0000,darksalmon,e9967a,darkseagreen,8fbc8f,darkslateblue,483d8b,darkslategray,2f4f4f," +
"darkturquoise,00ced1,darkviolet,9400d3,deeppink,ff1493,deepskyblue,00bfff,dimgray,696969,dodgerblue,1e90ff,firebrick,b22222,floralwhite,fffaf0,forestgreen," +
"228b22,fuchsia,ff00ff,gainsboro,dcdcdc,ghostwhite,f8f8ff,gold,ffd700,goldenrod,daa520,gray,808080,green,008000,greenyellow,adff2f,honeydew,f0fff0,hotpink," +
"ff69b4,indianred,cd5c5c,indigo,4b0082,ivory,fffff0,khaki,f0e68c,lavender,e6e6fa,lavenderblush,fff0f5,lawngreen,7cfc00,lemonchiffon,fffacd,lightblue,add8e6," +
"lightcoral,f08080,lightcyan,e0ffff,lightgoldenrodyellow,fafad2,lightgray,d3d3d3,lightgreen,90ee90,lightpink,ffb6c1,lightsalmon,ffa07a,lightseagreen,20b2aa," +
"lightskyblue,87cefa,lightslategray,778899,lightsteelblue,b0c4de,lightyellow,ffffe0,lime,00ff00,limegreen,32cd32,linen,faf0e6,magenta,ff00ff,maroon,800000," +
"mediumaquamarine,66cdaa,mediumblue,0000cd,mediumorchid,ba55d3,mediumpurple,9370d8,mediumseagreen,3cb371,mediumslateblue,7b68ee,mediumspringgreen," +
"00fa9a,mediumturquoise,48d1cc,mediumvioletred,c71585,midnightblue,191970,mintcream,f5fffa,mistyrose,ffe4e1,moccasin,ffe4b5,navajowhite,ffdead,navy," +
"000080,oldlace,fdf5e6,olive,808000,olivedrab,6b8e23,orange,ffa500,orangered,ff4500,orchid,da70d6,palegoldenrod,eee8aa,palegreen,98fb98,paleturquoise," +
"afeeee,palevioletred,d87093,papayawhip,ffefd5,peachpuff,ffdab9,peru,cd853f,pink,ffc0cb,plum,dda0dd,powderblue,b0e0e6,purple,800080,rebeccapurple,663399,red,ff0000,rosybrown," +
"bc8f8f,royalblue,4169e1,saddlebrown,8b4513,salmon,fa8072,sandybrown,f4a460,seagreen,2e8b57,seashell,fff5ee,sienna,a0522d,silver,c0c0c0,skyblue,87ceeb," +
"slateblue,6a5acd,slategray,708090,snow,fffafa,springgreen,00ff7f,steelblue,4682b4,tan,d2b48c,teal,008080,thistle,d8bfd8,tomato,ff6347,turquoise,40e0d0,violet," +
"ee82ee,wheat,f5deb3,white,ffffff,whitesmoke,f5f5f5,yellow,ffff00,yellowgreen,9acd32";

  const cn = colornames.split(/,/);
  const svg = new SwatchSvg();
  svg.width = 150;
  svg.columns = 5;
  let i = 0; while(i < cn.length) {
    svg.addSwatch("#" + cn[i + 1], cn[i]);
    i += 2;
  }
  return svg.toString();
}
exports.generateSvg = generateSvg;
exports.generateColorNameSvg = generateColorNameSvg;
