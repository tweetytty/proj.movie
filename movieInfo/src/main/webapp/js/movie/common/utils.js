
/**
 * HashMap constructor
 * 
 * @returns
 */
function HashMap() {
	this.length = 0;
	this.keys = [];	// an array to keep the order of keys and to prevent from sorting automatically
	this.items = {};
	
	this.addItem = function (key, value) {
		var item = undefined;
		if ( this.hasItem(key) ) {
			item = this.items[key];
		} else {
			this.length++;
			this.keys.push(key);
		}

		this.items[key] = value;
		return item;
	};
	
	this.hasItem = function (key) {
		return this.items.hasOwnProperty(key);
	};
	
	this.getItem = function (key) {
		var item = undefined;
		if ( this.hasItem(key) ) {
			item = this.items[key];
		} 
		
		return item;
	};
	
	this.removeItem = function (key) {
		var item = undefined;
		if( this.hasItem(key) ) {
			item = this.items[key];
			this.length--;
			delete this.items[key];
			this.keys.splice(this.getKeyIndexOf(key.toString()), 1);
		} 
		
		return item;
	};
	
	this.getKeys = function () {
		var keys = [];

		for (var i = 0; i < this.keys.length; i++) {
			keys.push(this.keys[i]);
		}

		return keys;
	};
	
	this.getKeyIndexOf = function (key) {
		var index = -1;
		
		for (var i = 0; i < this.keys.length; i++) {
			if (this.keys[i].toString() == key.toString()) {
				index = i;
				break;
			}
		}
		
		return index;
	};
	
	this.getValues = function () {
		var values = [];
		for (var i = 0; i < this.keys.length; i++) {
			var key = this.keys[i];
			if (this.hasItem(key)) {
				values.push( this.items[key] );
			}
		}
		
		return values;
	};
	
	this.clear = function () {
		this.items = {};
		this.keys = [];
		this.length = 0;
	};
	
	this.insert = function (idx, newKey, newValue) {
		
		var newItems = {};
		for (var i = 0; i < this.keys.length; i++) {
			var key = this.keys[i];
			if (i == idx) {
				// if newKey already exist, 
				// remove the previous one and insert the newValue with newKey
				if ( this.hasItem(newKey) ) {
					this.removeItem(newKey);
				}

				newItems[newKey] = newValue;
				this.keys.splice(i, 0, newKey);
				this.length++;
			}
			
			if (key != newKey) {
				newItems[key] = this.items[key];
			}
		}
		
		this.items = null;
		this.items = newItems;
	};
}


/**
 * Rectangle constructor 
 * 
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns
 */
function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function Position (x, y) {
	this.x = x;
	this.y = y;
}

function numberToHex(number, min)
{
	var hex = number.toString(16);
	var length = hex.length;
	if (length < min) {
		for (var i=0; i < min - length; i++) {
			hex = "0" + hex;
		}			
	}		
	
	return hex;
}

function hexToNumber(hex) {
	var hexString = hex.toString();
	var number = 0;
	for (var i = 0; i < hexString.length; i++) {
		var char = hexString.charAt(i);
		if (char != null && char != undefined && char != "#") {
			var index = hexString.length - i - 1;	// actual index
			number += parseInt(char, 16) * Math.pow(16, index);
		}
	}
	
	return number;
}

function xmlToString(xmlNode) {
	var text = "";
	if (window.XMLSerializer) {
		text = (new XMLSerializer()).serializeToString(xmlNode);
	} else {
		text = xmlNode.xml;
	}
	
	return text;
}

function stringToXml(string) {
	var xmlDoc;
	if (window.DOMParser) {
		xmlDoc = (new DOMParser()).parseFromString(string, 'text/xml'); 
	} else {
		xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
		xmlDoc.async = 'false';
		xmlDoc.loadXML(string);
	}
	return xmlDoc;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// open xml file
function getXmlDoc(path) {

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    	xmlhttp = new XMLHttpRequest();			
    } else {// code for IE6, IE5
    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");	    		
    }

    xmlhttp.open("GET", path, false);
    xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded'); 
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xmlhttp.setRequestHeader('Access-Control-Allow-Headers','origin, x-requested-with, content-type, content-type, accept');

  	xmlhttp.send();
  	var xmlDoc = xmlhttp.responseXML; 

  	return xmlDoc; 
}

