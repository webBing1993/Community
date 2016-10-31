//////////////////////////////////////////////////////////////////////
// Pano2VR 5.0.2/15080 HTML5/CSS3 & WebGL Panorama Player           //
// License:                                                         //
// (c) 2016, Garden Gnome Software, http://ggnome.com               //
//////////////////////////////////////////////////////////////////////

var h = function() {
        function e(a, c) {
            this.x = a;
            this.y = c
        }
        e.prototype.Ka = function(a, c) {
            this.x = a;
            this.y = c
        };
        e.prototype.hc = function(a, c, b) {
            var d = c.y - a.y;
            this.x = a.x + (c.x - a.x) * b;
            this.y = a.y + d * b
        };
        e.prototype.pi = function(a, c, b, d, g) {
            var n;
            n = new e;
            n.hc(a, b, g);
            a = new e;
            a.hc(b, d, g);
            b = new e;
            b.hc(d, c, g);
            c = new e;
            c.hc(n, a, g);
            n = new e;
            n.hc(a, b, g);
            a = new e;
            a.hc(c, n, g);
            this.x = a.x;
            this.y = a.y
        };
        e.prototype.ri = function(a, c, b, d, g) {
            var n = new e,
                f = .5,
                k = .25;
            do {
                n.pi(a, c, b, d, f);
                var l = n.x - g,
                    f = 0 < l ? f - k : f + k,
                    k = k / 2
            } while (.01 < Math.abs(l));
            this.x = n.x;
            this.y = n.y
        };
        return e
    }(),
    y = function() {
        function e(a, c, b, d, g) {
            this.x = a;
            this.y = c;
            this.z = b;
            this.$b = d;
            this.$a = g
        }
        e.prototype.Ka = function(a, c, b, d, g) {
            this.x = a;
            this.y = c;
            this.z = b;
            this.$b = d;
            this.$a = g
        };
        e.prototype.toString = function() {
            return "(" + this.x + "," + this.y + "," + this.z + ") - (" + this.$b + "," + this.$a + ")"
        };
        e.prototype.pa = function(a) {
            var c = Math.sin(a);
            a = Math.cos(a);
            var b = this.y,
                d = this.z;
            this.y = a * b - c * d;
            this.z = c * b + a * d
        };
        e.prototype.Mj = function() {
            var a = this.y;
            this.y = -this.z;
            this.z = a
        };
        e.prototype.Lj = function() {
            var a = this.y;
            this.y = this.z;
            this.z = -a
        };
        e.prototype.wa = function(a) {
            var c = Math.sin(a);
            a = Math.cos(a);
            var b = this.x,
                d = this.z;
            this.x = a * b + c * d;
            this.z = -c * b + a * d
        };
        e.prototype.Nj = function() {
            var a = this.x;
            this.x = -this.z;
            this.z = a
        };
        e.prototype.Ra = function(a) {
            var c = Math.sin(a);
            a = Math.cos(a);
            var b = this.x,
                d = this.y;
            this.x = a * b - c * d;
            this.y = c * b + a * d
        };
        e.prototype.Gh = function() {
            var a = this.x;
            this.x = -this.y;
            this.y = a
        };
        e.prototype.Xf = function(a) {
            this.pa(a * Math.PI / 180)
        };
        e.prototype.Fh = function(a) {
            this.wa(a * Math.PI / 180)
        };
        e.prototype.Kj = function(a) {
            this.Ra(a * Math.PI / 180)
        };
        e.prototype.clone = function() {
            return new e(this.x, this.y, this.z, this.$b, this.$a)
        };
        e.prototype.length = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        };
        e.prototype.Me = function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z
        };
        e.prototype.Cg = function(a, c) {
            var b;
            b = Math.cos(c * Math.PI / 180);
            this.x = b * Math.sin(a * Math.PI / 180);
            this.y = Math.sin(c * Math.PI / 180);
            this.z = b * Math.cos(a * Math.PI / 180)
        };
        e.prototype.li = function() {
            return 180 * Math.atan2(-this.x, -this.z) / Math.PI
        };
        e.prototype.mi = function() {
            return 180 * Math.asin(this.y / this.length()) / Math.PI
        };
        e.prototype.hc = function(a, c, b) {
            this.x = a.x * b + c.x * (1 - b);
            this.y = a.y * b + c.y * (1 - b);
            this.z = a.z * b + c.z * (1 - b);
            this.$b = a.$b * b + c.$b * (1 - b);
            this.$a = a.$a * b + c.$a * (1 - b)
        };
        return e
    }();

function A() {
    var e;
    "undefined" != typeof Float32Array ? e = new Float32Array(16) : e = Array(16);
    return e
}
function D(e) {
    e[0] = 1;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;
    e[4] = 0;
    e[5] = 1;
    e[6] = 0;
    e[7] = 0;
    e[8] = 0;
    e[9] = 0;
    e[10] = 1;
    e[11] = 0;
    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1
}

function F(e, a) {
    var c = a[0],
        b = a[1];
    a = a[2];
    e[12] = e[0] * c + e[4] * b + e[8] * a + e[12];
    e[13] = e[1] * c + e[5] * b + e[9] * a + e[13];
    e[14] = e[2] * c + e[6] * b + e[10] * a + e[14];
    e[15] = e[3] * c + e[7] * b + e[11] * a + e[15]
}

function K(e, a, c) {
    var b, d = c[0],
        g = c[1];
    c = c[2];
    var n = Math.sqrt(d * d + g * g + c * c);
    if (n) {
        1 != n && (n = 1 / n, d *= n, g *= n, c *= n);
        var f = Math.sin(a),
            k = Math.cos(a),
            l = 1 - k;
        a = e[0];
        var n = e[1],
            q = e[2],
            p = e[3],
            m = e[4],
            r = e[5],
            t = e[6],
            v = e[7],
            w = e[8],
            u = e[9],
            C = e[10],
            B = e[11],
            x = d * d * l + k,
            z = g * d * l + c * f,
            E = c * d * l - g * f,
            G = d * g * l - c * f,
            H = g * g * l + k,
            I = c * g * l + d * f,
            J = d * c * l + g * f,
            d = g * c * l - d * f,
            g = c * c * l + k;
        b ? e != b && (b[12] = e[12], b[13] = e[13], b[14] = e[14], b[15] = e[15]) : b = e;
        b[0] = a * x + m * z + w * E;
        b[1] = n * x + r * z + u * E;
        b[2] = q * x + t * z + C * E;
        b[3] = p * x + v * z + B * E;
        b[4] = a * G + m * H + w * I;
        b[5] = n * G + r * H + u * I;
        b[6] = q * G + t * H + C * I;
        b[7] = p * G + v * H + B * I;
        b[8] = a * J + m * d + w * g;
        b[9] = n * J + r * d + u * g;
        b[10] = q * J + t * d + C * g;
        b[11] = p * J + v * d + B * g
    }
}
function L(e, a, c) {
    e = .1 * Math.tan(e * Math.PI / 360);
    a = e * a;
    var b = -a,
        d = -e;
    c || (c = A());
    var g = a - b,
        n = e - d;
    c[0] = .2 / g;
    c[1] = 0;
    c[2] = 0;
    c[3] = 0;
    c[4] = 0;
    c[5] = .2 / n;
    c[6] = 0;
    c[7] = 0;
    c[8] = (a + b) / g;
    c[9] = (e + d) / n;
    c[10] = -100.1 / 99.9;
    c[11] = -1;
    c[12] = 0;
    c[13] = 0;
    c[14] = -20 / 99.9;
    c[15] = 0
}

