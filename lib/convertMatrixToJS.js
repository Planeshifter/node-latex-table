/**
*
* NAME: convertMatrixToJS
*
*
* DESCRIPTION:
* - Private: Turn Square Matrix (in form of Array of Arrays) to LaTeX table
*
*
* NOTES:
* [1]
*
*
* TODO:
* [1]
*
*
* LICENSE:
* MIT
*
* Copyright (c) 2015. Philipp Burckhardt.
*
*
* AUTHOR:
* Philipp Burckhardt. pburckhardt@outlook.com. 2015.
*
*/

// LOAD MODULES
var isString = require( 'validate.io-string' );

function convertMatrixToJS(arr, options){
  var pos, spec, begin, end, table, ret, errorMsg;
  var caption = "", label = "";
  var captionPlacement = "bottom";

  pos = "";
  spec = "|" + new Array(arr[0].length + 1).join("c") + "|";

  if ( options.hasOwnProperty("pos") === true ){
    pos = "[" + options.pos + "]";
  }

  if ( options.hasOwnProperty("caption") === true ){
    if ( !isString(options.caption) ){
      throw new TypeError("latex()::invalid caption property. Has to be a string.");
    }
    caption = "\\caption{" + options.caption + "}";
  }

  if ( options.hasOwnProperty("captionPlacement") === true ){
    if (! (options.captionPlacement === "bottom" || options.captionPlacement === "top" ) ){
      errorMsg = "latex()::invalid captionPlacement property. Has to be a either 'top' or 'bottom'";
      throw new TypeError(errorMsg);
    }
    captionPlacement = options.captionPlacement;
  }

  if ( options.hasOwnProperty("label") === true ){
    if ( !isString(options.label) ){
      throw new TypeError("latex()::invalid label property. Has to be a string.");
    }
    label = "\\label{" + options.label + "}";
  }

  // assemble LaTeX code:
  begin = "\\begin{table}" + pos + "\n\\centering \n";

  if( captionPlacement === "top" ){
    begin += caption;
  }

  begin  += "\\begin{tabular}{" + spec + "} \n";
  table = "";

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[0].length - 1; j++){
      table += arr[i][j] + " & ";
    }
    table += arr[i][j] + " \\\\ \n";
  }

  end = "\\end{tabular} \n";

  if( captionPlacement === "bottom" ){
    end += caption;
  }

  end += label;
  end += "\\end{table}";
  ret = begin + table + end;
  return ret;
}

// EXPORTS
module.exports = exports = convertMatrixToJS;