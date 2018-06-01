$(document).ready(function(){	
	$(".notification, .radio-notification, .errorMsg, .succMsg").hide();
	$("#send").click(function(){
		var regExps = {//Defining all possible RegExp's which will be used
				defaultRegexp:/^[a-zēūīāšģķļņ0-9\s]*$/i,//Default - Checking for letters and numbers only
				dateRegexp:/^([0-9]{4})-([0-9]{2})-([0-9]{2})*$/,//Check for correct date format
				timeRegexp:/^[0-9][0-9]:[0-9][0-9]*$/,//Check for correct time format
				personRegexp:/^[a-zēūīāšģķļņ\s]*$/i,//Check for person name and surname
				placeRegexp:/^[0-9\sa-zēūīāšģķļņ]*$/i,//Check for correct location format (office number - name of place)
				contactRegexp:/^([0-9]{8}|)///Check for correct phone number or email
			},
			radioValidation,//Validation for radio buttons
			radioButtons = [],//All Radio Buttons
			uniqRadioButtons = [];//Uniq Radio Buttons	
		$("input[type='text']:not('#eventComment')").each(function(index, element) {//Running function for each input type='text' element
            var firstValidation = isEmpty($(element).val()),//Will contain check object
				secondValidation,
				thirdValidation = false,//To know if 3rd validation is needed
				thirdValidationCheck,//This will contain object who will be returned from function
				thirdValidationNotation,//Will contain input field name to know which function to call
				secondLevelAccess = false,//To know, if input will go to second level validation
				thirdLevelAccess = false,
				usedRegExp,//Will cntain regExp string which will be pased to function
				messageContainer = $(element).parent().siblings(".notification");//Message if something is wrong
			//First validation
			if(firstValidation.value == true){//If field input is empty / First validation Level
				$(messageContainer).children("p").text(firstValidation.message);
				$(messageContainer).fadeIn("slow");//Show Error Message
			}
			else{//Go To Second validation level - RegExp match
				switch($(element).attr("name")){//Need switch loop to know which regExp to use on which field
					case "date":
						thirdValidation = true;//I am telling that there will be Third Level Validation
						thirdValidationNotation = $(element).attr("name");
						usedRegExp = regExps.dateRegexp;
						break;
					case "eventTimeFrom":
						thirdValidation = true;
						thirdValidationNotation = $(element).attr("name");
						usedRegExp = regExps.timeRegexp;
						break;
					case "eventTimeTill":
						thirdValidation = true;
						thirdValidationNotation = $(element).attr("name");
						usedRegExp = regExps.timeRegexp;
						break;
					case "eventPlace":
						usedRegExp = regExps.placeRegexp;
						break;
					case "eventResponsiblePerson":
						usedRegExp = regExps.personRegexp;
						break;
					case "eventinfo":
						usedRegExp = regExps.contactRegexp;
						break;
					default:
						usedRegExp = regExps.defaultRegexp;
				}
				//Calling function with parametrs
				secondValidation = isCorrectFormat(usedRegExp, $(element).val(), thirdValidation, thirdValidationNotation);
				//If field is empty, make sure to not check for 2nd level validation, thats why secondLevelAccess var is needed
				secondLevelAccess = true;//Access for second level
			}
			//Second Validation
			if(secondLevelAccess == true){//Access granted
				if(secondValidation.value == false){//If format is incorrect
					$(messageContainer).children("p").text(secondValidation.message);
					$(messageContainer).fadeIn("slow");//Show Message
				}
				else{//If format is correct
					//Check if there is 3rd level to go to
					if(secondValidation.nextLevelValidation == true){
						switch(secondValidation.thirdValidationName){//Check, which function to call based on field name
							case "date":
								thirdValidationCheck = validDate($(element).val());//Calling last Validation function
								break;
							default://I know i have only time to check and date, so time function will be default, which we call
								thirdValidationCheck = validTime($(element).val());//Calling last Validation function
						}
						thirdLevelAccess = true;//Third Level Validation Access Granted
					}
					else{//Else, hide Message
						$(messageContainer).fadeOut("slow");//Fade Out message
					}
				}
			}
			//Third validation (If needed)
			if(thirdLevelAccess == true){
				if(thirdValidationCheck.value == false){//If format is incorrect
					$(messageContainer).children("p").text(thirdValidationCheck.message);
					$(messageContainer).fadeIn("slow");//Show Message
				}
				else{
					$(messageContainer).fadeOut("slow");//Hide Message
				}
			}
        });
		$("input[type='radio']").each(function(index, element) {
			radioButtons.push($(element).attr("name"));//Pushing all radio button names into array
        });
		uniqRadioButtons.push($("input[type='radio']").attr("name"));//Pushing first radio Button, to start comparing
		for(var i=0, j=0; i < radioButtons.length; i++){//Looping thrue all radio buttons and finding duplicates
			if(uniqRadioButtons[j] != radioButtons[i]){//If name is uniq
				uniqRadioButtons.push(radioButtons[i]);//Push into uniq array
				j++;//To compare next
			}
		}
		radioValidation = isChecked(uniqRadioButtons);
		if(radioValidation.value == false){
			$(".radio-notification").fadeIn("slow");
			$(".radio-notification > p").text(radioValidation.message);
		}
		else{
			$(".radio-notification").fadeOut("slow");
		}
	});	
});