function M(e, a) {
    this.m = e;
    this.ma = a;
    var c, b, d = this.__div = document.createElement("div");
    if(a.skinid == 'no'){
        c = document.createElement("img");
        var g;
        g = "../images/1.png";
        c.setAttribute("src", g);
        c.setAttribute("style", "position: absolute;top: -18px;left: -23px;width:50px;height:30px;cursor:pointer; " + e.ua + "user-select: none;");
        c.ondragstart = function() {
            return !1
        };
        d.appendChild(c);
    }else{
        c = document.createElement("img");
        var g;
        g = "../images/2.png";
        c.setAttribute("src", g);
        c.setAttribute("style", "position: absolute;top: -18px;left: -23px;width:50px;height:30px;cursor:pointer; " + e.ua + "user-select: none;");
        c.ondragstart = function() {
            return !1
        };
        d.appendChild(c);
    }

    // g += "ILSSsRZRQIBdGHCFqIoKIvQRsUFRJC9LEgaSFbMMpcWi1pLzOLsjItKms0U5t5/c/wH7nc5";
    // g += "o2jF374xrv87z33nHOPaRsRtbFgDpgJxoD+wATfwDNQDK6CyrCr5OcbhgiGIRsUAZt4QTWo";
    // g += "IFXgp9JfAhY7rgdBl8NeBoLDYBloA+dBOagFTcDHcVEgDgwBGWA+OAcugvXgvb5wKMGJoAA";
    // g += "Mp9BpUA96EBf/Btsf8BI8AWfAErAcpHHDZeriliY2AVwDg8AucAQ0Ag+I4XhTm2Oxz8PT46";
    // g += "KMbTx5EZjuJDgAnAVusJUm9DhYwalFcc59sIXXIaceFkowDySBPTRPL20xm+b7zYXa+N3CP";
    // g += "rWJ6GuwGySA40HLBHc/GywFhbS5R1lEBrZy7FQwiSaX9pmnqeAYt+KUcew7BVZw/QKTq0oc";
    // g += "pYPVvDOXItZCk2xgDIZqL8BR8Ab0VDbr4yZOgLeIwzQx6WiQxcCt1+6sld66L4yYtFSwF4y";
    // g += "g2dU7/cEwGW9YVkAwmycp1dzdpvgm0DcCh4kHmxWzBls0uBX4qqmZJ4KzePm1IeJLgjmlC1";
    // g += "6aDKZpp5Q168B3o6wsSwTHgU+MIUs74RSj6y1d+212HKimJlUE+tFRfJpYtOKNXWmJTASqW";
    // g += "f2Bu/R6+4TKHOrOzG4IhptjWgHbGkZvepQ6SQK7oRuCXzjX1DJavBEX1ygfT8FgBqpfm1zR";
    // g += "DcEKbR2bsZlkJCdXieB1ZhZ5YtqVgXIPN+m9kbY6hpdb+d9fPncJRmZmqQheZkemJmgxyxy";
    // g += "kl3XWJEkcAl7N21s7PDcl5ZJ0PAa3wVwmWtVbZafPwQ7wLozYB7ATPNJO56d/LAikP9u+66";
    // g += "KNJS1d4IOZp7wU0hfLukUyzgwm70T2N/DOxIy/eFdqawa5DL2NEGwP5k15Ja4woz9glvcom";
    // g += "d9NzyvkFcQo5gomaLfm5c0svnKZ2k7q7+FauvR2MJKZR3+sY5WgtvkdG6JyELGhNHMTXyGf";
    // g += "LviRJ5Tcd4Dlhle7086Sgp8CqVxDkn4OqHaqacr5ekjy3Q/W0FRNNGmoMtamdzdxsytZC0l";
    // g += "qXKhEgWPVVgImg2NgFT1MHOoOk3yLEtgWN5TEOYvoIFI1rGM19//2wpAD7imF7lfwENwAxa";
    // g += "ASNCj90pcLLKdC2Iyw1M9gnEplMEp5kOU1f8WwKGJm8oUr9f8JMAAVMDM6HSDa9QAAAABJR";
    // g += "U5ErkJggg%3D%3D";

    g = "position:absolute;" + (e.ua + "user-select: none;");
    g += e.ua + "touch-callout: none;";
    g += e.ua + "tap-highlight-color: rgba(0,0,0,0);";
    e.Ic && !e.ka && (g += e.ua + "transform: translateZ(9999999px);");
    d.setAttribute("style", g);
    d.onclick = function() {
        e.gd(a);
        e.Pf(a.url, a.target)
    };
    var n = e.v.eg;
    n.enabled && (b = document.createElement("div"), g = "position:absolute;left:28px;top:-11px;", g = n.jf ? g + "white-space: pre-wrap;" : g + "white-space: nowrap;", g += e.ua + "transform-origin: 50% 50%;", g += "", g += "overflow: hidden;", g += "padding: 0px 1px 0px 1px;", b.setAttribute("style", g), b.style.color = "rgb(255, 255, 255)", b.style.backgroundColor = "rgb(88, 88, 88)", b.style.border = "1px solid rgb(88, 88, 88)", b.style.borderRadius = '19px', b.style.textAlign = "center", b.style.width = "60px", b.style.height = "auto",b.style.lineHeight = "20px", b.style.overflow = "hidden", b.innerHTML = a.title, d.onmouseover = function() {
        0 == n.width && (b.style.left = -b.offsetWidth / 2 + "px");
        b.style.visibility = "inherit"
    }, d.onmouseout = function() {
        b.style.visibility = "visible"
    }, d.appendChild(b))
}
var N = function() {
        function e(a) {
            this.m = a;
            this.enable = !1;
            this.mg = 1;
            this.he = 0;
            this.type = "crossdissolve";
            this.Kb = this.Ba = this.Zb = 0;
            this.kf = 5;
            this.fe = 1;
            this.lf = !1;
            this.We = this.Ve = this.cg = 0;
            this.jd = 70;
            this.gi = 0;
            this.Na = this.fi = 1;
            this.ee = this.de = .5;
            this.sd = this.sh = this.fh = !1;
            this.vf = 1
        }
        e.prototype.Jd = function() {
            var a = this.m.a,
                c = a.createShader(a.VERTEX_SHADER),
                b;
            b = "attribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n";
            b += "varying vec2 vTextureCoord;\n";
            b += "uniform bool uZoomIn;\n";
            b += "uniform float uZoomFactor;\n";
            b += "uniform vec2 uZoomCenter;\n";
            b += "void main(void) {\n";
            b += "\t gl_Position = vec4(aVertexPosition, 1.0);\n";
            b += "\t if(!uZoomIn) {\n";
            b += "\t \n";
            b += "\t   vTextureCoord = aTextureCoord;\n";
            b += "\t }\n";
            b += "\t else {\n";
            b += "\t   vTextureCoord = (aTextureCoord - vec2(0.5, 0.5)) * (1.0/uZoomFactor) + uZoomCenter;\n";
            b += "\t }\n";
            b += "}\n";
            a.shaderSource(c, b);
            a.compileShader(c);
            a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
            var d = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\n";
            b += "uniform float uAlpha;\n";
            b += "uniform sampler2D uSampler;\n";
            b += "void main(void) {\n";
            b += " vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n";
            b += " gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, uAlpha);\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            this.ga = a.createProgram();
            a.attachShader(this.ga, c);
            a.attachShader(this.ga, d);
            a.linkProgram(this.ga);
            a.getProgramParameter(this.ga, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.ga.ca = a.getAttribLocation(this.ga, "aVertexPosition");
            a.enableVertexAttribArray(this.ga.ca);
            this.ga.Ga = a.getAttribLocation(this.ga, "aTextureCoord");
            a.enableVertexAttribArray(this.ga.Ga);
            d = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\n";
            b += "uniform float uColorPercent;\n";
            b += "uniform float uAlpha;\n";
            b += "uniform vec3 uDipColor;\n";
            b += "uniform sampler2D uSampler;\n";
            b += "void main(void) {\n";
            b += " vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n";
            b += " gl_FragColor = vec4(textureColor.x * (1.0 - uColorPercent) + uDipColor.x * uColorPercent, textureColor.y * (1.0 - uColorPercent) + uDipColor.y * uColorPercent, textureColor.z * (1.0 - uColorPercent) + uDipColor.z * uColorPercent, uAlpha);\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            this.ya = a.createProgram();
            a.attachShader(this.ya, c);
            a.attachShader(this.ya, d);
            a.linkProgram(this.ya);
            a.getProgramParameter(this.ya, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.ya.ca = a.getAttribLocation(this.ya, "aVertexPosition");
            a.enableVertexAttribArray(this.ya.ca);
            this.ya.Ga = a.getAttribLocation(this.ya, "aTextureCoord");
            a.enableVertexAttribArray(this.ya.Ga);
            d = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\n";
            b += "uniform bool uRound;\n";
            b += "uniform float uRadius;\n";
            b += "uniform vec2 uRectDim;\n";
            b += "uniform vec2 uIrisCenter;\n";
            b += "uniform float uSoftEdge;\n";
            b += "uniform sampler2D uSampler;\n";
            b += "void main(void) {\n";
            b += " float alpha = 0.0;\n";
            b += " vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n";
            b += " if (uRound) {\n";
            b += "\t  vec2 diff = uIrisCenter - gl_FragCoord.xy;\n";
            b += "\t   float distFromCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n";
            b += "\t   if (distFromCenter > uRadius) {\n";
            b += "      alpha = 1.0;\n";
            b += "    } else {\n";
            b += "      alpha = 1.0 - ((uRadius - distFromCenter) / uSoftEdge);\n";
            b += "    };\n";
            b += " }\n";
            b += " else {\n";
            b += "    float alphaFromLeft = 1.0 - ((gl_FragCoord.x -(uIrisCenter.x - uRectDim.x)) / uSoftEdge);\n";
            b += "    float alphaFromRight = 1.0 - (((uIrisCenter.x + uRectDim.x) - gl_FragCoord.x) / uSoftEdge);\n";
            b += "    float alphaFromTop = 1.0 - ((gl_FragCoord.y -(uIrisCenter.y - uRectDim.y)) / uSoftEdge);\n";
            b += "    float alphaFromBottom = 1.0 - (((uIrisCenter.y + uRectDim.y) - gl_FragCoord.y) / uSoftEdge);\n";
            b += "    alpha = max(max(alphaFromLeft, alphaFromRight), max(alphaFromTop, alphaFromBottom));\n";
            b += " }\n";
            b += " gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, alpha);\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            this.qa = a.createProgram();
            a.attachShader(this.qa, c);
            a.attachShader(this.qa, d);
            a.linkProgram(this.qa);
            a.getProgramParameter(this.qa, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.qa.ca = a.getAttribLocation(this.qa, "aVertexPosition");
            a.enableVertexAttribArray(this.qa.ca);
            this.qa.Ga = a.getAttribLocation(this.qa, "aTextureCoord");
            a.enableVertexAttribArray(this.qa.Ga);
            d = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\n";
            b += "uniform float uPercent;\n";
            b += "uniform int uDirection;\n";
            b += "uniform vec2 uCanvasDimensions;\n";
            b += "uniform float uSoftEdge;\n";
            b += "uniform sampler2D uSampler;\n";
            b += "void main(void) {\n";
            b += " vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n";
            b += " float alpha = 0.0;\n";
            b += " if (uDirection == 1) {\n";
            b += "\t if (gl_FragCoord.x > uPercent) {\n";
            b += "    alpha = 1.0; \n";
            b += "  } else {\n";
            b += "    alpha = 1.0 - ((uPercent - gl_FragCoord.x) / uSoftEdge);\n";
            b += "  }\n";
            b += " }\n";
            b += " if (uDirection == 2) {\n";
            b += "\t if (gl_FragCoord.x < uCanvasDimensions.x - uPercent) {\n";
            b += "    alpha = 1.0; \n";
            b += "  } else {\n";
            b += "    alpha = 1.0 - ((gl_FragCoord.x - (uCanvasDimensions.x - uPercent)) / uSoftEdge);\n";
            b += "  }\n";
            b += " }\n";
            b += " if (uDirection == 3) {\n";
            b += "\t if (gl_FragCoord.y < uCanvasDimensions.y - uPercent) {\n";
            b += "    alpha = 1.0; \n";
            b += "  } else {\n";
            b += "    alpha = 1.0 - ((gl_FragCoord.y - (uCanvasDimensions.y - uPercent)) / uSoftEdge);\n";
            b += "  }\n";
            b += " }\n";
            b += " if (uDirection == 4) {\n";
            b += "\t if (gl_FragCoord.y > uPercent) {\n";
            b += "    alpha = 1.0; \n";
            b += "  } else {\n";
            b += "    alpha = 1.0 - ((uPercent - gl_FragCoord.y) / uSoftEdge);\n";
            b += "  }\n";
            b += " }\n";
            b += " gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, alpha);\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            this.ta = a.createProgram();
            a.attachShader(this.ta, c);
            a.attachShader(this.ta, d);
            a.linkProgram(this.ta);
            a.getProgramParameter(this.ta, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.ta.ca = a.getAttribLocation(this.ta, "aVertexPosition");
            a.enableVertexAttribArray(this.ta.ca);
            this.ta.Ga = a.getAttribLocation(this.ta, "aTextureCoord");
            a.enableVertexAttribArray(this.ta.Ga)
        };
        e.prototype.xc = function() {
            var a = this.m.a;
            if (!a) return !1;
            if (this.kb = a.createFramebuffer()) {
                a.bindFramebuffer(a.FRAMEBUFFER, this.kb);
                this.kb.width = 1024;
                this.kb.height = 1024;
                this.Qc = a.createTexture();
                a.bindTexture(a.TEXTURE_2D, this.Qc);
                a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
                a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
                a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, this.kb.width, this.kb.height, 0, a.RGBA, a.UNSIGNED_BYTE, null);
                var c = a.createRenderbuffer();
                a.bindRenderbuffer(a.RENDERBUFFER, c);
                a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, this.kb.width, this.kb.height);
                a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.Qc, 0);
                a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, c);
                a.bindTexture(a.TEXTURE_2D, null);
                a.bindRenderbuffer(a.RENDERBUFFER, null);
                a.bindFramebuffer(a.FRAMEBUFFER, null);
                return !0
            }
            return !1
        };
        e.prototype.vh = function(a) {
            var c = this.m.a,
                b = this.m.Ta;
            if (this.Ec) {
                c.useProgram(this.ga);
                c.bindBuffer(c.ARRAY_BUFFER, this.m.Fa);
                c.vertexAttribPointer(this.ga.ca, this.m.Fa.Qb, c.FLOAT, !1, 0, 0);
                c.bindBuffer(c.ARRAY_BUFFER, this.m.ed);
                c.vertexAttribPointer(this.ga.Ga, 2, c.FLOAT, !1, 0, 0);
                c.activeTexture(c.TEXTURE0);
                c.bindTexture(c.TEXTURE_2D, this.Qc);
                var b = 1 + (this.Na - 1) * a,
                    d = c.getUniformLocation(this.ga, "uAlpha");
                c.uniform1f(d, 1);
                d = c.getUniformLocation(this.ga, "uZoomIn");
                c.uniform1i(d, 1);
                var d = c.getUniformLocation(this.ga, "uZoomCenter"),
                    g = .5 + (this.de - .5) * Math.sqrt(a),
                    e = .5 + (this.ee - .5) * Math.sqrt(a);
                0 > g - .5 / b && (g = .5 / b);
                0 > e - .5 / b && (e = .5 / b);
                1 < g + .5 / b && (g = 1 - .5 / b);
                1 < e + .5 / b && (e = 1 - .5 / b);
                c.uniform2f(d, g, e);
                g = c.getUniformLocation(this.ga, "uZoomFactor");
                c.uniform1f(g, b);
                c.uniform1i(c.getUniformLocation(this.ga, "uSampler"), 0);
                c.drawArrays(c.TRIANGLE_STRIP, 0, this.m.Fa.Ac);
                c.useProgram(this.m.F)
            } else {
                this.m.Zd();
                c.blendFuncSeparate(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA, c.SRC_ALPHA, c.ONE);
                c.enable(c.BLEND);
                c.disable(c.DEPTH_TEST);
                g = .5 + (this.de - .5);
                e = .5 + (this.ee - .5);
                0 > g - .5 / this.Na && (g = .5 / this.Na);
                0 > e - .5 / this.Na && (e = .5 / this.Na);
                1 < g + .5 / this.Na && (g = 1 - .5 / this.Na);
                1 < e + .5 / this.Na && (e = 1 - .5 / this.Na);
                if ("crossdissolve" == this.type) c.useProgram(this.ga), c.bindBuffer(c.ARRAY_BUFFER, this.m.Fa), c.vertexAttribPointer(this.ga.ca, this.m.Fa.Qb, c.FLOAT, !1, 0, 0), c.bindBuffer(c.ARRAY_BUFFER, this.m.ed), c.vertexAttribPointer(this.ga.Ga, 2, c.FLOAT, !1, 0, 0), c.activeTexture(c.TEXTURE0), c.bindTexture(c.TEXTURE_2D, this.Qc), d = c.getUniformLocation(this.ga, "uAlpha"), c.uniform1f(d, 1 - a), d = c.getUniformLocation(this.ga, "uZoomIn"), c.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0), d = c.getUniformLocation(this.ga, "uZoomCenter"), c.uniform2f(d, g, e), g = c.getUniformLocation(this.ga, "uZoomFactor"), c.uniform1f(g, this.Na), c.uniform1i(c.getUniformLocation(this.ga, "uSampler"), 0);
                else if ("diptocolor" == this.type) c.useProgram(this.ya), c.bindBuffer(c.ARRAY_BUFFER, this.m.Fa), c.vertexAttribPointer(this.ya.ca, this.m.Fa.Qb, c.FLOAT, !1, 0, 0), c.bindBuffer(c.ARRAY_BUFFER, this.m.ed), c.vertexAttribPointer(this.ya.Ga, 2, c.FLOAT, !1, 0, 0), c.activeTexture(c.TEXTURE0), c.bindTexture(c.TEXTURE_2D, this.Qc), c.uniform1f(c.getUniformLocation(this.ya, "uColorPercent"), Math.min(2 * a, 1)), d = c.getUniformLocation(this.ya, "uAlpha"), a = Math.max(2 * (a - .5), 0), c.uniform1f(d, 1 - a), c.uniform3f(c.getUniformLocation(this.ya, "uDipColor"), (this.he >> 16 & 255) / 255, (this.he >> 8 & 255) / 255, (this.he & 255) / 255), d = c.getUniformLocation(this.ya, "uZoomIn"), c.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0), d = c.getUniformLocation(this.ya, "uZoomCenter"), c.uniform2f(d, g, e), g = c.getUniformLocation(this.ya, "uZoomFactor"), c.uniform1f(g, this.Na), c.uniform1i(c.getUniformLocation(this.ya, "uSampler"), 0);
                else if ("irisround" == this.type || "irisrectangular" == this.type) {
                    c.useProgram(this.qa);
                    c.bindBuffer(c.ARRAY_BUFFER, this.m.Fa);
                    c.vertexAttribPointer(this.qa.ca, this.m.Fa.Qb, c.FLOAT, !1, 0, 0);
                    c.bindBuffer(c.ARRAY_BUFFER, this.m.ed);
                    c.vertexAttribPointer(this.qa.Ga, 2, c.FLOAT, !1, 0, 0);
                    c.activeTexture(c.TEXTURE0);
                    c.bindTexture(c.TEXTURE_2D, this.Qc);
                    var f;
                    1 == this.Ba || 2 == this.Ba ? f = d = .5 : (d = this.de, f = this.ee);
                    var k = d * b.width,
                        l = f * b.height,
                        k = Math.max(k, b.width - k),
                        l = Math.max(l, b.height - l);
                    "irisround" == this.type ? c.uniform1f(c.getUniformLocation(this.qa, "uRadius"), (Math.sqrt(k * k + l * l) + this.Zb) * a) : (k > l ? (l = b.height / b.width * k + this.Zb, k += this.Zb) : (k = b.width / b.height * l + this.Zb, l += this.Zb), c.uniform2f(c.getUniformLocation(this.qa, "uRectDim"), k * a, l * a));
                    a = c.getUniformLocation(this.qa, "uSoftEdge");
                    c.uniform1f(a, this.Zb);
                    c.uniform1i(c.getUniformLocation(this.qa, "uRound"), "irisround" == this.type ? 1 : 0);
                    c.uniform2f(c.getUniformLocation(this.qa, "uIrisCenter"), d * b.width, f * b.height);
                    d = c.getUniformLocation(this.qa, "uZoomIn");
                    c.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0);
                    d = c.getUniformLocation(this.qa, "uZoomCenter");
                    c.uniform2f(d, g, e);
                    g = c.getUniformLocation(this.qa, "uZoomFactor");
                    c.uniform1f(g, this.Na);
                    c.uniform1i(c.getUniformLocation(this.qa, "uSampler"), 0)
                } else if ("wipeleftright" == this.type || "wiperightleft" == this.type || "wipetopbottom" == this.type || "wipebottomtop" == this.type || "wiperandom" == this.type) c.useProgram(this.ta), c.bindBuffer(c.ARRAY_BUFFER, this.m.Fa), c.vertexAttribPointer(this.ta.ca, this.m.Fa.Qb, c.FLOAT, !1, 0, 0), c.bindBuffer(c.ARRAY_BUFFER, this.m.ed), c.vertexAttribPointer(this.ta.Ga, 2, c.FLOAT, !1, 0, 0), c.activeTexture(c.TEXTURE0), c.bindTexture(c.TEXTURE_2D, this.Qc), c.uniform1f(c.getUniformLocation(this.ta, "uPercent"), 3 > this.vf ? a * (b.width + this.Zb) : a * (b.height + this.Zb)), a = c.getUniformLocation(this.ta, "uSoftEdge"), c.uniform1f(a, this.Zb), c.uniform1i(c.getUniformLocation(this.ta, "uDirection"), this.vf), c.uniform2f(c.getUniformLocation(this.ta, "uCanvasDimensions"), b.width, b.height), d = c.getUniformLocation(this.ta, "uZoomIn"), c.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0), d = c.getUniformLocation(this.ta, "uZoomCenter"), c.uniform2f(d, g, e), g = c.getUniformLocation(this.ta, "uZoomFactor"), c.uniform1f(g, this.Na), c.uniform1i(c.getUniformLocation(this.ta, "uSampler"), 0);
                c.drawArrays(c.TRIANGLE_STRIP, 0, this.m.Fa.Ac);
                c.useProgram(this.m.F);
                c.disable(c.BLEND);
                c.enable(c.DEPTH_TEST)
            }
        };
        return e
    }(),
    O = function() {
        function e(a) {
            this.Yd = [];
            this.m = a;
            this.enable = !1;
            this.pc = 2;
            this.sg = !1
        }
        e.prototype.zf = function(a) {
            if (2 == a.mode || 3 == a.mode || 5 == a.mode) {
                var c = this.m.lb.currentTime,
                    b = a.zb.gain.value,
                    d = a.xb.gain.value,
                    g = a.yb.gain.value;
                a.wb.gain.linearRampToValueAtTime(a.wb.gain.value, c);
                a.wb.gain.linearRampToValueAtTime(0, c + this.pc);
                a.zb.gain.linearRampToValueAtTime(b, c);
                a.zb.gain.linearRampToValueAtTime(0, c + this.pc);
                a.xb.gain.linearRampToValueAtTime(d, c);
                a.xb.gain.linearRampToValueAtTime(0, c + this.pc);
                a.yb.gain.linearRampToValueAtTime(g, c);
                a.yb.gain.linearRampToValueAtTime(0, c + this.pc)
            } else c = this.m.lb.currentTime, a.fc.gain.linearRampToValueAtTime(a.fc.gain.value, c), a.fc.gain.linearRampToValueAtTime(0, c + this.pc);
            a.Af = !0;
            setTimeout(function() {
                a.Nc()
            }, 1E3 * this.pc + 5)
        };
        e.prototype.hk = function() {
            for (var a = 0; a < this.m.R.length; a++) {
                var c = this.m.R[a];
                this.m.zc(c.id) || 4 == c.mode || 6 == c.mode || (c.c.play(), c.c.currentTime = 0)
            }
        };
        e.prototype.Ci = function() {
            for (var a = (this.m.lb.currentTime - this.ek) / this.pc, a = Math.min(1, a), c = 0; c < this.m.R.length; c++) {
                var b = this.m.R[c];
                this.m.zc(b.id) && 1 > b.aa && (b.aa = a)
            }
            1 == a && clearInterval(this.dk)
        };
        return e
    }(),
    P = function() {
        function e(a) {
            this.Od = [];
            this.ac = null;
            this.ib = [];
            this.cb = [];
            this.jb = [];
            this.m = a;
            this.yi()
        }
        e.prototype.Jd = function() {
            var a = this.m.a,
                c = a.createShader(a.VERTEX_SHADER),
                b;
            b = "attribute vec3 aVertexPosition;\nvoid main(void) {\n";
            b += " gl_Position = vec4(aVertexPosition, 1.0);\n";
            b += "}\n";
            a.shaderSource(c, b);
            a.compileShader(c);
            a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
            var d = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n";
            b += "precision highp float;\n";
            b += "#else\n";
            b += "precision mediump float;\n";
            b += "#endif\n";
            b += "varying vec4 vColor;\n";
            b += "uniform vec2 uCanvasDimensions;\n";
            b += "uniform vec2 uFlareCenterPosition;\n";
            b += "uniform float uBlindingValue;\n";
            b += "uniform float uAspectRatio;\n";
            b += "void main(void) {\n";
            b += " float canvasDiag = sqrt( (uCanvasDimensions.x * uCanvasDimensions.x) + (uCanvasDimensions.y * uCanvasDimensions.y) );\n";
            b += " vec2 diff = uFlareCenterPosition - gl_FragCoord.xy;\n";
            b += " diff.y = diff.y * uAspectRatio;\n";
            b += " float distFromFlarePoint = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n";
            b += " float factor = (distFromFlarePoint / canvasDiag) / 10.0;\n";
            b += " gl_FragColor = vec4(1.0, 1.0, 1.0, pow(((1.0 - factor) * 0.8) * uBlindingValue, 2.0));\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            this.nb = a.createProgram();
            a.attachShader(this.nb, c);
            a.attachShader(this.nb, d);
            a.linkProgram(this.nb);
            a.getProgramParameter(this.nb, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.nb.ca = a.getAttribLocation(this.nb, "aVertexPosition");
            a.enableVertexAttribArray(this.nb.ca);
            d = a.createShader(a.VERTEX_SHADER);
            c = a.createShader(a.VERTEX_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n";
            b += "precision highp float;\n";
            b += "#else\n";
            b += "precision mediump float;\n";
            b += "#endif\n";
            b += "attribute vec3 aVertexPosition;\n";
            b += "varying vec4 vColor;\n";
            b += "uniform vec2 uCirclePosition;\n";
            b += "uniform float uCircleRadius;\n";
            b += "uniform vec2 uCanvasDimensions2;\n";
            b += "uniform float uAspectRatio;\n";
            b += "void main(void) {\n";
            b += " vec2 circleOnScreen = aVertexPosition.xy * uCircleRadius + uCirclePosition;\n";
            b += " circleOnScreen.y = circleOnScreen.y / uAspectRatio;\n";
            b += " vec2 circleNorm = (circleOnScreen / uCanvasDimensions2) * 2.0 - vec2(1.0, 1.0);\n";
            b += " gl_Position = vec4(circleNorm.x, circleNorm.y, 0.0, 1.0);\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            a.shaderSource(c, b);
            a.compileShader(c);
            a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), d = null);
            var g = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n";
            b += "precision highp float;\n";
            b += "#else\n";
            b += "precision mediump float;\n";
            b += "#endif\n";
            b += "varying vec4 vColor;\n";
            b += "uniform vec2 uCircleTexturePosition;\n";
            b += "uniform vec3 uCircleColor;\n";
            b += "uniform float uCircleRadius;\n";
            b += "uniform float uCircleAlpha;\n";
            b += "uniform float uCircleSoftness;\n";
            b += "uniform float uAspectRatio;\n";
            b += "void main(void) {\n";
            b += " vec2 diff = uCircleTexturePosition - gl_FragCoord.xy;\n";
            b += " diff.y = diff.y * uAspectRatio;\n";
            b += " float distFromCircleCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n";
            b += " float softnessDistance = uCircleRadius * (1.0 - uCircleSoftness);\n";
            b += " if (distFromCircleCenter > uCircleRadius)\n";
            b += " {\n";
            b += "\t  gl_FragColor = vec4(uCircleColor, 0.0);\n";
            b += " }\n";
            b += " else if (distFromCircleCenter <= (softnessDistance))\n";
            b += " {\n";
            b += "\t  float factor = distFromCircleCenter / softnessDistance;\n";
            b += "\t  gl_FragColor = vec4(uCircleColor, pow((1.0 - (0.2 * factor)) * uCircleAlpha, 1.8));\n";
            b += " }\n";
            b += " else\n";
            b += " {\n";
            b += "\t  float factor = (distFromCircleCenter - softnessDistance) / (uCircleRadius - softnessDistance);\n";
            b += "\t  gl_FragColor = vec4(uCircleColor, pow((0.8 - (0.8 * factor)) * uCircleAlpha, 1.8));\n";
            b += " }\n";
            b += "}\n";
            a.shaderSource(g, b);
            a.compileShader(g);
            a.getShaderParameter(g, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(g)), g = null);
            this.fa = a.createProgram();
            a.attachShader(this.fa, d);
            a.attachShader(this.fa, g);
            a.linkProgram(this.fa);
            a.getProgramParameter(this.fa, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.fa.ca = a.getAttribLocation(this.fa, "aVertexPosition");
            a.enableVertexAttribArray(this.fa.ca);
            d = a.createShader(a.FRAGMENT_SHADER);
            b = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n";
            b += "precision highp float;\n";
            b += "#else\n";
            b += "precision mediump float;\n";
            b += "#endif\n";
            b += "varying vec4 vColor;\n";
            b += "uniform vec2 uRingTexturePosition;\n";
            b += "uniform float uRingRadius;\n";
            b += "uniform float uRingAlpha;\n";
            b += "uniform float uAspectRatio;\n";
            b += "uniform sampler2D uSampler;\n";
            b += "void main(void) {\n";
            b += " vec2 diff = uRingTexturePosition - gl_FragCoord.xy;\n";
            b += " diff.y = diff.y * uAspectRatio;\n";
            b += " float distFromRingCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n";
            b += " float factor = distFromRingCenter / uRingRadius;\n";
            b += " if (distFromRingCenter > uRingRadius)\n";
            b += " {\n";
            b += "\t gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);\n";
            b += " }\n";
            b += " else\n";
            b += " {\n";
            b += " vec4 textureColor = texture2D(uSampler, vec2(factor / uAspectRatio, 0.5));\n";
            b += " gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, uRingAlpha);\n";
            b += " }\n";
            b += "}\n";
            a.shaderSource(d, b);
            a.compileShader(d);
            a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
            this.La = a.createProgram();
            a.attachShader(this.La, c);
            a.attachShader(this.La, d);
            a.linkProgram(this.La);
            a.getProgramParameter(this.La, a.LINK_STATUS) || alert("Could not initialise shaders");
            this.La.ca = a.getAttribLocation(this.La, "aVertexPosition")
        };
        e.prototype.xc = function() {
            var a = this.m.a;
            this.ec = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.ec);
            a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), a.STATIC_DRAW);
            this.ec.Qb = 3;
            this.ec.Ac = 4;
            this.Xc = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.Xc);
            for (var c = [0, 0, 0], b = 2 * Math.PI / 6, d = Math.PI / 180 * 35, g = 1, e = d; e <= d + 2 * Math.PI; e += b) c.push(Math.sin(e)), c.push(-Math.cos(e)), c.push(0), g++;
            a.bufferData(a.ARRAY_BUFFER, new Float32Array(c), a.STATIC_DRAW);
            this.Xc.Qb = 3;
            this.Xc.Ac = g;
            this.Eh = a.createTexture();
            a.bindTexture(a.TEXTURE_2D, this.Eh);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
            c = document.createElement("canvas");
            c.width = 100;
            c.height = 1;
            b = c.getContext("2d");
            b.width = 100;
            b.height = 1;
            d = b.createLinearGradient(0, 0, 100, 0);
            d.addColorStop(0, this.m.X(16777215, 0));
            d.addColorStop(.88, this.m.X(0, 0));
            d.addColorStop(.9, this.m.X(16654848, 1));
            d.addColorStop(.92, this.m.X(16776448, 1));
            d.addColorStop(.94, this.m.X(4849466, 1));
            d.addColorStop(.96, this.m.X(131071, 1));
            d.addColorStop(.98, this.m.X(8190, 1));
            d.addColorStop(1, this.m.X(0, 0));
            b.fillStyle = d;
            b.fillRect(0, 0, 100, 1);
            a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c)
        };
        e.prototype.Ij = function() {
            for (; 0 < this.Od.length;) this.Od.pop()
        };
        e.prototype.yi = function() {
            var a = [],
                c = [],
                b = [],
                d = {
                    i: 14,
                    alpha: .2,
                    color: 11390415,
                    h: .27
                };
            a.push(d);
            d = {
                i: 20,
                alpha: .25,
                color: 11390415,
                h: .4
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .2,
                color: 12442332,
                h: .6
            };
            a.push(d);
            d = {
                i: 15,
                alpha: .2,
                color: 11390415,
                h: .8
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .2,
                color: 12442332,
                h: 1.5
            };
            a.push(d);
            d = {
                i: 15,
                alpha: .2,
                color: 11390415,
                h: 1.8
            };
            a.push(d);
            d = {
                i: 8,
                alpha: .2,
                color: 12575203,
                s: .8,
                h: .7
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .4,
                color: 12575203,
                s: .5,
                h: 1.6
            };
            c.push(d);
            d = {
                i: 5,
                alpha: .4,
                color: 12575203,
                s: .6,
                h: .9
            };
            c.push(d);
            d = {
                i: 8,
                alpha: .3,
                color: 12575203,
                s: .4,
                h: 1.1
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 30,
                alpha: .3,
                color: 11390415,
                h: .5
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 11390415,
                h: 1
            };
            a.push(d);
            d = {
                i: 20,
                alpha: .3,
                color: 11390415,
                h: 1.3
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 11390415,
                h: 1.5
            };
            a.push(d);
            d = {
                i: 15,
                alpha: .3,
                color: 11390415,
                h: 1.8
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 15506856,
                s: .8,
                h: .7
            };
            c.push(d);
            d = {
                i: 20,
                alpha: .5,
                color: 15506856,
                s: .5,
                h: 1.6
            };
            c.push(d);
            d = {
                i: 5,
                alpha: .5,
                color: 15506856,
                s: .6,
                h: .9
            };
            c.push(d);
            d = {
                i: 60,
                alpha: .4,
                color: 15506856,
                s: .2,
                h: 1.1
            };
            c.push(d);
            b.push({
                i: 220,
                alpha: .035,
                h: 2
            });
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 30,
                alpha: .5,
                color: 15465727,
                h: .5
            };
            a.push(d);
            d = {
                i: 40,
                alpha: .28,
                color: 15726842,
                h: .8
            };
            a.push(d);
            d = {
                i: 25,
                alpha: .32,
                color: 15726842,
                h: 1.1
            };
            a.push(d);
            d = {
                i: 15,
                alpha: .25,
                color: 15726842,
                h: 1.35
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .28,
                color: 15465727,
                h: 1.65
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .45,
                color: 15465727,
                s: .8,
                h: .7
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .5,
                color: 15465727,
                s: .4,
                h: .9
            };
            c.push(d);
            d = {
                i: 40,
                alpha: .4,
                color: 15465727,
                s: .3,
                h: .38
            };
            c.push(d);
            d = {
                i: 50,
                alpha: .4,
                color: 15465727,
                s: .5,
                h: 1.25
            };
            c.push(d);
            d = {
                i: 18,
                alpha: .2,
                color: 15465727,
                s: .5,
                h: 1.25
            };
            c.push(d);
            d = {
                i: 10,
                alpha: .34,
                color: 15726842,
                s: .8,
                h: 1.5
            };
            c.push(d);
            d = {
                i: 38,
                alpha: .37,
                color: 15465727,
                s: .3,
                h: -.5
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 16,
                alpha: .5,
                color: 16363159,
                h: .1
            };
            a.push(d);
            d = {
                i: 26,
                alpha: .3,
                color: 16091819,
                h: .32
            };
            a.push(d);
            d = {
                i: 29,
                alpha: .2,
                color: 16091819,
                h: 1.32
            };
            a.push(d);
            d = {
                i: 20,
                alpha: .18,
                color: 16363159,
                h: 1.53
            };
            a.push(d);
            d = {
                i: 27,
                alpha: .13,
                color: 16425092,
                h: 1.6
            };
            a.push(d);
            d = {
                i: 20,
                alpha: .1,
                color: 16091819,
                h: 1.75
            };
            a.push(d);
            d = {
                i: 12,
                alpha: .45,
                color: 16312238,
                s: .45,
                h: .2
            };
            c.push(d);
            d = {
                i: 8,
                alpha: .25,
                color: 16434209,
                s: .7,
                h: .33
            };
            c.push(d);
            d = {
                i: 9,
                alpha: .25,
                color: 16091819,
                s: .4,
                h: .7
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .2,
                color: 16091819,
                s: .4,
                h: .85
            };
            c.push(d);
            d = {
                i: 60,
                alpha: .23,
                color: 16091819,
                s: .55,
                h: 1.05
            };
            c.push(d);
            d = {
                i: 37,
                alpha: .1,
                color: 16091819,
                s: .55,
                h: 1.22
            };
            c.push(d);
            d = {
                i: 10,
                alpha: .25,
                color: 16363159,
                s: .65,
                h: 1.38
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .2,
                color: 16434209,
                s: .5,
                h: 1.45
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .2,
                color: 16416033,
                s: .5,
                h: 1.78
            };
            c.push(d);
            d = {
                i: 6,
                alpha: .18,
                color: 16434209,
                s: .45,
                h: 1.9
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .14,
                color: 16766514,
                s: .45,
                h: 2.04
            };
            c.push(d);
            d = {
                i: 30,
                alpha: .14,
                color: 16766514,
                s: .8,
                h: .04
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 9,
                alpha: .3,
                color: 14346999,
                s: .3,
                h: .3
            };
            c.push(d);
            d = {
                i: 5,
                alpha: .5,
                color: 14148072,
                s: .8,
                h: .6
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .37,
                color: 14346999,
                s: .66,
                h: .8
            };
            c.push(d);
            d = {
                i: 45,
                alpha: .2,
                color: 14346999,
                s: .36,
                h: 1.2
            };
            c.push(d);
            d = {
                i: 13,
                alpha: .2,
                color: 14346999,
                s: .36,
                h: 1.23
            };
            c.push(d);
            d = {
                i: 11,
                alpha: .2,
                color: 14148072,
                s: .36,
                h: 1.28
            };
            c.push(d);
            d = {
                i: 27,
                alpha: .16,
                color: 14346999,
                s: .36,
                h: 1.55
            };
            c.push(d);
            d = {
                i: 6,
                alpha: .36,
                color: 14148072,
                s: .8,
                h: 1.7
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 24,
                alpha: .2,
                color: 15186464,
                h: .2
            };
            a.push(d);
            d = {
                i: 7,
                alpha: .26,
                color: 15186464,
                h: .35
            };
            a.push(d);
            d = {
                i: 23,
                alpha: .18,
                color: 15186464,
                h: .65
            };
            a.push(d);
            d = {
                i: 13,
                alpha: .2,
                color: 15186464,
                h: .8
            };
            a.push(d);
            d = {
                i: 11,
                alpha: .15,
                color: 15186464,
                h: 1.4
            };
            a.push(d);
            d = {
                i: 15,
                alpha: .11,
                color: 15451904,
                h: 1.6
            };
            a.push(d);
            d = {
                i: 6,
                alpha: .45,
                color: 15579138,
                s: .45,
                h: .22
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .3,
                color: 15451904,
                s: .25,
                h: .4
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .2,
                color: 15451904,
                s: .25,
                h: .45
            };
            c.push(d);
            d = {
                i: 65,
                alpha: .17,
                color: 15186464,
                s: .25,
                h: .5
            };
            c.push(d);
            d = {
                i: 5,
                alpha: .45,
                color: 15579138,
                s: .45,
                h: .88
            };
            c.push(d);
            d = {
                i: 140,
                alpha: .18,
                color: 15579138,
                s: .32,
                h: .95
            };
            c.push(d);
            d = {
                i: 12,
                alpha: .22,
                color: 15579138,
                s: .32,
                h: 1.1
            };
            c.push(d);
            d = {
                i: 8,
                alpha: .32,
                color: 15451904,
                s: .72,
                h: 1.2
            };
            c.push(d);
            d = {
                i: 55,
                alpha: .2,
                color: 15451904,
                s: .45,
                h: 1.33
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .3,
                color: 15451904,
                s: .25,
                h: 1.42
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 16,
                alpha: .4,
                color: 10933495,
                h: .32
            };
            a.push(d);
            d = {
                i: 14,
                alpha: .3,
                color: 11007484,
                h: .36
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 4037331,
                h: .58
            };
            a.push(d);
            d = {
                i: 14,
                alpha: .22,
                color: 8835068,
                h: .68
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .27,
                color: 11007484,
                h: .82
            };
            a.push(d);
            d = {
                i: 11,
                alpha: .27,
                color: 10867450,
                h: 1
            };
            a.push(d);
            d = {
                i: 9,
                alpha: .2,
                color: 6158332,
                h: 1.05
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .17,
                color: 10867450,
                h: 1.78
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 4037331,
                h: -.23
            };
            a.push(d);
            d = {
                i: 8,
                alpha: .45,
                color: 8835068,
                s: .45,
                h: .175
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .4,
                color: 12574715,
                s: .55,
                h: .46
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .3,
                color: 10867450,
                s: .35,
                h: .5
            };
            c.push(d);
            d = {
                i: 60,
                alpha: .37,
                color: 4031699,
                s: .75,
                h: .75
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .25,
                color: 4031699,
                s: .25,
                h: .75
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .2,
                color: 6158332,
                s: .25,
                h: .9
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .45,
                color: 8835068,
                s: .45,
                h: 1.3
            };
            c.push(d);
            d = {
                i: 32,
                alpha: .22,
                color: 8835068,
                s: .75,
                h: 1.62
            };
            c.push(d);
            d = {
                i: 9,
                alpha: .45,
                color: 4031699,
                s: .65,
                h: 1.6
            };
            c.push(d);
            d = {
                i: 8,
                alpha: .25,
                color: 4031699,
                s: .65,
                h: 1.83
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .4,
                color: 12574715,
                s: .55,
                h: -.18
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 16,
                alpha: .4,
                color: 16389120,
                h: .32
            };
            a.push(d);
            d = {
                i: 26,
                alpha: .22,
                color: 16389120,
                h: .4
            };
            a.push(d);
            d = {
                i: 26,
                alpha: .25,
                color: 16389120,
                h: .65
            };
            a.push(d);
            d = {
                i: 18,
                alpha: .3,
                color: 16389120,
                h: 1.23
            };
            a.push(d);
            d = {
                i: 14,
                alpha: .26,
                color: 16389120,
                h: 1.33
            };
            a.push(d);
            d = {
                i: 17,
                alpha: .18,
                color: 16389120,
                h: 1.7
            };
            a.push(d);
            d = {
                i: 30,
                alpha: .16,
                color: 16389120,
                h: 2.15
            };
            a.push(d);
            d = {
                i: 100,
                alpha: .25,
                color: 16389120,
                s: .22,
                h: 1.45
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .5,
                color: 15628151,
                s: .3,
                h: 1.5
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .5,
                color: 15628151,
                s: .3,
                h: 1.52
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .5,
                color: 16389120,
                s: .3,
                h: 1.745
            };
            c.push(d);
            d = {
                i: 9,
                alpha: .22,
                color: 16389120,
                s: .3,
                h: 1.8
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 16,
                alpha: .4,
                color: 10933495,
                h: .32
            };
            a.push(d);
            d = {
                i: 14,
                alpha: .3,
                color: 11007484,
                h: .36
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 4037331,
                h: .58
            };
            a.push(d);
            d = {
                i: 14,
                alpha: .22,
                color: 8835068,
                h: .68
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .27,
                color: 11007484,
                h: .82
            };
            a.push(d);
            d = {
                i: 11,
                alpha: .27,
                color: 10867450,
                h: 1
            };
            a.push(d);
            d = {
                i: 9,
                alpha: .2,
                color: 6158332,
                h: 1.05
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .17,
                color: 10867450,
                h: 1.78
            };
            a.push(d);
            d = {
                i: 10,
                alpha: .3,
                color: 4037331,
                h: -.23
            };
            a.push(d);
            d = {
                i: 8,
                alpha: .45,
                color: 8835068,
                s: .45,
                h: .175
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .4,
                color: 12574715,
                s: .55,
                h: .46
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .3,
                color: 10867450,
                s: .35,
                h: .5
            };
            c.push(d);
            d = {
                i: 60,
                alpha: .37,
                color: 4031699,
                s: .75,
                h: .75
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .25,
                color: 4031699,
                s: .25,
                h: .75
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .2,
                color: 6158332,
                s: .25,
                h: .9
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .45,
                color: 8835068,
                s: .45,
                h: 1.3
            };
            c.push(d);
            d = {
                i: 32,
                alpha: .22,
                color: 8835068,
                s: .75,
                h: 1.62
            };
            c.push(d);
            d = {
                i: 9,
                alpha: .45,
                color: 4031699,
                s: .65,
                h: 1.6
            };
            c.push(d);
            d = {
                i: 8,
                alpha: .25,
                color: 4031699,
                s: .65,
                h: 1.83
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .4,
                color: 12574715,
                s: .55,
                h: -.18
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 16,
                alpha: .4,
                color: 16389120,
                h: .32
            };
            a.push(d);
            d = {
                i: 26,
                alpha: .22,
                color: 16389120,
                h: .4
            };
            a.push(d);
            d = {
                i: 26,
                alpha: .25,
                color: 16389120,
                h: .65
            };
            a.push(d);
            d = {
                i: 18,
                alpha: .3,
                color: 16389120,
                h: 1.23
            };
            a.push(d);
            d = {
                i: 14,
                alpha: .26,
                color: 16389120,
                h: 1.33
            };
            a.push(d);
            d = {
                i: 17,
                alpha: .18,
                color: 16389120,
                h: 1.7
            };
            a.push(d);
            d = {
                i: 30,
                alpha: .16,
                color: 16389120,
                h: 2.15
            };
            a.push(d);
            d = {
                i: 100,
                alpha: .25,
                color: 16389120,
                s: .22,
                h: 1.45
            };
            c.push(d);
            d = {
                i: 7,
                alpha: .5,
                color: 15628151,
                s: .3,
                h: 1.5
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .5,
                color: 15628151,
                s: .3,
                h: 1.52
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .5,
                color: 16389120,
                s: .3,
                h: 1.745
            };
            c.push(d);
            d = {
                i: 9,
                alpha: .22,
                color: 16389120,
                s: .3,
                h: 1.8
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b);
            a = [];
            c = [];
            b = [];
            d = {
                i: 24,
                alpha: .2,
                color: 15186464,
                h: .2
            };
            a.push(d);
            d = {
                i: 7,
                alpha: .26,
                color: 15186464,
                h: .35
            };
            a.push(d);
            d = {
                i: 23,
                alpha: .18,
                color: 15186464,
                h: .65
            };
            a.push(d);
            d = {
                i: 13,
                alpha: .2,
                color: 15186464,
                h: .8
            };
            a.push(d);
            d = {
                i: 11,
                alpha: .15,
                color: 15186464,
                h: 1.4
            };
            a.push(d);
            d = {
                i: 15,
                alpha: .11,
                color: 15451904,
                h: 1.6
            };
            a.push(d);
            d = {
                i: 6,
                alpha: .45,
                color: 15579138,
                s: .45,
                h: .22
            };
            c.push(d);
            d = {
                i: 3,
                alpha: .3,
                color: 15451904,
                s: .25,
                h: .4
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .2,
                color: 15451904,
                s: .25,
                h: .45
            };
            c.push(d);
            d = {
                i: 65,
                alpha: .17,
                color: 15186464,
                s: .25,
                h: .5
            };
            c.push(d);
            d = {
                i: 5,
                alpha: .45,
                color: 15579138,
                s: .45,
                h: .88
            };
            c.push(d);
            d = {
                i: 140,
                alpha: .18,
                color: 15579138,
                s: .32,
                h: .95
            };
            c.push(d);
            d = {
                i: 12,
                alpha: .22,
                color: 15579138,
                s: .32,
                h: 1.1
            };
            c.push(d);
            d = {
                i: 8,
                alpha: .32,
                color: 15451904,
                s: .72,
                h: 1.2
            };
            c.push(d);
            d = {
                i: 55,
                alpha: .2,
                color: 15451904,
                s: .45,
                h: 1.33
            };
            c.push(d);
            d = {
                i: 4,
                alpha: .3,
                color: 15451904,
                s: .25,
                h: 1.42
            };
            c.push(d);
            this.ib.push(a);
            this.cb.push(c);
            this.jb.push(b)
        };
        e.prototype.xj = function() {
            var a = this.m.a,
                c, b, d, g = new y(0, 0, -100),
                e = this.m.bc(),
                f, k;
            if (this.m.ka) f = this.m.Ta.width, k = this.m.Ta.height, this.m.S.Xd && (f = this.m.S.kb.width, k = this.m.S.kb.height);
            else {
                this.H || (this.H = this.ac.getContext("2d"));
                if (this.H.width !== this.m.l.width || this.H.height !== this.m.l.height) this.H.width = this.m.l.width, this.H.height = this.m.l.height;
                this.H.clear ? this.H.clear() : this.H.clearRect(0, 0, this.ac.width, this.ac.height);
                f = this.H.width;
                k = this.H.height
            }
            var l = Math.sqrt(f * f + k * k),
                q = l / 800;
            for (b = 0; b < this.Od.length; b++) {
                var p = this.Od[b];
                g.Ka(0, 0, -100);
                g.pa(-p.j * Math.PI / 180);
                g.wa(p.pan * Math.PI / 180);
                g.wa(-this.m.pan.b * Math.PI / 180);
                g.pa(this.m.j.b * Math.PI / 180);
                g.Ra(this.m.G.b * Math.PI / 180);
                var m = !1;
                if (-.01 > g.z) {
                    var r, t;
                    t = -e / g.z;
                    r = g.x * t;
                    t *= g.y;
                    Math.abs(r) < f / 2 + 100 && Math.abs(t) < k / 2 + 100 && (m = !0, r += f / 2, t += k / 2)
                }
                if (m) {
                    this.m.ka && (a.blendFunc(a.SRC_ALPHA, a.DST_ALPHA), a.enable(a.BLEND), a.disable(a.DEPTH_TEST));
                    var m = f / 2,
                        v = k / 2;
                    d = Math.sqrt((m - r) * (m - r) + (v - t) * (v - t));
                    var w = l / 2,
                        v = f > k ? f : k,
                        m = p.ng / 100 * ((w - d) / w);
                    0 > m && (m = 0);
                    if (this.m.ka) {
                        a.useProgram(this.nb);
                        a.bindBuffer(a.ARRAY_BUFFER, this.m.Fa);
                        a.vertexAttribPointer(this.nb.ca, this.m.Fa.Qb, a.FLOAT, !1, 0, 0);
                        var u = a.getUniformLocation(this.nb, "uCanvasDimensions");
                        a.uniform2f(u, a.drawingBufferWidth, a.drawingBufferHeight);
                        a.uniform2f(a.getUniformLocation(this.nb, "uFlareCenterPosition"), a.drawingBufferWidth / f * r, k - a.drawingBufferHeight / k * t);
                        a.uniform1f(a.getUniformLocation(this.nb, "uBlindingValue"), m);
                        u = a.getUniformLocation(this.nb, "uAspectRatio");
                        a.uniform1f(u, this.m.S.Xd ? a.drawingBufferWidth / a.drawingBufferHeight : a.drawingBufferWidth / a.drawingBufferHeight / (f / k));
                        a.drawArrays(a.TRIANGLE_STRIP, 0, this.m.Fa.Ac)
                    } else u = this.H.createRadialGradient(r, t, 1, r, t, v), u.addColorStop(0, "rgba(255, 255, 255, " + m + ")"), u.addColorStop(.5, "rgba(255, 255, 255, " + .8 * m + ")"), u.addColorStop(1, "rgba(255, 255, 255, " + .6 * m + ")"), this.H.fillStyle = u, this.H.fillRect(0, 0, this.H.width, this.H.height);
                    if (0 != Number(p.type) && !this.m.S.Xd) {
                        var m = f / 2 - r,
                            v = k / 2 - t,
                            C = 1,
                            B = Number(p.type) - 1;
                        d < .35 * w && (C = d / (.35 * w), C *= C);
                        d > .7 * w && (C = (w - d) / (.3 * w));
                        C *= p.alpha / 100;
                        if (0 < this.ib[B].length) for (d = 0; d < this.ib[B].length; d++) {
                            var x = this.ib[B][d],
                                w = x.i * q;
                            c = x.alpha * C;
                            0 > c && (c = 0);
                            var z = x.color;
                            if (8 == B || 9 == B || 10 == B) z = p.color;
                            if (this.m.ka) a.useProgram(this.fa), a.bindBuffer(a.ARRAY_BUFFER, this.Xc), a.vertexAttribPointer(this.fa.ca, this.Xc.Qb, a.FLOAT, !1, 0, 0), u = a.getUniformLocation(this.fa, "uCanvasDimensions2"), a.uniform2f(u, a.drawingBufferWidth, a.drawingBufferHeight), a.uniform2f(a.getUniformLocation(this.fa, "uCirclePosition"), a.drawingBufferWidth / f * (r + m * x.h), a.drawingBufferWidth / f * (k - (t + v * x.h))), a.uniform2f(a.getUniformLocation(this.fa, "uCircleTexturePosition"), a.drawingBufferWidth / f * (r + m * x.h), k - (t + v * x.h)), a.uniform1f(a.getUniformLocation(this.fa, "uCircleRadius"), w), a.uniform3f(a.getUniformLocation(this.fa, "uCircleColor"), (z >> 16 & 255) / 255, (z >> 8 & 255) / 255, (z & 255) / 255), a.uniform1f(a.getUniformLocation(this.fa, "uCircleAlpha"), c), a.uniform1f(a.getUniformLocation(this.fa, "uCircleSoftness"), .1), u = a.getUniformLocation(this.fa, "uAspectRatio"), a.uniform1f(u, a.drawingBufferWidth / a.drawingBufferHeight / (f / k)), a.drawArrays(a.TRIANGLE_FAN, 0, this.Xc.Ac);
                            else {
                                this.H.save();
                                this.H.translate(r + m * x.h, t + v * x.h);
                                u = this.H.createRadialGradient(0, 0, 1, 0, 0, 1.1 * w);
                                u.addColorStop(0, this.m.X(z, c));
                                u.addColorStop(.65, this.m.X(z, .9 * c));
                                u.addColorStop(.8, this.m.X(z, .7 * c));
                                u.addColorStop(1, this.m.X(z, .2 * c));
                                this.H.beginPath();
                                var z = 2 * Math.PI / 6,
                                    x = Math.PI / 180 * 35,
                                    E = !0;
                                for (c = x; c <= x + 2 * Math.PI; c += z) E ? (this.H.moveTo(w * Math.sin(c), w * Math.cos(c)), E = !1) : this.H.lineTo(w * Math.sin(c), w * Math.cos(c));
                                this.H.closePath();
                                this.H.fillStyle = u;
                                this.H.fill();
                                this.H.restore()
                            }
                        }
                        if (0 < this.cb[B].length) for (d = 0; d < this.cb[B].length; d++) {
                            x = this.cb[B][d];
                            w = x.i * q;
                            c = x.alpha * C;
                            0 > c && (c = 0);
                            z = x.color;
                            if (8 == B || 9 == B || 10 == B) z = p.color;
                            this.m.ka ? (a.useProgram(this.fa), a.bindBuffer(a.ARRAY_BUFFER, this.ec), a.vertexAttribPointer(this.fa.ca, this.ec.Qb, a.FLOAT, !1, 0, 0), u = a.getUniformLocation(this.fa, "uCanvasDimensions2"), a.uniform2f(u, a.drawingBufferWidth, a.drawingBufferHeight), u = a.getUniformLocation(this.fa, "uCirclePosition"), a.uniform2f(u, a.drawingBufferWidth / f * (r + m * x.h), a.drawingBufferWidth / f * (k - (t + v * x.h))), u = a.getUniformLocation(this.fa, "uCircleTexturePosition"), a.uniform2f(u, a.drawingBufferWidth / f * (r + m * x.h), k - (t + v * x.h)), u = a.getUniformLocation(this.fa, "uCircleRadius"), a.uniform1f(u, w), a.uniform3f(a.getUniformLocation(this.fa, "uCircleColor"), (z >> 16 & 255) / 255, (z >> 8 & 255) / 255, (z & 255) / 255), a.uniform1f(a.getUniformLocation(this.fa, "uCircleAlpha"), c), a.uniform1f(a.getUniformLocation(this.fa, "uCircleSoftness"), x.s), u = a.getUniformLocation(this.fa, "uAspectRatio"), a.uniform1f(u, a.drawingBufferWidth / a.drawingBufferHeight / (f / k)), a.drawArrays(a.TRIANGLE_FAN, 0, this.ec.Ac)) : (this.H.save(), this.H.translate(r + m * x.h, t + v * x.h), u = this.H.createRadialGradient(0, 0, 1, 0, 0, w), u.addColorStop(0, this.m.X(z, c)), u.addColorStop(1 - x.s, this.m.X(z, .8 * c)), u.addColorStop(1, this.m.X(z, 0)), this.H.beginPath(), this.H.arc(0, 0, w, 0, 2 * Math.PI, !1), this.H.closePath(), this.H.fillStyle = u, this.H.fill(), this.H.restore())
                        }
                        if (0 < this.jb[B].length) for (d = 0; d < this.jb[B].length; d++) p = this.jb[B][d], w = p.i * q, c = p.alpha * C, 0 > c && (c = 0), this.m.ka ? (a.useProgram(this.La), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, this.Eh), a.bindBuffer(a.ARRAY_BUFFER, this.ec), a.vertexAttribPointer(this.La.ca, this.ec.Qb, a.FLOAT, !1, 0, 0), u = a.getUniformLocation(this.La, "uCanvasDimensions2"), a.uniform2f(u, f, k), u = a.getUniformLocation(this.La, "uCirclePosition"), a.uniform2f(u, r + m * p.h, k - (t + v * p.h)), u = a.getUniformLocation(this.La, "uRingTexturePosition"), a.uniform2f(u, a.drawingBufferWidth / f * (r + m * p.h), k - (t + v * p.h)), u = a.getUniformLocation(this.La, "uCircleRadius"), a.uniform1f(u, w), a.uniform2f(a.getUniformLocation(this.La, "uRingPosition"), r + m * p.h, k - (t + v * p.h)), a.uniform1f(a.getUniformLocation(this.La, "uRingRadius"), w), a.uniform1f(a.getUniformLocation(this.La, "uRingAlpha"), c), u = a.getUniformLocation(this.La, "uAspectRatio"), a.uniform1f(u, a.drawingBufferWidth / a.drawingBufferHeight / (f / k)), a.uniform1i(a.getUniformLocation(this.La, "uSampler"), 0), a.drawArrays(a.TRIANGLE_FAN, 0, this.ec.Ac)) : (this.H.save(), this.H.translate(r + m * p.h, t + v * p.h), u = this.H.createRadialGradient(0, 0, 0, 0, 0, w), u.addColorStop(0, this.m.X(16777215, 0)), u.addColorStop(.88, this.m.X(0, 0)), u.addColorStop(.9, this.m.X(16654848, c)), u.addColorStop(.92, this.m.X(16776448, c)), u.addColorStop(.94, this.m.X(4849466, c)), u.addColorStop(.96, this.m.X(131071, c)), u.addColorStop(.98, this.m.X(8190, c)), u.addColorStop(1, this.m.X(0, 0)), this.H.beginPath(), this.H.arc(0, 0, w, 0, 2 * Math.PI, !1), this.H.closePath(), this.H.fillStyle = u, this.H.fill(), this.H.restore())
                    }
                    this.m.ka && (a.useProgram(this.m.F), a.disable(a.BLEND), a.enable(a.DEPTH_TEST))
                }
            }
        };
        return e
    }();

