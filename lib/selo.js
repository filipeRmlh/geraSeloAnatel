function Selo(canvas,numAnatel,downloadLink,options){
    this.options = options ||{};
    this.bgColor=this.options.bgColor||"white";
    this.imgLoaded=false;
    this.canvas = canvas;
    this.img = new Image();
    this.numAnatel=numAnatel;
    this.ctx = this.canvas.getContext('2d');
    this.img.src = this.canvas.getAttribute("data-src");
    this.width = this.img.naturalWidth;
    this.height = this.img.naturalHeight;
    this.bgOpacity = 0||options.bgOpacity;
    this.scale={x:1,y:1};
    this.downloadButton = downloadLink;
    if(options.width)this.setW(options.width);
    if(options.height)this.setH(options.height);
}
Selo.prototype["setW"]=function(w){
    var ow = this.width;
    var oh = this.height;
    var p = ow/oh;
    this.height = w/p;
    this.width=w;
    var scaley = this.height/oh;
    var scalex = this.width/ow;
    this.scale.x *= scalex;
    this.scale.y *= scaley;
    this.draw();
}
Selo.prototype["setH"]=function(h){
    var ow = this.width;
    var oh = this.height;
    var p = ow/oh;
    this.width = h*p;    
    this.height=h;
    var scaley = this.height/oh;
    var scalex = this.width/ow;
    this.scale.x *= scalex;
    this.scale.y *= scaley;
    this.draw();
}
Selo.prototype['draw']=function(){
    _this=this;
    var d = function(){
        _this.canvas.width=_this.width;
        _this.canvas.height=_this.height;
        _this.ctx.fillStyle=_this.bgColor;
        _this.ctx.globalAlpha = _this.bgOpacity;
        _this.ctx.fillRect(0,0,_this.width,_this.height);
        _this.ctx.globalAlpha=1;
        _this.ctx.scale(_this.scale.x,_this.scale.y);
        _this.ctx.drawImage(_this.img,0,0);
        _this.ctx.font="30pt Arial";
        _this.ctx.textAlign="center";
        _this.ctx.fillStyle="black";
        _this.ctx.fillText(_this.numAnatel, (_this.width/2)/_this.scale.x, _this.height*0.87/_this.scale.y);
        _this.canvas.style.border="1px solid black"; 
        _this.ctx.resetTransform();
    }
    if(!this.imgLoaded){this.img.onload = d;this.imgLoaded=true}else{d();}
}

Selo.prototype["setDownload"]=function () {
    var download = this.downloadButton;
		var image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		download.setAttribute("href", image);
		download.setAttribute("download","SeloAnatel.png");
}
