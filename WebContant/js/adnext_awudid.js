(function(a, c, b) {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = b()
    } else {
        if (typeof define === "function" && define.amd) {
            define(b)
        } else {
            c[a] = b()
        }
    }
})("AwGenerator", this, function() {
    var a = function(b) {
        var c, d;
        c = Array.prototype.forEach;
        d = Array.prototype.map;
        this.each = function(k, j, h) {
            if (k === null) {
                return
            }
            if (c && k.forEach === c) {
                k.forEach(j, h)
            } else {
                if (k.length === +k.length) {
                    for (var g = 0, e = k.length; g < e; g++) {
                        if (j.call(h, k[g], g, k) === {}) {
                            return
                        }
                    }
                } else {
                    for (var f in k) {
                        if (k.hasOwnProperty(f)) {
                            if (j.call(h, k[f], f, k) === {}) {
                                return
                            }
                        }
                    }
                }
            }
        };
        this.map = function(h, g, f) {
            var e = [];
            if (h == null) {
                return e
            }
            if (d && h.map === d) {
                return h.map(g, f)
            }
            this.each(h, function(k, i, j) {
                e[e.length] = g.call(f, k, i, j)
            });
            return e
        };
        if (typeof b == "object") {
            this.hasher = b.hasher;
            this.screen_resolution = b.screen_resolution;
            this.screen_orientation = b.screen_orientation;
            this.canvas = b.canvas;
            this.ie_activex = b.ie_activex
        } else {
            if (typeof b == "function") {
                this.hasher = b
            }
        }
    };
    a.prototype = {
        get: function() {
            var c = [];
            c.push(navigator.userAgent);
            c.push(navigator.language);
            c.push(screen.colorDepth);
            if (this.screen_resolution) {
                var b = this.getScreenResolution();
                if (typeof b !== "undefined") {
                    c.push(this.getScreenResolution().join("x"))
                }
            }
            c.push(new Date().getTimezoneOffset());
            c.push(this.hasSessionStorage());
            c.push(this.hasLocalStorage());
            c.push(!!window.indexedDB);
            if (document.body) {
                c.push(typeof(document.body.addBehavior))
            } else {
                c.push(typeof undefined)
            }
            c.push(typeof(window.openDatabase));
            c.push(navigator.cpuClass);
            c.push(navigator.platform);
            c.push(navigator.doNotTrack);
            c.push(this.getPluginsString());
            if (this.canvas && this.isCanvasSupported()) {
                c.push(this.getCanvasFingerprint())
            }
            if (this.hasher) {
                return this.hasher(c.join("###"), 31)
            } else {
                return this.murmurhash3_32_gc(c.join("###"), 31)
            }
        },
        murmurhash3_32_gc: function(j, f) {
            var k, l, h, b, e, c, g, d;
            k = j.length & 3;
            l = j.length - k;
            h = f;
            e = 3432918353;
            c = 461845907;
            d = 0;
            while (d < l) {
                g = ((j.charCodeAt(d) & 255)) | ((j.charCodeAt(++d) & 255) << 8) | ((j.charCodeAt(++d) & 255) << 16) | ((j.charCodeAt(++d) & 255) << 24);
                ++d;
                g = ((((g & 65535) * e) + ((((g >>> 16) * e) & 65535) << 16))) & 4294967295;
                g = (g << 15) | (g >>> 17);
                g = ((((g & 65535) * c) + ((((g >>> 16) * c) & 65535) << 16))) & 4294967295;
                h ^= g;
                h = (h << 13) | (h >>> 19);
                b = ((((h & 65535) * 5) + ((((h >>> 16) * 5) & 65535) << 16))) & 4294967295;
                h = (((b & 65535) + 27492) + ((((b >>> 16) + 58964) & 65535) << 16))
            }
            g = 0;
            switch (k) {
                case 3:
                    g ^= (j.charCodeAt(d + 2) & 255) << 16;
                case 2:
                    g ^= (j.charCodeAt(d + 1) & 255) << 8;
                case 1:
                    g ^= (j.charCodeAt(d) & 255);
                    g = (((g & 65535) * e) + ((((g >>> 16) * e) & 65535) << 16)) & 4294967295;
                    g = (g << 15) | (g >>> 17);
                    g = (((g & 65535) * c) + ((((g >>> 16) * c) & 65535) << 16)) & 4294967295;
                    h ^= g
            }
            h ^= j.length;
            h ^= h >>> 16;
            h = (((h & 65535) * 2246822507) + ((((h >>> 16) * 2246822507) & 65535) << 16)) & 4294967295;
            h ^= h >>> 13;
            h = ((((h & 65535) * 3266489909) + ((((h >>> 16) * 3266489909) & 65535) << 16))) & 4294967295;
            h ^= h >>> 16;
            return h >>> 0
        },
        hasLocalStorage: function() {
            try {
                return !!window.localStorage
            } catch (b) {
                return true
            }
        },
        hasSessionStorage: function() {
            try {
                return !!window.sessionStorage
            } catch (b) {
                return true
            }
        },
        isCanvasSupported: function() {
            var b = document.createElement("canvas");
            return !!(b.getContext && b.getContext("2d"))
        },
        isIE: function() {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true
            } else {
                if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
                    return true
                }
            }
            return false
        },
        getPluginsString: function() {
            if (this.isIE() && this.ie_activex) {
                return this.getIEPluginsString()
            } else {
                return this.getRegularPluginsString()
            }
        },
        getRegularPluginsString: function() {
            return this.map(navigator.plugins, function(c) {
                var b = this.map(c, function(d) {
                    return [d.type, d.suffixes].join("~")
                }).join(",");
                return [c.name, c.description, b].join("::")
            }, this).join(";")
        },
        getIEPluginsString: function() {
            if (window.ActiveXObject) {
                var b = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
                return this.map(b, function(c) {
                    try {
                        new ActiveXObject(c);
                        return c
                    } catch (d) {
                        return null
                    }
                }).join(";")
            } else {
                return ""
            }
        },
        getScreenResolution: function() {
            var b;
            if (this.screen_orientation) {
                b = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height]
            } else {
                b = [screen.height, screen.width]
            }
            return b
        },
        getCanvasFingerprint: function() {
            var d = document.createElement("canvas");
            var c = d.getContext("2d");
            var b = "http://valve.github.io";
            c.textBaseline = "top";
            c.font = "14px 'Arial'";
            c.textBaseline = "alphabetic";
            c.fillStyle = "#f60";
            c.fillRect(125, 1, 62, 20);
            c.fillStyle = "#069";
            c.fillText(b, 2, 15);
            c.fillStyle = "rgba(102, 204, 0, 0.7)";
            c.fillText(b, 4, 17);
            return d.toDataURL()
        }
    };
    return a
});
(function(g) {
    function o(u, z) {
        var w = (u & 65535) + (z & 65535),
            v = (u >> 16) + (z >> 16) + (w >> 16);
        return (v << 16) | (w & 65535)
    }

    function s(u, v) {
        return (u << v) | (u >>> (32 - v))
    }

    function c(A, w, v, u, z, y) {
        return o(s(o(o(w, A), o(u, y)), z), v)
    }

    function b(w, v, B, A, u, z, y) {
        return c((v & B) | ((~v) & A), w, v, u, z, y)
    }

    function i(w, v, B, A, u, z, y) {
        return c((v & A) | (B & (~A)), w, v, u, z, y)
    }

    function n(w, v, B, A, u, z, y) {
        return c(v ^ B ^ A, w, v, u, z, y)
    }

    function a(w, v, B, A, u, z, y) {
        return c(B ^ (v | (~A)), w, v, u, z, y)
    }

    function d(F, A) {
        F[A >> 5] |= 128 << (A % 32);
        F[(((A + 64) >>> 9) << 4) + 14] = A;
        var w, z, y, v, u, E = 1732584193,
            D = -271733879,
            C = -1732584194,
            B = 271733878;
        for (w = 0; w < F.length; w += 16) {
            z = E;
            y = D;
            v = C;
            u = B;
            E = b(E, D, C, B, F[w], 7, -680876936);
            B = b(B, E, D, C, F[w + 1], 12, -389564586);
            C = b(C, B, E, D, F[w + 2], 17, 606105819);
            D = b(D, C, B, E, F[w + 3], 22, -1044525330);
            E = b(E, D, C, B, F[w + 4], 7, -176418897);
            B = b(B, E, D, C, F[w + 5], 12, 1200080426);
            C = b(C, B, E, D, F[w + 6], 17, -1473231341);
            D = b(D, C, B, E, F[w + 7], 22, -45705983);
            E = b(E, D, C, B, F[w + 8], 7, 1770035416);
            B = b(B, E, D, C, F[w + 9], 12, -1958414417);
            C = b(C, B, E, D, F[w + 10], 17, -42063);
            D = b(D, C, B, E, F[w + 11], 22, -1990404162);
            E = b(E, D, C, B, F[w + 12], 7, 1804603682);
            B = b(B, E, D, C, F[w + 13], 12, -40341101);
            C = b(C, B, E, D, F[w + 14], 17, -1502002290);
            D = b(D, C, B, E, F[w + 15], 22, 1236535329);
            E = i(E, D, C, B, F[w + 1], 5, -165796510);
            B = i(B, E, D, C, F[w + 6], 9, -1069501632);
            C = i(C, B, E, D, F[w + 11], 14, 643717713);
            D = i(D, C, B, E, F[w], 20, -373897302);
            E = i(E, D, C, B, F[w + 5], 5, -701558691);
            B = i(B, E, D, C, F[w + 10], 9, 38016083);
            C = i(C, B, E, D, F[w + 15], 14, -660478335);
            D = i(D, C, B, E, F[w + 4], 20, -405537848);
            E = i(E, D, C, B, F[w + 9], 5, 568446438);
            B = i(B, E, D, C, F[w + 14], 9, -1019803690);
            C = i(C, B, E, D, F[w + 3], 14, -187363961);
            D = i(D, C, B, E, F[w + 8], 20, 1163531501);
            E = i(E, D, C, B, F[w + 13], 5, -1444681467);
            B = i(B, E, D, C, F[w + 2], 9, -51403784);
            C = i(C, B, E, D, F[w + 7], 14, 1735328473);
            D = i(D, C, B, E, F[w + 12], 20, -1926607734);
            E = n(E, D, C, B, F[w + 5], 4, -378558);
            B = n(B, E, D, C, F[w + 8], 11, -2022574463);
            C = n(C, B, E, D, F[w + 11], 16, 1839030562);
            D = n(D, C, B, E, F[w + 14], 23, -35309556);
            E = n(E, D, C, B, F[w + 1], 4, -1530992060);
            B = n(B, E, D, C, F[w + 4], 11, 1272893353);
            C = n(C, B, E, D, F[w + 7], 16, -155497632);
            D = n(D, C, B, E, F[w + 10], 23, -1094730640);
            E = n(E, D, C, B, F[w + 13], 4, 681279174);
            B = n(B, E, D, C, F[w], 11, -358537222);
            C = n(C, B, E, D, F[w + 3], 16, -722521979);
            D = n(D, C, B, E, F[w + 6], 23, 76029189);
            E = n(E, D, C, B, F[w + 9], 4, -640364487);
            B = n(B, E, D, C, F[w + 12], 11, -421815835);
            C = n(C, B, E, D, F[w + 15], 16, 530742520);
            D = n(D, C, B, E, F[w + 2], 23, -995338651);
            E = a(E, D, C, B, F[w], 6, -198630844);
            B = a(B, E, D, C, F[w + 7], 10, 1126891415);
            C = a(C, B, E, D, F[w + 14], 15, -1416354905);
            D = a(D, C, B, E, F[w + 5], 21, -57434055);
            E = a(E, D, C, B, F[w + 12], 6, 1700485571);
            B = a(B, E, D, C, F[w + 3], 10, -1894986606);
            C = a(C, B, E, D, F[w + 10], 15, -1051523);
            D = a(D, C, B, E, F[w + 1], 21, -2054922799);
            E = a(E, D, C, B, F[w + 8], 6, 1873313359);
            B = a(B, E, D, C, F[w + 15], 10, -30611744);
            C = a(C, B, E, D, F[w + 6], 15, -1560198380);
            D = a(D, C, B, E, F[w + 13], 21, 1309151649);
            E = a(E, D, C, B, F[w + 4], 6, -145523070);
            B = a(B, E, D, C, F[w + 11], 10, -1120210379);
            C = a(C, B, E, D, F[w + 2], 15, 718787259);
            D = a(D, C, B, E, F[w + 9], 21, -343485551);
            E = o(E, z);
            D = o(D, y);
            C = o(C, v);
            B = o(B, u)
        }
        return [E, D, C, B]
    }

    function p(v) {
        var w, u = "";
        for (w = 0; w < v.length * 32; w += 8) {
            u += String.fromCharCode((v[w >> 5] >>> (w % 32)) & 255)
        }
        return u
    }

    function j(v) {
        var w, u = [];
        u[(v.length >> 2) - 1] = undefined;
        for (w = 0; w < u.length; w += 1) {
            u[w] = 0
        }
        for (w = 0; w < v.length * 8; w += 8) {
            u[w >> 5] |= (v.charCodeAt(w / 8) & 255) << (w % 32)
        }
        return u
    }

    function k(u) {
        return p(d(j(u), u.length * 8))
    }

    function e(w, z) {
        var v, y = j(w),
            u = [],
            x = [],
            A;
        u[15] = x[15] = undefined;
        if (y.length > 16) {
            y = d(y, w.length * 8)
        }
        for (v = 0; v < 16; v += 1) {
            u[v] = y[v] ^ 909522486;
            x[v] = y[v] ^ 1549556828
        }
        A = d(u.concat(j(z)), 512 + z.length * 8);
        return p(d(x.concat(A), 512 + 128))
    }

    function t(w) {
        var z = "0123456789abcdef",
            v = "",
            u, y;
        for (y = 0; y < w.length; y += 1) {
            u = w.charCodeAt(y);
            v += z.charAt((u >>> 4) & 15) + z.charAt(u & 15)
        }
        return v
    }

    function m(u) {
        return unescape(encodeURIComponent(u))
    }

    function q(u) {
        return k(m(u))
    }

    function l(u) {
        return t(q(u))
    }

    function h(u, v) {
        return e(m(u), m(v))
    }

    function r(u, v) {
        return t(h(u, v))
    }

    function f(v, w, u) {
        if (!w) {
            if (!u) {
                return l(v)
            }
            return q(v)
        }
        if (!u) {
            return r(w, v)
        }
        return h(w, v)
    }
    if (typeof define === "function" && define.amd) {
        define(function() {
            return f
        })
    } else {
        g.md5 = f
    }
}(this));

