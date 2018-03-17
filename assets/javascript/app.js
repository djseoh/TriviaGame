$(document).ready(function(){
    $.fn.trivia = function() {
        var t = this;
        t.userPick = null;
        t.answers = {
            correct: 0,
            incorrect: 0
        };
        t.images = null;
        t.count = 30;
        t.current = 0;
        t.questions = [{
            question: "What is the national sport of Japan?",
            choices: ["Sumo", "Kendo", "Karate", "Ping-Pong"],
            correct: 0
        }, {
            question: "Which baseball team won the World Series in 1903?",
            choices: ["Atlanta Braves", "Boston Americans", "New York Yankees", "Cleveland Indians"],
            correct: 1
    
        }, {
            question: "What was Yogi Berra's real name?",
            choices: ["John Berra", "Linvel Peter Berra", "Peter Berra", " Lawrence Peter Berra"],
            correct: 3
    
        }, {
            question: "Who is the all time leading point scorer in NBA history?",
            choices: ["Wilt Chaimberlain", "Kareem Abdul-Jabbar", "LeBron James", "Michael Jordan"],
            correct: 1
    
        }, {
            question: "What is the most popular sport in the world?",
            choices: ["Soccer", "Volleyball", "Basketball", "Tennis"],
            correct: 0
    
        }, {
            question: "Which male tennis player has won the most Grand Slam titles?",
            choices: ["Rafael Nadal", "Andre Agassi", "Roger Federer", "Pete Sampras"],
            correct: 2
    
        }, {
            question: "Which NFL team overcame a 25-point deficit to win a Super Bowl?",
            choices: ["San Francisco 49ers", "LA Rams", "New England Patriots", "Chicago Bears"],
            correct: 2
    
        }, {
            question: "The Heisman Memorial Trophy is awarded annually to the most outstanding player in which college sport?",
            choices: ["Basketball", "Soccer", "Baseball", "Football"],
            correct: 3
        }];
        t.ask = function() {
            if (t.questions[t.current]) {
                $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
                $("#question_div").html(t.questions[t.current].question);
                var choicesArr = t.questions[t.current].choices;
                var buttonsArr = [];
    
                for (var i = 0; i < choicesArr.length; i++) {
                    var button = $('<button>');
                    button.text(choicesArr[i]);
                    button.attr('data-id', i);
                    $('#choices_div').append(button);
                }
                window.triviaCounter = setInterval(t.timer, 1000);
            } else {
                $('body').append($('<div />', {
                    text: 'Unanswered: ' + (
                        t.questions.length - (t.answers.correct + t.answers.incorrect)),
                    class: 'result'
                }));
                $('#start_button').text('Restart').appendTo('body').show();
            }
        };
        t.timer = function() {
            t.count--;
            if (t.count <= 0) {
                setTimeout(function() {
                    t.nextQ();
                });
    
            } else {
                $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
            }
        };
        t.nextQ = function() {
            t.current++;
            clearInterval(window.triviaCounter);
            t.count = 30;
            $('#timer').html("");
            setTimeout(function() {
                t.cleanUp();
                t.ask();
            }, 1000)
        };
        t.cleanUp = function() {
            $('div[id]').each(function(item) {
                $(this).html('');
            });
            $('.correct').html('Correct answers: ' + t.answers.correct);
            $('.incorrect').html('Incorrect answers: ' + t.answers.incorrect);
        };
        t.answer = function(correct) {
            var string = correct ? 'correct' : 'incorrect';
            t.answers[string]++;
            $('.' + string).html(string + ' answers: ' + t.answers[string]);
        };
        return t;
    };
    var Trivia;
    
    $("#start_button").click(function() {
        $(this).hide();
        $('.result').remove();
        $('div').html('');
        Trivia = new $(window).trivia();
        Trivia.ask();
    });
    
    $('#choices_div').on('click', 'button', function(e) {
        var userPick = $(this).data("id"),
            t = Trivia || $(window).trivia(),
            index = t.questions[t.current].correct,
            correct = t.questions[t.current].choices[index];
    
        if (userPick !== index) {
            $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
            t.answer(false);
        } else {
            $('#choices_div').text("Correct!!! The correct answer was: " + correct);
            t.answer(true);
        }
        t.nextQ();
    });
})