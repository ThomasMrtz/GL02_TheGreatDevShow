//import { TypeQuestion } from './Question';

//import { Question } from './Question';

let Question = require('./Question');
let QuestionBank = require('./QuestionBank');
const TypeQuestion = require('./TypeQuestion');

// giftParser

let GiftParser = function(sTokenize, sParsedSymb){
    // The list of GIFT parsed from the input file.
    this.parsedQuestion = [];
	// this.symb = ['//', '::', '{', '}', '[', ']', '=', '~', '#', ' '];
	this.showTokenize = sTokenize;
	this.showParsedSymbols = sParsedSymb;
	this.errorCount = 0;
}

// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
GiftParser.prototype.tokenize = function(data){

	while (!this.check2Char('//', data) && !this.check2Char('::', data) && data.length > 0){
		this.next(data);
		data = this.reduce(data);
	}

	let tData = [];
	while (data.length > 0){

		let element_tab = [];
		let element = '';

		if (this.check2Char('::', data)){
			element_tab.push(this.next(data));
			data = this.reduce(data);
			element_tab.push(this.next(data));
			data = this.reduce(data);

			while (!this.check2Char('::', data)){
				element_tab.push(this.next(data));
				data = this.reduce(data);
			}

			element_tab.push(this.next(data));
			data = this.reduce(data);
			element_tab.push(this.next(data));
			data = this.reduce(data);

			while (!this.check2Char('//', data) && !this.check2Char('::', data) && data.length > 0){
				element_tab.push(this.next(data));
				data = this.reduce(data);
			}

		}else if (this.check2Char('//', data)){
			element_tab.push(this.next(data));
			data = this.reduce(data);
			element_tab.push(this.next(data));
			data = this.reduce(data);
			while (!this.check2Char('//', data) && !this.check2Char('::', data) && data.length > 0){
				element_tab.push(this.next(data));
				data = this.reduce(data);
			}
		}
		element = element_tab.join('');
		
		tData.push(element);
	}

	return tData;

}

// parse : analyze data by calling the first non terminal rule of the grammar
GiftParser.prototype.parse = function(data){
	let tData = this.tokenize(data);
	if(this.showTokenize){
		console.log(tData);
	}
	this.listGift(tData);
}

// Parser operand

GiftParser.prototype.errMsg = function(msg, input){
	this.errorCount++;
	console.log("Parsing Error ! on "+input+" -- msg : "+msg);
}


// Return the first element
GiftParser.prototype.next = function(input){

	let curS = input[0];
	if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS;

	/*
	let curS = input.shift();
	if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS
	*/
}

// Delete the first char from a string
GiftParser.prototype.reduce = function(input){
	return input.substring(1);
}


// check : check whether the arg elt is on the head of the list
GiftParser.prototype.check = function(s, input){
	if(input[0] == s){
		return true;	
	}
	return false;
}

// Same as check, but for '::', '//'
GiftParser.prototype.check2Char = function(s, input){
	if (input.substring(0, 2) == s){
		return true;
	}
	return false;
}

// Remove spaces, \r, \n at the end of the string
GiftParser.prototype.removeSpaces = function(input){
	for (let i = input.length - 1; i >= 0; i--){
		if (input[i] == ' ' || input[i] == '\n' || input[i] == '\r'){
			input = input.substring(0, i);
		}else{
			break;
		}
	}
	return input;
}

// Parser rules

// <liste_gift> = *(<gift>)
GiftParser.prototype.listGift = function(input){
	for (let i = 0; i < input.length; i++){
		this.gift(input[i]);
	}
}

