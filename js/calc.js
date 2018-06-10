		function valIp(fir,sec,tri,four,elem) {
			if ((isNaN(fir)) || (isNaN(sec)) || (isNaN(tri)) || (isNaN(four))) {
				elem.innerHTML = "Niepoprawny zapis";
				return false;
			}
			else if ((fir > 255 || fir < 0) || (sec > 255 || sec < 0) || (tri > 255 || tri < 0) || (four > 255 || four < 0)) {
				elem.innerHTML = "Niepoprawny zapis";
				return false;
			}
			else {
				elem.innerHTML = "";
				return true;
			}
		}
		
		function valMask(firm,secm,trim,fourm) {
			if (valIp(firm,secm,trim,fourm,vMask)) {

				var mask = 5;
				if (firm < 255) {
					if ((secm > 0) || (trim > 0) || (fourm > 0)) { 
						vMask.innerHTML = "Niepoprawny zapis";
						return false; 
					}
					mask = firm;
				} else {
					if (secm < 255) {
						if ((trim > 0) || (fourm > 0)) { 
							vMask.innerHTML = "Niepoprawny zapis";
							return false; 
						}
						mask = secm;
					} else {
						if (trim < 255) {
							if ((fourm > 0)) { 
								vMask.innerHTML = "Niepoprawny zapis";
								return false; 
							}
						mask = trim;
						} else { 
							mask = fourm; 
						}
					}
				}

				switch (mask) {
					case 255:
					case 128:
					case 192:
					case 224:
					case 240:
					case 248:
					case 252:
					case 254:
					case 0:
						vMask.innerHTML = "";
						return true;
					default:
						vMask.innerHTML = "Niepoprawny zapis";
						return false;
				} vMask.innerHTML = ""; return true;
			}
			else {
				vMask.innerHTML = "Niepoprawny zapis";
				return false;
			}
		}
		
		function toBin(inVal) {
			var num = parseInt(inVal);
			var binNum = num.toString(2);
			return binNum;
		}

		function padTextPrefix(InString,PadChar,DefLength) {
			if (InString.length >= DefLength)
				return (InString);
			var OutString = InString;
			for (var i = InString.length; i < DefLength; i++) {
				OutString = PadChar + OutString;
			}
			return (OutString);
		} 
		
		function clearForm(number) {
			
			var form = document.forms.calcIp;
			if (number) {
				form.elements[number].value = "";
				return;
			}
			for (var i = 9; i<form.length; i++) {
				form.elements[i].value = "";
			}
			document.getElementById("ipbin").innerHTML = "";
			document.getElementById("maskbin").innerHTML = "";
			document.getElementById("host1bin").innerHTML = "";
			document.getElementById("host2bin").innerHTML = "";
			document.getElementById("asbin").innerHTML = "";
			document.getElementById("brobin").innerHTML = "";
		}
		
		function calcMask2Len(firm,secm,trim,fourm) {
			var m = new Array(1,2,3,4);
			m[0] = firm; m[1] = secm;
			m[2] = trim; m[3] = fourm;
			if (!valMask(firm,secm,trim,fourm)) { 
				vMask.innerHTML = "Niepoprawny zapis"; 
				return 0; 
			}
			mask = 0;

			for (var loop=0; loop<4; loop++) {
				div = 256;
				while (div > 1) {
					div = div/2;
					test = m[loop]-div;
					if ( test >-1) { mask=mask+1; m[loop]=test; } else { break; }
				}
			}
			
			return mask;
		}
		
		function colorBin(addr,mask,color1,color2,elem) {
			if ((mask <= 32) && (mask >= 25)) {
				mask+=2;
			}
			else if ((mask <= 24) && (mask >= 17)) {
				mask+=1;
			}
				
			var format = "<span style=\"color: " + color1 + ";\">";
			var format2 = "<span style=\"color: " + color2 + ";\">";
			
			for (var i = 0; i<addr.length; i++) {
				if (i <= mask) {
					format+=addr.charAt(i);
				}
				else {
					format2+=addr.charAt(i);
				}
			}
			format+="</span>";
			format2+="</span>";
					
			elem.innerHTML = format+format2;
		}
		
		function getClassIp(host_class,klasa) {
			if (klasa.charAt(0)=="0") {
				host_class.value = "A";
			}
			else if ((klasa.charAt(0)=="1") && (klasa.charAt(1)=="0")) {
				host_class.value = "B";
			}
			else if ((klasa.charAt(0)=="1") && (klasa.charAt(1)=="1") && (klasa.charAt(2)=="0")) {
				host_class.value = "C";
			}
			else if ((klasa.charAt(0)=="1") && (klasa.charAt(1)=="1") && (klasa.charAt(2)=="1") && (klasa.charAt(3)=="0")) {
				host_class.value = "D";
			}
			else if ((klasa.charAt(0)=="1") && (klasa.charAt(1)=="1") && (klasa.charAt(2)=="1") && (klasa.charAt(3)=="1")) {
				host_class.value = "E";
			}
		}
		
		globalna = 0;
		tArray = new Array();
		
		function getMask(mask,s,m1,m2,m3,m4) {
			var nMaskLen = mask;
			if(s==false) {
				document.getElementsByName(m1)[0].value = Len2MaskCalc(nMaskLen);
				document.getElementsByName(m2)[0].value = Len2MaskCalc(globalna);
				document.getElementsByName(m3)[0].value = Len2MaskCalc(globalna);
				document.getElementsByName(m4)[0].value = Len2MaskCalc(globalna);
			}
			else {
				tArray[0] = Len2MaskCalc(nMaskLen);
				tArray[1] = Len2MaskCalc(globalna);
				tArray[2] = Len2MaskCalc(globalna);
				tArray[3] = Len2MaskCalc(globalna);
				return tArray;
			}
		}
		
		function Len2MaskCalc(nMask) {
			if (nMask < 1) {
				return 0; 
			}
			nCalc = 0;
  
			for (var nX = 7; nX > -1; nX--) {
				nCalc = nCalc + raiseP(2,nX);
				nMask -= 1;
				globalna = nMask;
				if (nMask < 1) { 
					return nCalc; 
				}
			} 
			return nCalc;
		}

		function raiseP(x,y) {
			total = 1;
			for (var j = 0; j < y; j++) { 
				total*=x; 
			} 
			return total; 
		}