var _adlib_awudid_for_ad_flag=0;

var awudid_manager = {
	awudid: "",
	localkey: "awudid_local",
	xdomkey: "awudid_xdom",
	lastremotekey: "awudid_remote",
	getXdomValue:function() {
		var thisval = this.getCookie(this.xdomkey);
		if(thisval != "" && thisval != undefined && thisval != null)
			return thisval;

		return "";
	},
	setAWUDID:function(v) {
        awudid_manager.awudid = v;
		this.setCookie("awudid",v,365*5);
	},
	setXdomValue:function() {
		this.setCookie(this.xdomkey,"ok",365*5);
	},	
	setLocalValue:function(val) {
		this.setCookie(this.localkey,val,365*5);
	},	
	setLastRemoteValue:function(val) {
		this.setCookie(this.lastremotekey,val,365*5);
	},	
	getLastRemoteValue:function(val) {
		var thisval = this.getCookie(this.lastremotekey);
		if(thisval != "" && thisval != undefined && thisval != null)
			return thisval;

		return "";		
	},	
	getLocalValue:function() {
		var thisval = this.getCookie(this.localkey);
		if(thisval != "" && thisval != undefined && thisval != null)
			return thisval;
			
		return "";
	},
    setCookie: function(h, k, j) {

        var f = window.location.hostname;        
        var a = new Date();
        if (typeof j != "undefined") {
            a.setDate(a.getDate() + j)
        } else {
            a.setDate(a.getDate())
        }
		
		var c = " domain=" + f;
        
        var cookies = h + "=" + escape(k) + "; path=/;";
        if (typeof j != "undefined") {
            cookies += " expires=" + a.toGMTString() + ";"
        }
        cookies += c;        
        document.cookie = cookies        
        
        return;
    },
    getCookie: function(a) {
        a = a + "=";
        var c = document.cookie;
        var e = c.indexOf(a);
        var d = "";
        if (e != -1) {
            e += a.length;
            var b = c.indexOf(";", e);
            if (b == -1) {
                b = c.length
            }
            d = c.substring(e, b)
        }
        return unescape(d)
    }
}

