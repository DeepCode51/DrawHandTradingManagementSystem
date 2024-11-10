
			$(".tab-left").click(function(){
				$('.tab-left').css('color','darkred');
				$('.tab-left').css('border-color','darkred');
				$('.tab-right').css('color','white');
				$('.tab-right').css('border-color','white');
				$('.mass').show();
				$('.single').hide();
			})
			
			$(".tab-right").click(function(){
				$('.tab-right').css('color','darkred');
				$('.tab-right').css('border-color','darkred');
				$('.tab-left').css('color','white');
				$('.tab-left').css('border-color','white');
				$('.mass').hide();
				$('.single').show();
			})
			