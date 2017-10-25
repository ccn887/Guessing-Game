var game;
function Game(){
    this.winningNumber = generateWinningNumber();
    this.playersGuess = null;
    this.pastGuesses = []
}
function generateWinningNumber(){
    return Math.floor(Math.random() * 100 +1)
    
    } 
    function shuffle(array){
            var m = array.length, t, i;
                while (m) {
          
              i = Math.floor(Math.random() * m--);
          
              t = array[m];
              array[m] = array[i];
              array[i] = t;
            }
          
            return array;
          }
 Game.prototype.difference = function(){
        var result = this.winningNumber - this.playersGuess;
        if(result < 0){
            result *= -1;
        }
        return result;
            }
 Game.prototype.isLower = function(){
        if(this.playersGuess < this.winningNumber){
            $('#subtitle').text("Try a number that's less small.")
            return true;
        } 
            $('#subtitle').text('Why don\'t you choose a littler number?')
            return false
                }
Game.prototype.playersGuessSubmission = function(guess) {
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();
    }

Game.prototype.checkGuess = function(){
    if(this.playersGuess === this.winningNumber){
        $('#subsubtitle').text("You've bested me! Finally, a worthy opponent. Well played.");
        $('#subtitle').text("Click the reset button if you're up for another game.");
        $('#hint, #submit').prop("disabled",true)
        return 'You Win!'
    } else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            $('#title').text("Guess again! Press the Reset button.")
            return "You have already guessed that number."
    } 
    else {
        this.pastGuesses.push(this.playersGuess);
        $('#guesses li:nth-child(' + this.pastGuesses.length+')').text(this.playersGuess);
        if(this.pastGuesses.length === 5){
            $('#hint, #submit').prop("disabled",true)
            $('#subsubtitle').text('You\'ve lost. You\ve lost everything. We are all doomed.')
            $('#subtitle').text("Click the reset button if you dare to try again.");
        return 'You Lose.'
    } 
    else {
        var diff = this.difference();
        if(diff < 10){
            $('#subsubtitle').text("Don't torture me!")
            return "You\'re burning up!"
        }
        else if(diff < 25){
            $('#subsubtitle').text("An intriguing move! Aye, you may get it yet.")
            return "You\'re lukewarm."
        }
        else if(diff < 50){
            $('#subsubtitle').text("Get your act together.")
            return "You\'re a bit chilly."
        }
        else if(diff < 100){
            $('#subsubtitle').text("IS THIS A GODDAMN JOKE TO YOU?")
            return "You\'re ice cold!"
     }}}}}

     function newGame(){
         return new Game;
     }

Game.prototype.provideHint = function(){
    var a = generateWinningNumber.call();
    var b = generateWinningNumber.call();
    var c = this.winningNumber;
    var array = [c, a, b];

    shuffle.call(this,array)
    return array;
        }


function timeToGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(+guess);
    $('#title').text(output)
}
$(document).ready(function(){
    game = new Game();
    $('#submit').on('click', function(){
        timeToGuess(game);
    })
    $('player-input').on('keypress', function(){
        if(event.which == 13){
        timeToGuess(game);
        }
    })
})
$('#hint').on('click', function() {
    var hints = game.provideHint();
    $('#title').text('Pay attention, if you please! The winning number is one of these: '+hints[0]+', '+hints[1]+', or '+hints[2]+'.');
});

$('#reset').on('click', function() {
    game = newGame();
    $('#title').text('Guessing Game!');
    $('#subtitle').text('Pick a number, any number*!')
    $('#subsubtitle').text('*Between 1 and 100.')
    $('.guess').text('-');
    $('#hint, #submit').prop("disabled",false);
    $('#submit').on('click', function(){
        timeToGuess(game);
    })
    $('player-input').on('keypress', function(){
        if(event.which == 13){
        timeToGuess(game);
        }
    })
})