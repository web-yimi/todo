$(document).ready(function(){
	var add=$('.add');
	var ul=$('ul');
	var input=$('input');
	var todos=[];
	var span=$('span');
	var arrPic=['../img/11.png','../img/12.png','../img/13.png','../img/14.png','../img/15.png'];
	var r=Math.floor(Math.random()*9);
	$('.start').on('touchend',function(){
		$(this).addClass('rotate');
	})
	$('.setting').on('touchend',function(){
		alert(1)
	})
	if(localStorage.todo){
		todos=JSON.parse(localStorage.todo)
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].states)?'done':'';
			$('<li class='+c+'><div class="pic"></div><div class="con">'+todos[i].name+"</div><div class='del'>+</div></li>").appendTo(ul);
			$('.pic').css('background',"'url('+arrPic[r]+')'")
			console.log('url('+arrPic[r]+')')
			localStorage.todo=JSON.stringify(todos);
		}
	}
	input.on('touchend',function(){
		span.hide();
	})
	add.on('touchend',function(){
		var v=$.trim(input.val());
		if(!v){
			return;
		}
		var todo={
			name:v,
			states:0
		};
		todos.push(todo);
		$("<li><div class='pic'></div><div class='con'>"+todo.name+"</div><div class='del'>+</div></li>").appendTo(ul);
		localStorage.todo=JSON.stringify(todos);
		input.val('');
	});
	var startPos;
	ul.on('touchstart','li',function(e){
		startPos=e.originalEvent.changedTouches[0].clientX;
	});
	ul.on('touchend','li',function(e){
		var endPos=e.originalEvent.changedTouches[0].clientX;
		if(endPos-startPos>50){
			var index=$(this).index();
			$('ul li').eq(index).addClass('done');
			todos[index].states=1;
			localStorage.todo=JSON.stringify(todos);	
		}else if(endPos-startPos<-50){
			var index=$(this).index();
			$('ul li').eq(index).removeClass('done');
			todos[index].states=0;
			localStorage.todo=JSON.stringify(todos);	
		}
	})
	ul.on('touchend','.del',function(e){
		var m=$(this).closest('li').index();
		ul.find('li').eq(m).remove();
		todos.splice(m,1)
		localStorage.todo=JSON.stringify(todos);
	})
	var divs=$('.footer div');
	divs.each(function(index){
		$(this).on('touchend',function(){
			var role=$(this).attr('data-role');
			divs.removeClass('active');
			divs.eq(index).addClass('active');
			ul.find('li').show()
			if(role=='finish'){
				ul.find('li:not(.done)').hide()
			}else if(role=='unfinish'){
				ul.find('li.done').hide();
			}
		})
	})
})
