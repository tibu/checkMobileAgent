```javascript
function checkMobileAgent() {
	// check and return mobile agent
	var MobileAgent = "(not-detected)";
	var Device = {};
	Device.Name = "(not set)";
	Device.OSVersion = "(not set)";
	Device.UA = navigator.userAgent;
	Device.Types = ["iPhone", "iPod", "iPad", "Android", "webOS", "BlackBerry"];
	for (var d = 0; d < Device.Types.length; d++) {
		var t = Device.Types[d];
		//match the Type against the User Agent
		Device[t] = !!Device.UA.match(new RegExp(t, "i"));
	}

	// is this an Apple device?
	if (Device.iPhone || Device.iPod || Device.iPad) {
		//check verion of Apple OS
		var iOSVersionRegex = new RegExp (/(OS (?:\d+[\._]?)+)/);
		var iOSResult = iOSVersionRegex.exec(Device.UA);
		var iOSProduct = "(not set)";
		
		if (Device.iPhone) { iOSProduct = "iPhone"; }
		if (Device.iPod) { iOSProduct = "iPod"; }
		if (Device.iPad) { iOSProduct = "iPad"; }
		
		if (iOSResult != null) {
			for (i = 0; i < iOSResult.length; i++) {
				if (iOSResult[i] != undefined) {
					Device.OSVersion = iOSResult[i].replace("OS ", "");
				}
			}
			MobileAgent = iOSProduct + ":" + Device.OSVersion;
		}
	} else if (Device.Android) {
		var AndroidVersionRegex = new RegExp (/(Android (?:\d+\S*[\._]?)+)/);
		var AndroidResult = AndroidVersionRegex.exec(Device.UA);
		if (AndroidResult != null) {
			for (i = 0; i < AndroidResult.length; i++) {
				if (AndroidResult[i] != undefined) {
					Device.OSVersion = AndroidResult[i].replace("Android ", "");
				}
			}
			MobileAgent = "Android:" + Device.OSVersion;
		}
	} else if (Device.BlackBerry) {
		//Older BlackBerry User Agent strings differ from new ones, so we need to check for both formats
		var BBVersionRegex = new RegExp (/BlackBerry\d{3,4}[A-Za-z]*\/((?:\d+\.?){2,4})|Version\/((?:\d+\.?){2,4})/);
		var BBResult = BBVersionRegex.exec(Device.UA);
		if (BBResult != null) {
			for (i = 0; i < BBResult.length; i++) {
				if (BBResult[i] != undefined) {
					Device.OSVersion = BBResult[i];
				}
			}
			MobileAgent = "BlackBerry:" + Device.OSVersion;
		}
	}	
	return MobileAgent;
}
```