function Q() {
    var e = "perspective",
        a = ["Webkit", "Moz", "O", "ms", "Ms"],
        c;
    c = !1;
    for (c = 0; c < a.length; c++)"undefined" !== typeof document.documentElement.style[a[c] + "Perspective"] && (e = a[c] + "Perspective");
    "undefined" !== typeof document.documentElement.style[e] ? "webkitPerspective" in document.documentElement.style ? (e = document.createElement("style"), a = document.createElement("div"), c = document.head || document.getElementsByTagName("head")[0], e.textContent = "@media (-webkit-transform-3d) {#ggswhtml5{height:5px}}", c.appendChild(e), a.id = "ggswhtml5", document.documentElement.appendChild(a), c = 5 === a.offsetHeight, e.parentNode.removeChild(e), a.parentNode.removeChild(a)) : c = !0 : c = !1;
    return c
}
function R() {
    var e;
    if (e = !! window.WebGLRenderingContext) try {
        var a = document.createElement("canvas");
        a.width = 100;
        a.height = 100;
        var c = a.getContext("webgl");
        c || (c = a.getContext("experimental-webgl"));
        e = !! c
    } catch (b) {
        e = !1
    }
    return e
}
window.ggHasHtml5Css3D = Q;
window.ggHasWebGL = R;
var S = this && this.Mk ||
    function(e, a) {
        function c() {
            this.constructor = e
        }
        for (var b in a) a.hasOwnProperty(b) && (e[b] = a[b]);
        e.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }, T = function() {
    function e(a) {
        this.m = null;
        this.Dd = this.Tg = this.hb = !1;
        this.Ra = this.wa = this.pa = 0;
        this.g = 70;
        this.za = 0;
        this.autoplay = this.Hd = !1;
        this.id = "";
        this.j = this.pan = 0;
        this.m = a;
        this.Xb = this.Ob = 100;
        this.gc = 1
    }
    e.prototype.Za = function(a) {
        var c;
        if (c = a.getAttributeNode("id")) this.id = c.nodeValue.toString();
        if (c = a.getAttributeNode("pan")) this.pan = Number(c.nodeValue);
        if (c = a.getAttributeNode("tilt")) this.j = Number(c.nodeValue)
    };
    e.prototype.Yh = function(a) {
        var c = "",
            b = this.m;
        b.Eb && (c += "perspective(" + a + "px) ");
        c = c + ("translate3d(0px,0px," + a + "px) ") + ("rotateZ(" + b.G.b.toFixed(10) + "deg) ");
        c += "rotateX(" + b.j.b.toFixed(10) + "deg) ";
        c += "rotateY(" + (-b.pan.b).toFixed(10) + "deg) ";
        c += "rotateY(" + this.pan.toFixed(10) + "deg) ";
        c += "rotateX(" + (-this.j).toFixed(10) + "deg) ";
        a = 1E4;
        var d = this.c.videoWidth,
            g = this.c.videoHeight;
        if (0 == d || 0 == g) d = 640, g = 480;
        0 < this.Ob && (d = this.Ob);
        0 < this.Xb && (g = this.Xb);
        0 < d && 0 < g && (this.c.width = d, this.c.height = g, this.c.style.width = d + "px", this.c.style.height = g + "px");
        0 < this.g && (a = d / (2 * Math.tan(this.g / 2 * Math.PI / 180)));
        c += "translate3d(0px,0px," + (-a).toFixed(10) + "px) ";
        c += "rotateZ(" + this.Ra.toFixed(10) + "deg) ";
        c += "rotateY(" + (-this.wa).toFixed(10) + "deg) ";
        c += "rotateX(" + this.pa.toFixed(10) + "deg) ";
        this.gc && 1 != this.gc && (c += "scaleY(" + this.gc + ") ");
        c += "translate3d(" + -d / 2 + "px," + -g / 2 + "px,0px) ";
        this.c.style[b.Aa + "Origin"] = "0% 0%";
        this.hb && (c = "", 1 == this.za && (c += "scale(" + Math.min(b.l.width / d, b.l.height / g) + ") "), c += "translate3d(" + -d / 2 + "px," + -g / 2 + "px,0px) ");
        this.hj != c && (this.hj = c, this.c.style[b.Aa] = c, this.c.style.visibility = "visible", this.Dd && this.Tg == this.hb && (this.c.style[b.Vb] = "all 0s linear 0s"), this.Tg = this.hb)
    };
    e.prototype.Rc = function() {
        var a = this.m;
        this.c.style.left = a.margin.left + a.l.width / 2 + "px";
        this.c.style.top = a.margin.top + a.l.height / 2 + "px"
    };
    return e
}(), U = function(e) {
    function a(a) {
        e.call(this, a);
        this.Sf = this.Af = this.md = !1;
        this.url = [];
        this.loop = 0;
        this.level = 1;
        this.Lb = 0;
        this.mode = 1;
        this.zg = 10;
        this.bf = this.Xa = 0;
        this.aa = 1;
        this.Sb = this.Jb = this.Ib = this.Rb = 0
    }
    S(a, e);
    a.prototype.ck = function() {
        0 == this.loop ? this.c.play() : 0 < this.tc && (this.tc--, this.c.currentTime = 0, this.Af && (this.fc && 0 == this.fc.gain.value || 0 == this.wb.gain.value && 0 == this.zb.gain.value && 0 == this.xb.gain.value && 0 == this.yb.gain.value) || this.c.play())
    };
    a.prototype.kg = function() {
        var a = this.m.lb;
        a && (this.source = a.createMediaElementSource(this.c), 2 == this.mode || 3 == this.mode || 5 == this.mode ? (this.wd = a.createChannelSplitter(2), this.wb = a.createGain(), this.xb = a.createGain(), this.yb = a.createGain(), this.zb = a.createGain(), this.vd = a.createChannelMerger(2), this.source.connect(this.wd), this.wd.connect(this.wb, 0), this.wd.connect(this.xb, 0), this.wd.connect(this.yb, 1), this.wd.connect(this.zb, 1), this.wb.connect(this.vd, 0, 0), this.xb.connect(this.vd, 0, 1), this.yb.connect(this.vd, 0, 0), this.zb.connect(this.vd, 0, 1), this.vd.connect(a.destination)) : (this.fc = a.createGain(), this.source.connect(this.fc), this.fc.connect(a.destination)))
    };
    a.prototype.Ud = function() {
        var a = this.m.lb;
        this.hb || this.Sf || (this.wb.gain.setValueAtTime(this.Rb, a.currentTime), this.zb.gain.setValueAtTime(this.Sb, a.currentTime), this.xb.gain.setValueAtTime(this.Ib, a.currentTime), this.yb.gain.setValueAtTime(this.Jb, a.currentTime))
    };
    a.prototype.ff = function() {
        var a = this.m,
            b = this.m.lb;
        if (this.c) {
            var d, g = this.pan - a.pan.b;
            for (d = this.j - a.j.b; - 180 > g;) g += 360;
            for (; 180 < g;) g -= 360;
            var e = this.Lb,
                f = this.zg;
            0 == f && (f = .01);
            0 > f && (f = a.g.b);
            this.$a || (this.$a = new y, this.$a.Cg(this.pan, this.j));
            0 != this.mode && 1 != this.mode || !b || this.fc && this.fc.gain.setValueAtTime(this.level * a.ba * this.aa, b.currentTime);
            if (2 == this.mode && b) {
                var k = .5 * Math.cos(g * Math.PI / 180) + .5;
                this.Rb = Math.sqrt(k) * this.aa;
                this.Sb = Math.sqrt(k) * this.aa;
                this.Ib = Math.sqrt(1 - k) * this.aa;
                this.Jb = Math.sqrt(1 - k) * this.aa;
                this.Ud()
            }
            if (3 == this.mode) {
                0 > g ? g < -this.Xa ? g += this.Xa : g = 0 : g = g > this.Xa ? g - this.Xa : 0;
                k = this.level;
                d = Math.abs(d);
                d = d < this.bf ? 0 : d - this.bf;
                var l = 1 - d / f;
                if (Math.abs(g) > f || 0 > l) {
                    var q = k * e * a.ba;
                    b ? (this.Rb = q * this.aa, this.Sb = q * this.aa, this.Jb = this.Ib = 0, this.Ud()) : this.c.volume = k * e * a.ba
                } else if (q = 1 - Math.abs(g / f), b) {
                    var p = k * (e + (1 - e) * l * q) * a.ba,
                        q = k * e * a.ba;
                    0 <= g ? (this.Rb = p * this.aa, this.Sb = q * this.aa) : (this.Rb = q * this.aa, this.Sb = p * this.aa);
                    2 * Math.abs(g) < f ? (q = 1 - Math.abs(2 * g) / f, p = k * (e + (1 - e) * l * q) * a.ba, q = .5 * k * (1 - e) * l * (1 - q) * a.ba, 0 <= g ? (this.Sb = p * this.aa, this.Jb = q * this.aa, this.Ib = 0) : (this.Rb = p * this.aa, this.Ib = q * this.aa, this.Jb = 0)) : (q = 1 - (Math.abs(2 * g) - f) / f, p = .5 * k * (1 - e) * l * q * a.ba, 0 <= g ? (this.Jb = p * this.aa, this.Ib = 0) : (this.Ib = p * this.aa, this.Jb = 0));
                    this.Ud()
                } else this.c.volume = k * (e + (1 - e) * l * q) * a.ba
            }
            4 == this.mode && (Math.abs(g) < this.Xa && Math.abs(d) < this.bf ? this.md || (this.md = !0, this.c.play()) : this.md = !1);
            5 == this.mode && (d = 180 * Math.acos(a.tf.Me(this.$a)) / Math.PI, d < this.Xa ? b ? (this.Rb = this.level * a.ba * this.aa, this.Sb = this.level * a.ba * this.aa, this.Jb = this.Ib = 0, this.Ud()) : this.c.volume = this.level * a.ba : b ? d < this.Xa + f ? (0 > g ? g = g > -this.Xa ? 0 : g + this.Xa : g = g < this.Xa ? 0 : g - this.Xa, p = 1 - Math.max(d - this.Xa, 0) / f, q = Math.max(1 - Math.abs(g) * Math.cos(this.j * Math.PI / 180) / f, 0), 0 < g ? (this.Rb = this.level * (p * (1 - this.Lb) + this.Lb) * this.aa, this.Sb = this.level * (p * q * (1 - this.Lb) + this.Lb) * this.aa, this.Ib = 0, this.Jb = this.level * p * (1 - q) * this.aa) : (this.Rb = this.level * (p * q * (1 - this.Lb) + this.Lb) * this.aa, this.Sb = this.level * (p * (1 - this.Lb) + this.Lb) * this.aa, this.Ib = this.level * p * (1 - q) * this.aa, this.Jb = 0), this.Ud()) : (p = this.level * this.Lb, this.Rb = p * this.aa, this.Sb = p * this.aa, this.Jb = this.Ib = 0) : (d -= this.Xa, this.c.volume = d < f && 0 < f ? this.level * (e + (1 - e) * (1 - Math.abs(d / f))) * a.ba : e * a.ba));
            6 == this.mode && (d = 180 * Math.acos(a.tf.Me(this.$a)) / Math.PI, Math.abs(d) < this.Xa ? this.md || (this.md = !0, this.c.play()) : this.md = !1)
        }
    };
    a.prototype.addElement = function() {
        var a = -1,
            b = this,
            d = this.m,
            g = this.m.lb;
        try {
            for (var e = !1, f = 0; f < d.R.length; f++) d.R[f].id == b.id && (a = f, null != d.R[f].c && d.R[f].url.join() == b.url.join() && d.R[f].loop == b.loop && d.R[f].mode == b.mode && (e = !0));
            if (!e) {
                if (0 <= a) {
                    var k = d.R[a];
                    if (null != k.c) if (g && d.ra.enabled) d.ra.Yd.push(k), 1 != d.S.Ba && 2 != d.S.Ba && d.ra.zf(k);
                    else {
                        try {
                            k.c.pause()
                        } catch (l) {}
                        try {
                            k.Nc()
                        } catch (l) {}
                    }
                }
                b.c = document.createElement("audio");
                b.c.crossOrigin = d.crossOrigin;
                b.c.setAttribute("class", "ggmedia");
                d.Zc && b.c.setAttribute("id", d.Zc + b.id);
                for (f = 0; f < b.url.length; f++) e = void 0, e = document.createElement("source"), "" != b.url[f] && "#" != b.url[f] && (e.crossOrigin = d.crossOrigin, e.setAttribute("src", d.ub(b.url[f])), b.c.appendChild(e));
                b.c.volume = b.level * d.ba;
                1 <= b.loop && (b.tc = b.loop - 1);
                0 <= a ? d.R[a] = b : d.R.push(b);
                0 < b.c.childNodes.length && (d.M.appendChild(b.c), b.c.addEventListener("ended", function() {
                    b.ck()
                }, !1), g && (b.kg(), b.Af = !1, 0 == b.loop && b.source.mediaElement && (b.source.mediaElement.loop = !0)));
                1 != b.mode && 2 != b.mode && 3 != b.mode && 5 != b.mode || !(0 <= b.loop) || g && d.ra.enabled || (b.c.autoplay = !0, b.autoplay = !0);
                0 == b.mode && 0 <= b.loop && (b.autoplay = !0);
                b.ff()
            }
        } catch (l) {}
    };
    a.prototype.Nc = function() {
        try {
            this.m.M.removeChild(this.c), this.c = null
        } catch (a) {}
    };
    a.prototype.Za = function(a) {
        e.prototype.Za.call(this, a);
        var b;
        (b = a.getAttributeNode("url")) && this.url.push(b.nodeValue.toString());
        if (b = a.getAttributeNode("level")) this.level = Number(b.nodeValue);
        if (b = a.getAttributeNode("loop")) this.loop = Number(b.nodeValue);
        if (b = a.getAttributeNode("mode")) this.mode = Number(b.nodeValue);
        if (b = a.getAttributeNode("field")) this.zg = Number(b.nodeValue);
        if (b = a.getAttributeNode("ambientlevel")) this.Lb = Number(b.nodeValue);
        if (b = a.getAttributeNode("pansize")) this.Xa = Number(b.nodeValue);
        if (b = a.getAttributeNode("tiltsize")) this.bf = Number(b.nodeValue);
        for (a = a.firstChild; a;)"source" == a.nodeName && (b = a.getAttributeNode("url")) && this.url.push(b.nodeValue.toString()), a = a.nextSibling
    };
    return a
}(T), V = function(e) {
    function a(a) {
        e.call(this, a);
        this.poster = "";
        this.Ra = this.wa = this.pa = 0;
        this.g = 50;
        this.za = 0;
        this.Hd = !1
    }
    S(a, e);
    a.prototype.Yb = function() {
        1 != this.za && 4 != this.za || this.Ed(!this.hb);
        2 == this.za && this.m.xh(this.id)
    };
    a.prototype.Ed = function(a) {
        var b = this.m.lb;
        if (1 == this.za || 4 == this.za) if (this.hb = a, this.m.Sa)(b = this.m.Y) && b.activateSound(this.id, this.hb ? 1 : 0);
        else {
            if (this.hb) this.c.play(), this.c.style.zIndex = "80000", this.c.style[this.m.Vb] = "all 1s ease 0s", this.m.cd(this.id);
            else {
                this.c.style.zIndex = "0";
                this.c.style[this.m.Vb] = "all 1s ease 0s";
                this.Sf = !0;
                var d = this;
                setTimeout(function() {
                    d.Sf = !1
                }, 1E3)
            }
            if (b) {
                var b = b.currentTime,
                    g = this.wb.gain.value,
                    e = this.zb.gain.value,
                    f = this.xb.gain.value,
                    k = this.yb.gain.value;
                this.hb ? (this.wb.gain.linearRampToValueAtTime(g, b), this.wb.gain.linearRampToValueAtTime(this.level * this.m.ba, b + 1), this.zb.gain.linearRampToValueAtTime(e, b), this.zb.gain.linearRampToValueAtTime(this.level * this.m.ba, b + 1), this.xb.gain.linearRampToValueAtTime(f, b), this.xb.gain.linearRampToValueAtTime(0, b + 1), this.yb.gain.linearRampToValueAtTime(k, b), this.yb.gain.linearRampToValueAtTime(0, b + 1)) : (this.wb.gain.linearRampToValueAtTime(g, b), this.wb.gain.linearRampToValueAtTime(this.Rb, b + 1), this.zb.gain.linearRampToValueAtTime(e, b), this.zb.gain.linearRampToValueAtTime(this.Sb, b + 1), this.xb.gain.linearRampToValueAtTime(f, b), this.xb.gain.linearRampToValueAtTime(this.Ib, b + 1), this.yb.gain.linearRampToValueAtTime(k, b), this.yb.gain.linearRampToValueAtTime(this.Jb, b + 1))
            }
            this.Dd = !0;
            this.m.Zh()
        }
        2 == this.za && (a ? this.m.cd(this.id) : this.m.Rf(this.id))
    };
    a.prototype.Fd = function() {
        this.Dd = !1;
        this.c.style[this.m.Vb] = "none"
    };
    a.prototype.Fk = function() {
        0 == this.loop ? this.c.play() : 0 < this.tc ? (this.tc--, this.c.currentTime = 0, this.c.play()) : this.eh = !1
    };
    a.prototype.Za = function(a) {
        e.prototype.Za.call(this, a);
        var b;
        if (b = a.getAttributeNode("poster")) this.poster = String(b.nodeValue);
        if (b = a.getAttributeNode("rotx")) this.pa = Number(b.nodeValue);
        if (b = a.getAttributeNode("roty")) this.wa = Number(b.nodeValue);
        if (b = a.getAttributeNode("rotz")) this.Ra = Number(b.nodeValue);
        if (b = a.getAttributeNode("fov")) this.g = Number(b.nodeValue);
        if (b = a.getAttributeNode("width")) this.Ob = Number(b.nodeValue);
        if (b = a.getAttributeNode("height")) this.Xb = Number(b.nodeValue);
        this.gc = (b = a.getAttributeNode("stretch")) ? Number(b.nodeValue) : 1;
        if (b = a.getAttributeNode("clickmode")) this.za = Number(b.nodeValue);
        if (b = a.getAttributeNode("handcursor")) this.Hd = 1 == Number(b.nodeValue)
    };
    a.prototype.addElement = function() {
        var a = this,
            b = this.m;
        try {
            a.c = document.createElement("video");
            a.c.setAttribute("class", "ggmedia");
            a.c.crossOrigin = b.crossOrigin;
            a.c.hidden = !0;
            b.Zc && a.c.setAttribute("id", b.Zc + a.id);
            if (b.ae) a.c.setAttribute("style", "display: none; max-width:none;");
            else if (a.c.setAttribute("style", "max-width:none;pointer-events:none;"), 1 == a.za || 4 == a.za) a.c.addEventListener(b.ei(), function() {
                a.Fd()
            }, !1), a.c.addEventListener("transitionend", function() {
                a.Fd()
            }, !1);
            var d;
            for (d = 0; d < a.url.length; d++) {
                var g;
                g = document.createElement("source");
                g.crossOrigin = b.crossOrigin;
                g.setAttribute("src", b.ub(a.url[d]));
                a.c.appendChild(g)
            }
            "" != a.poster && (a.c.poster = b.ub(a.poster), 0 > a.loop && (a.c.ii = "none"));
            a.c.volume = a.level * b.ba;
            1 <= a.loop && (a.tc = a.loop - 1);
            (1 == a.mode || 2 == a.mode || 3 == a.mode || 5 == a.mode) && 0 <= a.loop && (a.c.autoplay = !0, a.eh = !0, a.autoplay = !0);
            b.J.push(this);
            b.ae ? b.M.appendChild(a.c) : (a.c.style.position = "absolute", a.Ob && (a.c.width = a.Ob), a.Xb && (a.c.height = a.Xb), b.w.appendChild(a.c), a.kg());
            a.c.onclick = function() {
                a.Yb()
            };
            a.c.addEventListener("ended", function() {
                a.Fk()
            }, !1)
        } catch (e) {}
    };
    a.prototype.Nc = function() {
        var a = this.m;
        a.ae && (a.a.deleteTexture(this.Gb), this.Gb = 0, a.M.removeChild(this.c));
        a.$h && a.w.removeChild(this.c);
        this.c = null
    };
    return a
}(U), W = function(e) {
    function a(a) {
        e.call(this, a);
        this.url = "";
        this.Ra = this.wa = this.pa = 0;
        this.g = 50;
        this.za = 0;
        this.Hd = !1;
        this.Xb = this.Ob = 100;
        this.gc = 1
    }
    S(a, e);
    a.prototype.Za = function(a) {
        e.prototype.Za.call(this, a);
        var b;
        if (b = a.getAttributeNode("url")) this.url = b.nodeValue.toString();
        if (b = a.getAttributeNode("rotx")) this.pa = Number(b.nodeValue);
        if (b = a.getAttributeNode("roty")) this.wa = Number(b.nodeValue);
        if (b = a.getAttributeNode("rotz")) this.Ra = Number(b.nodeValue);
        if (b = a.getAttributeNode("fov")) this.g = Number(b.nodeValue);
        if (b = a.getAttributeNode("width")) this.Ob = Number(b.nodeValue);
        if (b = a.getAttributeNode("height")) this.Xb = Number(b.nodeValue);
        this.gc = (b = a.getAttributeNode("stretch")) ? Number(b.nodeValue) : 1;
        if (b = a.getAttributeNode("clickmode")) this.za = Number(b.nodeValue);
        if (b = a.getAttributeNode("handcursor")) this.Hd = 1 == Number(b.nodeValue);
        for (a = a.firstChild; a;)"source" == a.nodeName && (b = a.getAttributeNode("url")) && (this.url = b.nodeValue.toString()), a = a.nextSibling
    };
    a.prototype.Fd = function() {
        this.Dd = !1;
        this.c.style[this.m.Vb] = "none"
    };
    a.prototype.Yb = function() {
        1 !== this.za && 4 !== this.za || this.Ed(!this.hb)
    };
    a.prototype.Ed = function(a) {
        var b = this.m;
        if (1 === this.za || 4 === this.za) this.hb = a, this.m.Sa ? (a = this.m.Y) && a.activateSound(this.id, this.hb ? 1 : 0) : (this.c.style.zIndex = this.hb ? "80000" : "0", this.c.style[b.Vb] = "all 1s ease 0s", this.Dd = !0, b.Uh())
    };
    a.prototype.addElement = function() {
        var a = this,
            b = this.m;
        try {
            a.c = document.createElement("img");
            a.c.setAttribute("style", "-webkit-user-drag:none; max-width:none;");
            a.c.setAttribute("class", "ggmedia");
            a.c.hidden = !0;
            b.Zc && a.c.setAttribute("id", b.Zc + a.id);
            a.c.ondragstart = function() {
                return !1
            };
            if (1 === a.za || 4 === a.za) a.c.addEventListener(b.ei(), function() {
                a.Fd()
            }, !1), a.c.addEventListener("transitionend", function() {
                a.Fd()
            }, !1);
            a.c.setAttribute("src", b.ub(a.url));
            a.Ob && (a.c.width = a.Ob);
            a.Xb && (a.c.height = a.Xb);
            b.Ua.push(a);
            a.c.style.position = "absolute";
            a.Yb && (a.c.onclick = function() {
                a.Yb()
            });
            b.w.appendChild(a.c)
        } catch (d) {}
    };
    a.prototype.Nc = function() {
        this.m.w.removeChild(this.c);
        this.c = null
    };
    return a
}(T), X = function(e) {
    function a(a) {
        e.call(this, a);
        this.alpha = this.ng = 50;
        this.type = 0;
        this.color = 16777215
    }
    S(a, e);
    a.prototype.Za = function(a) {
        e.prototype.Za.call(this, a);
        var b;
        if (b = a.getAttributeNode("blinding")) this.ng = Number(b.nodeValue);
        if (b = a.getAttributeNode("alpha")) this.alpha = Number(b.nodeValue);
        if (b = a.getAttributeNode("type")) this.type = Number(b.nodeValue);
        if (b = a.getAttributeNode("color")) this.color = 1 * Number(b.nodeValue)
    };
    return a
}(T), Y = function() {
    function e(a) {
        this.type = "empty";
        this.Lh = this.id = this.target = this.description = this.title = this.url = "";
        this.hf = 100;
        this.ye = 20;
        this.jf = !1;
        this.c = null;
        this.Ha = this.ea = this.j = this.pan = 0;
        this.ob = a.v.ob;
        this.mb = a.v.mb;
        this.Nb = a.v.Nb;
        this.Mb = a.v.Mb;
        this.Yc = a.v.Yc;
        this.be = []
    }
    e.prototype.Wc = function() {
        this.id = this.id;
        this.pan = this.pan;
        this.tilt = this.j;
        this.url = this.url;
        this.target = this.target;
        this.title = this.title;
        this.description = this.description;
        this.skinid = this.Lh;
        this.obj = this.c
    };
    e.prototype.Za = function(a) {
        var c;
        if (c = a.getAttributeNode("url")) this.url = c.nodeValue.toString();
        if (c = a.getAttributeNode("target")) this.target = c.nodeValue.toString();
        if (c = a.getAttributeNode("title")) this.title = c.nodeValue.toString();
        if (c = a.getAttributeNode("description")) this.description = c.nodeValue.toString();
        if (c = a.getAttributeNode("id")) this.id = c.nodeValue.toString();
        if (c = a.getAttributeNode("skinid")) this.Lh = c.nodeValue.toString();
        if (c = a.getAttributeNode("width")) this.hf = Number(c.nodeValue);
        if (c = a.getAttributeNode("height")) this.ye = Number(c.nodeValue);
        if (c = a.getAttributeNode("wordwrap")) this.jf = 1 == Number(c.nodeValue);
        c = a.getAttributeNode("pan");
        this.pan = 1 * (c ? Number(c.nodeValue) : 0);
        c = a.getAttributeNode("tilt");
        this.j = 1 * (c ? Number(c.nodeValue) : 0);
        if (c = a.getAttributeNode("bordercolor")) this.ob = 1 * Number(c.nodeValue);
        if (c = a.getAttributeNode("backgroundcolor")) this.mb = 1 * Number(c.nodeValue);
        if (c = a.getAttributeNode("borderalpha")) this.Nb = 1 * Number(c.nodeValue);
        if (c = a.getAttributeNode("backgroundalpha")) this.Mb = 1 * Number(c.nodeValue);
        if (c = a.getAttributeNode("handcursor")) this.Yc = 1 == Number(c.nodeValue);
        for (a = a.firstChild; a;) {
            if ("vertex" == a.nodeName) {
                var b = {
                    pan: 0,
                    j: 0
                };
                c = a.getAttributeNode("pan");
                b.pan = 1 * (c ? Number(c.nodeValue) : 0);
                c = a.getAttributeNode("tilt");
                b.j = 1 * (c ? Number(c.nodeValue) : 0);
                this.be.push(b)
            }
            a = a.nextSibling
        }
        this.Wc()
    };
    return e
}();

