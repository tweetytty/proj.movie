$(document).ready(function(){
	
	menu.fnDirectionIcon();
	menu.fnEventBind();
	
});

var menu = {
	fnEventBind : function(){
		//MAIN MENU UI 버튼 이벤트 
		$("div[btnMainUiMenu]").each(function(){
			var id = $(this).attr("btnMainUiMenu");
			
			//$(this).unbind('click').click(menu.goPageSelectTemplate);
		});
		
		
		//LEFT MENU UI 버튼 이벤트 
		$("div[btnCommonUiMenu]").each(function(){
			var id = $(this).attr("btnCommonUiMenu");
			
			if(id == "home"){
				$(this).unbind('click').click(function(){
					window.location.reload();
				});
			}
		});

	},
	
	fnDirectionIcon : function(){
		$(".side_bottom nav ul li, .side_bottom2 nav ul li, .side_bottom3 nav ul li").hover(
			function(){
				$(this).find('a').css({'color':'#f92672'});
				$(this).find('img').attr({'src':'images/common/navi_arrow_over.png'});
			},
			
			function(){
				$(this).find('a').css({'color':'#ababab'});
				$(this).find('img').attr({'src':'images/common/navi_arrow_normal.png'});
			}
		);
		
		$( ".side_bottom nav ul li, .side_bottom2 nav ul li, .side_bottom3 nav ul li" ).on( "click", function() {
			$(this).find('a').css({'color':'#bb084d'});
			$(this).find('img').attr({'src':'images/common/navi_arrow_pressed.png'});
		});
	}
};