// <gift> = "::" <question_title> "::" ["[" <text_formating> "]"] <text> "{" <answers> "}" <text> / "//" <comment>
GiftParser.prototype.gift = function(input){
	let gift_format = input;

	if(this.check2Char("::", input)){
		// Question
		input = this.reduce(input);
		input = this.reduce(input);
		let output = this.title(input);
		let title = output.ttl;
		input = output.in;

		let text_formating;
		if (this.check('[', input)){
			input = this.reduce(input);
			output = this.text_formating(input);
			text_formating = output.tf;
			input = output.in;
		}else{
			text_formating = null;
		}

		// Text / answers
		let type_question = null;
		let ca = [];
		let ia = [];
		let pca = [];
		let cf = [];
		let ife = [];
		let pcf = [];

		let question_text = '';

		while (input.length > 0){
			if (this.check('{', input)){
				input = this.reduce(input);
				let answers = this.answers(input);
				input = answers.in;
				type_question = answers.tq;
				ca.push(answers.ca);
				ia.push(answers.ia);
				pca.push(answers.pca);
				cf.push(answers.cf);
				ife.push(answers.ife);
				pcf.push(answers.pcf);
			}
			if ( input.length > 0){
				output = this.text(input);
				question_text = question_text + output.t;
				input = output.in;
			}
		}

		question_text = this.removeSpaces(question_text);

		let q = new Question(null, title, question_text, text_formating, type_question, ca, ia, pca, cf, ife, pcf, gift_format);
		if (title == ''){
			this.errMsg('Missing title', q);
		}
		this.parsedQuestion.push(q);
		Question.questionBank.push(q);

		return true;
	} else if (this.check2Char("//", input)){
		// Comments
        input = this.reduce(input);
		input = this.reduce(input);

		for (let i = input.length - 1; i >= 0; i--){
			if (input[i] == ' ' || input[i] == '\n' || input[i] == '\r'){
				input = input.substring(0, i);
			}else{
				break;
			}
		}
        let q = new Question(input, null, null, null, null, [], [], [], [], [], [], gift_format);
		this.parsedQuestion.push(q);
		return true;
    } else{
		this.errMsg('Invalid format', input);
		return false;
	}

}

// <title> = <title> '::'
GiftParser.prototype.title = function(input){
	let title_tab = [];
	while (!this.check2Char('::', input)){
		title_tab.push(this.next(input));
		input = this.reduce(input);
	}
	input = this.reduce(input);
	input = this.reduce(input);
	let title = title_tab.join('');
	return {in: input, ttl: title};
}

// <text_formating> = <text_formating> ']'
GiftParser.prototype.text_formating = function(input){
	let text_formating_tab = [];
	while (!this.check(']', input)){
		text_formating_tab.push(this.next(input));
		input = this.reduce(input);
	}
	input = this.reduce(input);
	let text_formating = text_formating_tab.join('');
	return {in: input, tf: text_formating};
}

// <text>
GiftParser.prototype.text = function(input){
	let text_tab = [];
	while (!this.check('{', input) && input.length > 0){
		text_tab.push(this.next(input));
		input = this.reduce(input);
	}
	let text = text_tab.join('');
	return {in: input, t: text};
}

