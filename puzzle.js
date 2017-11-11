var time=0;//保存定时时间

var pause=true;//暂停标志

var set_timer;//设置定时函数

var d = new Array(17);//保存大DIV当前装的小DIV编号

var d_direct=new Array(
	[0],
	[2,5],
	[1,3,6],
	[2,4,7],
	[3,8],
	[1,6,9],
	[2,5,7,10],
	[3,6,8,11],
	[4,7,12],
	[5,10,13],
	[6,9,11,14],
	[7,10,12,15],
	[8,11,16],
	[9,14],
	[10,13,15],
	[11,14,16],
	[12,15]
	);

var d_posXY=new Array(
	[0],
	[0,0],
	[150,0],
	[300,0],
	[450,0],
	[0,150],
	[150,150],
	[300,150],
	[450,150],
	[0,300],
	[150,300],
	[300,300],
	[450,300],
	[0,450],
	[150,450],
	[300,450],
	[450,450]
	);

d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=9;d[10]=10;d[11]=11;
d[12]=12;d[13]=13;d[14]=14;d[15]=15;d[16]=0;


function move(id){
	var i=1;
	for(i = 1;i<17;i++){
		if(d[i]==id) break;
	}
	var target_d = 0;
	target_d=whereCanTo(i);
	if(target_d != 0){
		d[i] = 0;
		d[target_d]=id;
		document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
		document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
	}
	var finish_flag = true;
	for (var k = 1; k < 16; k++) {
		if(d[k] != k){
			finish_flag = false;
			break;
		}
	}
	if(finish_flag){
		if(!pause)
			start();
		alert("大吉大利，晚上吃鸡！");
	}
}

function whereCanTo(cur_div){
	var j = 0;
	var move_flag=false;
	for(j=0;j<d_direct[cur_div].length;j++){
		if(d[ d_direct[cur_div][j] ] == 0){
			move_flag = true;
			break;
		}
	}
	if(move_flag == true){
		return d_direct[cur_div][j];
	}else{
		return 0;
	}
}

function timer(){
	time +=1;
	var min=parseInt(time/60);
	var sec=time%60;
	document.getElementById("timer").innerHTML = min +"分"+sec+"秒";
}

function start(){
	if(pause){
		document.getElementById("start").innerHTML="stop";
		pause = false;
		set_timer=setInterval(timer, 1000);
	}else{
		document.getElementById("start").innerHTML="start";
		pause = true;
		clearInterval(set_timer);
	}
}

function reset(){
	time = 0;
	random_d();
	if(pause)
		start();
}

function random_d(){
	for(var i=16;i>1;--i){
		var to = parseInt(Math.random()*(i-1)+1);
		if(d[i]!=0){
			document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
			document.getElementById("d"+d[i]).style.top=d_posXY[to][1]+"px";
		}
		if(d[to]!=0){
			document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
			document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";
		}
		var tem=d[to];
		d[to]=d[i];
		d[i]=tem;
	}
}

window.onload=function(){
	reset();
}