function _ready_for_adlib_awudid()
{
	// ready. none.
}



try {
	

var url = "//gwk.adlibr.com/script/easyXDM-2.4.20.7/easyXDM.js";

var script = document.createElement('script');
script.setAttribute('src',url);
script.setAttribute('type','text/javascript');

// Attach handlers for all browsers
var head = document.getElementsByTagName("head")[0] || document.documentElement;
var done = false;
script.onload = script.onreadystatechange = function() {

if ( !done && (!this.readyState ||
this.readyState === "loaded" || this.readyState === "complete") ) {
done = true;

_get_awudid_for_ad2();

// Handle memory leak in IE
script.onload = script.onreadystatechange = null;
if ( head && script.parentNode ) {
head.removeChild( script );
}}}
head.insertBefore( script, head.firstChild );	

try
{
	if(_get_awudid_for_ad2 != undefined && _get_awudid_for_ad2 != null)
	{
		done = true;
		_get_awudid_for_ad2();
	}	
}
catch(e){}

}
catch(e)
{}


function _get_awudid_for_ad2()
{
	    try
	    {
            var tmp_awudid = awudid_manager.getLocalValue();
            
            var tmp_awudid_xdom = awudid_manager.getXdomValue();
            
            var tmp_last_remote_value = awudid_manager.getLastRemoteValue();
            
            var http = "http://";
            
			var protocol = document.URL;
			try
			{
				protocol = protocol.toLowerCase();
				if(protocol.indexOf("https://")==0)
					http = "https://";
			}
			catch(e2)
			{
			}
			
			var reconfirm = false;
            
            if(tmp_awudid_xdom == "ok")
            {
	            awudid_manager.setAWUDID(tmp_awudid);
	            _ready_for_adlib_awudid();
	            reconfirm = true;
            }

            var awGenerator = new AwGenerator({
                canvas: true,
                ie_activex: true,
                screen_resolution: true
            });
			var prev_awudid = md5(awGenerator.get());
		    var adlib_xdm = { easyXDM: easyXDM.noConflict("adlib_xdm_for_ad") };
		    
		    var same_origin = false;
		    var url_format = "//gwk.adlibr.com";
//		    var url_format = "//mkt.adlibr.com";
		    if(document.location.href.indexOf(url_format)>=0)
			    same_origin = true;
			    
			var remoteurl = http+"gwk.adlibr.com/ad/pairing/awudid?legacy="+prev_awudid;
			if(!same_origin)		    
			{
			    var socket = new adlib_xdm.easyXDM.Socket({
		
			        remote: remoteurl,
			        onMessage:function(message, origin) {
				        
			            if(message.indexOf("awudid:")==0)
			            {
				            var klen = 7;
				            var server_msg = message.substring(klen,message.length);
				            var adlib_awudid = server_msg;
				            
				            // save last value.
				            awudid_manager.setLastRemoteValue(adlib_awudid);			            			            
	
				            
				            if( tmp_last_remote_value == adlib_awudid )
				            {
					            // ok!!
					            awudid_manager.setXdomValue();
					            awudid_manager.setLocalValue(adlib_awudid);
	
					            awudid_manager.setAWUDID(adlib_awudid);
				            }
				            else
				            {
					            if(adlib_awudid == tmp_awudid)
					            {
						            awudid_manager.setXdomValue();
						            awudid_manager.setLocalValue(adlib_awudid);
						            
						            awudid_manager.setAWUDID(adlib_awudid);
					            }
					            else
					            {
						            if(tmp_awudid == "")
						            {
							            awudid_manager.setLocalValue(adlib_awudid);
							            tmp_awudid = adlib_awudid;
						            }
		
						            awudid_manager.setAWUDID(tmp_awudid);
					            }				            
				            }
				            
				            // destroy...
				            socket.destroy();
				            
				            // ok next..
				            if(!reconfirm)
					            _ready_for_adlib_awudid();
				            return;
			            }
			        }
			    });		 				
			}
			else
			{
				try
				{
					// document �� 異붽�
					var node = document.createElement("img");
					node.src = remoteurl;
					node.style.display = "none";
					node.style.width = "1px";
					node.style.height = "1px";
					node.style.position = "absolute";
	
					document.getElementsByTagName('body')[0].appendChild(node);									
				}catch(e){}
			}		      		    
	    }
	    catch(e)
	    {
//		    console.log(e);
	    }		
}
/////


function getADNext_awudid()
{
	    try
	    {
		    
            var tmp_awudid = awudid_manager.getLocalValue();
            var tmp_awudid_xdom = awudid_manager.getXdomValue();
                        
            if(tmp_awudid_xdom == "ok")
            {
	            awudid_manager.setAWUDID(tmp_awudid);	    
	            return tmp_awudid;
            }
            
            if(tmp_awudid == "")
            {
				tmp_awudid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				    return v.toString(16);
				});
				
				tmp_awudid = md5("udid 2 : " + tmp_awudid);
				
				return tmp_awudid;	            
            }
		}catch(e)
		{
			console.log(e);
		}
		
		return "";
}