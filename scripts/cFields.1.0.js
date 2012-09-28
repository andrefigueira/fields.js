/**
 * $ cFields 1.0
 * Developed by: André Figueira
 * Copyright (c) 2011 André Figueira
 *
 * This script is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the Free 
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 */ 
$.fn.cFields = function(options)
{

	var defaults = {
		animation:'slide',
		speed:'fast',
		label:false
	}
	
	var options = $.extend(defaults, options);	
	
	var checked = '';	
	
	//On click of the fake select
			
	//If the element is a select
	if($(this).is('select'))
	{
	
		$(this).each(function(){
			var itemID = $(this).attr('id');
		
			//Get the selected value
			if(options.label == true){ var selected = $('#' + itemID + ' option:selected').text(); }else{ var selected = $(this).val(); }
			
			//Create the custom field HTML
			var html = '<a class="cField" id="fake' + itemID + '" href="javascript:{}"><span class="label">' + selected + '</span><span class="cFieldArrow"></span></a>';
			
			//Hide real element	
			$(this).hide();
			
			//Append the fake field after the real element
			$(this).after(html);
			
		});
	
	}
	else if($(this).is('input[type=checkbox]'))
	{
	
		$(this).each(function(){
		
			//Get the ID of the element
			var itemID = $(this).attr('id');
	
			//If the checkbox is checked then set the class for the fake checkbox
			if($(this).is(':checked')){ checked = 'cFieldCheckboxChecked';}else{ checked = '';}
			
			var html = '<a class="cFieldCheckbox ' + checked + '" id="fake' + itemID + '" href="javascript:{}"></a>';
			
			//Add the fake html button after the real one
			$(this).after(html);
			
			//Hide real checkbox	
			$(this).hide();
			
			$('label[for=' + itemID + ']').attr('for', 'fake' + itemID);
			
			$('label[for=fake' + itemID + ']').click(function(event){
		
	     		event.stopPropagation();
				
				$('#fake' + itemID).toggleClass('cFieldCheckboxChecked');
				
				if($('#' + itemID).is(':checked'))
				{
				
					$('#' + itemID).removeAttr('checked');
				
				}
				else
				{
				
					$('#' + itemID).attr('checked', 'checked');
				
				}
			
			});
				
		});
	
	}
	else if($(this).is('input[type=file]'))
	{
	
		$(this).each(function(){
		
			//Get the ID of the element
			var itemID = $(this).attr('id');
		
			var html = '<a class="cFieldFile" id="fake' + itemID + '" href="javascript:{}">Browse</a><span class="fakeFileName" rel="fake' + itemID + '">No file selected</span>';
			
			//Add the fake html button after the real one
			$(this).after(html);
			
			//Hide real file button	
			$(this).hide();
			
			$('label[for=' + itemID + ']').attr('for', 'fake' + itemID + '');
			
			$('#fake' + itemID).click(function(event){
		
	     		event.stopPropagation();
	     		
	     		$('#' + itemID).click();
		     		
	     		$('#' + itemID).live('change', function(){
		     		
		     		var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
		     		
		     		$('.fakeFileName[rel=fake' + itemID + ']').html(fileName);
		     		
	     		});
			
			});
		
		});
	
	}
		//$ event click for selects outside the loop
		$('.cField').click(function(event){
		
				//Get the ID of the element
				var itemID = $(this).attr('id');
				itemID = itemID.replace("fake", "");
				
				var items = 1;
		     	event.stopPropagation();
				
				//Remove existing fake lists from other drop downs
				if($('.cFieldLists').size() > 0){ $('.cFieldLists').remove();}
			
				if(items == 1)
				{
				
					//Create the drop down for the fake select

					var resultList = '<ul style="position:absolute;" class="cFieldLists' + itemID + ' cFieldLists">';
					
					//Look through each option of the real select
					$('#' + itemID + ' > option').each(function(){
						
						var optionText = $(this).text();
						var optionValue = $(this).val();
					
						if(optionText != '')//If the option is not empty
						{
					
							//Append a fake option to the fake list
							resultList = resultList + '<li optionID="' + optionValue + '" optionText="' + optionText + '">' + optionText + '</li>';
						
						}
			    		
					});
					
					//End the fake list
					resultList = resultList + '</ul>';
					//Add the fake list after the fake button
					$(this).after(resultList);
					
					var offset  = $(this).offset();
					var itemleft = offset.left;
					$('.cFieldLists' + itemID).css({left:itemleft + "px"});
					
					//Change set position to equal the container //Krato
					var offset  = $(this).offset();
					var itemleft = offset.left;
					$('.cFieldLists' + itemID).css({left:itemleft + "px"});

					
					//If animation is slide slide down or fade in
					if(options.animation == 'slide'){ $('.cFieldLists' + itemID).slideDown(options.speed);}else if(options.animation == 'fade'){ $('.cFieldLists' + itemID).fadeIn(options.speed);}
					
					//On click of the fake options
					$('.cFieldLists' + itemID + ' li').click(function(){
					
						//If animation is slide slide down or fade in
						if(options.animation == 'slide')
						{
						
							$('.cFieldLists' + itemID).slideUp(options.speed, function(){
							
								//Remove the field
								$('.cFieldLists').remove();
							
							});
						
						}
						else if(options.animation == 'fade')
						{
						
							$('.cFieldLists' + itemID).fadeOut(options.speed, function(){
							
								//Remove the field
								$('.cFieldLists').remove();
							
							});
						
						}
						
						//Get the country name for the new option
						var optionText = $(this).attr('optionText');
						
						//Remove selected 
						$('#' + itemID + ' option:selected').removeAttr('selected');
						
						//Add selected to the real select
						$('#' + itemID + ' option:contains(\'' + optionText + '\')').attr('selected', 'selected');
						
						//Trigger change event
						$('#' + itemID).trigger('change');
						
						//Change the fake selected text
						$('#fake' + itemID + ' .label').html(optionText);
						
					});
					
					//On click away from the item
					$(document).ready(function(){
					
						$('body').click(function(){
					
							//If animation is slide slide down or fade in
							if(options.animation == 'slide')
							{
							
								$('.cFieldLists' + itemID).slideUp(options.speed, function(){
								
									//Remove the field
									$('.cFieldLists').remove();
								
								});
							
							}
							else if(options.animation == 'fade')
							{
							
								$('.cFieldLists' + itemID).fadeOut(options.speed, function(){
								
									//Remove the field
									$('.cFieldLists').remove();
								
								});
							
							}
						
						});
					
					});
				
				//	count++;
				
				}
			
			});
	

}