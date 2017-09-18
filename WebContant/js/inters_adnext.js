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
                    		ADNextInterstitial.succrb.call(that, str)
                    }, 10) : eval("ADNextInterstitial." + func + ".call(that,str)"))
                }; 
                xhr.send();
            } catch (e) {
                console.log(e.message);
            }
        }
    },
    ADNextInterstitial = {
		init:function(vars){
			var that = this;
			
			try {
				this.bgobj         = null;
				this.ontents       = null;
				this.os            = null;
				this.ua            = null;
				this.adnext_udid   = null;
				this.view          = null;
				this.suf           = null;
				this.adm           = null;
				this.closelayer    = null;
				this.closesize     = 55;
				
				this.key           = vars.key;
				this.nobg          = vars.nobg;         
				this.hreftop       = vars.hreftop;
				this.hideclosebtn  = vars.hideclosebtn; 
				this.tagpostback   = vars.tagpostback;  
		        this.afterload     = vars.afterload;    
		        this.afterclose    = vars.afterclose;    
				this.width         = vars.width;
				this.height        = vars.height;
				this.house         = vars.house;
		        this.bsrc          = "//119.207.144.112/moco/inters_load.html";
				
			}catch(e){}
	        
	        try {
	            var k = window.addEventListener ? "addEventListener" : "attachEvent";
	            var g = window[k];
	            var d = k == "attachEvent" ? "onmessage" : "message";
	            g(d, function(n) {
	                var l = n.message ? "message" : "data";
	                var m = n[l];
	                if (m == "adnext_click") {
	                    var param = "key=" + ADNextInterstitial.key + "&ver=1.000&agent=" + ADNextInterstitial.ua + "&ty=W&os=" + ADNextInterstitial.os + "&type=1&prod=2";
	                    ADNextRequest.getXMLHttpRequest("//adnext.mocoplex.com/ad/click/init?" + param, null);
	                }
	            }, false);
	        } catch (e) {}
	        
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
								ADNextInterstitial.send.call(that);
						}
				};
				script.onload = function () { try{
					that.adnext_udid = getADNext_awudid();
				}catch(e){
					console.log(e);
				}
				finally{
							if(xflag++ == 0)				
								ADNextInterstitial.send.call(that);}
				};
				head.appendChild(script);
			}
			catch(e) {}
		},
		send:function(){
			var that = this;
			var toastdiv = document.createElement("img");
			toastdiv.setAttribute("src", "//adlc-exchange.toast.com/sendid?sid=adlibr.com&uid="+this.adnext_udid);
			toastdiv.setAttribute("style", "position:absolute;z-index:10;display:none");
			document.body.appendChild(toastdiv);
			
			ADNextInterstitial.load.call(that);
		},
		load:function(){
			var that = this;
			
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

			if(this.house == 'Y'){
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
			var param = "key="+this.key+"&type=1&ty=W&prod=2&ver=1.000&svc=1&agent="+ua+"&os="+this.os +"&dtype=" + dtype + param_udid + param_house + param_size + param_udid2;  
	        
			ADNextRequest.getXMLHttpRequest.call(that,'//adnext.mocoplex.com/ad/ssp/request?'+param,'succrb');
		
			return 0;
		},
		succrb:function(responseData){
			var that = this;
			var obj = JSON.parse(responseData);
			
		    if(obj.result == 0 && obj.data.count != 0 && obj.data.ad.adm != undefined){
		        var a = parseInt(obj.data.ad.width);
		        var b = parseInt(obj.data.ad.height);
		        this.adm = obj.data.ad.adm;
		        var i = this.adm;
		        this.bsrc = this.bsrc + "?adm=" + encodeURIComponent(i) + "&hreftop=" + encodeURIComponent(this.hreftop);
		        var f = '<iframe src="' + this.bsrc + '" name="banner_load" scrolling="no" frameborder="no" align="center" height = "' + b + '" width = "' + a + '"></iframe>';
		        if (this.tagpostback == "" || this.tagpostback < 0 || this.tagpostback == undefined) {
		            ADNextInterstitial.show(a, b, f)
		        } else {
		            try {
		                adnext_interstitial_postback(f)
		            } catch (c) {}
		        }
				try {
				  adnext_loadsucc("interstitial",this.key);
				}
				catch(e){}
				
			}else{	
				ADNextInterstitial.failed.call(that);
			}
		},
	    show: function(w, h, src) {
	        if (this.nobg != "" || this.nobg > 0) {
	            var body = document.body,
	                html = document.documentElement;
	            var w2 = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
	            var h2 = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	            var doc = document.documentElement,
	                body = document.body;
	            var top = (doc && doc.scrollTop || body && body.scrollTop || 0);
	            var bodyh = html.clientHeight;
	            var hh = window.innerHeight;
	            var y1 = 0; 
	            var x1 = (w2 - w) / 2;
	            if (hh > h) {
	                y1 = (hh - h) / 2
	            }
	            var bgparent = document.createElement("div");
	            bgparent.setAttribute("style", "position:fixed;left:" + x1 + "px;top:" + y1 + "px;z-index:20000;width:" + w + "px;height:" + h + "px");
	            document.body.appendChild(bgparent);
	            var iframeurl = src;
	            bgparent.innerHTML = iframeurl;
	            this.contents = bgparent;
	            this.contents.setAttribute("id", "inters_" + this.key)
	        } else {
	            var bglayer = document.createElement("div");
	            bglayer.setAttribute("style", 'opacity: 0.9; visibility: visible; display: block;background:url("//119.207.144.112/moco/img/adnext_inters_bg.png") repeat 0 0;position:absolute; top:0; left:0; z-index:9999; overflow:hidden;position:fixed; width:100%; height:100%;');
	            document.body.appendChild(bglayer);
	            bglayer.setAttribute("id", "bg_" + this.key);
	            bglayer.addEventListener("click", ADNextInterstitial.close);
	            this.bgobj = bglayer;
	            var body = document.body,
	                html = document.documentElement;
	            var w2 = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
	            var h2 = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	            var doc = document.documentElement,
	                body = document.body;
	            var top = (doc && doc.scrollTop || body && body.scrollTop || 0);
	            var bodyh = html.clientHeight;
	            var hh = window.innerHeight;
	            var y1 = 0;
	            var x1 = (w2 - w) / 2;
	            if (hh > h) {
	                y1 = (hh - h) / 2
	            }
	            var bgparent = document.createElement("div");
	            bgparent.setAttribute("style", "position:fixed;left:" + x1 + "px;top:" + y1 + "px;z-index:20000;width:" + w + "px;height:" + h + "px");
	            document.body.appendChild(bgparent);
	            var iframeurl = src;
	            bgparent.innerHTML = iframeurl;
	            this.contents = bgparent;
	            this.contents.setAttribute("id", "inters_" + this.key)
	        }
	        var cx1 = x1;
	        cx1 += w;
	        cx1 -= this.closesize;
	        this.closelayer = document.createElement("div");
	        this.closelayer.setAttribute("id", "btn_inters_" + this.key);
	        if (this.hideclosebtn == "" || this.hideclosebtn == null) {
	            this.closelayer.setAttribute("style", "position:fixed;left:" + cx1 + "px;top:" + y1 + "px;z-index:40000;width:" + this.closesize + "px;height:" + this.closesize + "px");
	            document.body.appendChild(this.closelayer);
	            this.closelayer.addEventListener("click", function() {
	                ADNextInterstitial.close()
	            }, false);
	            this.closelayer.innerHTML = '<img src="//119.207.144.112/moco/img/adnext_inters_close.png" style="float:right;width:' + this.closesize + 'px;">'
	        }
	        if (this.afterload != "" || this.afterload > 0) {
	            try {
	                eval(this.afterload + "(x1,y1,w,h);")
	            } catch (e) {}
	        }
	    },
		failed:function()
		{	
			var that = this;

			try
			{
				adnext_loadfailed("interstitial",this.key);
			}
			catch(e){}	
		},
	    close: function() {
	        if (ADNextInterstitial.bgobj != null) {
	            document.body.removeChild(ADNextInterstitial.bgobj)
	        }
	        if (ADNextInterstitial.contents != null) {
	            document.body.removeChild(ADNextInterstitial.contents)
	        }
	        try {
	            if (ADNextInterstitial.closelayer != null) {
	                document.body.removeChild(ADNextInterstitial.closelayer)
	            }
	        } catch (e) {}
	        ADNextInterstitial.bgobj = null;
	        ADNextInterstitial.contents = null;
	        ADNextInterstitial.closelayer = null;
	        if (ADNextInterstitial.afterclose != "" || ADNextInterstitial.afterclose > 0) {
	            try {
	                eval(ADNextInterstitial.afterclose + "();")
	            } catch (e) {}
	        }
	    },
		pname: function()
		{
			return this.suf;
		},		
	}