// <answers> = ['#'] *('=' <answer> / '~' <answer> / '~=' <answer>) '}'
GiftParser.prototype.answers = function(input){

	while (input[0] == ' ' || input[0] == '\n' || input[0] == '\r'){
		input = this.reduce(input);
	}

	// Essay
	if (this.check('}', input)){
		input = this.reduce(input);
		Question.nbOpenQuestion++;
		return { tq: TypeQuestion.OPEN_QUESTION, ca: [], ia: [], pca: [], cf: [], ife: [], pcf: [], in: input};
	}

	let correct_answers = [];
	let incorrect_answers = [];
	let partially_correct_answer = [];
	let correct_feedbacks = [];
	let incorrect_feedbacks = [];
	let partially_correct_feedback = [];

	// Numeric answers
	if (this.check('#', input)){
		input = this.reduce(input);
		while (!this.check('}', input)){
			let numeric_answer_tab = [];
			let numeric_answer = '';
			let feedback_tab = [];
			let feedback = '';

			if (this.check('=', input)){
				input = this.reduce(input);
				while (!this.check('=', input) && !this.check('#', input) && !this.check('}', input)){
					numeric_answer.push(this.next(input));
					input = this.reduce(input);
				}
				numeric_answer = numeric_answer_tab.join('');
				numeric_answer = this.removeSpaces(numeric_answer);
				correct_answers.push(numeric_answer);

				if (this.check('#', input)){
					input = this.reduce(input);
					while (!this.check('=', input) && !this.check('}', input)){
						feedback_tab.push(this.next(input));
						input = this.reduce(input);
					}
					feedback = feedback_tab.join('');
					feedback = this.removeSpaces(feedback);
					correct_feedbacks.push(feedback);
				}
			}else{
				while (!this.check('}', input) && !this.check('#', input)){
					numeric_answer_tab.push(this.next(input));
					input = this.reduce(input);
				}
				numeric_answer = numeric_answer_tab.join('');
				numeric_answer = this.removeSpaces(numeric_answer);
				correct_answers.push(numeric_answer);

				if (this.check('#', input)){
					while (!this.check('}', input)){
						feedback_tab.push(this.next(input));
						input = this.reduce(input);
					}
					feedback = feedback_tab.join('');
					feedback = this.removeSpaces(feedback);
					correct_feedbacks.push(feedback);
				}
			}
		}
		input = this.reduce(input);
		Question.nbNumeric++;
		return {tq: TypeQuestion.NUMERIC, ca: correct_answers, ia: incorrect_answers, pca: partially_correct_answer, cf: correct_feedbacks, ife: incorrect_feedbacks, pcf: partially_correct_feedback, in: input};
	}

	// True False
	if (input.startsWith('TRUE')){
		for (let i = 0; i < 4; i++){
			input = this.reduce(input);
		}
		while (!this.check('}', input)){
			if (this.check('#', input)){
				let feedback_tab = [];
				let feedback = '';
				input = this.reduce(input);
				while (!this.check('}', input)){
					feedback_tab.push(this.next(input));
					input = this.reduce(input);
				}
				feedback = feedback_tab.join('');
				feedback = this.removeSpaces(feedback);
				correct_feedbacks.push(feedback);
			}else{
				input = this.reduce(input);
			}
		}
		correct_answers.push('TRUE');
		input = this.reduce(input);
		Question.nbTrueFalse++;
		return {tq: TypeQuestion.TRUE_FALSE, ca: correct_answers, ia: incorrect_answers, pca: partially_correct_answer, cf: correct_feedbacks, ife: incorrect_feedbacks, pcf: partially_correct_feedback, in: input};
	}
	if (input.startsWith('FALSE')){
		for (let i = 0; i < 4; i++){
			input = this.reduce(input);
		}
		
		while (!this.check('}', input)){
			if (this.check('#', input)){
				let feedback_tab = [];
				let feedback = '';
				input = this.reduce(input);
				while (!this.check('}', input)){
					feedback_tab.push(this.next(input));
					input = this.reduce(input);
				}
				feedback = feedback_tab.join('');
				feedback = this.removeSpaces(feedback);
				correct_feedbacks.push(feedback);
			}else{
				input = this.reduce(input);
			}
		}
		correct_answers.push('FALSE');
		input = this.reduce(input);
		Question.nbTrueFalse++;
		return {tq: TypeQuestion.TRUE_FALSE, ca: correct_answers, ia: incorrect_answers, pca: partially_correct_answer, cf: correct_feedbacks, ife: incorrect_feedbacks, pcf: partially_correct_feedback, in: input};
	}
	if (this.check2Char('T}', input) || this.check2Char('F}', input)){
		if (this.check('T', input)){
			correct_answers.push('T');
		}else if (this.check('F', input)){
			correct_answers.push(false);
		}
		input = this.reduce(input);
		input = this.reduce(input);
		Question.nbTrueFalse++;
		return {tq: TypeQuestion.TRUE_FALSE, ca: correct_answers, ia: incorrect_answers, pca: partially_correct_answer, cf: correct_feedbacks, ife: incorrect_feedbacks, pcf: partially_correct_feedback, in: input};
	}

	// Other
	while (!this.check('}', input)){
		let answer_tab = [];
		let answer = '';
		let feedback_tab = [];
		let feedback = '';

		if (this.check2Char('~=', input)){
			input = this.reduce(input);
			input = this.reduce(input);
			while (!this.check('=', input) && !this.check('~', input) && !this.check('#', input) && !this.check('}', input)){
				answer_tab.push(this.next(input));
				input = this.reduce(input);
			}
			answer = answer_tab.join('');
			answer = this.removeSpaces(answer);
			partially_correct_answer.push(answer);

			if (this.check('#', input)){
				input = this.reduce(input);
				while (!this.check('=', input) && !this.check('~', input) && !this.check('}', input)){
					feedback_tab.push(this.next(input));
					input = this.reduce(input);
				}
				feedback = feedback_tab.join('');
				feedback = this.removeSpaces(feedback);
				partially_correct_feedback.push(feedback);
			}
		} else if (this.check('=', input)){
			input = this.reduce(input);
			while (!this.check('=', input) && !this.check('~', input) && !this.check('#', input) && !this.check('}', input)){
				answer_tab.push(this.next(input));
				input = this.reduce(input);
			}
			answer = answer_tab.join('');
			answer = this.removeSpaces(answer);
			correct_answers.push(answer);

			if (this.check('#', input)){
				input = this.reduce(input);
				while (!this.check('=', input) && !this.check('~', input) && !this.check('}', input)){
					feedback_tab.push(this.next(input));
					input = this.reduce(input);
				}
				feedback = feedback_tab.join('');
				feedback = this.removeSpaces(feedback);
				correct_feedbacks.push(feedback);
			}
			
		}else if (this.check('~', input)){
			input = this.reduce(input);
			while (!this.check('=', input) && !this.check('~', input) && !this.check('#', input) && !this.check('}', input)){
				answer_tab.push(this.next(input));
				input = this.reduce(input);
			}
			answer = answer_tab.join('');
			answer = this.removeSpaces(answer);
			incorrect_answers.push(answer);

			if (this.check('#', input)){
				input = this.reduce(input);
				while (!this.check('=', input) && !this.check('~', input) && !this.check('}', input)){
					feedback_tab.push(this.next(input));
					input = this.reduce(input);
				}
				feedback = feedback_tab.join('');
				feedback = this.removeSpaces(feedback);
				incorrect_feedbacks.push(feedback);
			}
		}else{
			while (!this.check('=', input) && !this.check('~', input) && !this.check('#', input) && !this.check('}', input)){
				input = this.reduce(input);
			}
		}

	}
	input = this.reduce(input);

	let type_question;
	if (incorrect_answers.length > 0 || !correct_answers[0].includes('->')){
		if (input.length > 0){
			let test = true;
			for (let i = 0; i < input.length; i++){
				if (input[i] != ' ' && input[i] != '\n' && input[i] != '\r'){
					test = false;
				}
			}
			if (test){	// True if input is empty (only spaces, \n, \r)
				type_question = TypeQuestion.MULTIPLE_CHOICE;
				Question.nbMulipleChoice++;
			}else{
				type_question = TypeQuestion.MISSING_WORD;
				Question.nbMissingWord++;
			}
		}
	} else {
		type_question = TypeQuestion.MATCHING;
		Question.nbMatching++;
	}

	return {tq: type_question, ca: correct_answers, ia: incorrect_answers, pca: partially_correct_answer, cf: correct_feedbacks, ife: incorrect_feedbacks, pcf: partially_correct_feedback, in: input};
}


module.exports = GiftParser;