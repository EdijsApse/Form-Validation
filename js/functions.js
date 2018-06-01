function isEmpty(fieldValue){//Check if input field is empty | Passing input value
	var firstLevelStatus = {};// Will contain status for check and messsage
	if(fieldValue == ""){//If input is empty
		firstLevelStatus.value = true;
		firstLevelStatus.message = "Lauks nedrīkst būt tukšs";
	}
	else{//If input is not empty
		firstLevelStatus.value = false;
		firstLevelStatus.message = "";
	}
	return firstLevelStatus;//Returning object
}
function isCorrectFormat(regExp, inputValue, thirdValidation, thirdValidationNotation){//Check for correct format (RegExp) | Passing RegExp String, Input Value
	var secondLevelStatus = {},
		result = inputValue.match(regExp);//Result for match function
		secondLevelStatus.nextLevelValidation = thirdValidation;//So we know if third level validation is needed
		secondLevelStatus.thirdValidationName = thirdValidationNotation;//Name of field. By this i will know which function to call using switch loop
	if(result != null){//If format is correct
		secondLevelStatus.value = true;//Format is correct
	}
	else{
		secondLevelStatus.value = false;//Format is incorrect
		secondLevelStatus.message = "Formāts kuru tu ievadīji, nav derīgs";//Message to display
	}
	return secondLevelStatus;//Returning status object
}
function validDate(date){//Check for Valid Date (Date is yet to come)
	var dateNow = new Date(),//Date Now
		thirdLevelStatus = {},
		splitedInput,
		dateNowMils,//Date now milsecs
		dateToCheckMils,//Date to check mils
		dateToCheck = new Date(),//Temp date object for input value
		splitedInput = date.split("-");//Spliting input value into array
		for(var i=0; i < splitedInput.length; i++){//Looping thrue splitedInput array, to set values to number
			splitedInput[i] = Number(splitedInput[i]);
		}
		splitedInput[1] = splitedInput[1] - 1;//Taking -1 from month, cuz JS months start from 0
		dateToCheck.setFullYear(splitedInput[0],splitedInput[1],splitedInput[2]);//Setting date object
		dateNowMils = dateNow.getTime();//Getting mils sinc 1970
		dateToCheckMils = dateToCheck.getTime();//Getting mils sinc 1970
		if(dateToCheckMils < dateNowMils){
			thirdLevelStatus.message = "Datums jau ir Pagājis!";
			thirdLevelStatus.value = false;
		}
		else if(dateToCheck.getMonth() != splitedInput[1] || dateToCheck.getDate() != splitedInput[2]){
			thirdLevelStatus.message = "Datums Nav Korekts!";
			thirdLevelStatus.value = false;
		}
		else{
			thirdLevelStatus.value = true;
		}
		return thirdLevelStatus;
}
function validTime(inputValue){//Check for valid time (00:00 - 23:59)
	var time,
		thirdLevelStatus = {};//Object which will be returned
	time = inputValue.split(":");//Spliting input Value into 2 parts (hours, mins)
	for(var i=0; i < time.length; i++){
		time[i] = Number(time[i]);//Making sure that vals is Number
	}
	if(time[0] > 23 || time[1] > 59){
		thirdLevelStatus.message = "Izskatās, ka ievadītais laiks nav derīgs(00:00 - 23:59)!"
		thirdLevelStatus.value = false;
	}
	else{
		thirdLevelStatus.value = true;
	}
	return thirdLevelStatus;
}
function isChecked(uniqRadioButtons){
	var radioButtonStatus = {};
	for(var i=0, j=0; i < uniqRadioButtons.length; i++){//Looping thru all uniq radio buttons
		if(!$('input[name='+uniqRadioButtons[i]+']').is(":checked")){//Searching, if radio button isn't checked
			radioButtonStatus.value = false;
			radioButtonStatus.message = "Lūgums Aizpildīt visus laukus!";
			$('input[name='+uniqRadioButtons[i]+']').parents(".control-label").css({
				"box-shadow":"0px 0px 2px 0.2px #ff0000"
				})
		}
		else{
			$('input[name='+uniqRadioButtons[i]+']').parents(".control-label").css({
				"box-shadow":"none"
			})
			radioButtonStatus.value = true;
		}
	}
	return radioButtonStatus;
}