function getXmlHttpRequest() {
	var xmlHttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	return xmlHttp;
}

function getEventTarget(event) {
	var target;
	if (event.target) {
		target = event.target;
	} else {
		target = event.srcElement;
	}
	
	return target;
}

function preventEventDefault(event) {
	if(event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}


/**
 * If error, return null 
 * @param element
 * @returns
 */
function getRgbValueFromCssRgb (element) {
	var rgbObject = function() {
			this.red,
			this.green,
			this.blue
	};
	
	try {
		var compStyle = window.getComputedStyle (element, null);
		var value = compStyle.getPropertyCSSValue ("color");
		var valueType = value.primitiveType;
		if (valueType == CSSPrimitiveValue.CSS_RGBCOLOR) {
			var rgb = value.getRGBColorValue ();
			
			rgbObject.red = rgb.red.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
			rgbObject.green = rgb.green.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
			rgbObject.blue = rgb.blue.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
			
		}
		else {
			// do nothing and return null
			rgbObject = null; 
		}
	} catch (e) {
		// do nothing and return null
		rgbObject = null;
	}
	
	return rgbObject;
}

function getRootUrl() {
	var defaultPorts = {"http:":80,"https:":443};

	return window.location.protocol + "//" + window.location.hostname
	+ (((window.location.port)
			&& (window.location.port != defaultPorts[window.location.protocol]))
			? (":"+window.location.port) : "");
}

/**
 * trace errors or print message
 * @param String msg
 */
function trace(msg) {
	try {
		console.log(msg);
	} catch (e) {
		comm.alert(msg);
	}
}

function resize(comp, width, height) {
	comp.width = width;
	comp.height = height;
	comp.style.width = width.toString() + "px";
	comp.style.height = height.toString() + "px";

}

function printObject(obj) {
	var string = "";
	string += obj.constructor + "\n";

	for (var property in obj) {
		string +=  property + ": " + obj[property] + "\n";
	}
	
	trace("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	trace(string);
	trace("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
}

function getConfigValue(elementName) {
	var configXmlUrl = getRootUrl() + "/EzSign_Editor_3.0/assets/config.xml";

	var xmlhttp = getXmlHttpRequest();
  	xmlhttp.open("GET", configXmlUrl, false);
  	xmlhttp.send();
  	
  	var xmlDoc = xmlhttp.responseXML;
  	var elementValue = xmlDoc.getElementsByTagName(elementName)[0].childNodes[0].nodeValue;
  	
	return elementValue;
}

function stringToBoolean(str){
	var result = false;
	if(str == null || str == undefined){
		result = false;
	}else{
		str = str.trim().toLowerCase();
		if(str == "true"){
			result = true;
		}else{
			result = false;
		}
	}
	return result;
}

///////////////////////////////////////////////////////////////////////
//[XML Document into a XML DOM object]
function loadXml(xmlFileName){
	
	//code for IE7+, FireFox, Chrome, Opera, Safari
	if( window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
	
	//async 
	xmlhttp.open("GET", xmlFileName, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	
	return xmlDoc;
}//[END] XML Document int a XML DOM object..////////////////////////////



function getDirectoryPath(){
	
	return window.location.pathname;
}

//To change image on hover event
function setStyleOnHover(target_jqueryObj) {
	if( !target_jqueryObj.hasClass('hover') ) {
		target_jqueryObj.addClass('hover');
	}
}

// To release the changed images on any event
function releaseHoverStyle(target_jqueryObj) {
	if( target_jqueryObj.hasClass('hover') ) {
		target_jqueryObj.removeClass('hover');
	}
}


// To change image on active event
function setStyleOnActive(target_jqueryObj) {
	if( !target_jqueryObj.hasClass('active') ) {
		target_jqueryObj.addClass('active');
	}
}

// To release the changed images on any event
function releaseActiveStyle(target_jqueryObj) {
	if( target_jqueryObj.hasClass('active') ) {
		target_jqueryObj.removeClass('active');
	}
}

// To add active style class at once
function setActiveStyle(target_jqueryObj) {
	target_jqueryObj.mousedown(
			function() {
				setStyleOnActive(target_jqueryObj);
			}
	).mouseup(
			function() {
				releaseActiveStyle(target_jqueryObj);
			}
	);
}


function getCaretPosition(el) { 
	if (el.selectionStart) { 
		return el.selectionStart; 
	} else if (document.selection) { 
		el.focus(); 

		var r = document.selection.createRange(); 
		if (r == null) { 
			return 0; 
		} 

		var re = el.createTextRange(), 
		rc = re.duplicate(); 
		re.moveToBookmark(r.getBookmark()); 
		rc.setEndPoint('EndToStart', re); 

		return rc.text.length; 
	}  
	return 0; 
}

function getCaretPositionInLine(el, line) {
	var caretPosition = getCaretPosition(el);
	
	// find out the line
	var html_org = $('#'+el.id).html();
	var html_lines = html_org.split("\n");
		
	var offset = 0;
	for (var i = 0; i < html_lines.length; i++) {
		if (line == i) {
			caretPosition = caretPosition - offset;
			break;
		}
		
		offset = offset + (html_lines[i].length + 1);
	}
	
	return caretPosition;
}

$.fn.caretInLineOf = function () {
	var caretPosition = getCaretPosition(document.getElementById($(this).attr("id")));
	
	// find out the line
	var html_org = $(this).html();
	var html_lines = html_org.split("\n");
	var offset = 0;
	for (var i = 0; i < html_lines.length; i++) {
		offset = offset + (html_lines[i].length + 1);
		if (caretPosition < offset) {
			return i;
		}
	}
	
	return -1;
};


$.fn.textWidth = function(){
	var html_org = $(this).html();
	
	var html_lines = html_org.split("\n");
	
	var maxWidth = 0;
	for (var i = 0; i < html_lines.length; i++) {
		
		var span = document.createElement("span");
		span.id = "spanForTextWidth";
		span.style.left = "-9999px";
		span.style.position = "absolute";
		span.innerHTML = html_lines[i];
		
		// set the style same
		span.style.fontFamily = $(this).css("font-family");
		span.style.fontSize = $(this).css("font-size");
		span.style.fontWeight = $(this).css("font-weight");
		span.style.fontStyle = $(this).css("font-style");
		span.style.textDecoration = $(this).css("text-decoration");
		span.style.color = $(this).css("color");
		span.style.textAlign = $(this).css("text-align");
//		span.style.lineHeight = $(this).css("line-height");
		span.style.direction = $(this).css("direction");
		
		document.body.appendChild(span);
		
		var width = $('#spanForTextWidth').width();
		document.body.removeChild(span);
		
		if (maxWidth < width) maxWidth = width;
	
	}
	
	return maxWidth;
};


$.fn.textWidthWithRange = function(line, from, to){
	var html_org = $(this).html();
	
	var html_lines = html_org.split("\n");
	
	var span = document.createElement("span");
	span.id = "spanForTextWidth";
	span.style.left = "-9999px";
	span.style.position = "absolute";
	span.innerHTML = html_lines[line].substring(from, to);
	
	// set the style same
	span.style.fontFamily = $(this).css("font-family");
	span.style.fontSize = $(this).css("font-size");
	span.style.fontWeight = $(this).css("font-weight");
	span.style.fontStyle = $(this).css("font-style");
	span.style.textDecoration = $(this).css("text-decoration");
	span.style.color = $(this).css("color");
	span.style.textAlign = $(this).css("text-align");
//	span.style.lineHeight = $(this).css("line-height");
	span.style.direction = $(this).css("direction");
	
	document.body.appendChild(span);

	var width = $('#spanForTextWidth').width();
	document.body.removeChild(span);
	
	
	return width;
};

$.fn.textLengthInLine = function (line) {
	var html_org = $(this).html();
	
	var html_lines = html_org.split("\n");
	
	return html_lines[line].length;
};

$.fn.textHeight = function(){
	var html_org = $(this).html();

	var span = document.createElement("span");
	span.id = "spanForTextWidth";
	span.style.left = "-9999px";
	span.style.position = "absolute";
	span.innerHTML = html_org;
	
	// set the style same
	span.style.fontFamily = $(this).css("font-family");
	span.style.fontSize = $(this).css("font-size");
	span.style.fontWeight = $(this).css("font-weight");
	span.style.fontStyle = $(this).css("font-style");
	span.style.textDecoration = $(this).css("text-decoration");
	span.style.color = $(this).css("color");
	span.style.textAlign = $(this).css("text-align");
//	span.style.lineHeight = $(this).css("line-height");
	span.style.direction = $(this).css("direction");
	
	document.body.appendChild(span);
	
	var height = $('#spanForTextWidth').height();
	document.body.removeChild(span);
	
	return height;
};

$.fn.textHeightWithRange = function(from, to){
	var html_org = $(this).html();
	
	var html_lines = html_org.split("\n");
	
	var textHeight = 0; 
	for (var i = from; i < to; i++) {
		var span = document.createElement("span");
		span.id = "spanForTextWidth";
		span.style.left = "-9999px";
		span.style.position = "absolute";
		span.innerHTML = html_lines[i];
		
		// set the style same
		span.style.fontFamily = $(this).css("font-family");
		span.style.fontSize = $(this).css("font-size");
		span.style.fontWeight = $(this).css("font-weight");
		span.style.fontStyle = $(this).css("font-style");
		span.style.textDecoration = $(this).css("text-decoration");
		span.style.color = $(this).css("color");
		span.style.textAlign = $(this).css("text-align");
//		span.style.lineHeight = $(this).css("line-height");
		span.style.direction = $(this).css("direction");
		
		document.body.appendChild(span);
			
		var height = $('#spanForTextWidth').height();
		document.body.removeChild(span);
		
		textHeight = textHeight + height;
	}
			
	return textHeight;
};

/**
 * Preload the animation
 * 
 * @param div <div> element to display the animation. It must have its ID.
 * @param classFromTo Class name to repeat
 */
function preloadAnimation (div, classFromTo) {

	index = -1;
	
	// remember the original class name
	div.originalClassName = div.className;
	
	// remember the interval value to stop the animation
	var preloadInterval = setInterval( function () {
		div.className = div.originalClassName;
		if (++index > classFromTo.length - 1) {
			clearInterval(preloadInterval);
		}

		$('#' + div.id).addClass( classFromTo[index] + "" );
	}, 10);
	
	// revert the original class name 
	div.className = div.originalClassName;
	
}

/**
 * Make an animation based with an array of CSS style classes.
 * Show the animation inside <div>
 * 
 * @param div <div> element to display the animation. It must have its ID.
 * @param classFromTo Class name to repeat
 * @param interval Time interval for the transition between the class
 */
function startAnimation (div, classFromTo, interval) {
	index = -1;
	// remember the original class name
	div.originalClassName = div.className;
	
	// remember the interval value to stop the animation
	div.animationInterval = setInterval( function () {
		div.className = div.originalClassName;
		index = (++index > classFromTo.length - 1) ? 0 : index;
	
		$('#' + div.id).addClass( classFromTo[index].toString() );
	}, interval);
}

/** 
 * Stop the animation defined in <div>
 * 
 * @param div
 */
function stopAnimation (div) {
	if (div.animationInterval != null && div.animationInterval != undefined) {
		clearInterval(div.animationInterval);
		div.className = div.originalClassName;
	}
}


//TODO
function checkSessionFolder(callbackFunction){
	if (callbackFunction != null && callbackFunction != undefined) {
		callbackFunction.call(this);
	}
}
