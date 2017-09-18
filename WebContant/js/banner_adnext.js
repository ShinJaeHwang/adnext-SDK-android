var ADNextRequest = {
        getXMLHttpRequest: function(url, func) {
            var that = this;
            var  xhr = null;
            if (window.XDomainRequest) try {
                xhr = new XDomainRequest;
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        xhr = null;
                    }
                }
            } else if (window.ActiveXObject) try {
                xhr = new XMLHttpRequest;
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    xhr = null;
                }
            } else xhr = window.XMLHttpRequest ? new XMLHttpRequest : null;
            try {
            	    //console.log("ADNextRequest -> getXMLHttpRequest() -> URL : " + url);
                xhr.open("get", url, !0); 
                xhr.onload = function() {
                    var str = xhr.responseText;
                    null != func && ("succrb" == func ? setTimeout(function() {
                    		ADNextBanner.succrb.call(that, str)
                    }, 10) : eval("ADNextInterstitial." + func + ".call(that,str)"))
                }; 
                xhr.send();
            } catch (e) {
                console.log(e.message);
            }
        }
    },
    
    ADNextBanner = {
		s2:function()
		{
		  return Math.floor((1 + Math.random()) * 0x10000)
		             .toString(16)
		             .substring(1);	
		},
		init:function(vars){
			try {
				this.os            = null;
				this.ua            = null;
				this.adnext_udid   = null;
				this.view          = null;
				this.suf           = null;
				
				this.key           = vars.key;
				this.sec           = vars.sec != null || vars.sec != undefined ? vars.sec : 60;
				this.ad_align      = vars.ad_align;
				this.render        = vars.render;
				this.hreftop       = vars.hreftop;
				this.width         = vars.width;
				this.height        = vars.height;
				this.nosec         = vars.nosec;
				this.bgcolor       = vars.bgcolor;
				this.house_var     = vars.house;
				
				this.floating_static      = vars.floating_static;
				this.floating_location    = vars.floating_location;
				this.floating_location_px = vars.floating_location_px;
				this.floating_width       = vars.floating_width;
				this.floating_height      = vars.floating_height;

				if(document.getElementById(this.render) == null) return;
			}catch(e){
			}
			var that = this;
			try {
				var xflag = 0;
				var script = document.createElement('script');
				// var url = "//mkt.adlibr.com/gwx_script/adlib_awudid.js";
				var url = "//119.207.144.112/moco/js/adnext_awudid.js";
				var head = document.getElementsByTagName("head")[0] || document.body;

				script.src = url;
				script.onreadystatechange = function () {
						try
						{
							if (script.readyState == 'complete' || script.readyState == 'loaded') {
								that.adnext_udid = getADNext_awudid(); 
							}
						}
						catch(e){
							console.log(e);
						}
						finally{	
							if(xflag++ == 0)
								ADNextBanner.send.call(that);
						}
				};
				script.onload = function () { try{
					that.adnext_udid = getADNext_awudid();
				}catch(e){
					console.log(e);
				}
				finally{
							if(xflag++ == 0)				
								ADNextBanner.send.call(that);}
				};
				head.appendChild(script); //or something of the likes		
			}
			catch(e) {}
		},
		send:function(){
			var that = this;
			var toastdiv = document.createElement("img");
			toastdiv.setAttribute("src", "//adlc-exchange.toast.com/sendid?sid=adlibr.com&uid="+this.adnext_udid);
			toastdiv.setAttribute("style", "position:absolute;z-index:10;display:none");
			document.body.appendChild(toastdiv);
			
			ADNextBanner.adview.call(that);
			ADNextBanner.start.call(that);
		},
		adview: function() {
			var that = this;
			this.view = document.getElementById(this.render);
			
			if(this.view == null)
			{
				this.view = document.createElement("div");
				this.view.setAttribute("id", this.render);
				document.body.appendChild(this.view);        
			}
			
			this.view = document.getElementById(this.render);
			this.view.style.padding = "0";		
			this.view.style.margin = "0";	
			
			this.suf = ADNextBanner.s2.call(that);
		},
		start:function(){
			var that = this;
					
			ADNextBanner.load.call(that);
			ADNextBanner.next.call(that, this.sec);
		},
		next:function(sec){
			var that = this;
			
			setTimeout(function(){ADNextBanner.start.call(that)}, sec*1000);
		},
		load:function(){
			var that = this;

			if(this.view == null) ADNextBanner.adview.call(that);
			if(this.view.innerHTML == "" || this.view.innerHTML == undefined)
			{
				this.view = document.getElementById(this.render);
			}
			this.view.style.backgroundColor = "transparent";
			this.view.style.display = "block";

			if(this.floating_static != "" && this.floating_static != undefined)
				this.view.style.position = this.floating_static;
			if(this.floating_location != "" && this.floating_location != undefined){
				if(this.floating_location_px != "" && this.floating_location_px != undefined){
					if(this.floating_location == "top"){
						this.view.style.top = this.floating_location_px;
					}else{ // bottom
						this.view.style.bottom = this.floating_location_px;
					}
				}
			}
			if(this.floating_width != "" && this.floating_width != undefined)
				this.view.style.width = this.floating_width;
			if(this.floating_height != "" && this.floating_height != undefined)
				this.view.style.height = this.floating_height;

			this.view.innerHTML="";
			
			var os = "a";
			var ua = navigator.userAgent;
			if(ua == null)
				return;
			
			if( ua.indexOf( "iPad" ) > 0 || ua.indexOf( "iPhone" ) > 0  || ua.indexOf( "iPod" ) > 0 )
				os = "i";
			else if( ua.indexOf( "Android" ) > 0)
				os = "a";
			else if( ua.indexOf( "Windows" ) > 0)
				os = "w";		
			else
				os = "o";
			
			this.os = os;
			this.ua = ua;
			
			var param_udid = '';
			var param_house = '';
			var param_size = '';
			var picky_obj = '';
			var param_udid2 = '';

			if(this.adnext_udid != null && this.adnext_udid != undefined){
				param_udid ='&awudid='+this.adnext_udid;
				param_udid2 ='&udid='+this.adnext_udid;
			}

			if(this.house == 'Y' || this.house_var == 'Y'){
				param_house = '&house=Y';
			}
			if(this.width != null && this.height != null && this.width != undefined && this.height != undefined && this.width != "" && this.height != ""){
				if(this.width != "320" || this.height != "50"){
					param_size = '&width='+this.width+'&height='+this.height;
				}
			}	
			
			if(ua.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Windows Phone|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
				dtype = "1";
			}else{
				dtype = "2";
			}		
			var param = "key="+this.key+"&type=1&ty=W&prod=1&ver=1.000&svc=1&agent="+ua+"&os="+this.os +"&dtype=" + dtype + param_udid + param_house + param_size + param_udid2;  

			ADNextRequest.getXMLHttpRequest.call(that,'//adnext.mocoplex.com/ad/smart/request?'+param,'succrb');
		
			return 0;
		},
		succrb:function(responseData){
			var that = this;
			var obj = JSON.parse(responseData);
			
		    if(obj.result == 0 && obj.data.count != 0 && obj.data.ad.adm != undefined){
				var sub;
				sub = document.createElement("div");
				sub.setAttribute("style", "width:100%;height:"+obj.data.ad.height+"px;position:relative;text-align:"+this.ad_align);
				this.view.appendChild(sub);

				var v;
				v = document.createElement("iframe");
				v.setAttribute("frameborder", "0");
				v.setAttribute("scrolling", "no");			
				v.setAttribute("style", "width:"+obj.data.ad.width+"px;height:"+obj.data.ad.height+"px;"); //border-image-width:0;
				v.setAttribute("id", ADNextBanner.pname.call(that));
				v.setAttribute("name", ADNextBanner.pname.call(that));
				v.setAttribute("marginwidth", "0");
				v.setAttribute("marginheight", "0");

				sub.appendChild(v);
				this.view.style.height=obj.data.ad.height;
				
				if(this.bgcolor == 'Y'){
					if(obj.data.ad.bgcolor != undefined){
						this.view.style.backgroundColor = obj.data.ad.bgcolor;
					}else{
						this.view.style.backgroundColor = "#ffffff";
					}
				}
			
				var div = document.createElement('div');
				
				div.innerHTML = obj.data.ad.adm.replace(/&quot;/g, '"');
				var elements = div.getElementsByTagName('a');
				
				var aid = "7";
				if(this.house == 'Y' || this.house_var == 'Y') aid = "711";
				
	            //var medi_click = "key="+this.key+"&ver=1.000&agent="+this.ua+"&ty=W&os="+this.os+"&type=2&aid="+aid.toString();
	            var click_init = "key="+this.key+"&ver=1.000&agent="+this.ua+"&ty=W&os="+this.os+"&type=1&prod=1";
				if(elements.length > 0){
					if(this.picky != 'Y'){
						//elements[0].setAttribute("onclick","parent.ADNextRequest.getXMLHttpRequest('//gwk.adlibr.com/ad/mediation/init?"+medi_click+"',null);parent.ADNextRequest.getXMLHttpRequest('//gwk.adlibr.com/ad/click/init?"+click_init+"',null)");
						elements[0].setAttribute("onclick","parent.ADNextRequest.getXMLHttpRequest('//adnext.mocoplex.com/ad/click/init?"+click_init+"',null)");
					}
				}				
				div.setAttribute("style", "position:relative;");
				div = div.outerHTML;

				var ifr = document.getElementById(ADNextBanner.pname.call(that)).contentWindow.document;
				ifr.open('text/html');
				ifr.write(div);
				ifr.close();

				try {
				  adnext_loadsucc("banner",this.key);
				}
				catch(e){}
			}else{	
				ADNextBanner.failed.call(that);
			}
		},
		failed:function()
		{	
			var that = this;

			try
			{
				adnext_loadfailed("banner",this.key);
			}
			catch(e){}	
		},
		pname: function()
		{
			return this.suf;
		},		
	}