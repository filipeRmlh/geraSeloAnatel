function mascaraAnatel(inputAnatel){
    var valor = inputAnatel.value;
    var novo =  valor.replace(/([0-9]{5})([0-9])/,"$1-$2");
    novo =  novo.replace(/([0-9]{5})\-([0-9]{2})([0-9])/,"$1-$2-$3");
    novo =  novo.replace(/([^0-9\-])/,"");
    novo = novo.replace(/(.{14})(.{1,})/,"$1");
    inputAnatel.value = novo;
   return novo.length == 14;
}
var selo;
var link = document.getElementById('download');
var cv = document.getElementById('canvas');
selo = new Selo(cv,"",link,{bgColor:'white'});

var valid=[];
function validateDownload(){
    if(valid[0]&&valid[1]&&valid[2]){
        selo.setDownload();
    }
}

setValues=function(el,el2,el3){
    var el = document.querySelector("[name=numAnatel]")
    var el2 = document.querySelector("[name=bgColor]")
    var el3 = document.querySelector("[name=size]")
    var el4 = document.querySelector("[name=opacity]")
    //num anatel
    if(mascaraAnatel(el)){
        el.style.backgroundColor="#99ff99";
        valid[0]=true;
        selo.numAnatel=el.value; 
    }else{
        valid[0]=false;
        el.style.backgroundColor="#ffaa99";
    }
    //BG
    valid[1]=true;
    selo.bgColor=el2.value;
    //Size
    selo.setW(el3.value);
    valid[2]=true;
    //BG
    valid[3]=true;
    selo.bgOpacity=el4.value/100;
    selo.draw();
    validateDownload();
}
document.querySelector("[name=numAnatel]").addEventListener("keydown",setValues);
document.querySelector("[name=bgColor]").addEventListener("change",setValues)
document.querySelector("[name=opacity]").addEventListener("input",setValues)
document.querySelector("[name=size]").addEventListener("input",setValues);
setValues();