function aa() {
    this.bd = {
        zd: 1,
        Ad: 1,
        Qd: 0,
        Rd: 0,
        pd: 0,
        ce: 0,
        scale: 1
    };
    this.Ab = !0;
    this.Tc = []
}
var ba = function() {
        function e() {
            var a;
            this.Ja = Array(6);
            for (a = 0; 6 > a; a++) this.Ja[a] = new aa
        }
        e.prototype.xi = function(a, c, b, d) {
            for (var g = 0; 6 > g; g++) {
                var e;
                if (e = this.Ja[g]) {
                    var f;
                    f = [];
                    f.push(new y(-1, -1, -1, 0, 0));
                    f.push(new y(1, -1, -1, 1, 0));
                    f.push(new y(1, 1, -1, 1, 1));
                    f.push(new y(-1, 1, -1, 0, 1));
                    for (var k = 0; k < f.length; k++) 4 > g ? f[k].wa(-Math.PI / 2 * g) : f[k].pa(Math.PI / 2 * (4 === g ? -1 : 1)), d && (f[k].Ra(d.G * Math.PI / 180), f[k].pa(-d.pitch * Math.PI / 180)), f[k].wa(-a * Math.PI / 180), f[k].pa(c * Math.PI / 180), f[k].Ra(b * Math.PI / 180);
                    e.Ab = 0 < f.length
                }
            }
        };
        return e
    }(),
    Z = function() {
        function e(a, c) {
            this.pan = {
                b: 0,
                fb: 0,
                min: 0,
                max: 360,
                d: 0,
                Of: 0
            };
            this.j = {
                b: 0,
                fb: 0,
                min: -90,
                max: 90,
                d: 0
            };
            this.G = {
                b: 0,
                fb: 0,
                min: -180,
                max: 180,
                d: 0
            };
            this.g = {
                b: 90,
                fb: 90,
                min: 1,
                Td: 0,
                max: 170,
                dd: 0,
                d: 0,
                mode: 0,
                Nh: 0,
                ug: 0
            };
            this.oa = {
                G: 0,
                pitch: 0
            };
            this.l = {
                width: 10,
                height: 10
            };
            this.rb = 0;
            this.tf = new y;
            this.crossOrigin = "anonymous";
            this.O = {
                start: {
                    x: 0,
                    y: 0
                },
                W: {
                    x: 0,
                    y: 0
                },
                kc: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: 0,
                    y: 0
                },
                V: {
                    x: 0,
                    y: 0
                }
            };
            this.N = {
                Da: -1,
                startTime: 0,
                start: {
                    x: 0,
                    y: 0
                },
                W: {
                    x: 0,
                    y: 0
                },
                kc: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: 0,
                    y: 0
                },
                V: {
                    x: 0,
                    y: 0
                }
            };
            this.se = !0;
            this.B = {
                enabled: !0,
                W: {
                    x: 0,
                    y: 0
                },
                V: {
                    x: 0,
                    y: 0
                },
                g: {
                    active: !1,
                    Ia: 0
                }
            };
            this.o = {
                src: [],
                ge: 4,
                width: 640,
                height: 480,
                $c: !1,
                Ce: !1,
                Fc: "loop",
                c: HTMLVideoElement = null,
                Gb: null,
                hg: null,
                Xe: null,
                Hf: null,
                format: "",
                xe: 0
            };
            this.Jc = 0;
            this.Y = this.la = this.va = this.M = this.pb = this.Oa = this.w = null;
            this.Gc = "pano";
            this.Bf = "flashcontainer";
            this.uf = "";
            this.control = null;
            this.bb = [];
            this.Ca = !1;
            this.pe = 1;
            this.D = null;
            this.rd = this.Id = !1;
            this.lc = "";
            this.fd = this.Eb = !1;
            this.Ke = 0;
            this.le = [];
            this.Vc = [];
            this.Wd = this.oc = 1;
            this.td = 1024;
            this.Oe = !1;
            this.Ph = 0;
            this.u = {
                enabled: !1,
                timeout: 5,
                active: !1,
                Vd: !1,
                speed: .4,
                af: 0,
                Ie: 0,
                Nf: !0,
                ai: !1,
                startTime: 0,
                jc: 0
            };
            this.K = {
                active: !1,
                qd: !1,
                speed: .1,
                pan: 0,
                j: 0,
                G: 0,
                g: 70,
                jd: 70,
                hh: 0,
                jh: 0,
                ih: 0,
                gh: 0
            };
            this.xa = null;
            this.od = {};
            this.v = {
                mode: 1,
                Md: -1,
                ea: 0,
                Ha: 0,
                Tb: .05,
                ob: 255,
                Nb: 1,
                mb: 255,
                Mb: .3,
                Yc: !0,
                eg: {
                    enabled: !0,
                    width: 180,
                    height: 20,
                    fg: 0,
                    dg: 1,
                    background: !0,
                    mb: 16777215,
                    Mb: 1,
                    ob: 0,
                    Nb: 1,
                    mf: 3,
                    nf: 1,
                    jf: !0
                }
            };
            this.na = null;
            this.I = [];
            this.R = [];
            this.J = [];
            this.Ua = [];
            this.Pc = [];
            this.sa = [];
            this.sc = [];
            this.ba = 1;
            this.rc = this.Uc = null;
            this.yd = {};
            this.addListener = function(a, c) {
                (this.yd[a] = this.yd[a] || []).push(c)
            };
            this.Rh = function(a, c) {
                var g = this.yd[a],
                    e, f;
                if (g) for (f = 0, e = g.length; f < e; f++) g[f].apply(null, c)
            };
            this.removeEventListener = function(a, c) {
                var g = this.yd[a];
                if (g) {
                    var e, f;
                    f = 0;
                    for (e = g.length; f < e; f++) if (g[f] === c) {
                        1 === e ? delete this.yd[a] : g.splice(f, 1);
                        break
                    }
                }
            };
            this.f = {
                L: [],
                mc: "0x000000",
                yh: !1,
                mh: .4,
                nh: .4,
                Z: 512,
                Va: 1,
                kh: 0,
                oh: "",
                width: 0,
                height: 0,
                Dh: 0
            };
            this.wj = {
                target: 0,
                current: 0,
                Tb: .01,
                zi: 2,
                xf: 0,
                oe: !1,
                oi: !1
            };
            this.margin = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            this.C = {
                Pd: !1,
                Lf: !1,
                Wa: !1,
                Mf: !1,
                yc: !0,
                Zg: !1,
                Mh: 1,
                wf: !0,
                ke: !0,
                ze: !1,
                sensitivity: 8
            };
            this.Sd = [];
            this.cc = !0;
            this.ha = {
                x: 0,
                y: 0
            };
            this.ae = this.Sa = this.$d = this.Hb = this.ka = !1;
            this.gf = this.$h = !0;
            this.Gf = !1;
            this.te = !0;
            this.Ff = !1;
            this.ja = 0;
            this.Ye = 5;
            this.Oc = 0;
            this.qh = 200;
            this.ua = this.qc = "";
            this.Vb = "transition";
            this.Aa = "transform";
            this.dc = "perspective";
            this.xg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC";
            this.Ta = {
                width: 0,
                height: 0
            };
            this.Fg = new y;
            this.Eg = new y;
            this.Gg = new y;
            this.Hg = new y;
            this.Dg = new y;
            this.Kd = !1;
            this.currentNode = "";
            this.ig = [];
            this.df = [];
            this.uh = this.$g = this.Kf = this.dh = this.If = this.Jf = this.Ae = this.ah = this.Hh = this.Ic = this.bh = !1;
            this.Pa = new ba;
            this.gg = !1;
            this.xd = function(a, c) {
                if (0 == a.length) return a;
                var g, e, f, k, l, q, p, m;
                m = [];
                g = c.Me(a[0]) - 0;
                for (k = 0; k < a.length; k++) {
                    q = k;
                    p = k + 1;
                    p == a.length && (p = 0);
                    e = c.Me(a[p]) - 0;
                    if (0 <= g && 0 <= e) m.push(a[q]);
                    else if (0 <= g || 0 <= e) f = e / (e - g), 0 > f && (f = 0), 1 < f && (f = 1), l = new y, l.hc(a[q], a[p], f), 0 > g || m.push(a[q]), m.push(l);
                    g = e
                }
                return m
            };
            this.bg = 0;
            this.yg = 1;
            this.eb = [];
            this.P = A();
            this.qb = A();
            this.Ee = -1;
            this.Cd = function(a) {
                return a ? a.pageX || a.pageY ? {
                    x: a.pageX,
                    y: a.pageY
                } : a.clientX || a.clientY ? {
                    x: a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                    y: a.clientY + document.body.scrollTop + document.documentElement.scrollTop
                } : a.touches && a.touches[0] ? {
                    x: a.touches[0].pageX,
                    y: a.touches[0].pageY
                } : {
                    x: 0,
                    y: 0
                } : {
                    x: 0,
                    y: 0
                }
            };
            this.Ge = 1;
            this.Di = this.Cf = this.yf = this.Wf = this.Ne = 0;
            this.re = !0;
            this.Qa = new Y(this);
            this.Qa.Yc = !1;
            this.wg();
            this.gd(this.Qa);
            this.checkLoaded = this.bb;
            this.isLoaded = !1;
            c && c.hasOwnProperty("useFlash") && c.useFlash && (this.Sa = !0, this.ka = this.Hb = !1, c.hasOwnProperty("flashPlayerId") ? this.Gc = c.flashPlayerId : this.Gc = "pano", c.hasOwnProperty("flashContainerId") ? this.Bf = c.flashContainerId : this.Bf = a + "flash");
            this.ia();
            this.Sa || (this.Ea = new P(this));
            this.rg(a);
            this.ni();
            this.userdata = this.od = this.qe();
            this.emptyHotspot = this.Qa;
            this.mouse = this.ha;
            this.Jj();
            this.S = new N(this);
            this.ra = new O(this)
        }
        e.prototype.wg = function() {
            var a = 0;
            this.bh = navigator.userAgent.match(/(MSIE)/g) ? !0 : !1;
            if (this.Ic = navigator.userAgent.match(/(Safari)/g) ? !0 : !1) a = navigator.userAgent.indexOf("Safari"), this.Dc = navigator.userAgent.substring(a + 7), a = navigator.userAgent.indexOf("Version"), -1 != a && (this.Dc = navigator.userAgent.substring(a + 8)), this.Dc = this.Dc.substring(0, this.Dc.indexOf(" ")), this.Dc = this.Dc.substring(0, this.Dc.indexOf(".")), this.Hh = !0;
            if (this.ah = navigator.userAgent.match(/(Chrome)/g) ? !0 : !1) this.Ic = !1;
            this.Ae = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
            this.Jf = navigator.userAgent.match(/(iPhone|iPod)/g) ? !0 : !1;
            this.If = navigator.userAgent.match(/(android)/i) ? !0 : !1;
            this.dh = navigator.userAgent.match(/(IEMobile)/i) ? !0 : !1;
            this.Kf = this.Ae || this.If || this.dh;
            var a = ["Webkit", "Moz", "O", "ms", "Ms"],
                c;
            this.ua = "";
            this.Vb = "transition";
            this.Aa = "transform";
            this.dc = "perspective";
            for (c = 0; c < a.length; c++)"undefined" !== typeof document.documentElement.style[a[c] + "Transform"] && (this.ua = "-" + a[c].toLowerCase() + "-", this.Vb = a[c] + "Transition", this.Aa = a[c] + "Transform", this.dc = a[c] + "Perspective");
            this.Gf = Q();
            this.ka = R();
            this.Hb = this.Gf;
            this.ka && (this.Hb = !1);
            this.Eb = !0;
            this.fd = !1;
            if (this.Ae || this.If) this.Jh(80), this.Ye = 2;
            this.ad("Pano2VR player - Prefix:" + this.ua + ", " + (this.Gf ? "CSS 3D available" : "CSS 3D not available") + ", " + (this.ka ? "WebGL available" : "WebGL not available"));
            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext, this.lb = new AudioContext
            } catch (b) {
                this.lb = null
            }
            if (this.Ic && !(this.Hh && 9 <= Number(this.Dc)) || this.Ae) this.lb = null
        };
        e.prototype.ad = function(a) {
            var c = document.getElementById("debug");
            c && (c.innerHTML = a + "<br />");
            // window.console && window.console.log(a)
        };
        e.prototype.Jj = function() {
            this.requestAnimationFrame = function() {
                var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                return a ? a : function(a) {
                    window.setTimeout(a, 10)
                }
            }()
        };
        e.prototype.Jh = function(a) {
            this.qh = a
        };
        e.prototype.Pj = function(a) {
            this.crossOrigin = a
        };
        e.prototype.Rj = function(a) {
            this.Zc = a
        };
        e.prototype.Vi = function() {
            return this.Ke
        };
        e.prototype.Oj = function(a) {
            this.qc = a
        };
        e.prototype.Fi = function() {
            return this.qc
        };
        e.prototype.Mi = function() {
            return this.Kf
        };
        e.prototype.Ji = function() {
            return this.u.active
        };
        e.prototype.Sj = function(a) {
            this.Kf = Boolean(a)
        };
        e.prototype.Li = function() {
            return this.isLoaded
        };
        e.prototype.bc = function() {
            return 1 * this.l.height / (2 * Math.tan(Math.PI / 180 * (this.Wb() / 2)))
        };
        e.prototype.Kh = function(a, c) {
            this.isFullscreen && (a = window.innerWidth, c = window.innerHeight);
            var b = a - this.margin.left - this.margin.right,
                d = c - this.margin.top - this.margin.bottom;
            if (!(10 > b || 10 > d)) {
                var g = window.devicePixelRatio || 1;
                this.Oe && (g = 1);
                this.w.style.width = b + "px";
                this.w.style.height = d + "px";
                this.w.style.left = this.margin.left + "px";
                this.w.style.top = this.margin.top + "px";
                if (this.ka) try {
                    this.Oa && (this.Oa.style.position = "absolute", this.Oa.style.display = "inline", this.Oa.style.width = b + "px", this.Oa.style.height = d + "px", this.Oa.width = b * g, this.Oa.height = d * g), this.a && (this.Ta.width = b * g, this.Ta.height = d * g, this.a.viewport(0, 0, this.a.drawingBufferWidth, this.a.drawingBufferHeight))
                } catch (e) {
                    alert(e)
                }
                this.pb && (this.pb.style.width = a + "px", this.pb.style.height = c + "px", this.pb.width = a, this.pb.height = c);
                this.va && (this.va.style.width = a + "px", this.va.style.height = c + "px", this.la.style.width = a + "px", this.la.style.height = c + "px", this.la.width = a, this.la.height = c, this.la.style.left = this.margin.left + "px", this.la.style.top = this.margin.top + "px", this.D && this.D != this.va && (this.D.style.width = a + "px", this.D.style.height = c + "px"));
                this.Ea && (b = this.Ea.ac, b.style.width = a + "px", b.style.height = c + "px", b.width = a, b.height = c, b.style.left = this.margin.left + "px", b.style.top = this.margin.top + "px");
                this.Id && (this.Ca = !0);
                b = this.w.offsetWidth;
                d = this.w.offsetHeight;
                if (this.l.width != b || this.l.height != d) this.l.width = b, this.l.height = d;
                this.Ek();
                this.D && this.D.ggUpdateSize && this.D.ggUpdateSize(a, c)
            }
        };
        e.prototype.Rc = function() {
            this.gg = !0
        };
        e.prototype.Sc = function() {
            this.Kh(this.Uc.offsetWidth, this.Uc.offsetHeight)
        };
        e.prototype.gj = function() {
            var a = {
                width: 0,
                height: 0
            };
            a.width = this.l.width;
            a.height = this.l.height;
            return a
        };
        e.prototype.Hc = function() {
            var a = {
                    x: 0,
                    y: 0
                },
                c = this.w;
            if (c.offsetParent) {
                do a.x += c.offsetLeft, a.y += c.offsetTop, c = c.offsetParent;
                while (c)
            }
            return a
        };
        e.prototype.Yj = function(a) {
            this.xa = a
        };
        e.prototype.Uj = function(a, c, b, d) {
            this.margin.left = a;
            this.margin.top = c;
            this.margin.right = b;
            this.margin.bottom = d;
            this.xa = this.skinObj;
            this.Rc()
        };
        e.prototype.ui = function(a) {
            0 == a && (this.C.yc = !1);
            1 == a && (this.C.yc = !0);
            2 == a && (this.C.yc = this.C.yc ? !1 : !0)
        };
        e.prototype.ej = function() {
            return 1 == this.C.yc ? 1 : 0
        };
        e.prototype.pg = function(a, c) {
            this.v.mode = 1 == c && 0 < this.v.mode ? 0 : Math.round(a);
            this.update();
            this.Y && (this.Y.changePolygonMode(a, c), this.Y.update())
        };
        e.prototype.Xi = function() {
            return this.v.mode
        };
        e.prototype.vi = function() {};
        e.prototype.fj = function() {
            return 0
        };
        e.prototype.Wg = function(a, c, b) {
            a = Math.atan2(a + 1, b);
            var d = Math.atan2(c + 1, b);
            c = Math.sin(a);
            b = Math.sin(d);
            a = Math.cos(a);
            d = Math.cos(d);
            this.Fg.Ka(0, 0, -1);
            this.Eg.Ka(a, 0, -c);
            this.Gg.Ka(-a, 0, -c);
            this.Hg.Ka(0, d, -b);
            this.Dg.Ka(0, -d, -b)
        };
        e.prototype.rf = function(a) {
            a = this.xd(a, this.Fg);
            a = this.xd(a, this.Eg);
            a = this.xd(a, this.Gg);
            a = this.xd(a, this.Hg);
            return a = this.xd(a, this.Dg)
        };
        e.prototype.Th = function(a) {
            if (!this.Eb && this.lj != a) {
                this.lj = a;
                var c;
                c = this.margin.left + this.l.width / 2 + "px ";
                c += this.margin.top + this.l.height / 2 + "px ";
                this.va.style[this.dc] = a + "px";
                this.va.style[this.dc + "Origin"] = c;
                this.w.style[this.dc] = a + "px";
                this.w.style[this.dc + "Origin"] = c
            }
        };
        e.prototype.ef = function() {
            var a, c = new y(0, 0, -100),
                b = this.bc(),
                d, g, e;
            g = 100 / this.g.b;
            e = this.f.width / this.f.height;
            d = this.l.height * g * e;
            g *= this.l.height;
            for (var f = 0; f < this.I.length; f++) {
                var k = this.I[f],
                    l, q;
                "point" == k.type && (q = !1, 2 == this.rb ? (a = (this.pan.b - k.pan) / 100 / e * d, l = (this.j.b - k.j) / 100 * g, Math.abs(a) < this.l.width / 2 + 500 && Math.abs(l) < this.l.height / 2 + 500 && (q = !0)) : (c.Ka(0, 0, -100), c.pa(-k.j * Math.PI / 180), c.wa(k.pan * Math.PI / 180), c.wa(-this.pan.b * Math.PI / 180), c.pa(this.j.b * Math.PI / 180), c.Ra(this.G.b * Math.PI / 180), .01 > c.z ? (l = -b / c.z, a = c.x * l, l *= c.y, Math.abs(a) < this.l.width / 2 + 500 && Math.abs(l) < this.l.height / 2 + 500 && (q = !0)) : l = a = 0), k.sb = a + this.l.width / 2, k.Ya = l + this.l.height / 2, k.c && k.c.__div && ("none" != k.c.__div.style[this.Vb] && (k.c.__div.style[this.Vb] = "none"), k.c.ggUse3d ? (this.Eb || this.Th(b), k.c.__div.style.width = "1px", k.c.__div.style.height = "1px", a = "", this.Eb && (a += "perspective(" + b + "px) "), a += "translate3d(0px,0px," + b + "px) ", a += "rotateZ(" + this.G.b.toFixed(10) + "deg) ", a += "rotateX(" + this.j.b.toFixed(10) + "deg) ", a += "rotateY(" + (-this.pan.b).toFixed(10) + "deg) ", a += "rotateY(" + k.pan.toFixed(10) + "deg) ", a += "rotateX(" + (-k.j).toFixed(10) + "deg) ", a += "translate3d(0px,0px," + (-1 * k.c.gg3dDistance).toFixed(10) + "px) ", k.c.__div.style[this.Aa + "Origin"] = "0% 0%", k.c.__div.style[this.Aa] = a, k.c.__div.style.left = this.margin.left + this.l.width / 2 + "px", k.c.__div.style.top = this.margin.top + this.l.height / 2 + "px") : !q || this.S.ld || this.S.Ec ? (k.c.__div.style.left = "-1000px", k.c.__div.style.top = "-1000px") : (k.c.__div.style.left = this.margin.left + a + this.l.width / 2 + "px", k.c.__div.style.top = this.margin.top + l + this.l.height / 2 + "px")));
                if ("poly" == k.type) {
                    var p = [];
                    if (2 == this.rb) for (k.Bc = [], q = 0; q < k.be.length; q++) l = k.be[q], a = (this.pan.b - l.pan) / 100 / e * d, l = (this.j.b - l.j) / 100 * g, a += this.margin.left + this.l.width / 2, l += this.margin.top + this.l.height / 2, k.Bc.push({
                        sb: a,
                        Ya: l
                    });
                    else {
                        for (q = 0; q < k.be.length; q++) l = k.be[q], c.Ka(0, 0, -100), c.pa(-l.j * Math.PI / 180), c.wa(l.pan * Math.PI / 180), c.wa(-this.pan.b * Math.PI / 180), c.pa(this.j.b * Math.PI / 180), c.Ra(this.G.b * Math.PI / 180), p.push(c.clone());
                        p = this.rf(p);
                        if (0 < p.length) for (q = 0; q < p.length; q++) c = p[q], .1 > c.z ? (l = -b / c.z, a = this.l.width / 2 + c.x * l, l = this.l.height / 2 + c.y * l) : l = a = 0, c.sb = a, c.Ya = l;
                        k.Bc = p
                    }
                }
            }
        };
        e.prototype.Gi = function() {
            for (var a = [], c = 0; c < this.I.length; c++) {
                var b = this.I[c];
                "point" == b.type && b.c && b.c.__div && a.push(b.c.__div)
            }
            return a
        };
        e.prototype.X = function(a, c) {
            a = Number(a);
            isNaN(c) && (c = 0);
            0 > c && (c = 0);
            1 < c && (c = 1);
            return "rgba(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255) + "," + c + ")"
        };
        e.prototype.yj = function() {
            var a, c;
            if (this.la && (this.v.Md != this.v.mode && (this.v.Md = this.v.mode, this.la.style.visibility = 0 < this.v.mode ? "inherit" : "hidden"), 0 < this.v.mode)) {
                this.U || (this.U = this.la.getContext("2d"));
                if (this.U.width != this.l.width || this.U.height != this.l.height) this.U.width = this.l.width, this.U.height = this.l.height;
                this.U.clear ? this.U.clear() : this.U.clearRect(0, 0, this.la.width, this.la.height);
                var b = 1;
                3 == this.v.mode && (b = this.v.ea);
                for (a = 0; a < this.I.length; a++) if (c = this.I[a], "poly" == c.type) {
                    var d = c.Bc;
                    2 == this.v.mode && (b = c.ea);
                    this.U.fillStyle = this.X(c.mb, c.Mb * b);
                    this.U.strokeStyle = this.X(c.ob, c.Nb * b);
                    if (0 < d.length) {
                        this.U.beginPath();
                        for (c = 0; c < d.length; c++) {
                            var g = d[c];
                            0 == c ? this.U.moveTo(g.sb, g.Ya) : this.U.lineTo(g.sb, g.Ya)
                        }
                        this.U.closePath();
                        this.U.stroke();
                        this.U.fill()
                    }
                }
            }
        };
        e.prototype.zj = function() {
            var a, c;
            this.la.style.visibility = "hidden";
            this.v.Md != this.v.mode && (this.v.Md = this.v.mode);
            if (0 < this.v.mode && !this.S.Xd) {
                var b = 1;
                3 == this.v.mode && (b = this.v.ea);
                for (a = 0; a < this.I.length; a++) {
                    var d = this.I[a];
                    if ("poly" == d.type) {
                        var g = d.Bc;
                        2 == this.v.mode && (b = d.ea);
                        if (0 < g.length) {
                            var e = [];
                            for (c = 0; c < g.length; c++) e.push(g[c].sb), e.push(g[c].Ya), e.push(0);
                            this.a.useProgram(this.Db);
                            this.a.enable(this.a.BLEND);
                            this.a.blendFuncSeparate(this.a.SRC_ALPHA, this.a.ONE_MINUS_SRC_ALPHA, this.a.SRC_ALPHA, this.a.ONE);
                            this.a.disable(this.a.DEPTH_TEST);
                            c = this.a.createBuffer();
                            this.a.bindBuffer(this.a.ARRAY_BUFFER, c);
                            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(e), this.a.STATIC_DRAW);
                            this.a.uniform2f(this.a.getUniformLocation(this.Db, "uCanvasDimensions"), this.l.width, this.l.height);
                            c = this.a.getUniformLocation(this.Db, "uColor");
                            this.a.uniform3f(c, (d.ob >> 16 & 255) / 255, (d.ob >> 8 & 255) / 255, (d.ob & 255) / 255);
                            g = this.a.getUniformLocation(this.Db, "uAlpha");
                            this.a.uniform1f(g, d.Nb * b);
                            this.a.vertexAttribPointer(this.Db.ca, 3, this.a.FLOAT, !1, 0, 0);
                            this.a.drawArrays(this.a.LINE_LOOP, 0, e.length / 3);
                            this.a.uniform3f(c, (d.mb >> 16 & 255) / 255, (d.mb >> 8 & 255) / 255, (d.mb & 255) / 255);
                            this.a.uniform1f(g, d.Mb * b);
                            this.a.enable(this.a.STENCIL_TEST);
                            this.a.clearStencil(0);
                            this.a.clear(this.a.STENCIL_BUFFER_BIT);
                            this.a.colorMask(!1, !1, !1, !1);
                            this.a.stencilFunc(this.a.ALWAYS, 1, 1);
                            this.a.stencilOp(this.a.INCR, this.a.INCR, this.a.INCR);
                            this.a.drawArrays(this.a.TRIANGLE_FAN, 0, e.length / 3);
                            this.a.colorMask(!0, !0, !0, !0);
                            this.a.stencilFunc(this.a.EQUAL, 1, 1);
                            this.a.stencilOp(this.a.ZERO, this.a.ZERO, this.a.ZERO);
                            this.a.drawArrays(this.a.TRIANGLE_FAN, 0, e.length / 3);
                            this.a.disable(this.a.BLEND);
                            this.a.enable(this.a.DEPTH_TEST);
                            this.a.disable(this.a.STENCIL_TEST);
                            this.a.useProgram(this.F)
                        }
                    }
                }
            }
        };
        e.prototype.Vg = function(a, c, b) {
            var d, g, e = !1;
            d = 0;
            for (g = a.length - 1; d < a.length; g = d++) {
                var f = a[d];
                g = a[g];
                f.Ya > b != g.Ya > b && c < (g.sb - f.sb) * (b - f.Ya) / (g.Ya - f.Ya) + f.sb && (e = !e)
            }
            return e
        };
        e.prototype.qf = function(a, c) {
            var b = -1;
            if (0 <= this.v.mode) for (var d = 0; d < this.I.length; d++) {
                var g = this.I[d];
                "poly" == g.type && g.Bc && 0 < g.Bc.length && this.Vg(g.Bc, a, c) && (b = d, g.sb = a, g.Ya = c)
            }
            return 0 <= b ? this.I[b] : !1
        };
        e.prototype.Wb = function() {
            var a;
            switch (this.g.mode) {
                case 0:
                    a = this.g.b / 2;
                    break;
                case 1:
                    a = 180 * Math.atan(this.l.height / this.l.width * Math.tan(this.g.b / 2 * Math.PI / 180)) / Math.PI;
                    break;
                case 2:
                    a = 180 * Math.atan(this.l.height / Math.sqrt(this.l.width * this.l.width + this.l.height * this.l.height) * Math.tan(this.g.b / 2 * Math.PI / 180)) / Math.PI;
                    break;
                case 3:
                    a = 4 * this.l.height / 3 > this.l.width ? this.g.b / 2 : 180 * Math.atan(4 * this.l.height / (3 * this.l.width) * Math.tan(this.g.b / 2 * Math.PI / 180)) / Math.PI
            }
            return 2 * a
        };
        e.prototype.Ue = function(a) {
            a = a / 2;
            var c;
            switch (this.g.mode) {
                case 0:
                    this.g.b = 2 * a;
                    break;
                case 1:
                    a = 180 * Math.atan(this.l.width / this.l.height * Math.tan(a * Math.PI / 180)) / Math.PI;
                    this.g.b = 2 * a;
                    break;
                case 2:
                    c = Math.sqrt(this.l.width * this.l.width + this.l.height * this.l.height);
                    a = 180 * Math.atan(c / this.l.height * Math.tan(a * Math.PI / 180)) / Math.PI;
                    this.g.b = 2 * a;
                    break;
                case 3:
                    4 * this.l.height / 3 > this.l.width || (a = 180 * Math.atan(3 * this.l.width / (4 * this.l.height) * Math.tan(a * Math.PI / 180)) / Math.PI), this.g.b = 2 * a
            }
        };
        e.prototype.ab = function() {
            var a, c, b = this.l.width / this.l.height;
            if (2 == this.rb) {
                0 < this.g.Td && (a = this.oc, this.f.L && 0 < this.f.L.length && (a = this.f.L[0].height), this.g.min = 100 * this.l.height / (a * this.g.Td));
                c = this.g.b / 2;
                a = b * c;
                var d = 50 * this.f.width / (.01 + this.f.height);
                this.g.b < this.g.min && (this.g.b = this.g.min);
                this.g.b > this.g.max && (this.g.b = this.g.max);
                100 < this.g.b && (this.g.b = 100);
                this.g.b > 2 * d / b && (this.g.b = 2 * d / b);
                this.g.b > this.j.max - this.j.min && (this.g.b = this.j.max - this.j.min);
                this.g.b > this.pan.max - this.pan.min && (this.g.b = this.pan.max - this.pan.min);
                50 < this.j.b + c && (this.j.b = 50 - c); - 50 > this.j.b - c && (this.j.b = -50 + c);
                this.pan.b + a > d && (this.pan.b = d - a, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
                this.pan.b - a < -d && (this.pan.b = -d + a, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
                this.j.b + c > this.j.max && (this.j.b = this.j.max - c);
                this.j.b - c < this.j.min && (this.j.b = this.j.min + c)
            } else if (0 < this.g.Td && (a = this.oc, this.f.L && 0 < this.f.L.length && (a = this.f.L[0].height), this.g.min = 360 * Math.atan2(this.l.height / 2, a / 2 * this.g.Td) / Math.PI), this.g.b < this.g.min && (this.g.b = this.g.min), this.g.b > this.g.max && (this.g.b = this.g.max), c = this.Wb() / 2, a = 180 * Math.atan(this.l.width / this.l.height * Math.tan(c * Math.PI / 180)) / Math.PI, 2 * c > this.j.max - this.j.min && (c = (this.j.max - this.j.min) / 2, this.Ue(2 * c)), 90 > this.j.max ? this.j.b + c > this.j.max && (this.j.b = this.j.max - c) : this.j.b > this.j.max && (this.j.b = this.j.max), -90 < this.j.min ? this.j.b - c < this.j.min && (this.j.b = this.j.min + c) : this.j.b < this.j.min && (this.j.b = this.j.min), b = this.pan.max - this.pan.min, 359.99 > b) {
                var d = 90,
                    g = Math.tan(c * Math.PI / 180),
                    e = Math.tan((Math.abs(this.j.b) + c) * Math.PI / 180),
                    e = Math.sqrt(e * e + 1) / Math.sqrt(g * g + 1);
                c = 180 * Math.atan(e * Math.tan(a * Math.PI / 180)) / Math.PI;
                2 * c > b && (e = Math.tan(b * Math.PI / 360) / Math.tan(a * Math.PI / 180), b = e * Math.sqrt(g * g + 1), e = Math.sqrt(b * b - 1), d = 180 / Math.PI * Math.atan(e));
                this.pan.b + c > this.pan.max && (this.pan.b = this.pan.max - c, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
                this.pan.b - c < this.pan.min && (this.pan.b = this.pan.min + c, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
                this.j.b + a > d && (this.j.b = d - a);
                this.j.b - a < -d && (this.j.b = -d + a)
            }
        };
        e.prototype.update = function(a) {
            void 0 === a && (a = 0);
            this.Ca = !0;
            a && (this.pe = a)
        };
        e.prototype.Ni = function() {
            return this.Y ? Boolean(this.Y.isTileLoading) : 0 < this.ja || 0 < this.Oc
        };
        e.prototype.Zd = function() {
            var a = Date.now(),
                c;
            this.Sa ? this.Y && (this.uk(), 2 === this.rb ? (this.ab(), this.ab(), this.ef()) : 0 === this.rb && (c = this.bc(), this.Wg(this.l.width / 2, this.l.height / 2, c), this.ef())) : (this.ab(), 2 === this.rb ? (this.ab(), this.ef(), this.yk()) : 0 === this.rb && (c = this.bc(), this.Wg(this.l.width / 2, this.l.height / 2, c), this.ef(), this.ae ? this.Dk() : this.$h && this.Zh(), this.Uh(), this.ka ? (this.o.$c ? this.Ck() : 0 < this.f.L.length ? this.Bk() : this.Ak(), this.zj()) : (this.Hb ? 0 < this.f.L.length ? this.xk() : this.wk() : this.$d && this.tk(), this.yj()), this.Ea && this.Ea.xj()));
            50 < Date.now() - a ? this.Oe || (2 < this.bg ? (this.Oe = !0, this.Sc()) : this.bg++) : this.bg = 0;
            this.Id && this.f.Dh++
        };
        e.prototype.Ak = function() {
            var a;
            this.ab();
            if (this.l.width != this.w.offsetWidth || this.l.height != this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
            this.te && (this.xc(0), this.Sc());
            if (this.a) for (this.f.mc && 6 < this.f.mc.length && (a = parseInt(this.f.mc), this.a.clearColor((a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (a >> 0 & 255) / 255, 1)), this.a.clear(this.a.COLOR_BUFFER_BIT | this.a.DEPTH_BUFFER_BIT), D(this.qb), L(this.Wb(), this.Ta.width / this.Ta.height, this.qb), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), a = 0; 6 > a; a++) D(this.P), K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]), K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]), K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]), this.oa && (K(this.P, -this.oa.pitch * Math.PI / 180, [1, 0, 0]), K(this.P, this.oa.G * Math.PI / 180, [0, 0, 1])), 4 > a ? K(this.P, -Math.PI / 2 * a, [0, 1, 0]) : K(this.P, Math.PI / 2 * (5 == a ? 1 : -1), [1, 0, 0]), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.sf), this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.ne), this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0), 6 <= this.eb.length && this.eb[a].loaded && (this.a.activeTexture(this.a.TEXTURE0), this.a.bindTexture(this.a.TEXTURE_2D, this.eb[a]), this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.me), this.a.uniform1i(this.F.Pe, 0), this.a.uniformMatrix4fv(this.F.He, !1, this.P), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.drawElements(this.a.TRIANGLES, 6, this.a.UNSIGNED_SHORT, 0))
        };
        e.prototype.mk = function(a) {
            var c = this;
            return function() {
                c.Ca = !0;
                c.cc = !0;
                a.loaded = !0;
                var b = c.a;
                c.ja && c.ja--;
                0 == c.ja && c.D && c.D.ggLoadedLevels && c.D.ggLoadedLevels();
                b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
                if (null != a.f && a.f.complete) {
                    a.Pb = b.createTexture();
                    b.bindTexture(b.TEXTURE_2D, a.Pb);
                    try {
                        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.f)
                    } catch (d) {
                        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 250]))
                    }
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
                    b.bindTexture(b.TEXTURE_2D, null)
                }
                c.update()
            }
        };
        e.prototype.rj = function(a) {
            var c = this;
            return function() {
                c.Ca = !0;
                c.cc = !0;
                try {
                    if (null != a && a.complete) {
                        var b = {
                                width: a.width,
                                height: a.width,
                                cache: !0,
                                Tf: !0,
                                Ma: 1,
                                Fb: 1,
                                $: []
                            },
                            d;
                        for (d = 0; 6 > d; d++) {
                            var g = {
                                A: null,
                                da: null,
                                f: null,
                                Pb: null
                            };

                            g.A = document.createElement("canvas");
                            c.ka ? (g.A.width = b.width, g.A.height = b.height) : (g.A.width = c.f.Z + 2 * c.f.Va, g.A.height = c.f.Z + 2 * c.f.Va);
                            g.da = g.A.getContext("2d");
                            g.A.Rg = g.da;
                            g.A.style[c.Aa + "Origin"] = "0% 0%";
                            g.A.style.overflow = "hidden";
                            g.A.style.position = "absolute";
                            g.f = a;
                            g.da && (c.Hb ? g.da.drawImage(a, 0, d * b.height, b.width, b.height, 0, 0, b.width + 2, b.height + 2) : g.da.drawImage(a, 0, d * b.height, b.width, b.height, 0, 0, b.width, b.height));
                            if (c.ka && c.a) {
                                var e = c.a;
                                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1);
                                g.Pb = e.createTexture();
                                e.bindTexture(e.TEXTURE_2D, g.Pb);
                                try {
                                    e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, g.A)
                                } catch (f) {}
                                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR);
                                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR);
                                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
                                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
                                e.bindTexture(e.TEXTURE_2D, null)
                            }
                            c.Hb && (g.A.wc = -1, c.w.insertBefore(g.A, c.w.firstChild));
                            b.$[d] = g
                        }
                        c.f.L.push(b)
                    }
                    $('#fakeloader').fadeOut();
                } catch (f) {}
                c.update()
            }
        };
        e.prototype.Qh = function() {
            var a = this;
            return function() {
                a.Ca = !0;
                a.cc = !0;
                a.ja && a.ja--;
                0 == a.ja && a.D && a.D.ggLoadedLevels && a.D.ggLoadedLevels()
            }
        };
        e.prototype.Bk = function() {
            this.ab();
            var a, c, b;
            this.te && (this.xc(0), this.Sc());
            if (this.a) {
                if (this.f.mc && 6 < this.f.mc.length) {
                    var d = parseInt(this.f.mc);
                    this.a.clearColor((d >> 16 & 255) / 255, (d >> 8 & 255) / 255, (d >> 0 & 255) / 255, 1)
                }
                this.a.clear(this.a.COLOR_BUFFER_BIT | this.a.DEPTH_BUFFER_BIT);
                this.a.enable(this.a.DEPTH_TEST);
                D(this.qb);
                L(this.Wb(), this.Ta.width / this.Ta.height, this.qb);
                this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb);
                this.Oc = 0;
                this.Wh();
                this.ph();
                var g = this.Ag(),
                    e, d = this.f.L;
                for (e = d.length - 1; e >= g;) {
                    var f = d[e],
                        k = 1;
                    e == d.length - 1 && 0 == this.f.Va && (k = this.f.Z / (this.f.Z - .5));
                    for (var l = 0; 6 > l; l++) {
                        var q = void 0,
                            q = this.Pa.Ja[l],
                            p = q.bd;
                        if (q.Ab && 0 < p.pd && 0 < p.ce && 0 < p.scale || f.cache) {
                            q.Ca = !1;
                            var m;
                            q.Tc[e] || (q.Tc[e] = {
                                gb: 0,
                                vb: 0,
                                Bb: 0,
                                Cb: 0
                            });
                            m = q.Tc[e];
                            f.cache ? (m.gb = 0, m.vb = 0, m.Bb = f.Ma - 1, m.Cb = f.Fb - 1) : this.Qg(f, p, m);
                            p = !0;
                            for (c = m.vb; c <= m.Cb; c++) for (a = m.gb; a <= m.Bb; a++) {
                                b = a + c * f.Ma + l * f.Ma * f.Fb;
                                var r = f.$[b];
                                r || (r = f.$[b] = {});
                                this.ja < this.Ye ? r.f || (r.f = new Image, r.f.onload = this.mk(r), r.f.onerror = this.Qh(), r.f.onabort = this.Qh(), r.f.crossOrigin = this.crossOrigin, r.f.setAttribute("src", this.$e(l, e, a, c)), f.cache && this.bb.push(r.f), 0 == this.ja && this.D && this.D.ggReLoadedLevels && this.D.ggReLoadedLevels(), this.ja++, this.Ca = !0) : this.Oc++;
                                if (r.Pb) {
                                    if (!r.Gd) {
                                        var t;
                                        t = .5 * e + 1;
                                        r.Gd = this.a.createBuffer();
                                        this.a.bindBuffer(this.a.ARRAY_BUFFER, r.Gd);
                                        var v = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
                                        v[3] = a * this.f.Z - this.f.Va;
                                        v[0] = Math.min((a + 1) * this.f.Z, f.width) + this.f.Va;
                                        v[7] = c * this.f.Z - this.f.Va;
                                        v[1] = Math.min((c + 1) * this.f.Z, f.height) + this.f.Va;
                                        v[4] = v[1];
                                        v[6] = v[3];
                                        v[9] = v[0];
                                        v[10] = v[7];
                                        for (b = 0; 12 > b; b++) v[b] = 0 == b % 3 ? k * t * (-2 * v[b] / f.width + 1) : 1 == b % 3 ? k * t * (-2 * v[b] / f.height + 1) : t;
                                        this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(v), this.a.STATIC_DRAW)
                                    }
                                } else p = !1;
                                r.visible = q.Ab
                            }
                            m.lh = p
                        }
                    }
                    e--
                }
                for (l = 0; 6 > l; l++) if (q = this.Pa.Ja[l], q.Ab) for (p = q.bd, D(this.P), K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]), K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]), K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]), this.oa && (K(this.P, -this.oa.pitch * Math.PI / 180, [1, 0, 0]), K(this.P, this.oa.G * Math.PI / 180, [0, 0, 1])), 4 > l ? K(this.P, -Math.PI / 2 * l, [0, 1, 0]) : K(this.P, Math.PI / 2 * (5 == l ? 1 : -1), [1, 0, 0]), this.a.uniform1i(this.F.Pe, 0), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.uniformMatrix4fv(this.F.He, !1, this.P), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.ne), this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0), this.a.activeTexture(this.a.TEXTURE0), this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.me), this.a.useProgram(this.F), e = g; e <= d.length - 1;) {
                    f = d[e];
                    if (q.Ab && 0 < p.pd && q.Tc[e] && 0 <= q.Tc[e].gb) {
                        m = q.Tc[e];
                        for (c = m.vb; c <= m.Cb; c++) for (a = m.gb; a <= m.Bb; a++) b = a + c * f.Ma + l * f.Ma * f.Fb, (r = f.$[b]) || (r = f.$[b] = {}), r.Pb && (this.a.uniform1f(this.F.hi, 1E-4 * (a % 2 + c % 2 * 2)), this.a.bindBuffer(this.a.ARRAY_BUFFER, r.Gd), this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0), this.a.bindTexture(this.a.TEXTURE_2D, r.Pb), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MAG_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE), this.a.drawElements(this.a.TRIANGLES, 6, this.a.UNSIGNED_SHORT, 0)), r.visible = q.Ab;
                        m.lh && (e = d.length)
                    }
                    e++
                }
                for (a = 0; a < d.length; a++) if (f = d[a], !f.cache) for (var w in f.$) f.$.hasOwnProperty(w) && (r = f.$[w], r.visible || (r.Pb && this.a.deleteTexture(r.Pb), r.f = null, r.Gd && this.a.deleteBuffer(r.Gd), delete f.$[w]));
                this.cc = !1
            }
        };
        e.prototype.Dk = function() {
            this.a.disable(this.a.DEPTH_TEST);
            var a;
            for (a = 0; a < this.J.length; a++) {
                var c = this.J[a];
                D(this.P);
                K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]);
                K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]);
                K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]);
                K(this.P, c.pan * Math.PI / 180, [0, 1, 0]);
                K(this.P, -c.j * Math.PI / 180, [1, 0, 0]);
                F(this.P, [0, 0, 1]);
                K(this.P, c.Ra * Math.PI / 180, [0, 0, 1]);
                K(this.P, -c.wa * Math.PI / 180, [0, 1, 0]);
                K(this.P, c.pa * Math.PI / 180, [1, 0, 0]);
                var b = Math.tan(c.g / 2 * Math.PI / 180),
                    d = c.lg;
                d || (d = 16 / 9);
                var g = this.P,
                    b = [b, b / d, 1],
                    d = b[0],
                    e = b[1],
                    b = b[2];
                g[0] *= d;
                g[1] *= d;
                g[2] *= d;
                g[3] *= d;
                g[4] *= e;
                g[5] *= e;
                g[6] *= e;
                g[7] *= e;
                g[8] *= b;
                g[9] *= b;
                g[10] *= b;
                g[11] *= b;
                F(this.P, [0, 0, -1]);
                this.a.bindBuffer(this.a.ARRAY_BUFFER, this.sf);
                this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0);
                this.a.bindBuffer(this.a.ARRAY_BUFFER, this.ne);
                this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0);
                this.a.activeTexture(this.a.TEXTURE0);
                this.a.bindTexture(this.a.TEXTURE_2D, c.Gb);
                this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MAG_FILTER, this.a.LINEAR);
                this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR);
                this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE);
                this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE);
                this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.me);
                this.a.uniform1i(this.F.Pe, 0);
                this.a.uniformMatrix4fv(this.F.He, !1, this.P);
                this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb);
                this.a.drawElements(this.a.TRIANGLES, 6, this.a.UNSIGNED_SHORT, 0)
            }
            this.a.enable(this.a.DEPTH_TEST)
        };
        e.prototype.Ck = function() {
            this.ab();
            var a;
            if (this.l.width != this.w.offsetWidth || this.l.height != this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
            this.te && (this.xc(0), this.Sc());
            if (this.a) for (D(this.qb), L(this.Wb(), this.Ta.width / this.Ta.height, this.qb), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.bindTexture(this.a.TEXTURE_2D, this.o.Gb), a = 0; 1 > a; a++) D(this.P), K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]), K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]), K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]), this.oa && (K(this.P, -this.oa.pitch * Math.PI / 180, [1, 0, 0]), K(this.P, this.oa.G * Math.PI / 180, [0, 0, 1])), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.hg), this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.Xe), this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0), this.a.activeTexture(this.a.TEXTURE0), this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.o.Hf), this.a.uniform1i(this.F.Pe, 0), this.a.uniformMatrix4fv(this.F.He, !1, this.P), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.drawElements(this.a.TRIANGLES, 36, this.a.UNSIGNED_SHORT, 0)
        };
        e.prototype.wk = function() {
            this.ab();
            var a = !1;
            if (this.l.width != this.w.offsetWidth || this.l.height != this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight, this.w.style[this.Aa + "OriginX"] = this.l.width / 2 + "px", this.w.style[this.Aa + "OriginY"] = this.l.height / 2 + "px", a = !0;
            var c = Math.round(this.bc());
            this.Nd == c && !a || this.Eb || (this.Nd = c, this.w.style[this.dc] = c + "px");
            this.Pa.xi(this.pan.b, this.j.b, this.G.b, this.oa);
            for (a = 0; 6 > a; a++) {
                var b, d;
                if (b = this.Pa.Ja[a]) d = "", this.Eb ? (d += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px,0px) ", d += "perspective(" + c + "px) ", d += "translate3d(0px,0px," + c + "px) ") : d += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px," + c + "px) ", d += "rotateZ(" + Number(this.G.b).toFixed(10) + "deg) ", d += "rotateX(" + Number(this.j.b).toFixed(10) + "deg) ", d += "rotateY(" + Number(-this.pan.b).toFixed(10) + "deg) ", b.Sg && (d += b.Sg, b.Ab || (d = "translate3d(-10px,-10px,0px) scale(0.001,0.001)"), b.A.style[this.Aa] = d)
            }
        };
        e.prototype.tk = function() {
            this.ab();
            var a;
            this.pb && (a = this.pb.getContext("2d"));
            if (this.l.width !== this.w.offsetWidth || this.l.height !== this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
            if (a) {
                var c = a.canvas.width / 2,
                    b = a.canvas.height / 2,
                    d = a.createRadialGradient(c, b, 5, c, b, Math.max(c, b));
                d.addColorStop(0, "#333");
                d.addColorStop(1, "#fff");
                a.rect(0, 0, a.canvas.width, a.canvas.height);
                a.fillStyle = d;
                a.fill();
                a.fillStyle = "#f00";
                a.font = "20px Helvetica";
                a.textAlign = "center";
                a.fillText("Pan: " + this.pan.b.toFixed(1), c, b - 60);
                a.fillText("Tilt: " + this.j.b.toFixed(1), c, b - 30);
                a.fillText("Fov: " + this.g.b.toFixed(1), c, b + 0);
                a.fillText("Node: " + this.Kg(), c, b + 30);
                a.fillText("Title: " + this.od.title, c, b + 60)
            }
        };
        e.prototype.uk = function() {
            this.ab();
            if (this.l.width !== this.w.offsetWidth || this.l.height !== this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
            this.Y && this.Y.setPan && (this.Y.setPan(this.pan.b), this.Y.setTilt(this.j.b), this.Y.setFov(this.g.b))
        };
        e.prototype.yk = function() {
            this.la.style.visibility = "inherit";
            this.U || (this.U = this.la.getContext("2d"));
            if (this.U.width != this.l.width || this.U.height != this.l.height) this.U.width = this.l.width, this.U.height = this.l.height;
            this.U.clear ? this.U.clear() : this.U.clearRect(0, 0, this.la.width, this.la.height);
            this.Oc = 0;
            this.ab();
            var a, c, b;
            c = 100 / this.g.b;
            b = this.f.width / this.f.height;
            var d = this.l.height * c * b;
            c *= this.l.height;
            a = (this.pan.b / 100 / b - .5) * d + this.l.width / 2;
            for (var g = (this.j.b / 100 - .5) * c + this.l.height / 2, e, f, k, l, q = 0; this.f.L.length >= q + 2 && this.f.L[q + 1].width > d;) q++;
            var p, m;
            m = [];
            for (p = this.f.L.length - 1; p >= q;) {
                b = this.f.L[p];
                var r;
                if (b.cache) r = {
                    gb: 0,
                    vb: 0
                }, r.Bb = b.Ma - 1, r.Cb = b.Fb - 1;
                else {
                    r = {};
                    var t = -g / c * (b.height / this.f.Z);
                    e = (-a + this.l.width) / d * (b.width / this.f.Z);
                    f = (-g + this.l.height) / c * (b.height / this.f.Z);
                    r.gb = Math.min(Math.max(0, Math.floor(-a / d * (b.width / this.f.Z))), b.Ma - 1);
                    r.vb = Math.min(Math.max(0, Math.floor(t)), b.Fb - 1);
                    r.Bb = Math.min(Math.max(0, Math.floor(e)), b.Ma - 1);
                    r.Cb = Math.min(Math.max(0, Math.floor(f)), b.Fb - 1)
                }
                m[p] = r;
                var v = !0;
                for (f = r.vb; f <= r.Cb; f++) for (e = r.gb; e <= r.Bb; e++) l = e + f * b.Ma, (t = b.$[l]) || (t = b.$[l] = {}), this.ja < this.Ye ? t.f || (t.f = new Image, t.f.onload = this.lk(), t.f.onerror = this.Ze(t), t.f.onabort = this.Ze(t), t.f.crossOrigin = this.crossOrigin, t.f.setAttribute("src", this.$e(0, p, e, f)), b.cache && this.bb.push(t.f), 0 == this.ja && this.D && this.D.ggReLoadedLevels && this.D.ggReLoadedLevels(), this.ja++, this.Ca = !0) : this.Oc++, t.f && t.f.complete || (v = !1), t.visible = !0;
                r.lh = v;
                p--
            }
            for (p = this.f.L.length - 1; p >= q;) {
                b = this.f.L[p];
                if (m[p] && 0 <= m[p].gb) for (r = m[p], f = r.vb; f <= r.Cb; f++) for (e = r.gb; e <= r.Bb; e++) l = e + f * b.Ma, (t = b.$[l]) || (t = b.$[l] = {}), t.f && t.f.complete && this.U.drawImage(t.f, a + (-this.f.Va + this.f.Z * e) * d / b.width, g + (-this.f.Va + this.f.Z * f) * c / b.height, t.f.width * d / b.width, t.f.height * c / b.height), t.visible = !0;
                p--
            }
            for (d = 0; d < this.f.L.length; d++) if (b = this.f.L[d], !b.cache) for (k in b.$) b.$.hasOwnProperty(k) && (t = b.$[k], t.visible || (t.f = null, delete b.$[k]));
            if (0 < this.v.mode) for (d = 1, 3 == this.v.mode && (d = this.v.ea), k = 0; k < this.I.length; k++) if (b = this.I[k], "poly" == b.type && (c = b.Bc, 2 == this.v.mode && (d = b.ea), 0 < c.length)) {
                this.U.fillStyle = this.X(b.mb, b.Mb * d);
                this.U.strokeStyle = this.X(b.ob, b.Nb * d);
                this.U.beginPath();
                for (b = 0; b < c.length; b++) a = c[b], 0 == b ? this.U.moveTo(a.sb, a.Ya) : this.U.lineTo(a.sb, a.Ya);
                this.U.closePath();
                this.U.stroke();
                this.U.fill()
            }
            this.cc = !1
        };
        e.prototype.kk = function(a) {
            var c = this;
            return function() {
                c.Ca = !0;
                c.cc = !0;
                a.loaded = !0;
                a.f && !a.A && c.w.appendChild(a.f);
                c.ja && c.ja--;
                0 == c.ja && c.D && c.D.ggLoadedLevels && c.D.ggLoadedLevels();
                a.f && a.da && (a.da.drawImage(a.f, 0, 0), a.f = null)
            }
        };
        e.prototype.lk = function() {
            var a = this;
            return function() {
                a.Ca = !0;
                a.cc = !0;
                a.ja && a.ja--;
                0 == a.ja && a.D && a.D.ggLoadedLevels && a.D.ggLoadedLevels()
            }
        };
        e.prototype.Ze = function(a) {
            var c = this;
            return function() {
                c.Ca = !0;
                c.cc = !0;
                c.ja && c.ja--;
                0 == c.ja && c.D && c.D.ggLoadedLevels && c.D.ggLoadedLevels();
                a.f = null
            }
        };
        e.prototype.Qg = function(a, c, b) {
            b.gb = a.width / this.f.Z * c.zd;
            b.vb = a.height / this.f.Z * c.Ad;
            b.Bb = a.width / this.f.Z * c.Qd;
            b.Cb = a.height / this.f.Z * c.Rd;
            b.gb = Math.min(Math.max(0, Math.floor(b.gb)), a.Ma - 1);
            b.vb = Math.min(Math.max(0, Math.floor(b.vb)), a.Fb - 1);
            b.Bb = Math.min(Math.max(0, Math.floor(b.Bb)), a.Ma - 1);
            b.Cb = Math.min(Math.max(0, Math.floor(b.Cb)), a.Fb - 1)
        };
        e.prototype.Wj = function(a) {
            a = Math.round(a);
            this.Eb = 0 < (a & 1);
            this.fd = 0 < (a & 2);
            this.gf = 0 < (a & 4);
            this.Oe = 0 < (a & 8);
            4096 <= a && (this.Hb = 0 < (a & 4096), this.ka = 0 < (a & 8192), this.$d = 0 < (a & 32768))
        };
        e.prototype.$i = function() {
            var a = 0;
            this.Eb && (a |= 1);
            this.fd && (a |= 2);
            this.gf && (a |= 4);
            this.Hb && (a |= 4096);
            this.ka && (a |= 8192);
            this.$d && (a |= 32768);
            return a
        };
        e.prototype.Wh = function() {
            var a;
            if (!(6 > this.Pa.Ja.length)) for (a = 0; 6 > a; a++) {
                var c;
                c = this.Pa.Ja[a];
                var b;
                b = [];
                b.push(new y(-1, -1, -1, 0, 0));
                b.push(new y(1, -1, -1, 1, 0));
                b.push(new y(1, 1, -1, 1, 1));
                b.push(new y(-1, 1, -1, 0, 1));
                for (var d = 0; 4 > d; d++) 4 > a ? b[d].wa(-Math.PI / 2 * a) : b[d].pa(Math.PI / 2 * (4 == a ? -1 : 1)), this.oa && (b[d].Ra(this.oa.G * Math.PI / 180), b[d].pa(-this.oa.pitch * Math.PI / 180)), b[d].wa(-this.pan.b * Math.PI / 180), b[d].pa(this.j.b * Math.PI / 180), b[d].Ra(this.G.b * Math.PI / 180);
                b = this.rf(b);
                c.Ab = 0 < b.length;
                if (c.Ab) {
                    c = c.bd;
                    c.zd = b[0].$b;
                    c.Qd = b[0].$b;
                    c.Ad = b[0].$a;
                    c.Rd = b[0].$a;
                    for (d = 1; d < b.length; d++) c.zd = Math.min(c.zd, b[d].$b), c.Qd = Math.max(c.Qd, b[d].$b), c.Ad = Math.min(c.Ad, b[d].$a), c.Rd = Math.max(c.Rd, b[d].$a);
                    c.pd = c.Qd - c.zd;
                    c.ce = c.Rd - c.Ad;
                    c.scale = Math.max(c.pd, c.ce)
                } else c.bd.pd = -1, c.bd.ce = -1
            }
        };
        e.prototype.ph = function() {
            for (var a = 0; a < this.f.L.length; a++) {
                var c = this.f.L[a],
                    b;
                for (b in c.$) c.$.hasOwnProperty(b) && (c.$[b].visible = !1)
            }
        };
        e.prototype.Ag = function() {
            for (var a = 0, c = Math.tan(this.Wb() * Math.PI / 360), b = this.l.height / (2 * c), b = b * (1 + this.l.width / this.l.height * c / 2), b = b * Math.pow(2, 1 < (window.devicePixelRatio || 1) ? this.f.nh : this.f.mh); this.f.L.length >= a + 2 && !this.f.L[a + 1].Tf && this.f.L[a + 1].width > b;) a++;
            return a
        };
        e.prototype.xk = function() {
            this.ab();
            var a = !1,
                c = !1,
                b, d, g, c = !1;
            this.yg++;
            if (this.l.width !== this.w.offsetWidth || this.l.height !== this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight, this.w.style[this.Aa + "OriginX"] = this.l.width / 2 + "px", this.w.style[this.Aa + "OriginY"] = this.l.height / 2 + "px", a = !0;
            var e = Math.round(this.bc());
            if (this.Nd != e || a) this.Nd = e, this.Eb || (this.w.style[this.dc] = e + "px", this.w.style[this.dc + "Origin"] = "50% 50%");
            this.Oc = 0;
            if (0 < this.f.L.length) {
                this.Wh();
                this.ph();
                var f;
                f = "";
                for (b = 0; 6 > b; b++) {
                    var k;
                    k = this.Pa.Ja[b];
                    k.Ab && (f = f + b + ",")
                }
                var l = this.Ag(),
                    q;
                for (q = this.f.L.length - 1; q >= l;) {
                    var a = this.f.L[q],
                        p = 1;
                    q == this.f.L.length - 1 && 0 == this.f.Va && (p = this.f.Z / (this.f.Z - 2));
                    for (b = 0; 6 > b; b++) {
                        k = this.Pa.Ja[b];
                        var m = k.bd;
                        if (k.Ab && 0 < m.pd && 0 < m.ce && 0 < m.scale || a.cache) {
                            k.Ca = !1;
                            var r;
                            r = {};
                            a.cache ? (r.gb = 0, r.vb = 0, r.Bb = a.Ma - 1, r.Cb = a.Fb - 1) : this.Qg(a, m, r);
                            for (g = r.vb; g <= r.Cb; g++) for (d = r.gb; d <= r.Bb; d++) {
                                f = d + g * a.Ma + b * a.Ma * a.Fb;
                                (m = a.$[f]) || (m = a.$[f] = {});
                                if (!m.A && this.ja < this.Ye) {
                                    if (0 < this.df.length) {
                                        m.A = this.df.shift();
                                        for (f = this.w.firstChild; f && f.wc && (-1 == f.wc || f.wc >= q);) f = f.nextSibling;
                                        this.w.insertBefore(m.A, f);
                                        m.da = m.A.Rg
                                    } else if (this.Ph < this.qh) {
                                        this.Ph++;
                                        m.A = document.createElement("canvas");
                                        m.A.width = this.f.Z + 2 * this.f.Va;
                                        m.A.height = this.f.Z + 2 * this.f.Va;
                                        m.da = m.A.getContext("2d");
                                        m.A.Rg = m.da;
                                        m.A.style[this.Aa + "Origin"] = "0% 0%";
                                        m.A.style.overflow = "hidden";
                                        m.A.style.position = "absolute";
                                        for (f = this.w.firstChild; f && f.wc && (-1 == f.wc || f.wc >= q);) f = f.nextSibling;
                                        this.w.insertBefore(m.A, f)
                                    }
                                    m.A && (m.f = new Image, m.f.crossOrigin = this.crossOrigin, m.f.style[this.Aa + "Origin"] = "0% 0%", m.f.style.position = "absolute", m.f.style.overflow = "hidden", m.A.wc = q, c && (m.A.id = "tile" + b + "_" + q + "___" + g + "_" + d), m.f.onload = this.kk(m), m.f.onerror = this.Ze(m), m.f.onabort = this.Ze(m), m.f.setAttribute("src", this.$e(b, q, d, g)), a.cache && this.bb.push(m.f), 0 == this.ja && this.D && this.D.ggReLoadedLevels && this.D.ggReLoadedLevels(), this.ja++, this.Ca = !0)
                                } else this.Oc++;
                                if (m.A) {
                                    f = "";
                                    this.Eb ? (f += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px,0px) ", f += " perspective(" + e + "px) ", f += "translate3d(0px,0px," + e + "px) ") : f += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px," + e + "px) ";
                                    f += "rotateZ(" + Number(this.G.b).toFixed(10) + "deg) rotateX(" + Number(this.j.b).toFixed(10) + "deg) rotateY(" + Number(-this.pan.b).toFixed(10) + "deg) ";
                                    this.oa && (f += "rotateX(" + Number(-this.oa.pitch).toFixed(10) + "deg) rotateZ(" + Number(this.oa.G).toFixed(10) + "deg) ");
                                    f = 4 > b ? f + ("rotateY(" + -90 * b + "deg)") : f + ("rotateX(" + (4 == b ? -90 : 90) + "deg)");
                                    var t = 1;
                                    this.fd ? (t = this.td / this.f.Z * (this.f.Z / a.width) * (2 * q + 1), t = this.Ic ? 2 / Math.tan(this.g.b * Math.PI / 360) * t : 2 * t, f += " scale(" + t * p * p + ")") : t = 1 / (p * p);
                                    f += " translate3d(" + (1 / p * d * this.f.Z - this.f.Va - a.width / 2) + "px," + (1 / p * g * this.f.Z - this.f.Va - a.width / 2) + "px," + -a.width * t / 2 + "px)";
                                    c && (m.A.id = "rtile_" + this.yg + "_" + b + "_" + q + "___" + g + "_" + d);
                                    k.Ab && (m.visible = !0, m.A ? m.A.style[this.Aa] = f : m.f && (m.f.style[this.Aa] = f))
                                }
                            }
                        }
                    }
                    q--
                }
                for (e = 0; e < this.f.L.length; e++) {
                    var a = this.f.L[e],
                        v;
                    for (v in a.$) a.$.hasOwnProperty(v) && (m = a.$[v], !m.visible && m.A && (a.cache ? (f = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", m.A ? (m.A.style[this.Aa] = f, c && (m.A.id = "cache")) : m.f && (m.f.style[this.Aa] = "")) : (m.da && (m.da.clear ? m.da.clear() : m.da.clearRect(0, 0, m.da.canvas.width, m.da.canvas.height)), this.df.push(m.A), m.A ? (c && (m.A.id = "unused"), f = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", m.A.style[this.Aa] = f, m.A.wc = -1) : m.loaded && this.w.removeChild(m.f), m.A = null, m.f = null, m.da = null, delete a.$[v])))
                }
                this.cc = !1
            }
        };
        e.prototype.Uh = function() {
            var a = Math.round(this.bc()),
                c;
            this.Eb || this.Th(a);
            for (c = 0; c < this.Ua.length; c++) {
                var b;
                b = this.Ua[c];
                b.Yh(a);
                b.c.hidden = !1
            }
        };
        e.prototype.Zh = function() {
            for (var a = Math.round(this.bc()), c = 0; c < this.J.length; c++) {
                var b;
                b = this.J[c];
                b.Yh(a);
                b.c.hidden = !1
            }
        };
        e.prototype.Ek = function() {
            for (var a = 0; a < this.J.length; a++) {
                var c = void 0,
                    c = this.J[a];
                c.Rc()
            }
            for (a = 0; a < this.Ua.length; a++) c = this.Ua[a], c.Rc()
        };
        e.prototype.xc = function(a) {
            this.te = !1;
            try {
                if (a ? this.Oa = a : this.Oa = document.createElement("canvas"), this.Oa.width = 100, this.Oa.height = 100, this.Oa.style.display = "none", this.Oa.style.Pk = "none", this.w.insertBefore(this.Oa, this.w.firstChild), this.a = this.Oa.getContext("webgl", {
                        premultipliedAlpha: !1,
                        stencil: !0
                    }), this.a || (this.a = this.Oa.getContext("experimental-webgl", {
                        premultipliedAlpha: !1,
                        stencil: !0
                    })), this.a) {
                    var c = this.a;
                    this.Ta.width = 500;
                    this.Ta.height = 500;
                    c.clearColor(0, 0, 0, 0);
                    c.enable(this.a.DEPTH_TEST);
                    c.viewport(0, 0, 500, 500);
                    c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                    this.Jd();
                    this.Xg(this.Wd);
                    this.Yg();
                    this.S && (this.S.Jd(), this.S.xc());
                    this.Ea && (this.Ea.Jd(), this.Ea.xc())
                }
            } catch (b) {}
            this.a ? this.ka = !0 : alert("Could not initialise WebGL!")
        };
        e.prototype.Jd = function() {
            var a = this.a.createShader(this.a.FRAGMENT_SHADER),
                c;
            c = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n";
            c += "void main(void) {\n";
            c += " gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n";
            c += "}\n";
            this.a.shaderSource(a, c);
            this.a.compileShader(a);
            this.a.getShaderParameter(a, this.a.COMPILE_STATUS) || (console && console.log(this.a.getShaderInfoLog(a)), alert(this.a.getShaderInfoLog(a)), a = null);
            var b = this.a.createShader(this.a.VERTEX_SHADER);
            c = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\n";
            c += "attribute vec2 aTextureCoord;\n";
            c += "uniform mat4 uMVMatrix;\n";
            c += "uniform mat4 uPMatrix;\n";
            c += "uniform float uZoffset;\n";
            c += "varying vec2 vTextureCoord;\n";
            c += "void main(void) {\n";
            c += " gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n";
            c += " gl_Position.z += uZoffset;\n";
            c += " vTextureCoord = aTextureCoord;\n";
            c += "}\n";
            this.a.shaderSource(b, c);
            this.a.compileShader(b);
            this.a.getShaderParameter(b, this.a.COMPILE_STATUS) || (console && console.log(this.a.getShaderInfoLog(a)), alert(this.a.getShaderInfoLog(b)), b = null);
            this.F = this.a.createProgram();
            this.a.attachShader(this.F, b);
            this.a.attachShader(this.F, a);
            this.a.linkProgram(this.F);
            this.a.getProgramParameter(this.F, this.a.LINK_STATUS) || alert("Could not initialise shaders");
            this.a.useProgram(this.F);
            this.F.ca = this.a.getAttribLocation(this.F, "aVertexPosition");
            this.a.enableVertexAttribArray(this.F.ca);
            this.F.Ga = this.a.getAttribLocation(this.F, "aTextureCoord");
            this.a.enableVertexAttribArray(this.F.Ga);
            this.F.Mc = this.a.getUniformLocation(this.F, "uPMatrix");
            this.F.He = this.a.getUniformLocation(this.F, "uMVMatrix");
            this.F.Pe = this.a.getUniformLocation(this.F, "uSampler");
            this.F.hi = this.a.getUniformLocation(this.F, "uZoffset");
            a = this.a.createShader(this.a.VERTEX_SHADER);
            c = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\n";
            c += "uniform vec2 uCanvasDimensions;\n";
            c += "void main(void) {\n";
            c += " vec2 pointNorm = (aVertexPosition.xy / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n";
            c += " gl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, 0.0, 1.0);\n";
            c += "}\n";
            this.a.shaderSource(a, c);
            this.a.compileShader(a);
            this.a.getShaderParameter(a, this.a.COMPILE_STATUS) || (alert(this.a.getShaderInfoLog(a)), a = null);
            b = this.a.createShader(this.a.FRAGMENT_SHADER);
            c = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec3 uColor;\n";
            c += "uniform float uAlpha;\n";
            c += "void main(void) {\n";
            c += " gl_FragColor = vec4(uColor, uAlpha);\n";
            c += "}\n";
            this.a.shaderSource(b, c);
            this.a.compileShader(b);
            this.a.getShaderParameter(b, this.a.COMPILE_STATUS) || (alert(this.a.getShaderInfoLog(b)), b = null);
            this.Db = this.a.createProgram();
            this.a.attachShader(this.Db, a);
            this.a.attachShader(this.Db, b);
            this.a.linkProgram(this.Db);
            this.a.getProgramParameter(this.Db, this.a.LINK_STATUS) || alert("Could not initialise shaders");
            this.Db.ca = this.a.getAttribLocation(this.Db, "aVertexPosition");
            this.a.enableVertexAttribArray(this.Db.ca)
        };
        e.prototype.Ef = function(a) {
            var c = this;
            return function() {
                try {
                    if (a.tj) return;
                    var b = c.a;
                    b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
                    var d = !1;
                    null != a.Fe && a.Fe.complete ? a.Ug || (b.bindTexture(b.TEXTURE_2D, a), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.Fe), d = a.Ug = !0) : null != a.Le && a.Le.complete && (b.bindTexture(b.TEXTURE_2D, a), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.Le), d = !0);
                    d && (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE), a.loaded = !0);
                    b.bindTexture(b.TEXTURE_2D, null)
                } catch (g) {}
                c.update()
            }
        };
        e.prototype.ub = function(a) {
            return a ? "{" == a.charAt(0) || "/" == a.charAt(0) || 0 < a.indexOf("://") || 0 == a.indexOf("javascript:") ? a : this.qc + a : this.qc
        };
        e.prototype.Cc = function(a, c, b) {
            var d = (new RegExp("%0*" + c, "i")).exec(a.toString());
            if (d) {
                var d = d.toString(),
                    g = b.toString();
                for (d.charAt(d.length - 1) != c && (g = (1 + b).toString()); g.length < d.length - 1;) g = "0" + g;
                a = a.replace(d, g)
            }
            return a
        };
        e.prototype.$e = function(a, c, b, d) {
            var g = this.f.kh - 1 - c,
                e = this.f.oh,
                f = "x";
            switch (a) {
                case 0:
                    f = "f";
                    break;
                case 1:
                    f = "r";
                    break;
                case 2:
                    f = "b";
                    break;
                case 3:
                    f = "l";
                    break;
                case 4:
                    f = "u";
                    break;
                case 5:
                    f = "d"
            }
            for (var k = 0; 3 > k; k++) e = this.Cc(e, "c", a), e = this.Cc(e, "s", f), e = this.Cc(e, "r", c), e = this.Cc(e, "l", g), e = this.Cc(e, "x", b), e = this.Cc(e, "y", d), e = this.Cc(e, "v", d), e = this.Cc(e, "h", b);
            return this.ub(e)
        };
        e.prototype.Yg = function() {
            var a, c;
            if (this.eb) for (; 0 < this.eb.length;) this.a.deleteTexture(this.eb.pop());
            this.eb = [];
            for (var b = 0; 6 > b; b++) c = this.a.createTexture(), c.Le = null, c.Fe = null, c.Ug = !1, this.a.bindTexture(this.a.TEXTURE_2D, c), this.a.texImage2D(this.a.TEXTURE_2D, 0, this.a.RGB, 1, 1, 0, this.a.RGB, this.a.UNSIGNED_BYTE, null), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE), this.Vc[b] && (a = new Image, a.crossOrigin = this.crossOrigin, a.src = this.ub(this.Vc[b]), c.Le = a, a.addEventListener && a.addEventListener("load", this.Ef(c), !1), this.bb.push(a)), this.eb.push(c);
            for (b = 0; 6 > b; b++) this.le[b] && (a = new Image, a.crossOrigin = this.crossOrigin, a.src = this.ub(this.le[b]), a.addEventListener ? a.addEventListener("load", this.Ef(this.eb[b]), !1) : a.onload = this.Ef(this.eb[b]), this.eb[b].Fe = a, this.bb.push(a));
            for (b = 0; b < this.J.length; b++) this.J[b].Gb = this.a.createTexture(), this.a.bindTexture(this.a.TEXTURE_2D, this.J[b].Gb), this.a.texImage2D(this.a.TEXTURE_2D, 0, this.a.RGB, 1, 1, 0, this.a.RGB, this.a.UNSIGNED_BYTE, null), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE);
            this.o.Gb = this.a.createTexture();
            this.a.bindTexture(this.a.TEXTURE_2D, this.o.Gb);
            this.a.texImage2D(this.a.TEXTURE_2D, 0, this.a.RGB, 1, 1, 0, this.a.RGB, this.a.UNSIGNED_BYTE, null);
            this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR);
            this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE);
            this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE);
            this.a.bindTexture(this.a.TEXTURE_2D, null)
        };
        e.prototype.Xg = function(a) {
            var c, b, d, g;
            this.sf = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, this.sf);
            var e = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
            for (c = 0; 12 > c; c++) 2 > c % 3 && (e[c] *= a);
            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(e), this.a.STATIC_DRAW);
            this.ne = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, this.ne);
            var f = [1, 0, 0, 0, 0, 1, 1, 1];
            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(f), this.a.STATIC_DRAW);
            this.me = this.a.createBuffer();
            this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.me);
            var k = [0, 1, 2, 0, 2, 3];
            this.a.bufferData(this.a.ELEMENT_ARRAY_BUFFER, new Uint16Array(k), this.a.STATIC_DRAW);
            var e = [],
                k = [],
                f = [],
                l = new y;
            for (a = 0; 6 > a; a++) {
                d = a % 3;
                g = 3 > a ? 1 : 0;
                for (b = 0; 4 > b; b++) {
                    l.x = -1;
                    l.y = -1;
                    l.z = 1;
                    for (c = 0; c < b; c++) l.Gh();
                    f.push((0 > l.x ? .33 : 0) + .33 * d, (0 > l.y ? 0 : .5) + .5 * g);
                    if (4 > a) for (c = 0; c < a; c++) l.Nj();
                    else 5 == a ? l.Mj() : l.Lj();
                    e.push(l.x, l.y, l.z)
                }
                c = 4 * a;
                k.push(0 + c, 1 + c, 2 + c, 0 + c, 2 + c, 3 + c)
            }
            this.o.hg = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.hg);
            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(e), this.a.STATIC_DRAW);
            this.o.Xe = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.Xe);
            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(f), this.a.STATIC_DRAW);
            this.o.Hf = this.a.createBuffer();
            this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.o.Hf);
            this.a.bufferData(this.a.ELEMENT_ARRAY_BUFFER, new Uint16Array(k), this.a.STATIC_DRAW);
            this.Fa = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, this.Fa);
            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]), this.a.STATIC_DRAW);
            this.Fa.Qb = 3;
            this.Fa.Ac = 4;
            this.ed = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, this.ed);
            f = [0, 0, 1, 0, 0, 1, 1, 1];
            this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(f), this.a.STATIC_DRAW)
        };
        e.prototype.ue = function() {
            return this.pan.b
        };
        e.prototype.Ti = function() {
            return this.K.pan
        };
        e.prototype.Ui = function() {
            for (var a = this.pan.b; - 180 > a;) a += 360;
            for (; 180 < a;) a -= 360;
            return a
        };
        e.prototype.ve = function() {
            for (var a = this.pan.b - this.pan.Of; - 180 > a;) a += 360;
            for (; 180 < a;) a -= 360;
            return a
        };
        e.prototype.Yf = function(a) {
            this.ia();
            isNaN(a) || (this.pan.b = Number(a));
            this.update()
        };
        e.prototype.Zf = function(a) {
            this.ia();
            isNaN(a) || (this.pan.b = Number(a) + this.pan.Of);
            this.update()
        };
        e.prototype.ie = function(a, c) {
            isNaN(a) || (this.Yf(this.ue() + a), c && (this.pan.d = a))
        };
        e.prototype.si = function(a, c) {
            this.ie(a * this.vc(), c)
        };
        e.prototype.we = function() {
            return this.j.b
        };
        e.prototype.bj = function() {
            return this.K.j
        };
        e.prototype.ag = function(a) {
            this.ia();
            isNaN(a) || (this.j.b = Number(a));
            this.update()
        };
        e.prototype.je = function(a, c) {
            this.ag(this.we() + a);
            c && (this.j.d = a)
        };
        e.prototype.ti = function(a, c) {
            this.je(a * this.vc(), c)
        };
        e.prototype.Xj = function(a) {
            this.ia();
            isNaN(a) || (this.G.b = Number(a));
            this.update()
        };
        e.prototype.aj = function() {
            return this.G.b
        };
        e.prototype.Bd = function() {
            return this.g.b
        };
        e.prototype.Hi = function() {
            return this.K.jd
        };
        e.prototype.Re = function(a) {
            this.ia();
            if (!isNaN(a) && 0 < a && 180 > a) {
                var c = this.g.b;
                this.g.b = Number(a);
                this.ab();
                c != this.g.b && this.update()
            }
        };
        e.prototype.og = function(a, c) {
            this.Re(this.Bd() + a);
            c && (this.g.d = a)
        };
        e.prototype.ud = function(a, c) {
            if (!isNaN(a)) {
                var b;
                b = a / 90 * Math.cos(Math.min(this.g.b, 90) * Math.PI / 360);
                b = this.g.b * Math.exp(b);
                this.Re(b);
                c && (this.g.d = a)
            }
        };
        e.prototype.Vj = function(a, c) {
            this.ia();
            isNaN(a) || (this.pan.b = a);
            isNaN(c) || (this.j.b = c);
            this.update()
        };
        e.prototype.$f = function(a, c, b) {
            this.ia();
            isNaN(a) || (this.pan.b = a);
            isNaN(c) || (this.j.b = c);
            !isNaN(b) && 0 < b && 180 > b && (this.g.b = b);
            this.update()
        };
        e.prototype.Qj = function() {
            this.$f(this.pan.fb, this.j.fb, this.g.fb)
        };
        e.prototype.Tj = function(a) {
            this.Te(a);
            this.Ih(a);
            this.Se(a)
        };
        e.prototype.Te = function(a) {
            this.C.Wa = a
        };
        e.prototype.Se = function(a) {
            this.C.Pd = a
        };
        e.prototype.Ih = function(a) {
            this.C.Mf = a
        };
        e.prototype.moveTo = function(a, c, b, d, g) {
            this.ia();
            if ("_blank" !== a && "" !== a) {
                this.K.active = !0;
                this.K.qd = !1;
                var e = a.toString().split("/");
                1 < e.length && (a = Number(e[0]), d = Number(c), c = Number(e[1]), 2 < e.length && (b = Number(e[2])));
                isNaN(a) ? this.K.pan = this.pan.b : this.K.pan = Number(a);
                isNaN(c) ? this.K.j = this.j.b : this.K.j = Number(c);
                !isNaN(b) && 0 < b && 180 > b ? this.K.g = Number(b) : this.K.g = this.g.b;
                this.K.speed = !isNaN(d) && 0 < d ? Number(d) : 1;
                isNaN(g) ? this.K.G = this.G.b : this.K.G = Number(g)
            }
        };
        e.prototype.pj = function(a) {
            this.moveTo(this.pan.fb, this.j.fb, this.g.fb, a)
        };
        e.prototype.ki = function(a, c, b, d) {
            var g = new Y(this);
            g.type = "point";
            g.pan = c;
            g.j = b;
            g.id = a;
            g.c = {};
            g.c.player = this;
            g.Wc();
            g.c.hotspot = g;
            g.c.__div = document.createElement("div");
            g.c.__div.appendChild(d);
            this.I.push(g);
            g.c.__div.style.position = "absolute";
            g.c.__div.style.left = "-1000px";
            g.c.__div.style.top = "-1000px";
            this.va.insertBefore(g.c.__div, this.va.firstChild);
            this.Ca = !0
        };
        e.prototype.vk = function(a, c, b) {
            for (var d = 0; d < this.I.length; d++) {
                var g = this.I[d];
                g.id == a && (g.pan = c, g.j = b, g.Wc())
            }
            this.Ca = !0
        };
        e.prototype.Hj = function(a) {
            for (var c = -1, b, d = 0; d < this.I.length; d++) b = this.I[d], b.id == a && (c = d); - 1 < c && (b = this.I.splice(c, 1).pop(), b.c && b.c.__div && this.va.removeChild(b.c.__div))
        };
        e.prototype.Wi = function() {
            for (var a = [], c = 0; c < this.I.length; c++) {
                var b = this.I[c];
                "point" == b.type && a.push(String(b.id))
            }
            return a
        };
        e.prototype.Ii = function(a) {
            for (var c = 0; c < this.I.length; c++) {
                var b = this.I[c];
                if (b.id == a) return c = {}, c.id = a, c.pan = b.pan, c.tilt = b.j, b.c && b.c.__div && (c.div = b.c.__div), c
            }
        };
        e.prototype.di = function(a, c) {
            this.O.start.x = a;
            this.O.start.y = c;
            this.O.W.x = a;
            this.O.W.y = c;
            this.B.W.x = a;
            this.B.W.y = c;
            this.Wf++
        };
        e.prototype.bi = function(a, c) {
            var b = this.Wb();
            this.pan.b += a * b / this.l.height;
            this.j.b += c * b / this.l.height;
            this.ab()
        };
        e.prototype.ci = function(a, c) {
            this.O.b.x = a;
            this.O.b.y = c;
            this.O.V.x = this.O.b.x - this.O.W.x;
            this.O.V.y = this.O.b.y - this.O.W.y;
            this.C.yc && (this.O.W.x = this.O.b.x, this.O.W.y = this.O.b.y, this.update())
        };
        e.prototype.ia = function() {
            this.u.active && (this.u.active = !1, this.pan.d = 0, this.j.d = 0, this.g.d = 0);
            this.K.active && (this.K.active = !1, this.pan.d = 0, this.j.d = 0, this.g.d = 0);
            this.rd = this.K.qd = !1;
            this.De = (new Date).getTime()
        };
        e.prototype.Oi = function() {
            return this.De
        };
        e.prototype.Og = function(a, c) {
            a || (a = this.ha.x, c = this.ha.y);
            var b = this.l.height / (2 * Math.tan(this.g.b * Math.PI / 360)),
                d = a - this.l.width / 2,
                g = c - this.l.height / 2,
                e = {};
            e.pan = 180 * Math.atan(d / b) / Math.PI;
            e.tilt = 180 * Math.atan(-g / Math.sqrt(d * d + b * b)) / Math.PI;
            return e
        };
        e.prototype.Yi = function(a, c) {
            var b, d;
            a || (a = this.ha.x, c = this.ha.y);
            if (2 === this.rb) d = this.g.b / this.l.height, b = -(a - this.l.width / 2) * d + this.pan.b, d = -(c - this.l.height / 2) * d + this.j.b;
            else {
                d = new y(0, 0, 1);
                b = this.Og(a, c);
                d.Xf(-b.tilt);
                d.Fh(b.pan);
                d.Xf(-this.j.b);
                d.Fh(-this.pan.b);
                d.Xf(-this.oa.pitch);
                d.Kj(this.oa.G);
                for (b = d.li() - 180; - 180 > b;) b += 360;
                d = d.mi()
            }
            var g = {};
            g.pan = b;
            g.tilt = d;
            return g
        };
        e.prototype.ic = function(a) {
            return a == this.control || a && a.ggType && ("container" == a.ggType || "cloner" == a.ggType || "timer" == a.ggType) ? !0 : !1
        };
        e.prototype.pf = function(a, c) {
            var b = this.bc(),
                d, g, e;
            for (d = 0; d < this.J.length + this.Ua.length; d++) {
                var f = void 0,
                    f = d < this.J.length ? this.J[d] : this.Ua[d - this.J.length];
                if (f.hb) return f
            }
            for (d = 0; d < this.J.length + this.Ua.length; d++) {
                var f = d < this.J.length ? this.J[d] : this.Ua[d - this.J.length],
                    k = [],
                    l = new y,
                    q, p, m;
                0 < f.g && (p = Math.tan(f.g / 2 * Math.PI / 180), m = 0 < f.Ob ? p * f.Xb / f.Ob : p, f.gc && 1 != f.gc && (m *= f.gc));
                for (q = 0; 4 > q; q++) {
                    switch (q) {
                        case 0:
                            l.Ka(-p, -m, -1);
                            break;
                        case 1:
                            l.Ka(p, -m, -1);
                            break;
                        case 2:
                            l.Ka(p, m, -1);
                            break;
                        case 3:
                            l.Ka(-p, m, -1)
                    }
                    l.pa(-f.j * Math.PI / 180);
                    l.wa(f.pan * Math.PI / 180);
                    l.wa(-this.pan.b * Math.PI / 180);
                    l.pa(this.j.b * Math.PI / 180);
                    l.Ra(this.G.b * Math.PI / 180);
                    k.push(l.clone())
                }
                k = this.rf(k);
                if (0 < k.length) {
                    for (q = 0; q < k.length; q++) l = k[q], .1 > l.z ? (e = -b / l.z, g = this.l.width / 2 + l.x * e, e = this.l.height / 2 + l.y * e) : e = g = 0, l.sb = g, l.Ya = e;
                    if (this.Vg(k, a, c)) return f
                }
            }
            return null
        };
        e.prototype.Be = function() {
            return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement && null != document.msFullscreenElement || document.fullScreen
        };
        e.prototype.oj = function(a) {
            this.Vh(a);
            if (this.Ub) this.Ub.onclick();
            this.rc = null;
            if (!this.C.Wa) {
                a = a ? a : window.event;
                if ((a.which || 0 == a.which || 1 == a.which) && this.ic(a.target)) {
                    var c;
                    (c = this.pf(this.ha.x, this.ha.y)) && c.Yb && (this.rc = c);
                    this.di(a.pageX, a.pageY);
                    this.N.Da = 1;
                    this.N.startTime = (new Date).getTime();
                    a.preventDefault();
                    this.ia()
                }
                this.O.V.x = 0;
                this.O.V.y = 0
            }
        };
        e.prototype.nd = function(a, c) {
            var b = this.v.eg;
            b.enabled && (this.ma != this.Qa && 0 <= a && 0 <= c && "" != this.ma.title ? (this.na.innerHTML = this.ma.title, this.na.style.color = this.X(b.fg, b.dg), b.background ? this.na.style.backgroundColor = this.X(b.mb, b.Mb) : this.na.style.backgroundColor = "transparent", this.na.style.border = "solid " + this.X(b.ob, b.Nb) + " " + b.nf + "px", this.na.style.borderRadius = b.mf + "px", this.na.style.textAlign = "center", 0 < b.width ? (this.na.style.left = a - b.width / 2 + this.margin.left + "px", this.na.style.width = b.width + "px") : (this.na.style.width = "auto", this.na.style.left = a - this.na.offsetWidth / 2 + this.margin.left + "px"), this.na.style.height = 0 < b.height ? b.height + "px" : "auto", this.na.style.top = c + 25 + +this.margin.top + "px", this.na.style.visibility = "inherit", this.na.style.overflow = "hidden") : (this.na.style.visibility = "hidden", this.na.innerHTML = ""))
        };
        e.prototype.Vh = function(a) {
            var c = this.Hc();
            this.Be() ? (this.ha.x = a.pageX - this.margin.left, this.ha.y = a.pageY - this.margin.top) : (this.ha.x = a.pageX - c.x, this.ha.y = a.pageY - c.y);
            return c
        };
        e.prototype.gd = function(a) {
            a && null !== a && "object" == typeof a ? this.ma = a : this.ma = this.Qa;
            this.ma.Wc && this.ma.Wc();
            this.hotspot = this.ma
        };
        e.prototype.nj = function(a) {
            a = a ? a : window.event;
            var c = this.Vh(a);
            if (!this.C.Wa) {
                0 <= this.N.Da && (a.preventDefault(), (a.which || 0 == a.which || 1 == a.which) && this.ci(a.pageX, a.pageY), this.ia());
                var b = !1;
                if (this.ma == this.Qa || "poly" == this.ma.type) {
                    var d = this.Qa;
                    0 < this.I.length && this.ic(a.target) && (d = this.qf(this.ha.x, this.ha.y));
                    this.Qe(d);
                    this.nd(a.pageX - c.x, a.pageY - c.y);
                    0 != d && (b = !0)
                }
                a = null;
                b || (a = this.pf(this.ha.x, this.ha.y));
                this.va.style.cursor = this.ma != this.Qa && this.ma.Yc && b || a && a.Hd ? "pointer" : "auto"
            }
        };
        e.prototype.Qe = function(a) {
            !1 === a && (a = this.Qa);
            this.ma != a && (this.ma != this.Qa && (0 < this.v.mode && (this.ma.Ha = 0), this.xa && this.xa.hotspotProxyOut && this.xa.hotspotProxyOut(this.ma.id)), a != this.Qa ? (this.gd(a), this.xa && this.xa.hotspotProxyOver && this.xa.hotspotProxyOver(this.ma.id), 0 < this.v.mode && (this.v.Ha = 1, this.ma.Ha = 1)) : (this.gd(this.Qa), 0 < this.v.mode && (this.v.Ha = 0)), this.Y && this.Y.changeCurrentHotspot(this.ma.id))
        };
        e.prototype.mj = function(a) {
            a = a ? a : window.event;
            this.Ee = -1;
            if (!this.C.Wa && 0 <= this.N.Da) {
                this.ia();
                a.preventDefault();
                this.N.Da = -3;
                this.O.V.x = 0;
                this.O.V.y = 0;
                a = (new Date).getTime();
                var c = -1,
                    c = Math.abs(this.O.start.x - this.O.W.x) + Math.abs(this.O.start.y - this.O.W.y);
                400 > a - this.N.startTime && 0 <= c && 20 > c && (this.rc && this.rc.Yb(), (c = this.qf(this.ha.x, this.ha.y)) && this.Sh(c), c = Math.abs(this.O.kc.x - this.O.W.x) + Math.abs(this.O.kc.y - this.O.W.y), 700 > a - this.Ld && 0 <= c && 20 > c ? (this.C.wf && this.cf(), this.Ld = 0) : this.Ld = a, this.O.kc.x = this.O.W.x, this.O.kc.y = this.O.W.y)
            }
        };
        e.prototype.rh = function(a) {
            if (!this.C.Mf && (a = a ? a : window.event, this.ic(a.target))) {
                var c = a.detail ? -1 * a.detail : a.wheelDelta / 40;
                this.C.Zg && (c = -c);
                a.axis && (-1 == this.Ee ? this.Ee = a.axis : this.Ee != a.axis && (c = 0));
                var b = 0 < c ? 1 : -1;
                0 != c && (this.ud(b * this.C.Mh, !0), this.update());
                a.preventDefault();
                this.ia()
            }
        };
        e.prototype.sk = function(a) {
            a || (a = window.event);
            var c = a.touches,
                b = this.Hc();
            this.ha.x = c[0].pageX - b.x;
            this.ha.y = c[0].pageY - b.y;
            this.kd = this.rc = null;
            this.se && (this.se = !1, this.Bg());
            if (!this.C.Wa) {
                if (0 > this.N.Da && c[0]) {
                    this.N.startTime = (new Date).getTime();
                    this.N.start.x = c[0].pageX;
                    this.N.start.y = c[0].pageY;
                    this.N.W.x = c[0].pageX;
                    this.N.W.y = c[0].pageY;
                    this.tb = c[0].target;
                    if (this.ic(a.target)) {
                        var d;
                        (d = this.pf(this.ha.x, this.ha.y)) && d.Yb && (this.rc = d);
                        if (d = this.qf(this.ha.x, this.ha.y)) this.kd = d, this.Qe(d), d = this.Cd(a), this.nd(d.x - b.x, d.y - b.y);
                        this.di(c[0].pageX, c[0].pageY);
                        this.N.Da = c[0].identifier;
                        a.preventDefault();
                        this.ia()
                    }
                    if (this.tb) {
                        b = this.tb;
                        for (d = !1; b && b != this.control;) {
                            if (b.onmouseover) b.onmouseover();
                            b.onmousedown && !d && (b.onmousedown(), d = !0);
                            b = b.parentNode
                        }
                        d && a.preventDefault()
                    }
                }
                1 < c.length && (this.N.Da = -5);
                !this.Ff && 2 == c.length && c[0] && c[1] && (a = c[0].pageX - c[1].pageX, c = c[0].pageY - c[1].pageY, this.g.Nh = Math.sqrt(a * a + c * c), this.g.dd = this.g.b);
                this.O.V.x = 0;
                this.O.V.y = 0
            }
        };
        e.prototype.Bg = function() {
            for (var a = 0; a < this.R.length; a++) {
                var c = this.R[a];
                !this.zc(c.id) && 0 <= c.loop && c.autoplay && this.cd(c.id, c.loop)
            }
            for (a = 0; a < this.J.length; a++) c = this.J[a], this.zc(c.id) || !c.autoplay || this.Jf || this.cd(c.id, c.loop)
        };
        e.prototype.rk = function(a) {
            a || (a = window.event);
            var c = a.touches,
                b = this.Hc();
            this.ha.x = c[0].pageX - b.x;
            this.ha.y = c[0].pageY - b.y;
            if (!this.C.Wa) {
                c[0] && (this.N.W.x = c[0].pageX, this.N.W.y = c[0].pageY);
                if (0 <= this.N.Da) {
                    a.preventDefault();
                    for (var d = 0; d < c.length; d++) if (c[d].identifier == this.N.Da) {
                        this.ci(c[d].pageX, c[d].pageY);
                        break
                    }
                    this.kd && (d = this.Cd(a), this.nd(d.x - b.x, d.y - b.y));
                    this.ia()
                }
                2 == c.length && c[0] && c[1] && (this.N.Da = -6, this.Ff || (b = c[0].pageX - c[1].pageX, c = c[0].pageY - c[1].pageY, this.g.ug = Math.sqrt(b * b + c * c), this.B.g.active = !0, this.B.g.Ia = this.g.dd * Math.sqrt(this.g.Nh / this.g.ug), this.B.g.Ia > this.g.max && (this.B.g.Ia = this.g.max), this.B.g.Ia < this.g.min && (this.B.g.Ia = this.g.min), this.ia(), a.preventDefault()))
            }
        };
        e.prototype.qk = function(a) {
            var c, b = this.Hc(),
                d = !1;
            this.se && (this.se = !1, this.Bg());
            if (!this.C.Wa) {
                0 <= this.N.Da && this.ia();
                var g = (new Date).getTime(),
                    e;
                c = Math.abs(this.N.start.x - this.N.W.x) + Math.abs(this.N.start.y - this.N.W.y);
                if (0 <= c && 20 > c) {
                    a.preventDefault();
                    d = !0;
                    this.ic(this.tb) && this.rc && this.rc.Yb();
                    if (this.tb) for (c = this.tb, e = !1; c && c != this.control;) c.onclick && !e && (c.onclick(), e = !0, d = !1), c = c.parentNode;
                    c = Math.abs(this.N.kc.x - this.N.W.x) + Math.abs(this.N.kc.y - this.N.W.y);
                    if (700 > g - this.Ld && 0 <= c && 20 > c) {
                        a.preventDefault();
                        if (this.ic(this.tb) && this.C.wf) {
                            var f = this;
                            setTimeout(function() {
                                f.cf()
                            }, 1)
                        }
                        if (this.tb) for (c = this.tb, e = !1; c && c != this.control;) c.ondblclick && !e && (c.ondblclick(), e = !0, d = !1), c = c.parentNode;
                        this.Ld = 0
                    } else this.Ld = g;
                    this.N.kc.x = this.N.W.x;
                    this.N.kc.y = this.N.W.y
                }
                if (this.tb) for (a.preventDefault(), c = this.tb, e = !1; c && c != this.control;) {
                    if (c.onmouseout) c.onmouseout();
                    c.onmouseup && !e && (c.onmouseup(), e = !0);
                    c = c.parentNode
                }
                this.tb = null;
                this.N.Da = -11;
                this.Qe(this.Qa);
                a = this.Cd(a);
                this.nd(a.x - b.x, a.y - b.y);
                this.kd && d && this.Sh(this.kd);
                this.kd = null
            }
        };
        e.prototype.pk = function(a) {
            var c = this.Hc();
            this.C.Wa || (this.N.Da = -2);
            this.kd = null;
            this.Qe(this.Qa);
            a = this.Cd(a);
            this.nd(a.x - c.x, a.y - c.y)
        };
        e.prototype.ij = function() {
            return null != this.tb || 0 <= this.N.Da
        };
        e.prototype.th = function(a) {
            !this.Kc && window.MSGesture && (this.Kc = new MSGesture, this.Kc.target = this.control);
            this.Kc && this.Kc.addPointer(a.pointerId)
        };
        e.prototype.Jg = function(a) {
            this.Ff = !0;
            this.Ge = 1;
            this.C.Wa || (a.touches ? (this.tb = a.touches.target, this.ic(a.target) && (a.preventDefault(), this.g.dd = this.g.b, this.ia())) : (a.preventDefault(), this.g.dd = this.g.b, this.ia()))
        };
        e.prototype.Ei = function(a) {
            !this.C.Wa && this.ic(a.target) && (a.preventDefault(), this.B.g.active = !0, this.B.g.Ia = this.g.dd / Math.sqrt(a.scale), this.B.g.Ia > this.g.max && (this.B.g.Ia = this.g.max), this.B.g.Ia < this.g.min && (this.B.g.Ia = this.g.min), this.update(), this.ia())
        };
        e.prototype.qj = function(a) {
            this.C.Wa || (a.preventDefault(), 1 != a.scale && (this.B.g.active = !0, this.Ge *= a.scale, this.B.g.Ia = this.g.dd / Math.sqrt(this.Ge), this.B.g.Ia > this.g.max && (this.B.g.Ia = this.g.max), this.B.g.Ia < this.g.min && (this.B.g.Ia = this.g.min), this.update(), this.ia()))
        };
        e.prototype.Ig = function(a) {
            this.C.Wa || (this.B.g.active = !1, a.preventDefault(), this.ia(), this.Kc && this.Kc.reset && this.Kc.reset())
        };
        e.prototype.jj = function(a) {
            this.C.Pd || (this.isFullscreen && a.preventDefault(), this.Jc = a.keyCode, this.ia())
        };
        e.prototype.kj = function(a) {
            this.Jc && (this.Jc = 0, a.preventDefault(), this.ia())
        };
        e.prototype.vj = function() {
            this.Jc = 0
        };
        e.prototype.Je = function() {
            this.isFullscreen && (this.Be() || this.exitFullscreen(), this.Be() && (this.M.style.left = "0px", this.M.style.top = "0px"))
        };
        e.prototype.Sh = function(a) {
            this.xa && this.xa.hotspotProxyClick && this.xa.hotspotProxyClick(a.id);
            "" != a.url && (this.Pf(a.url, a.target), this.nd(-1, -1))
        };
        e.prototype.vc = function() {
            return Math.min(1, 2 * Math.tan(Math.PI * this.g.b / 360))
        };
        e.prototype.wh = function() {
            var a = this;
            setTimeout(function() {
                a.wh()
            }, 100);
            9 != a.Ne || a.$g || requestAnimationFrame(function() {
                a.ad("restart recover timer")
            });
            10 < a.Ne && 1 < a.Wf && (a.ad("recover timer - disabling requestAnimationFrame"), a.$g = !0, a.Qf());
            a.Ne++
        };
        e.prototype.zk = function() {
            var a = this.a;
            if (0 < this.J.length) for (var c = 0; c < this.J.length; c++) {
                var b = this.J[c];
                if (b.eh && b.xe != b.c.currentTime && (b.xe = b.c.currentTime, !b.lg && 0 < b.c.videoHeight && (b.lg = b.c.videoWidth / b.c.videoHeight), this.ae)) try {
                    b.Gb && (a.bindTexture(a.TEXTURE_2D, b.Gb), a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, b.c), this.update())
                } catch (d) {}
            }
            if (this.o.c && this.o.xe != this.o.c.currentTime) {
                this.o.xe = this.o.c.currentTime;
                try {
                    this.o.Gb && this.o.Ce && 0 < this.o.c.readyState && (this.o.$c = !0, a.bindTexture(a.TEXTURE_2D, this.o.Gb), a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, 0), a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, this.o.c), this.update())
                } catch (d) {}
            }
        };
        e.prototype.Aj = function(a) {
            var c;
            if (this.K.active) {
                this.pan.d = this.K.pan - this.pan.b;
                if (360 == this.pan.max - this.pan.min) {
                    for (; - 180 > this.pan.d;) this.pan.d += 360;
                    for (; 180 < this.pan.d;) this.pan.d -= 360
                }
                this.j.d = this.K.j - this.j.b;
                this.G.d = this.K.G - this.G.b;
                this.g.d = this.K.g - this.g.b;
                var b = this.K.speed * this.vc(),
                    d = Math.sqrt(this.pan.d * this.pan.d + this.j.d * this.j.d + this.G.d * this.G.d + this.g.d * this.g.d);
                c = this.pan.b - this.K.hh;
                var e = this.j.b - this.K.jh,
                    n = this.G.b - this.K.ih,
                    f = this.g.b - this.K.gh;
                100 * Math.sqrt(c * c + e * e + n * n + f * f) < b && (this.K.qd = !0);
                this.K.hh = this.pan.b;
                this.K.jh = this.j.b;
                this.K.ih = this.G.b;
                this.K.gh = this.g.b;
                if (100 * d < b || this.K.qd) {
                    if (this.K.active = !1, this.pan.d = 0, this.j.d = 0, this.G.d = 0, this.g.d = 0, this.pan.b = this.K.pan, this.j.b = this.K.j, this.G.b = this.K.G, this.g.b = this.K.g, this.onMoveComplete) this.onMoveComplete()
                } else d = d > 5 * b ? b / d : .2, this.pan.d *= d, this.j.d *= d, this.g.d *= d;
                this.pan.b += this.pan.d;
                this.j.b += this.j.d;
                this.G.b += this.G.d;
                this.g.b += this.g.d;
                this.De = a.getTime();
                this.update()
            } else if (this.u.active) if (d = a.getTime() - this.u.startTime, this.u.ai && 0 < this.sc.length) {
                d /= 100;
                e = !1;
                if (this.lc != this.T.cliptitle) {
                    for (c = 0; c < this.sc.length; c++) if ("" == this.lc || "" != this.lc && this.sc[c].cliptitle == this.lc) {
                        e = !0;
                        this.T = this.sc[c];
                        this.lc = this.T.cliptitle;
                        break
                    }!e && 0 < this.sc.length && (e = !0, this.T = this.sc[0], this.lc = this.T.cliptitle)
                } else e = !0;
                if (e) if (this.rd) if (d >= this.T.length) if (this.rd = !1, this.lc = this.T.nextcliptitle, this.lc == this.T.cliptitle) {
                    if (1 < this.sa.length && 0 < this.u.Ie) {
                        if (this.u.Nf) {
                            c = 1E3;
                            do b = this.sa[Math.floor(Math.random() * this.sa.length)];
                            while (c-- && b == this.currentNode)
                        } else b = this.Ng();
                        this.Lc("{" + b + "}");
                        this.u.startTime = a.getTime();
                        this.rd = !1;
                        this.u.active = !0;
                        this.S.sd = !0
                    }
                } else this.Kd && this.T.nextclipnodeid != this.currentNode && (this.Lc("{" + this.T.nextclipnodeid + "}"), this.S.enabled ? (this.u.active = !1, this.S.sd = !0) : this.u.active = !0), this.u.startTime = a.getTime();
                else {
                    a = {
                        Kk: {
                            value: 0,
                            name: "pan"
                        },
                        Lk: {
                            value: 1,
                            name: "tilt"
                        },
                        Jk: {
                            value: 2,
                            name: "fov"
                        }
                    };
                    for (b in a) {
                        c = a[b];
                        e = 0;
                        for (e = Math.floor(d); !this.Lg(e, c.value) && 0 < e;) e--;
                        var f = this.Lg(e, c.value),
                            k = this.Pi(f);
                        if (k) {
                            var e = new h(f.time, f.value),
                                n = new h(k.time, k.value),
                                l = (d - f.time) / (k.time - f.time);
                            if (0 != f.type || 0 != k.type && 3 != k.type) if (3 == f.type) e = f.value;
                            else {
                                var l = new h,
                                    q = new h,
                                    p = k.time - f.time;
                                0 == f.type ? q.Ka(f.time + .3 * p, f.value) : q.Ka(f.bezierouttime, f.bezieroutvalue);
                                0 == k.type || 3 == k.type ? l.Ka(k.time - .3 * p, k.value) : l.Ka(k.bezierintime, k.bezierinvalue);
                                f = new h;
                                f.ri(e, n, q, l, d);
                                e = f.y
                            } else f = new h, f.hc(e, n, l), e = f.y
                        } else e = f.value;
                        switch (c.value) {
                            case 0:
                                c = this.pan.b;
                                this.pan.b = e;
                                this.pan.d = this.pan.b - c;
                                break;
                            case 1:
                                c = this.j.b;
                                this.j.b = e;
                                this.j.d = this.j.b - c;
                                break;
                            case 2:
                                c = this.g.b, this.g.b = e, this.g.d = this.g.b - c
                        }
                    }
                    this.update()
                } else b = this.T.keyframes[0], d = this.T.keyframes[1], c = this.T.keyframes[2], this.K.qd || this.ue() == b.value && this.we() == d.value && this.Bd() == c.value ? (this.rd = !0, this.u.startTime = a.getTime()) : (this.moveTo(b.value, d.value, c.value, 1), this.u.active = !0)
            } else if (0 < this.u.Ie && this.Kd && d >= 1E3 * this.u.Ie) {
                if (1 < this.sa.length) {
                    if (this.u.Nf) {
                        c = 1E3;
                        do b = this.sa[Math.floor(Math.random() * this.sa.length)];
                        while (c-- && b == this.currentNode)
                    } else c = this.sa.indexOf(this.currentNode), c++, c >= this.sa.length && (c = 0), b = this.sa[c];
                    this.u.startTime = a.getTime();
                    this.u.jc = a.getTime();
                    this.u.timeout = 0;
                    this.Lc("{" + b + "}");
                    this.u.active = !0;
                    this.S.sd = !0
                }
            } else b = a.getTime(), a = d = 1E3 / 60, 0 != this.u.jc && (a = b - this.u.jc), this.j.d = this.u.af * (0 - this.j.b) / 100, this.g.d = this.u.af * (this.g.fb - this.g.b) / 100, this.pan.d = .95 * this.pan.d + -this.u.speed * this.vc() * .05, d = a / d, this.pan.b += this.pan.d * d, this.j.b += this.j.d * d, this.g.b += this.g.d * d, this.u.jc = b, this.update();
            else this.u.enabled && 0 > this.N.Da && a.getTime() - this.De > 1E3 * this.u.timeout && (this.u.Vd && this.isLoaded || !this.u.Vd) && (this.u.active = !0, this.u.startTime = a.getTime(), this.u.jc = 0, this.pan.d = 0, this.j.d = 0, this.g.d = 0), this.B.enabled && 0 == this.Jc && 0 > this.N.Da && (0 != this.pan.d || 0 != this.j.d || 0 != this.g.d) && (this.pan.d *= .9, this.j.d *= .9, this.g.d *= .9, this.pan.b += this.pan.d, this.j.b += this.j.d, this.ud(this.g.d), 1E-4 > this.pan.d * this.pan.d + this.j.d * this.j.d + this.g.d * this.g.d && (this.pan.d = 0, this.j.d = 0, this.g.d = 0), this.update())
        };
        e.prototype.Bj = function(a) {
            var c = this.S;
            if (c.Ec) {
                var b = a.getTime() - c.gi,
                    b = b / (1E3 * c.fi);
                if (1 <= b) {
                    c.Ec = !1;
                    for (b = 0; b < this.ra.Yd.length; b++) this.ra.zf(this.ra.Yd[b]);
                    c.cg = a.getTime();
                    this.Oh();
                    c.ld = !0;
                    1 != c.Kb && 2 != c.Kb && 3 != c.Kb || c.lf || this.moveTo(c.Ve, c.We, c.jd, c.fe)
                } else c.vh(b)
            } else c.ld && (b = a.getTime() - c.cg, b /= 1E3 * c.mg, 1 <= b ? (c.ld = !1, this.De = a.getTime(), this.update(), 1 != c.Kb && 2 != c.Kb && 3 != c.Kb || !c.lf || this.moveTo(c.Ve, c.We, c.jd, c.fe), this.Te(c.sh), this.Se(c.fh), this.u.active = c.sd, this.u.jc = 0, c.sd = !1) : c.vh(b));
            c = this.wj;
            c.oi && (c.oe ? a.getTime() - c.xf >= 1E3 * c.zi && (c.oe = !1) : (c.current += c.Tb, 0 > c.current && (c.current = 0, c.Tb = -c.Tb, c.oe = !0, c.xf = a.getTime()), 1 < c.current && (c.current = 1, c.Tb = -c.Tb, c.oe = !0, c.xf = a.getTime())))
        };
        e.prototype.Fj = function() {
            var a;
            if (2 == this.v.mode) for (a = 0; a < this.I.length; a++) {
                var c = this.I[a];
                "poly" == c.type && c.Ha != c.ea && (c.Ha > c.ea ? (c.ea += this.v.Tb, c.Ha < c.ea && (c.ea = c.Ha)) : (c.ea -= this.v.Tb, c.Ha > c.ea && (c.ea = c.Ha)), this.update())
            }
            3 == this.v.mode && this.v.Ha != this.v.ea && (this.v.Ha > this.v.ea ? (this.v.ea += this.v.Tb, this.v.Ha < this.v.ea && (this.v.ea = this.v.Ha)) : (this.v.ea -= this.v.Tb, this.v.Ha > this.v.ea && (this.v.ea = this.v.Ha)), this.update())
        };
        e.prototype.Cj = function() {
            0 <= this.N.Da && (this.C.yc ? (this.B.V.x = .4 * (this.O.W.x - this.B.W.x), this.B.V.y = .4 * (this.O.W.y - this.B.W.y), this.B.W.x += this.B.V.x, this.B.W.y += this.B.V.y) : (this.B.V.x = .1 * -this.O.V.x * this.C.sensitivity / 8, this.B.V.y = .1 * -this.O.V.y * this.C.sensitivity / 8), this.bi(this.B.V.x, this.B.V.y), this.update());
            this.B.g.active && (this.og(.4 * (this.B.g.Ia - this.g.b)), .001 > Math.abs(this.B.g.Ia - this.g.b) / this.g.b && (this.B.g.active = !1), this.update());
            this.B.enabled && (0 != this.B.V.x || 0 != this.B.V.y) && 0 > this.N.Da && (this.B.V.x = .9 * this.B.V.x, this.B.V.y = .9 * this.B.V.y, .1 > this.B.V.x * this.B.V.x + this.B.V.y * this.B.V.y ? (this.B.V.x = 0, this.B.V.y = 0) : (this.bi(this.B.V.x, this.B.V.y), this.update()))
        };
        e.prototype.Dj = function() {
            if (0 != this.Jc) {
                var a = this.C.sensitivity / 8;
                switch (this.Jc) {
                    case 37:
                    case 65:
                        this.ie(a * this.vc(), !0);
                        break;
                    case 38:
                    case 87:
                        this.je(a * this.vc(), !0);
                        break;
                    case 39:
                    case 68:
                        this.ie(-a * this.vc(), !0);
                        break;
                    case 40:
                    case 83:
                        this.je(-a * this.vc(), !0);
                        break;
                    case 43:
                    case 107:
                    case 16:
                    case 81:
                        this.C.Lf || this.ud(-a, !0);
                        break;
                    case 17:
                    case 18:
                    case 109:
                    case 45:
                    case 91:
                    case 69:
                        this.C.Lf || this.ud(a, !0)
                }
                this.update()
            }
        };
        e.prototype.Ej = function() {
            if (!this.isLoaded && this.Id && 5 < this.f.Dh) {
                var a, c = 0,
                    b = this.bb.length;
                if (this.$d) b = 50, this.yf < b && this.yf++, c = this.yf;
                else for (a = 0; a < b; a++)(this.bb[a].complete && this.bb[a].src != this.xg || "" == this.bb[a].src) && c++;
                c == b ? (this.Ke = 1, this.isLoaded = !0, this.D && this.D.ggLoaded && this.D.ggLoaded(), this.u.Vd && this.u.enabled && !this.K.active && !this.S.Ec && (this.u.active = !0, this.u.jc = 0)) : this.Ke = c / (1 * b)
            }
        };
        e.prototype.Qf = function() {
            var a = new Date;
            this.Sa && "" !== this.Gc && !this.Y && document.hasOwnProperty(this.Gc) && document[this.Gc].setPan && 0 == this.Di-- && (this.Y = document[this.Gc], this.Hb = this.ka = !1, this.la && (this.la.style.visibility = "hidden"), this.Y.setLocked(!0), this.Y.setSlaveMode(!0), this.Y.readConfigString(this.uf), this.ad("Flash player '" + this.Gc + "' connected."));
            this.Cf++;
            120 <= this.Cf && (this.Cf = 0);
            this.Wf = this.Ne = 0;
            this.gg && (this.Sc(), this.gg = !1);
            this.Cj();
            this.Dj();
            for (this.Ej(); 360 < this.pan.b;) this.pan.b -= 360;
            for (; - 360 > this.pan.b;) this.pan.b += 360;
            this.Aj(a);
            this.Bj(a);
            this.zk();
            0 < this.v.mode && this.Fj();
            this.ff();
            this.Ca && (0 < this.pe ? this.pe-- : (this.Ca = !1, this.pe = 0), this.S.ld || this.S.Ec || this.Zd());
            var c = this;
            setTimeout(function() {
                c.Qf()
            }, 1E3 / 60)
        };
        e.prototype.Xh = function() {
            var a = this;
            setTimeout(function() {
                a.hd(!1)
            }, 10);
            setTimeout(function() {
                a.hd(!1)
            }, 100)
        };
        e.prototype.ff = function() {
            this.tf.Cg(this.pan.b, this.j.b);
            for (var a = 0; a < this.R.length + this.J.length; a++)(a < this.R.length ? this.R[a] : this.J[a - this.R.length]).ff()
        };
        e.prototype.vg = function(a) {
            var c = "",
                b, d, e = 0,
                n, f = 0,
                k = 0;
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), b = b << 2 | d >> 4, d = (d & 15) << 4 | n >> 2, e = (n & 3) << 6 | f, c += String.fromCharCode(b), 64 != n && (c += String.fromCharCode(d)), 64 != f && (c += String.fromCharCode(e));
            while (k < a.length);
            return c
        };
        e.prototype.bk = function(a, c) {
            var b, d, e = this;
            if (0 != e.Sd.length || !e.C.ze || e.C.ke) if (e.Ub) e.Ub = null, e.M.removeChild(e.Ub);
            else {
                e.Ub = document.createElement("div");
                var n = e.Ub;
                b = "left: " + a + "px;" + ("top:\t " + c + "px;");
                b += "z-index: 32000;";
                b += "position:relative;";
                b += "display: table;";
                b += "background-color: white;";
                b += "border: 1px solid lightgray;";
                b += "box-shadow: 1px 1px 3px #333;";
                b += "font-family: Verdana, Arial, Helvetica, sans-serif;";
                b += "font-size: 9pt;";
                b += "opacity : 0.95;";
                n.setAttribute("style", b);
                n.setAttribute("class", "gg_contextmenu");
                b = document.createElement("style");
                d = document.createTextNode(".gg_context_row:hover { background-color: #3399FF }");
                b.type = "text/css";
                b.styleSheet ? b.styleSheet.cssText = d.nodeValue : b.appendChild(d);
                n.appendChild(b);
                for (d = 0; d < e.Sd.length; d++) {
                    var f = e.Sd[d],
                        k = document.createElement("div");
                    b = "text-align: left;";
                    b += "margin: 0;";
                    b += "padding: 5px 20px;";
                    b += "vertical-align: left;";
                    k.setAttribute("style", b);
                    k.setAttribute("class", "gg_context_row");
                    b = document.createElement("a");
                    b.href = f.url;
                    b.target = "_blank";
                    b.innerHTML = f.text;
                    b.setAttribute("style", "color: black; text-decoration: none;");
                    k.appendChild(b);
                    n.appendChild(k)
                }
                0 < e.Sd.length && (!e.C.ze || e.C.ke) && n.appendChild(document.createElement("hr"));
                e.C.ke && (d = document.createElement("div"), d.setAttribute("class", "gg_context_row"), b = "text-align: left;margin: 0;", b += "padding: 5px 20px;", b += "vertical-align: left;", b += "cursor: pointer;", d.setAttribute("style", b), d.onclick = function() {
                    e.cf()
                }, d.innerHTML = e.Be() ? "Exit Fullscreen" : "Enter Fullscreen", n.appendChild(d));
                e.C.ze || (d = document.createElement("div"), b = "text-align: left;margin: 0;", b += "padding: 5px 20px;", b += "vertical-align: left;", d.setAttribute("style", b), d.setAttribute("class", "gg_context_row"), b = document.createElement("a"), b.href = e.vg("aHR0cDovL3Bhbm8ydnIuY29tLw=="), b.target = "_blank", b.innerHTML = e.vg("Q3JlYXRlZCB3aXRoIFBhbm8yVlI="), b.setAttribute("style", "color: black; text-decoration: none;"), d.appendChild(b), n.appendChild(d));
                e.M.insertBefore(e.Ub, e.M.firstChild);
                n.onclick = function() {
                    e.Ub && (e.M.removeChild(e.Ub), e.Ub = null)
                };
                n.oncontextmenu = n.onclick
            }
        };
        e.prototype.ni = function() {
            var a = this,
                c;
            c = a.va;
            a.control = c;
            a.control = c;
            a.Xh();
            setTimeout(function() {
                a.Qf()
            }, 10);
            setTimeout(function() {
                a.wh()
            }, 200);
            setTimeout(function() {
                a.Rc();
                a.Zd()
            }, 10);
            c.addEventListener && (c.addEventListener("touchstart", function(b) {
                a.sk(b)
            }, !1), c.addEventListener("touchmove", function(b) {
                a.rk(b)
            }, !1), c.addEventListener("touchend", function(b) {
                a.qk(b)
            }, !1), c.addEventListener("touchcancel", function(b) {
                a.pk(b)
            }, !1), c.addEventListener("pointerdown", function(b) {
                a.th(b)
            }, !1), c.addEventListener("MSPointerDown", function(b) {
                a.th(b)
            }, !1), c.addEventListener("MSGestureStart", function(b) {
                a.Jg(b)
            }, !1), c.addEventListener("MSGestureEnd", function(b) {
                a.Ig(b)
            }, !1), c.addEventListener("MSGestureChange", function(b) {
                a.qj(b)
            }, !1), c.addEventListener("gesturestart", function(b) {
                a.Jg(b)
            }, !1), c.addEventListener("gesturechange", function(b) {
                a.Ei(b)
            }, !1), c.addEventListener("gestureend", function(b) {
                a.Ig(b)
            }, !1), c.addEventListener("mousedown", function(b) {
                a.oj(b)
            }, !1), c.addEventListener("mousemove", function(b) {
                a.nj(b)
            }, !1), document.addEventListener("mouseup", function(b) {
                a.mj(b)
            }, !1), c.addEventListener("mousewheel", function(b) {
                a.rh(b)
            }, !1), c.addEventListener("DOMMouseScroll", function(b) {
                a.rh(b)
            }, !1), document.addEventListener("keydown", function(b) {
                a.jj(b)
            }, !1), document.addEventListener("keyup", function(b) {
                a.kj(b)
            }, !1), window.addEventListener("orientationchange", function() {
                a.Xh()
            }, !1), window.addEventListener("resize", function() {
                a.Rc()
            }, !1), window.addEventListener("blur", function() {
                a.vj()
            }, !1), a.M.addEventListener("webkitfullscreenchange", function() {
                a.Je()
            }, !1), document.addEventListener("mozfullscreenchange", function() {
                a.Je()
            }, !1), window.addEventListener("webkitfullscreenchange", function() {
                a.Je()
            }, !1), document.addEventListener("MSFullscreenChange", function() {
                a.Je()
            }, !1));
            c.oncontextmenu = function(b) {
                void 0 === b && (b = window.event);
                if (b.target && !a.ic(b.target)) return !0;
                if (!b.ctrlKey) {
                    b = a.Cd(b);
                    var c = a.Hc();
                    a.bk(b.x - c.x, b.y - c.y);
                    return !1
                }
                return !0
            }
        };
        e.prototype.jg = function() {
            for (var a = 0; a < this.I.length; a++) if ("point" == this.I[a].type && (this.xa && this.xa.addSkinHotspot ? (this.I[a].Wc(), this.I[a].c = new this.xa.addSkinHotspot(this.I[a])) : this.I[a].c = new M(this, this.I[a]), this.I[a].c.__div.style.left = "-1000px", this.I[a].c.__div.style.top = "-1000px", this.I[a].c && this.I[a].c.__div)) {
                var c = this.va.firstChild;
                c ? this.va.insertBefore(this.I[a].c.__div, c) : this.va.appendChild(this.I[a].c.__div)
            }
        };
        e.prototype.ei = function() {
            var a, c = document.createElement("fakeelement"),
                b = {
                    OTransition: "oTransitionEnd",
                    MSTransition: "msTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    transition: "transitionEnd"
                };
            for (a in b) if (void 0 !== c.style[a]) return b[a]
        };
        e.prototype.uc = function(a) {
            var c = [];
            a = new RegExp(a, "");
            for (var b = 0; b < this.R.length; b++) a.test(this.R[b].id) && c.push(this.R[b]);
            for (b = 0; b < this.J.length; b++) a.test(this.J[b].id) && c.push(this.J[b]);
            for (b = 0; b < this.Ua.length; b++) a.test(this.Ua[b].id) && c.push(this.Ua[b]);
            return c
        };
        e.prototype.zc = function(a) {
            if (this.Sa) {
                var c = this.Y;
                if (c) return c.isPlaying(a)
            } else {
                if ("_main" === a) return !0;
                a = this.uc(a);
                if (0 < a.length) return !a[0].c.ended && !a[0].c.paused
            }
            return !1
        };
        e.prototype.cd = function(a, c) {
            if (this.Sa) {
                var b = this.Y;
                b && b.playSound(a, c)
            } else try {
                for (var b = this.uc(a), d = 0; d < b.length; d++) {
                    var e = b[d];
                    e.tc = c && !isNaN(Number(c)) ? Number(c) - 1 : e.loop - 1; - 1 == e.tc && (e.tc = 1E7);
                    e.c.play()
                }
            } catch (n) {}
        };
        e.prototype.xh = function(a, c) {
            for (var b = this.uc(a), d = 0; d < b.length; d++) {
                var e = b[d];
                this.zc(e.id) ? this.Rf(e.id) : this.cd(e.id, c)
            }
        };
        e.prototype.Rf = function(a) {
            if (this.Sa) {
                var c = this.Y;
                c && c.pauseSound(a)
            } else try {
                if ("_main" == a) {
                    for (c = 0; c < this.R.length; c++) this.R[c].c.pause();
                    for (c = 0; c < this.J.length; c++) this.J[c].c.pause()
                } else for (var b = this.uc(a), c = 0; c < b.length; c++) b[c].c.pause()
            } catch (d) {}
        };
        e.prototype.ji = function(a, c) {
            for (var b = this.uc(a), d = 0; d < b.length; d++) {
                var e = b[d];
                0 == c || 1 == c ? e.Ed && e.Ed(1 == c) : 2 == c && e.Yb && e.Yb()
            }
        };
        e.prototype.jk = function(a) {
            var c;
            if (this.Sa)(c = this.Y) && c.stopSound(a);
            else try {
                if ("_main" === a) {
                    for (c = 0; c < this.R.length; c++) this.R[c].c.pause(), this.R[c].c.currentTime = 0;
                    for (c = 0; c < this.J.length; c++) this.J[c].c.pause(), this.J[c].c.currentTime = 0
                } else {
                    var b = this.uc(a);
                    for (c = 0; c < b.length; c++) {
                        var d = b[c];
                        d.c && d.c.pause && (d.c.pause(), d.c.currentTime = 0)
                    }
                }
            } catch (e) {}
        };
        e.prototype.$j = function(a, c) {
            if (this.Sa) {
                var b = this.Y;
                b && b.setVolume(a, c)
            } else try {
                var d = Number(c);
                1 < d && (d = 1);
                0 > d && (d = 0);
                "_video" === a && this.o.c && (this.o.c.volume = d);
                if ("_main" === a) {
                    this.ba = d;
                    for (b = 0; b < this.R.length; b++) this.R[b].c.volume = this.R[b].level * this.ba;
                    for (b = 0; b < this.J.length; b++) this.J[b].c.volume = this.J[b].level * this.ba;
                    this.o.c && (this.o.c.volume = this.ba)
                } else for (var e = this.uc(a), b = 0; b < e.length; b++) {
                    var n = e[b];
                    n.c && n.c.volume && (n.level = d, n.c.volume = d * this.ba)
                }
            } catch (f) {}
        };
        e.prototype.wi = function(a, c) {
            if (this.Sa) {
                var b = this.Y;
                b && b.changeVolume(a, c)
            } else try {
                var d;
                "_video" === a && this.o.c && (this.o.c.volume = this.o.c.volume + Number(c));
                if ("_main" === a) {
                    b = this.ba;
                    b += Number(c);
                    1 < b && (b = 1);
                    0 > b && (b = 0);
                    this.ba = b;
                    for (d = 0; d < this.R.length; d++) this.R[d].c.volume = this.R[d].level * this.ba;
                    for (d = 0; d < this.J.length; d++) this.J[d].c.volume = this.J[d].level * this.ba;
                    this.o.c && (this.o.c.volume = this.ba)
                } else {
                    var e = this.uc(a);
                    for (d = 0; d < e.length; d++) {
                        var n = e[d],
                            b = n.level,
                            b = b + Number(c);
                        1 < b && (b = 1);
                        0 > b && (b = 0);
                        n.level = b;
                        n.c.volume = b * this.ba
                    }
                }
            } catch (f) {}
        };
        e.prototype.Oh = function() {
            try {
                for (var a = this, c = !1, b = !1, d = 0; d < this.R.length; d++) {
                    var e = this.R[d]; - 1 != e.loop && (this.lb && this.ra.enabled && 4 != e.mode && 6 != e.mode ? this.ra.sg ? (e.c.play(), e.c.currentTime = 0, e.aa = 0, b = !0) : c = !0 : 4 == e.mode || 6 == e.mode || "_background" == e.id && this.zc(e.id) || (e.c.play(), e.c.currentTime && (e.c.currentTime = 0)))
                }
                c && setTimeout(function() {
                    a.ra.hk()
                }, 1E3 * this.ra.pc);
                b && (this.ra.ek = this.lb.currentTime, this.ra.dk = setInterval(function() {
                    a.ra.Ci()
                }, 10))
            } catch (n) {}
        };
        e.prototype.Bh = function() {
            for (var a; 0 < this.I.length;) a = this.I.pop(), a.c && (this.va.removeChild(a.c.__div), delete a.c), a.c = null
        };
        e.prototype.ak = function() {
            this.M.style.zIndex = "auto";
            this.w.style.zIndex = "auto";
            this.Ea && this.Ea.ac && (this.Ea.ac.zIndex = (900).toString());
            this.va.style.zIndex = (1E3).toString();
            this.la.style.zIndex = (900).toString();
            this.na.style.zIndex = (1100).toString()
        };
        e.prototype.hd = function(a) {
            var c = this.isFullscreen !== a;
            this.isFullscreen !== a && (this.isFullscreen = a, this.update(100));
            if (this.isFullscreen) {
                if (this.gf) try {
                    this.M.webkitRequestFullScreen ? this.M.webkitRequestFullScreen() : this.M.mozRequestFullScreen ? this.M.mozRequestFullScreen() : this.M.msRequestFullscreen ? this.M.msRequestFullscreen() : this.M.requestFullScreen ? this.M.requestFullScreen() : this.M.requestFullscreen && this.M.requestFullscreen()
                } catch (b) {}
                this.M.style.position = "absolute";
                a = this.Hc();
                this.M.style.left = window.pageXOffset - a.x + this.margin.left + "px";
                this.M.style.top = window.pageYOffset - a.y + this.margin.top + "px";
                document.body.style.overflow = "hidden";
                c && this.D && this.D.ggEnterFullscreen && this.D.ggEnterFullscreen()
            } else {
                if (this.gf) try {
                    document.webkitIsFullScreen ? document.webkitCancelFullScreen() : document.mozFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.fullScreen && (document.cancelFullScreen ? document.cancelFullScreen() : document.exitFullscreen && document.exitFullscreen())
                } catch (b) {}
                this.M.style.position = "relative";
                this.M.style.left = "0px";
                this.M.style.top = "0px";
                document.body.style.overflow = "";
                c && this.D && this.D.ggExitFullscreen && this.D.ggExitFullscreen()
            }
            this.Rc()
        };
        e.prototype.cf = function() {
            this.hd(!this.isFullscreen)
        };
        e.prototype.Bi = function() {
            this.hd(!0)
        };
        e.prototype.exitFullscreen = function() {
            this.hd(!1)
        };
        e.prototype.Ki = function() {
            return this.isFullscreen
        };
        e.prototype.fk = function(a, c, b) {
            this.u.enabled = !0;
            this.u.active = !0;
            this.u.jc = 0;
            this.u.startTime = (new Date).getTime();
            a && 0 != a && (this.u.speed = a);
            c && (this.u.timeout = c);
            b && (this.u.af = b)
        };
        e.prototype.ik = function() {
            this.u.active = !1;
            this.u.enabled = !1
        };
        e.prototype.nk = function() {
            this.u.enabled = !this.u.active;
            this.u.active = this.u.enabled;
            this.u.jc = 0;
            this.u.enabled && (this.u.startTime = (new Date).getTime())
        };
        e.prototype.rg = function(a) {
            if (this.Uc = document.getElementById(a)) {
                this.Uc.innerHTML = "";
                this.M = document.createElement("div");
                a = "top:\t0px;left: 0px;position:relative;";
                a += "-ms-touch-action: none;";
                a += "touch-action: none;";
                a += "text-align: left;";
                a += this.ua + "user-select: none;";
                this.M.setAttribute("style", a);
                this.Uc.appendChild(this.M);
                this.w = document.createElement("div");
                a = "top:\t0px;left: 0px;";
                a += "width:  100px;";
                a += "height: 100px;";
                a += "overflow: hidden;";
                a += "position:absolute;";
                a += "-ms-touch-action: none;";
                a += "touch-action: none;";
                a += this.ua + "user-select: none;";
                this.w.setAttribute("style", a);
                this.M.appendChild(this.w);
                if (this.Sa) {
                    var c = document.createElement("div");
                    a = "top:\t0px;left: 0px;";
                    a += "width:  100%;";
                    a += "height: 100%;";
                    a += "overflow: hidden;";
                    a += "position:absolute;";
                    a += "-ms-touch-action: none;";
                    a += "touch-action: none;";
                    a += this.ua + "user-select: none;";
                    c.setAttribute("id", this.Bf);
                    c.setAttribute("style", a);
                    this.w.appendChild(c)
                }
                this.Ea && (this.Ea.ac = document.createElement("canvas"), a = "top:\t0px;left: 0px;", a += "width:  100px;", a += "height: 100px;", a += "overflow: hidden;", a += "position:absolute;", a += this.ua + "user-select: none;", a += this.ua + "pointer-events: none;", this.Ea.ac.setAttribute("style", a), this.M.appendChild(this.Ea.ac));
                this.va = document.createElement("div");
                a = "top:\t0px;left: 0px;";
                a += "width:  100px;";
                a += "height: 100px;";
                a += "overflow: hidden;";
                a += "position:absolute;";
                this.bh && (a += "background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);");
                this.Ic && !this.ka && (a += this.ua + "transform: translateZ(9999999px);");
                a += this.ua + "user-select: none;";
                this.va.setAttribute("style", a);
                this.M.appendChild(this.va);
                this.la = document.createElement("canvas");
                a = "top:\t0px;left: 0px;";
                a += "width:  100px;";
                a += "height: 100px;";
                a += "overflow: hidden;";
                a += "position:absolute;";
                a += this.ua + "user-select: none;";
                a += this.ua + "pointer-events: none;";
                this.la.setAttribute("style", a);
                this.M.appendChild(this.la);
                this.na = document.createElement("div");
                a = "top:\t0px;left: 0px;";
                a += "position:absolute;";
                a += "padding: 3px;";
                a += "visibility: hidden;";
                this.na.setAttribute("style", a);
                this.na.innerHTML = " Hotspot text!";
                this.M.appendChild(this.na);
                this.divSkin = this.D = this.va;
                this.ak()
            } else alert("container not found!")
        };
        e.prototype.tg = function(a) {
            this.Ca = !0;
            return function() {
                a.da && (a.f && a.f.complete ? (a.loaded = !0, a.da.drawImage(a.f, 0, 0, a.width, a.height), a.f = null, a.nc = null) : a.nc && a.nc.complete && !a.loaded && (a.da.drawImage(a.nc, 0, 0, a.width, a.height), a.nc = null))
            }
        };
        e.prototype.qg = function(a) {
            var c, b, d, e = 128;
            this.f.mc && (this.w.style.backgroundColor = this.f.mc.replace("0x", "#"));
            a ? (e = this.td, this.Wd = 1) : this.oc > e && (e = this.oc);
            for (d = 0; 6 > d; d++) {
                b = this.Pa.Ja[d];
                a ? (b.width = this.td, b.height = this.td) : (b.A = document.createElement("canvas"), b.A.width = this.oc, b.A.height = this.oc, b.width = this.oc, b.height = this.oc, b.da = b.A.getContext("2d"));
                c = "position:absolute;";
                c += "left: 0px;";
                c += "top: 0px;";
                c += "width: " + e + "px;";
                c += "height: " + e + "px;";
                a && (c += "outline: 1px solid transparent;");
                c += this.ua + "transform-origin: 0% 0%;";
                c += "-webkit-user-select: none;";
                c += this.ua + "transform: ";
                var n;
                n = "";
                var f = 1;
                this.fd && (f = 100);
                n = 4 > d ? n + ("rotateY(" + -90 * d + "deg)") : n + ("rotateX(" + (4 == d ? -90 : 90) + "deg)");
                this.fd && (n += " scale(" + f + ")");
                n += " translate3d(" + -e / 2 + "px," + -e / 2 + "px," + -e * f / (2 * this.Wd) + "px)";
                c += n + ";";
                b.Sg = n;
                a || (b.A.setAttribute("style", c), this.w.insertBefore(b.A, this.w.firstChild))
            }
            if (!a) {
                for (d = 0; 6 > d; d++) b = this.Pa.Ja[d], "" != this.Vc[d] && (b.nc = new Image, b.nc.crossOrigin = this.crossOrigin, b.nc.onload = this.tg(b), b.nc.setAttribute("src", this.ub(this.Vc[d])), this.bb.push(b.nc));
                for (d = 0; 6 > d; d++) b = this.Pa.Ja[d], b.loaded = !1, b.f = new Image, b.f.crossOrigin = this.crossOrigin, b.f.onload = this.tg(b), b.f.setAttribute("src", this.ub(this.le[d])), this.bb.push(b.f)
            }
        };
        e.prototype.Ch = function() {
            var a;
            if (this.Hb) {
                for (a = 0; a < this.Pa.Ja.length; a++) this.Pa.Ja[a].A && this.Pa.Ja[a].A.setAttribute && (this.Pa.Ja[a].A.setAttribute("src", this.xg), this.w.removeChild(this.Pa.Ja[a].A));
                if (this.f.L) {
                    for (a = 0; a < this.f.L.length; a++) {
                        var c = this.f.L[a],
                            b;
                        for (b in c.$) if (c.$.hasOwnProperty(b)) {
                            var d = c.$[b];
                            d.visible = !1;
                            d.A && (d.da && (d.da.clear ? d.da.clear() : d.da.clearRect(0, 0, d.da.canvas.width, d.da.canvas.height)), this.df.push(d.A));
                            d.f && delete d.f;
                            d.Pb && this.a.deleteTexture(d.Pb);
                            d.da = null;
                            d.A = null;
                            d.f = null
                        }
                        delete c.$
                    }
                    delete this.f.L;
                    this.f.L = null
                }
            }
            if (this.a && this.eb) for (; 0 < this.eb.length;) b = this.eb.pop(), b.tj = !0, this.a.deleteTexture(b);
            for (a = 0; a < this.J.length; a++) this.J[a].Nc();
            for (a = 0; a < this.Ua.length; a++) this.Ua[a].Nc();
            this.v.Md = -1;
            this.la.style.visibility = "hidden";
            this.rb = 0;
            b = [];
            this.ra.Yd = [];
            for (a = 0; a < this.R.length; a++) if (c = this.R[a], 0 == c.mode || 1 == c.mode) b.push(c);
            else if (this.lb && this.ra.enabled && this.zc(c.id)) this.ra.Yd.push(c), 1 != this.S.Ba && 2 != this.S.Ba && this.ra.zf(c);
            else {
                try {
                    c.c.pause()
                } catch (e) {}
                c.Nc()
            }
            this.R = b;
            this.J = [];
            this.Ua = [];
            this.o.c && (this.M.removeChild(this.o.c), this.o.c = null);
            this.o.$c = !1;
            this.o.Ce = !1
        };
        e.prototype.Pg = function() {
            var a = 1,
                c = -1 != navigator.userAgent.indexOf("Mac");
            window.devicePixelRatio && c && (a = window.devicePixelRatio);
            return {
                hf: screen.width * a,
                ye: screen.height * a
            }
        };
        e.prototype.Mg = function() {
            var a = this.Pg();
            return a.hf > a.ye ? a.hf : a.ye
        };
        e.prototype.Vf = function(a, c) {
            var b = (new DOMParser).parseFromString(a, "text/xml");
            this.uf = a;
            this.Ah(b, c);
            this.Y && (this.Y.readConfigString(this.uf), this.Y.setLocked(!0), this.Y.setSlaveMode(!0))
        };
        e.prototype.zh = function(a, c, b) {
            try {
                var d;
                d = new XMLHttpRequest;
                d.open("GET", a, !1);
                d.send(null);
                if (d.responseXML) {
                    var e = a.lastIndexOf("/");
                    0 <= e && (this.qc = a.substr(0, e + 1));
                    2 <= arguments.length && null != c && (this.qc = c);
                    this.Vf(d.responseText, b)
                } else alert("Error loading panorama XML")
            } catch (n) {
                alert("Error:" + n)
            }
        };
        e.prototype.Gj = function(a, c, b, d) {
            var e;
            e = new XMLHttpRequest;
            var n = this;
            e.onload = function(f) {
                if (4 <= e.readyState) if (e.responseXML) {
                    var k = a.lastIndexOf("/");
                    0 <= k && (n.qc = a.substr(0, k + 1));
                    3 <= arguments.length && null != b && (n.qc = b);
                    n.Vf(e.responseText, d);
                    c && c()
                } else alert("Error loading panorama XML");
                else console.error("Wrong state loading XML:" + e.statusText)
            };
            e.onerror = function() {
                console.error("Error loading XML:" + e.statusText)
            };
            e.open("GET", a, !0);
            e.send(null)
        };
        e.prototype.of = function(a) {
            this.Rh("beforechangenode", {
                uj: this.currentNode,
                Ok: a
            });
            "" != this.currentNode && -1 == this.ig.indexOf(this.currentNode) && this.ig.push(this.currentNode);
            "{" == a.charAt(0) ? this.currentNode = a.substr(1, a.length - 2) : this.currentNode = "";
            this.xa && this.xa.changeActiveNode && this.xa.changeActiveNode(a);
            this.Rh("changenode", {
                uj: this.currentNode,
                Nk: a
            })
        };
        e.prototype.Kg = function() {
            return this.currentNode
        };
        e.prototype.Ng = function() {
            if (0 < this.sa.length) {
                var a;
                a = this.sa.indexOf(this.currentNode);
                a++;
                a >= this.sa.length && (a = 0);
                return this.sa[a]
            }
            return ""
        };
        e.prototype.Zi = function() {
            if (0 < this.sa.length) {
                var a;
                a = this.sa.indexOf(this.currentNode);
                a--;
                0 > a && (a = this.sa.length - 1);
                return this.sa[a]
            }
            return ""
        };
        e.prototype.sj = function(a) {
            return -1 != this.ig.indexOf(a)
        };
        e.prototype.Ah = function(a, c) {
            var b = a.firstChild;
            this.Pc = [];
            this.sa = [];
            if ("tour" == b.nodeName) {
                this.Kd = !0;
                var d = "",
                    e;
                (e = b.getAttributeNode("start")) && (d = e.nodeValue.toString());
                this.hasOwnProperty("startNode") && this.startNode && (d = String(this.startNode), this.startNode = "");
                for (var b = b.firstChild, n = e = ""; b;)"panorama" == b.nodeName && (e = b.getAttributeNode("id")) && (e = e.nodeValue.toString(), "" == d && (d = e), "" == n && (n = e), this.Pc[e] = b, this.sa.push(e)), b = b.nextSibling;
                this.Pc.hasOwnProperty(d) || (this.ad("Start node " + d + " not found!"), d = n);
                this.Uf(this.Pc[d], c);
                this.of("{" + d + "}")
            } else this.Kd = !1, this.Uf(b, c), this.of(""), this.sa.push("")
        };
        e.prototype.Uf = function(a, c) {
            this.Bh();
            this.Ea && this.Ea.Ij();
            this.gd(this.Qa);
            this.Ch();
            this.Nd = 0;
            for (var b = a.firstChild, d, e, n = 0; b;) {
                if ("view" == b.nodeName) {
                    if (d = b.getAttributeNode("fovmode")) this.g.mode = Number(d.nodeValue);
                    d = b.getAttributeNode("pannorth");
                    this.pan.Of = 1 * (d ? d.nodeValue : 0);
                    for (var f = b.firstChild; f;)"start" == f.nodeName && (d = f.getAttributeNode("pan"), this.pan.b = Number(d ? d.nodeValue : 0), this.pan.fb = this.pan.b, d = f.getAttributeNode("tilt"), this.j.b = Number(d ? d.nodeValue : 0), this.j.fb = this.j.b, d = f.getAttributeNode("roll"), this.G.b = Number(d ? d.nodeValue : 0), this.G.fb = this.G.b, d = f.getAttributeNode("fov"), this.g.b = Number(d ? d.nodeValue : 70), this.g.fb = this.g.b), "min" == f.nodeName && (d = f.getAttributeNode("pan"), this.pan.min = 1 * (d ? d.nodeValue : 0), d = f.getAttributeNode("tilt"), this.j.min = 1 * (d ? d.nodeValue : -90), d = f.getAttributeNode("fov"), this.g.min = 1 * (d ? d.nodeValue : 5), 1E-20 > this.g.min && (this.g.min = 1E-20), d = f.getAttributeNode("fovpixel"), this.g.Td = 1 * (d ? d.nodeValue : 0)), "max" == f.nodeName && (d = f.getAttributeNode("pan"), this.pan.max = 1 * (d ? d.nodeValue : 0), d = f.getAttributeNode("tilt"), this.j.max = 1 * (d ? d.nodeValue : 90), d = f.getAttributeNode("fov"), this.g.max = 1 * (d ? d.nodeValue : 120), 180 <= this.g.max && (this.g.max = 179.9)), f = f.nextSibling
                }
                if ("autorotate" == b.nodeName) {
                    if (d = b.getAttributeNode("speed")) this.u.speed = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("delay")) this.u.timeout = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("returntohorizon")) this.u.af = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("nodedelay")) this.u.Ie = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("noderandom")) this.u.Nf = 1 == d.nodeValue;
                    this.re && (this.u.enabled = !0, this.u.active = !1);
                    if (d = b.getAttributeNode("startloaded")) this.u.Vd = 1 == d.nodeValue, this.u.Vd && (this.u.active = !1);
                    if (d = b.getAttributeNode("useanimation")) this.u.ai = 1 == d.nodeValue
                }
                if ("animation" == b.nodeName) for (this.sc = [], f = b.firstChild; f;) {
                    if ("clip" == f.nodeName) {
                        this.T = {};
                        (d = f.getAttributeNode("animtitle")) && (this.T.animtitle = d.nodeValue.toString());
                        (d = f.getAttributeNode("cliptitle")) && (this.T.cliptitle = d.nodeValue.toString());
                        (d = f.getAttributeNode("nodeid")) && (this.T.nodeid = d.nodeValue.toString());
                        (d = f.getAttributeNode("length")) && (this.T.length = Number(d.nodeValue));
                        (d = f.getAttributeNode("animtype")) && (this.T.animtype = Number(d.nodeValue));
                        (d = f.getAttributeNode("nextcliptitle")) && (this.T.nextcliptitle = d.nodeValue.toString());
                        (d = f.getAttributeNode("nextclipnodeid")) && (this.T.nextclipnodeid = d.nodeValue.toString());
                        (d = f.getAttributeNode("transitiontype")) && (this.T.transitiontype = Number(d.nodeValue));
                        var k = f.firstChild;
                        for (this.T.keyframes = []; k;) {
                            if ("keyframe" == k.nodeName) {
                                var l = {};
                                (d = k.getAttributeNode("time")) && (l.time = Number(d.nodeValue));
                                (d = k.getAttributeNode("value")) && (l.value = Number(d.nodeValue));
                                d = k.getAttributeNode("type");
                                var q = 0;
                                d && (l.type = Number(d.nodeValue), q = Number(d.nodeValue));
                                (d = k.getAttributeNode("property")) && (l.property = Number(d.nodeValue));
                                if (1 == q || 2 == q)(d = k.getAttributeNode("bezierintime")) && (l.bezierintime = Number(d.nodeValue)), (d = k.getAttributeNode("bezierinvalue")) && (l.bezierinvalue = Number(d.nodeValue)), (d = k.getAttributeNode("bezierouttime")) && (l.bezierouttime = Number(d.nodeValue)), (d = k.getAttributeNode("bezieroutvalue")) && (l.bezieroutvalue = Number(d.nodeValue));
                                this.T.keyframes.push(l)
                            }
                            k = k.nextSibling
                        }
                        this.lc == this.T.cliptitle && (d = this.T.keyframes, this.$f(d[0].value, d[1].value, d[2].value));
                        this.sc.push(this.T)
                    }
                    f = f.nextSibling
                }
                "input" == b.nodeName && (e || (e = b));
                if (e) for (f = 0; 6 > f; f++) d = e.getAttributeNode("prev" + f + "url"), this.Vc[f] = d ? String(d.nodeValue) : "";
                "altinput" == b.nodeName && (f = 0, (d = b.getAttributeNode("screensize")) && (f = 1 * d.nodeValue), 0 < f && f <= this.Mg() && f > n && (n = f, e = b));
                if ("control" == b.nodeName && this.re) {
                    if (d = b.getAttributeNode("simulatemass")) this.B.enabled = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("locked")) this.C.Wa = 1 == d.nodeValue;
                    d && (this.C.Pd = 1 == d.nodeValue);
                    if (d = b.getAttributeNode("lockedmouse")) this.C.Wa = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("lockedkeyboard")) this.C.Pd = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("lockedkeyboardzoom")) this.C.Lf = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("lockedwheel")) this.C.Mf = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("invertwheel")) this.C.Zg = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("speedwheel")) this.C.Mh = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("invertcontrol")) this.C.yc = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("sensitivity")) this.C.sensitivity = 1 * d.nodeValue, 1 > this.C.sensitivity && (this.C.sensitivity = 1);
                    if (d = b.getAttributeNode("dblclickfullscreen")) this.C.wf = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("contextfullscreen")) this.C.ke = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("hideabout")) this.C.ze = 1 == d.nodeValue;
                    for (f = b.firstChild; f;)"menulink" == f.nodeName && (k = {
                        text: "",
                        url: ""
                    }, d = f.getAttributeNode("text"), k.text = d.nodeValue, d = f.getAttributeNode("url"), k.url = d.nodeValue, this.Sd.push(k)), f = f.nextSibling
                }
                if ("transition" == b.nodeName) {
                    if (d = b.getAttributeNode("enabled")) this.S.enabled = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("blendtime")) this.S.mg = d.nodeValue;
                    if (d = b.getAttributeNode("blendcolor")) this.S.he = d.nodeValue.toString();
                    if (d = b.getAttributeNode("type")) this.S.type = d.nodeValue.toString();
                    if (d = b.getAttributeNode("softedge")) this.S.Zb = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("zoomin")) this.S.Ba = d.nodeValue;
                    if (d = b.getAttributeNode("zoomout")) this.S.Kb = d.nodeValue;
                    if (d = b.getAttributeNode("zoomfov")) this.S.kf = d.nodeValue;
                    if (d = b.getAttributeNode("zoomspeed")) this.S.fe = d.nodeValue;
                    if (d = b.getAttributeNode("zoomoutpause")) this.S.lf = 1 == d.nodeValue
                }
                if ("soundstransition" == b.nodeName) {
                    if (d = b.getAttributeNode("enabled")) this.ra.enabled = 1 == d.nodeValue;
                    if (d = b.getAttributeNode("transitiontime")) this.ra.pc = 1 * d.nodeValue;
                    if (d = b.getAttributeNode("crossfade")) this.ra.sg = 1 == d.nodeValue
                }
                "userdata" == b.nodeName && (this.userdata = this.od = this.qe(b));
                if ("hotspots" == b.nodeName) for (f = b.firstChild; f;) {
                    if ("label" == f.nodeName) {
                        k = this.v.eg;
                        if (d = f.getAttributeNode("enabled")) k.enabled = 1 == d.nodeValue;
                        if (d = f.getAttributeNode("width")) k.width = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("height")) k.height = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("textcolor")) k.fg = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("textalpha")) k.dg = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("background")) k.background = 1 == d.nodeValue;
                        if (d = f.getAttributeNode("backgroundalpha")) k.Mb = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("backgroundcolor")) k.mb = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("border")) k.nf = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("bordercolor")) k.ob = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("borderalpha")) k.Nb = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("borderradius")) k.mf = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("wordwrap")) k.jf = 1 == d.nodeValue
                    }
                    if ("polystyle" == f.nodeName) {
                        if (d = f.getAttributeNode("mode")) this.v.mode = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("bordercolor")) this.v.ob = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("backgroundcolor")) this.v.mb = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("borderalpha")) this.v.Nb = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("backgroundalpha")) this.v.Mb = 1 * d.nodeValue;
                        if (d = f.getAttributeNode("handcursor")) this.v.Yc = 1 == d.nodeValue
                    }
                    d = void 0;
                    "hotspot" == f.nodeName && (d = new Y(this), d.type = "point", d.Za(f), this.I.push(d));
                    "polyhotspot" == f.nodeName && (d = new Y(this), d.type = "poly", d.Za(f), this.I.push(d));
                    f = f.nextSibling
                }
                if ("sounds" == b.nodeName || "media" == b.nodeName) for (f = b.firstChild; f;)"sound" != f.nodeName || this.uh || (d = new U(this), d.Za(f), this.Sa || d.addElement()), "video" == f.nodeName && (d = new V(this), d.Za(f), this.Sa || d.addElement()), "image" == f.nodeName && (d = new W(this), d.Za(f), this.Sa || d.addElement()), "lensflare" == f.nodeName && this.Ea && (d = new X(this), d.Za(f), this.Ea.Od.push(d)), f = f.nextSibling;
                b = b.nextSibling
            }
            c && "" != c && (b = c.toString().split("/"), 0 < b.length && (d = String(b[0]), "N" == d.charAt(0) ? this.Zf(Number(d.substr(1))) : "S" == d.charAt(0) ? this.Zf(-180 + Number(d.substr(1))) : this.Yf(Number(d))), 1 < b.length && this.ag(Number(b[1])), 2 < b.length && this.Re(Number(b[2])));
            if (e) {
                for (f = 0; 6 > f; f++)(d = e.getAttributeNode("tile" + f + "url")) && (this.le[f] = String(d.nodeValue)), d = e.getAttributeNode("tile" + f + "url1");
                for (f = 0; 6 > f; f++)(d = e.getAttributeNode("prev" + f + "url")) && (this.Vc[f] = String(d.nodeValue));
                if (d = e.getAttributeNode("tilesize")) this.oc = 1 * d.nodeValue;
                if (d = e.getAttributeNode("canvassize")) this.td = Number(d.nodeValue);
                if (d = e.getAttributeNode("tilescale")) this.Wd = 1 * d.nodeValue;
                if (d = e.getAttributeNode("leveltileurl")) this.f.oh = d.nodeValue;
                if (d = e.getAttributeNode("leveltilesize")) this.f.Z = Number(d.nodeValue);
                if (d = e.getAttributeNode("levelbias")) this.f.mh = Number(d.nodeValue);
                if (d = e.getAttributeNode("levelbiashidpi")) this.f.nh = Number(d.nodeValue);
                d = e.getAttributeNode("overlap");
                this.oa.G = 0;
                this.oa.pitch = 0;
                d && (this.f.Va = Number(d.nodeValue));
                if (d = e.getAttributeNode("levelingroll")) this.oa.G = Number(d.nodeValue);
                if (d = e.getAttributeNode("levelingpitch")) this.oa.pitch = Number(d.nodeValue);
                this.rb = 0;
                (d = e.getAttributeNode("flat")) && 1 == d.nodeValue && (this.rb = 2);
                d = e.getAttributeNode("width");
                this.f.width = 1 * (d ? d.nodeValue : 1);
                d = e.getAttributeNode("height");
                this.f.height = 1 * (d ? d.nodeValue : this.f.width);
                this.o.src = [];
                this.f.L = [];
                for (f = e.firstChild; f;) {
                    if ("preview" == f.nodeName) {
                        if (d = f.getAttributeNode("color")) this.f.mc = d.nodeValue;
                        if (d = f.getAttributeNode("strip")) this.f.yh = 1 == d.nodeValue
                    }
                    if ("video" == f.nodeName) {
                        if (d = f.getAttributeNode("format")) this.o.format = d.nodeValue.toString();
                        if (d = f.getAttributeNode("bleed")) this.o.ge = Number(d.nodeValue);
                        if (d = f.getAttributeNode("endaction")) this.o.Fc = String(d.nodeValue);
                        if (d = f.getAttributeNode("width")) this.o.width = Number(d.nodeValue);
                        if (d = f.getAttributeNode("height")) this.o.height = Number(d.nodeValue);
                        for (e = f.firstChild; e;)"source" == e.nodeName && (d = e.getAttributeNode("url")) && this.o.src.push(d.nodeValue.toString()), e = e.nextSibling
                    }
                    if ("level" == f.nodeName) {
                        e = {
                            width: 0,
                            height: 0,
                            cache: !1,
                            Tf: !1,
                            Ma: 0,
                            Fb: 0,
                            $: []
                        };
                        d = f.getAttributeNode("width");
                        e.width = 1 * (d ? d.nodeValue : 1);
                        d = f.getAttributeNode("height");
                        e.height = 1 * (d ? d.nodeValue : e.width);
                        if (d = f.getAttributeNode("preload")) e.cache = 1 == d.nodeValue;
                        if (d = f.getAttributeNode("preview")) e.Tf = 1 == d.nodeValue;
                        e.Ma = Math.floor((e.width + this.f.Z - 1) / this.f.Z);
                        e.Fb = Math.floor((e.height + this.f.Z - 1) / this.f.Z);
                        this.f.L.push(e)
                    }
                    f = f.nextSibling
                }
                this.f.kh = this.f.L.length
            }
            this.$d && (this.ka = this.Hb = !1, this.pb || (this.pb = document.createElement("canvas"), this.pb.width = 100, this.pb.height = 100, this.pb.id = "dummycanvas", this.w.appendChild(this.pb)), this.Sc());
            this.ka && this.a && (this.Xg(this.Wd), this.Yg());
            this.Hb && (0 < this.f.L.length ? this.qg(!0) : this.qg(!1), this.Nd = 0);
            var p = this;
            0 < this.f.L.length && this.f.yh && 0 == this.rb && (e = new Image, e.crossOrigin = this.crossOrigin, e.onload = this.rj(e), e.setAttribute("src", this.$e(6, this.f.L.length - 1, 0, 0)));
            if (0 < this.o.src.length) if (this.Jf)"{" == this.o.Fc.charAt(0) && p.Lc(p.o.Fc, "$fwd");
            else {
                this.o.c = document.createElement("video");
                this.o.c.crossOrigin = this.crossOrigin;
                this.o.c.setAttribute("style", "display:none; max-width:none;");
                this.o.c.ii = !0;
                this.o.c.volume = this.ba;
                this.M.appendChild(this.o.c);
                this.o.$c = !1;
                this.o.c.oncanplay = function() {
                    if (!p.o.$c) {
                        p.o.Ce = !0;
                        var a, b, c, d, e, g, f = [],
                            k = new y,
                            l = p.a,
                            n = p.o.c.videoWidth / 3;
                        for (a = 0; 6 > a; a++) for (c = a % 3 * n + p.o.ge, e = c + n - 2 * p.o.ge, d = 4, 3 <= a && (d += n), g = d + n - 2 * p.o.ge, b = 0; 4 > b; b++) {
                            k.x = -1;
                            k.y = -1;
                            k.z = 1;
                            for (var q = 0; q < b; q++) k.Gh();
                            f.push((0 < k.x ? c : e) / (3 * n), (0 < k.y ? d : g) / (2 * n))
                        }
                        l.bindBuffer(l.ARRAY_BUFFER, p.o.Xe);
                        l.bufferData(l.ARRAY_BUFFER, new Float32Array(f), l.STATIC_DRAW)
                    }
                };
                "exit" == this.o.Fc ? this.o.c.onended = function() {
                    p.o.Ce = !1;
                    p.o.$c = !1;
                    p.M.removeChild(p.o.c);
                    p.o.c = null
                } : "stop" == this.o.Fc ? p.o.c.onended = function() {} : "{" == this.o.Fc.charAt(0) ? this.o.c.onended = function() {
                    p.Lc(p.o.Fc, "$fwd")
                } : this.o.c.loop = !0;
                for (f = 0; f < this.o.src.length; f++) e = document.createElement("source"), e.setAttribute("src", this.ub(this.o.src[f])), this.o.c.appendChild(e);
                this.o.c.play()
            }
            this.jg();
            this.S.Ec || this.Oh();
            this.update();
            this.re && this.D && this.D.ggViewerInit && this.D.ggViewerInit();
            this.re = !1;
            this.Id = !0;
            this.Sc()
        };
        e.prototype.Pf = function(a, c) {
            0 < a.length && (".xml" == a.substr(a.length - 4) || ".swf" == a.substr(a.length - 4) || "{" == a.charAt(0) ? this.Lc(this.ub(a), c) : window.open(this.ub(a), c))
        };
        e.prototype.gk = function() {
            this.Id = this.isLoaded = !1;
            this.checkLoaded = this.bb = [];
            this.Ke = 0;
            this.D && this.D.ggReLoaded && this.D.ggReLoaded()
        };
        e.prototype.Lc = function(a, c) {
            this.gk();
            this.xa && this.xa.hotspotProxyOut && this.xa.hotspotProxyOut(this.ma.id);
            ".swf" == a.substr(a.length - 4) && (a = a.substr(0, a.length - 4) + ".xml");
            var b = "";
            c && (b = c.toString());
            b = b.replace("$cur", this.pan.b + "/" + this.j.b + "/" + this.g.b);
            b = b.replace("$fwd", "N" + this.ve() + "/" + this.j.b + "/" + this.g.b);
            b = b.replace("$bwd", "S" + this.ve() + "/" + this.j.b + "/" + this.g.b);
            b = b.replace("$ap", String(this.pan.b));
            b = b.replace("$an", String(this.ve()));
            b = b.replace("$at", String(this.j.b));
            b = b.replace("$af", String(this.g.b));
            if ("" != b) {
                var d = b.split("/");
                3 < d.length && "" != d[3] && (this.startNode = d[3])
            }
            this.ia();
            if ("{" == a.charAt(0)) {
                var d = a.substr(1, a.length - 2),
                    e = this.S,
                    n = this.a;
                if (this.Pc[d]) {
                    if (0 == this.rb && this.S.enabled && this.ka && this.S.kb) {
                        e.ld || e.Ec || (e.sh = this.C.Wa, e.fh = this.C.Pd, this.Te(!0), this.Se(!0));
                        var f;
                        "wipeleftright" == e.type ? f = 1 : "wiperightleft" == e.type ? f = 2 : "wipetopbottom" == e.type ? f = 3 : "wipebottomtop" == e.type ? f = 4 : "wiperandom" == e.type && (f = Math.ceil(4 * Math.random()));
                        e.vf = f;
                        n.bindFramebuffer(n.FRAMEBUFFER, e.kb);
                        n.viewport(0, 0, e.kb.width, e.kb.height);
                        n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT);
                        e.Xd = !0;
                        this.Zd();
                        e.Xd = !1;
                        n.bindFramebuffer(n.FRAMEBUFFER, null);
                        n.viewport(0, 0, this.Ta.width, this.Ta.height);
                        f = new Date;
                        this.ma != this.Qa ? (e.de = this.ma.sb / this.l.width, e.ee = 1 - this.ma.Ya / this.l.height) : (e.de = .5, e.ee = .5);
                        1 != e.Ba && 2 != e.Ba ? (e.cg = f.getTime(), e.ld = !0) : (e.gi = f.getTime(), e.Ec = !0, e.Na = Math.sin(this.Wb() / 2 * Math.PI / 180) / Math.sin(e.kf / 2 * Math.PI / 180), e.Na = Math.max(e.Na, 1), e.fi = 1 / e.fe * e.Na * .3)
                    }
                    this.Uf(this.Pc[d], b);
                    this.of(a);
                    e.enabled && this.ka && (1 == e.Kb || 2 == e.Kb || 3 == e.Kb) && (e.Ve = this.ue(), e.We = this.we(), e.jd = this.Wb(), 1 == e.Kb || 3 == e.Kb ? this.Ue(e.kf) : this.Ue(this.Bd() + (this.Bd() - e.kf)), e.lf || 1 == e.Ba || 2 == e.Ba || this.moveTo(e.Ve, e.We, e.jd, e.fe));
                    this.Y && this.Y.openNext(a, b)
                } else {
                    this.ad("invalid node id: " + d);
                    return
                }
            } else this.zh(a, null, b);
            this.update(5)
        };
        e.prototype.Qi = function() {
            return this.Kd ? this.sa.slice(0) : [""]
        };
        e.prototype.qe = function(a) {
            var c, b;
            b = [];
            b.title = "";
            b.description = "";
            b.author = "";
            b.datetime = "";
            b.copyright = "";
            b.source = "";
            b.information = "";
            b.comment = "";
            b.latitude = 0;
            b.longitude = 0;
            b.tags = [];
            if (a && ((c = a.getAttributeNode("title")) && (b.title = c.nodeValue.toString()), (c = a.getAttributeNode("description")) && (b.description = c.nodeValue.toString()), (c = a.getAttributeNode("author")) && (b.author = c.nodeValue.toString()), (c = a.getAttributeNode("datetime")) && (b.datetime = c.nodeValue.toString()), (c = a.getAttributeNode("copyright")) && (b.copyright = c.nodeValue.toString()), (c = a.getAttributeNode("source")) && (b.source = c.nodeValue.toString()), (c = a.getAttributeNode("info")) && (b.information = c.nodeValue.toString()), (c = a.getAttributeNode("comment")) && (b.comment = c.nodeValue.toString()), (c = a.getAttributeNode("latitude")) && (b.latitude = Number(c.nodeValue)), (c = a.getAttributeNode("longitude")) && (b.longitude = Number(c.nodeValue)), c = a.getAttributeNode("tags"))) {
                a = c.nodeValue.toString().split("|");
                for (c = 0; c < a.length; c++)"" == a[c] && (a.splice(c, 1), c--);
                b.tags = a
            }
            return b
        };
        e.prototype.Df = function(a) {
            if (!a) return this.od;
            if (a = this.Pc[a]) for (a = a.firstChild; a;) {
                if ("userdata" == a.nodeName) return this.qe(a);
                a = a.nextSibling
            }
            return this.qe()
        };
        e.prototype.Ri = function(a) {
            a = this.Df(a);
            var c = [];
            "" != a.latitude && 0 != a.latitude && 0 != a.longitude && (c.push(a.latitude), c.push(a.longitude));
            return c
        };
        e.prototype.Si = function(a) {
            return this.Df(a).title
        };
        e.prototype.Lg = function(a, c) {
            var b;
            for (b = 0; b < this.T.keyframes.length; b++) if (this.T.keyframes[b].time == a && this.T.keyframes[b].property == c) return this.T.keyframes[b];
            return !1
        };
        e.prototype.Pi = function(a) {
            var c, b = 1E5,
                d = a,
                e = !1;
            for (c = 0; c < this.T.keyframes.length; c++) this.T.keyframes[c].property == a.property && this.T.keyframes[c].time > a.time && this.T.keyframes[c].time < b && (d = this.T.keyframes[c], b = d.time, e = !0);
            return e ? d : !1
        };
        e.prototype.Hk = function() {
            this.o.c && this.o.c.play()
        };
        e.prototype.Ik = function() {
            this.o.c && (this.o.c.pause(), this.o.c.time = 0)
        };
        e.prototype.Gk = function() {
            this.o.c && this.o.c.pause()
        };
        e.prototype.Zj = function(a) {
            this.o.c && (0 > a && (a = 0), a > this.o.c.duration && (a = this.o.c.duration - .1), this.o.c.currentTime = a, this.update())
        };
        e.prototype.dj = function() {
            return this.o.c ? this.o.c.currentTime : 0
        };
        e.prototype.cj = function() {
            if (this.o.c) return this.o.c
        };
        e.prototype.Ai = function() {
            this.uh = !0
        };
        return e
    }();
