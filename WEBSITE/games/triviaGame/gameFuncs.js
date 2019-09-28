current = 0;/*the question number (starting from 0) => there are 10 questions in the game*/
pointsForQuestions = 10;/*we choose to give the user 10 points for each correct answer !! */
var randindex=0;

var save_id;
answers = {
    correct: 0,
    incorrect: 0
};
var lastcorrectAnswerSeq = 0;/*last sequence of correct answers*/
var q_difficulty = 0;/*the current difficulty of the questions*/
diff = ["easy", "medium", "hard"];
$.fn.trivia = function () {
    var _t = this;
    _t.userPick = null;
    _t.ask = function () {
        if (current < 10) {
            $("button").hide();
            if (lastcorrectAnswerSeq >= 4)/*after 4 correct answers in sequence the question's difficulty increases*/
                if (q_difficulty < (diff.length - 1))
                    q_difficulty++;
            getQuestion(diff[q_difficulty]);
        }

        else {
            $("#score").show();
            var the_score = $('<p class="pink score_ "> ');
            the_score.text('Your score is: ' + (answers.correct * pointsForQuestions) + ' POINTS!!');
            $("#score").html(the_score);
            $("#start_button").text("Restart");
            $("button").hide();
            $("#question").hide();
            $("#start_button").show();
        }


    };

    _t.nextQ = function () {
        current++;
        clearInterval(window.triviaCounter);
        _t.ask();

    };

    _t.answer = function (correct) {
        var string = correct ? 'correct' : 'incorrect';

        if (correct == true)
            lastcorrectAnswerSeq++;
        else
            lastcorrectAnswerSeq = 0;
        answers[string]++;
    };
    return _t;
};
var Trivia;
$(document).ready(function () {


    $("#start_button").click(function () {
        $("#score").hide();
        $(this).hide();
        $("button").show();
      
        $('.result').remove();
        current = 0;
        Trivia = new $(window).trivia();
        Trivia.ask();
    });

    $("#choices").on('click', 'button', function (e) {
        if (current < 10) {
            var userPick = $(this).data("id"),
                _t = Trivia || $(window).trivia();
            if (userPick !== save_id) {
                _t.answer(false);
            } else {
                _t.answer(true);
            }

            _t.nextQ();
        }
    });



});




function getQuestion(diff) {
    $.ajax({

        url: 'https://opentdb.com/api.php?amount=1&category=' + document.getElementById("categories").value + '&difficulty=' + diff + '&type=' + document.getElementById("types").value,

        type: "get",

        success: function (data) {
            var question = $('<div class="pink size" style="padding: 2%;"> ');
            $("#question").show();
            question.html((current+1) + '. ' + data.results[0].question);
            $("#question").html(question);
            var choices = [];
            console.log(data.results[0]);
            choices.push(data.results[0].correct_answer);
            for (var j = 0; j < data.results[0].incorrect_answers.length; j++) {
                choices.push(data.results[0].incorrect_answers[j]);
            }

            choices_num = 4;
            if (data.results[0].type.localeCompare("boolean") == 0)
                choices_num = 2;
            randindex = Math.floor((Math.random() * 10) + 0);/*random number that used to change the index of the correct answer for each question*/
            var k = 0;
            for (var i = randindex; i <= randindex + (choices_num-1); i++) {
                button = $('<button class="size green"> ');
                button.html(choices[i % choices_num]);
                if (i % choices_num == 0)
                    save_id = k;
                button.attr('data-id', k);
                $('#ans' + k).html(button);
                k++;

            }
        }

    });
}






