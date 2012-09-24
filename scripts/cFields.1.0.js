/**
 * jQuery cFields 1.0
 * Developed by: André Figueira
 * Copyright (c) 2011 André Figueira
 *
 * This script is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the Free 
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 */ 
jQuery.fn.cFields = function(options)
{

	var defaults = {
		animation:'slide',
		speed:'fast',
		label:false
	}
	
	var options = jQuery.extend(defaults, options);	
	
	var checked = '';	
	
	//On click of the fake select
			
	//If the element is a select
	if(jQuery(this).is('select'))
	{
	
		jQuery(this).each(function(){
			var itemID = jQuery(this).attr('id');
		
			//Get the selected value
			if(options.label == true){ var selected = jQuery('#' + itemID + ' option:selected').text(); }else{ var selected = jQuery(this).val(); }
			
			//Create the custom field HTML
			var html = '<a class="cField" id="fake' + itemID + '" href="javascript:{}"><span class="label">' + selected + '</span><span class="cFieldArrow"></span></a>';
			
			//Hide real element	
			jQuery(this).hide();
			
			//Append the fake field after the real element
			jQuery(this).after(html);
		});
	
	}
	else if(jQuery(this).is('input[type=checkbox]'))
	{
	
		jQuery(this).each(function(){
		
			//Get the ID of the element
			var itemID = jQuery(this).attr('id');
	
			//If the checkbox is checked then set the class for the fake checkbox
			if(jQuery(this).is(':checked')){ checked = 'cFieldCheckboxChecked';}else{ checked = '';}
			
			var html = '<a class="cFieldCheckbox ' + checked + '" id="fake' + itemID + '" href="javascript:{}"></a>';
			
			//Add the fake html button after the real one
			jQuery(this).after(html);
			
			//Hide real checkbox	
			jQuery(this).hide();
			
			jQuery('label[for=' + itemID + ']').attr('for', 'fake' + itemID);
			
			jQuery('label[for=fake' + itemID + ']').click(function(event){
		
	     		event.stopPropagation();
				
				jQuery('#fake' + itemID).toggleClass('cFieldCheckboxChecked');
				
				if(jQuery('#' + itemID).is(':checked'))
				{
				
					jQuery('#' + itemID).removeAttr('checked');
				
				}
				else
				{
				
					jQuery('#' + itemID).attr('checked', 'checked');
				
				}
			
			});
				
		});
	
	}
	else if(jQuery(this).is('input[type=file]'))
	{
	
		jQuery(this).each(function(){
		
			//Get the ID of the element
			var itemID = jQuery(this).attr('id');
		
			var html = '<a class="cFieldFile" id="fake' + itemID + '" href="javascript:{}">Browse</a><span class="fakeFileName" rel="fake' + itemID + '">No file selected</span>';
			
			//Add the fake html button after the real one
			jQuery(this).after(html);
			
			//Hide real file button	
			jQuery(this).hide();
			
			jQuery('label[for=' + itemID + ']').attr('for', 'fake' + itemID + '');
			
			jQuery('#fake' + itemID).click(function(event){
		
	     		event.stopPropagation();
	     		
	     		jQuery('#' + itemID).click();
		     		
	     		jQuery('#' + itemID).live('change', function(){
		     		
		     		var fileName = jQuery(this).val().replace(/C:\\fakepath\\/i, '');
		     		
		     		jQuery('.fakeFileName[rel=fake' + itemID + ']').html(fileName);
		     		
	     		});
			
			});
		
		});
	
	}
		//jquery event click for selects outside the loop
		jQuery('.cField').click(function(event){
				//Get the ID of the element
				var itemID = jQuery(this).attr('id');
				itemID = itemID.replace("fake", "");
				
				var items = 1;
		     	event.stopPropagation();
				
				//Remove existing fake lists from other drop downs
				if(jQuery('.cFieldLists').size() > 0){ jQuery('.cFieldLists').remove();}
			
				if(items == 1)
				{
				
					//Create the drop down for the fake select

					var resultList = '<ul style="position:absolute;" class="cFieldLists' + itemID + ' cFieldLists">';
					
					//Look through each option of the real select
					jQuery('#' + itemID + ' > option').each(function(){
						
						var optionText = jQuery(this).text();
						var optionValue = jQuery(this).val();
					
						if(optionText != '')//If the option is not empty
						{
					
							//Append a fake option to the fake list
							resultList = resultList + '<li optionID="' + optionValue + '" optionText="' + optionText + '">' + optionText + '</li>';
						
						}
			    		
					});
					
					//End the fake list
					resultList = resultList + '</ul>';
					//Add the fake list after the fake button
					jQuery(this).after(resultList);
					
					var offset  = jQuery(this).offset();
					var itemleft = offset.left;
					jQuery('.cFieldLists' + itemID).css({left:itemleft + "px"});
					
					//Change set position to equal the container //Krato
					var offset  = $(this).offset();
					var itemleft = offset.left;
					$('.cFieldLists' + itemID).css({left:itemleft + "px"});

					
					//If animation is slide slide down or fade in
					if(options.animation == 'slide'){ jQuery('.cFieldLists' + itemID).slideDown(options.speed);}else if(options.animation == 'fade'){ jQuery('.cFieldLists' + itemID).fadeIn(options.speed);}
					
					//On click of the fake options
					jQuery('.cFieldLists' + itemID + ' li').click(function(){
					
						//If animation is slide slide down or fade in
						if(options.animation == 'slide')
						{
						
							jQuery('.cFieldLists' + itemID).slideUp(options.speed, function(){
							
								//Remove the field
								jQuery('.cFieldLists').remove();
							
							});
						
						}
						else if(options.animation == 'fade')
						{
						
							jQuery('.cFieldLists' + itemID).fadeOut(options.speed, function(){
							
								//Remove the field
								jQuery('.cFieldLists').remove();
							
							});
						
						}
						
						//Get the country name for the new option
						var optionText = jQuery(this).attr('optionText');
						
						//Remove selected 
						jQuery('#' + itemID + ' option:selected').removeAttr('selected');
						
						//Add selected to the real select
						jQuery('#' + itemID + ' option:contains(\'' + optionText + '\')').attr('selected', 'selected');
						
						//Change the fake selected text
						jQuery('#fake' + itemID + ' .label').html(optionText);
						
					});
					
					//On click away from the item
					jQuery(document).ready(function(){
					
						jQuery('body').click(function(){
					
							//If animation is slide slide down or fade in
							if(options.animation == 'slide')
							{
							
								jQuery('.cFieldLists' + itemID).slideUp(options.speed, function(){
								
									//Remove the field
									jQuery('.cFieldLists').remove();
								
								});
							
							}
							else if(options.animation == 'fade')
							{
							
								jQuery('.cFieldLists' + itemID).fadeOut(options.speed, function(){
								
									//Remove the field
									jQuery('.cFieldLists').remove();
								
								});
							
							}
						
						});
					
					});
				
				//	count++;
				
				}
			
			});
	

}