window.pano2vrPlayer = Z;
Z.prototype.readConfigString = Z.prototype.Vf;
Z.prototype.readConfigUrl = Z.prototype.zh;
Z.prototype.readConfigUrlAsync = Z.prototype.Gj;
Z.prototype.readConfigXml = Z.prototype.Ah;
Z.prototype.openUrl = Z.prototype.Pf;
Z.prototype.openNext = Z.prototype.Lc;
Z.prototype.setMargins = Z.prototype.Uj;
Z.prototype.addListener = Z.prototype.addListener;
Z.prototype.removeEventListener = Z.prototype.removeEventListener;
Z.prototype.detectBrowser = Z.prototype.wg;
Z.prototype.initWebGL = Z.prototype.xc;
Z.prototype.getPercentLoaded = Z.prototype.Vi;
Z.prototype.setBasePath = Z.prototype.Oj;
Z.prototype.getBasePath = Z.prototype.Fi;
Z.prototype.setViewerSize = Z.prototype.Kh;
Z.prototype.getViewerSize = Z.prototype.gj;
Z.prototype.setSkinObject = Z.prototype.Yj;
Z.prototype.changeViewMode = Z.prototype.ui;
Z.prototype.getViewMode = Z.prototype.ej;
Z.prototype.changePolygonMode = Z.prototype.pg;
Z.prototype.setPolygonMode = Z.prototype.pg;
Z.prototype.getPolygonMode = Z.prototype.Xi;
Z.prototype.changeViewState = Z.prototype.vi;
Z.prototype.getViewState = Z.prototype.fj;
Z.prototype.setRenderFlags = Z.prototype.Wj;
Z.prototype.getRenderFlags = Z.prototype.$i;
Z.prototype.setMaxTileCount = Z.prototype.Jh;
Z.prototype.getVFov = Z.prototype.Wb;
Z.prototype.setVFov = Z.prototype.Ue;
Z.prototype.updatePanorama = Z.prototype.Zd;
Z.prototype.isTouching = Z.prototype.ij;
Z.prototype.getIsMobile = Z.prototype.Mi;
Z.prototype.setIsMobile = Z.prototype.Sj;
Z.prototype.getIsAutorotating = Z.prototype.Ji;
Z.prototype.getIsLoaded = Z.prototype.Li;
Z.prototype.getIsTileLoading = Z.prototype.Ni;
Z.prototype.getLastActivity = Z.prototype.Oi;
Z.prototype.getPan = Z.prototype.ue;
Z.prototype.getPanNorth = Z.prototype.ve;
Z.prototype.getPanDest = Z.prototype.Ti;
Z.prototype.getPanN = Z.prototype.Ui;
Z.prototype.setPan = Z.prototype.Yf;
Z.prototype.setPanNorth = Z.prototype.Zf;
Z.prototype.changePan = Z.prototype.ie;
Z.prototype.changePanLog = Z.prototype.si;
Z.prototype.getTilt = Z.prototype.we;
Z.prototype.getTiltDest = Z.prototype.bj;
Z.prototype.setTilt = Z.prototype.ag;
Z.prototype.changeTilt = Z.prototype.je;
Z.prototype.changeTiltLog = Z.prototype.ti;
Z.prototype.getFov = Z.prototype.Bd;
Z.prototype.getFovDest = Z.prototype.Hi;
Z.prototype.setFov = Z.prototype.Re;
Z.prototype.changeFov = Z.prototype.og;
Z.prototype.changeFovLog = Z.prototype.ud;
Z.prototype.getRoll = Z.prototype.aj;
Z.prototype.setRoll = Z.prototype.Xj;
Z.prototype.setPanTilt = Z.prototype.Vj;
Z.prototype.setPanTiltFov = Z.prototype.$f;
Z.prototype.setDefaultView = Z.prototype.Qj;
Z.prototype.setLocked = Z.prototype.Tj;
Z.prototype.setLockedMouse = Z.prototype.Te;
Z.prototype.setLockedKeyboard = Z.prototype.Se;
Z.prototype.setLockedWheel = Z.prototype.Ih;
Z.prototype.moveTo = Z.prototype.moveTo;
Z.prototype.moveToDefaultView = Z.prototype.pj;
Z.prototype.addHotspotElements = Z.prototype.jg;
Z.prototype.playSound = Z.prototype.cd;
Z.prototype.playPauseSound = Z.prototype.xh;
Z.prototype.pauseSound = Z.prototype.Rf;
Z.prototype.activateSound = Z.prototype.ji;
Z.prototype.isPlaying = Z.prototype.zc;
Z.prototype.stopSound = Z.prototype.jk;
Z.prototype.setVolume = Z.prototype.$j;
Z.prototype.changeVolume = Z.prototype.wi;
Z.prototype.removeHotspots = Z.prototype.Bh;
Z.prototype.addHotspot = Z.prototype.ki;
Z.prototype.updateHotspot = Z.prototype.vk;
Z.prototype.removeHotspot = Z.prototype.Hj;
Z.prototype.setActiveHotspot = Z.prototype.gd;
Z.prototype.getPointHotspotIds = Z.prototype.Wi;
Z.prototype.getHotspot = Z.prototype.Ii;
Z.prototype.setFullscreen = Z.prototype.hd;
Z.prototype.toggleFullscreen = Z.prototype.cf;
Z.prototype.enterFullscreen = Z.prototype.Bi;
Z.prototype.exitFullscreen = Z.prototype.exitFullscreen;
Z.prototype.getIsFullscreen = Z.prototype.Ki;
Z.prototype.startAutorotate = Z.prototype.fk;
Z.prototype.stopAutorotate = Z.prototype.ik;
Z.prototype.toggleAutorotate = Z.prototype.nk;
Z.prototype.createLayers = Z.prototype.rg;
Z.prototype.removePanorama = Z.prototype.Ch;
Z.prototype.getScreenResolution = Z.prototype.Pg;
Z.prototype.getMaxScreenResolution = Z.prototype.Mg;
Z.prototype.getNodeIds = Z.prototype.Qi;
Z.prototype.getNodeUserdata = Z.prototype.Df;
Z.prototype.getNodeLatLng = Z.prototype.Ri;
Z.prototype.getNodeTitle = Z.prototype.Si;
Z.prototype.getCurrentNode = Z.prototype.Kg;
Z.prototype.getNextNode = Z.prototype.Ng;
Z.prototype.getPrevNode = Z.prototype.Zi;
Z.prototype.getCurrentPointHotspots = Z.prototype.Gi;
Z.prototype.getPositionAngles = Z.prototype.Yi;
Z.prototype.getPositionRawAngles = Z.prototype.Og;
Z.prototype.nodeVisited = Z.prototype.sj;
Z.prototype.setElementIdPrefix = Z.prototype.Rj;
Z.prototype.videoPanoPlay = Z.prototype.Hk;
Z.prototype.videoPanoStop = Z.prototype.Ik;
Z.prototype.videoPanoPause = Z.prototype.Gk;
Z.prototype.getVideoPanoTime = Z.prototype.dj;
Z.prototype.setVideoPanoTime = Z.prototype.Zj;
Z.prototype.getVideoPanoObject = Z.prototype.cj;
Z.prototype.disableSoundLoading = Z.prototype.Ai;
Z.prototype.setCrossOrigin = Z.prototype.Pj;