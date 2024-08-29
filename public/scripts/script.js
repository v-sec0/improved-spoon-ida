// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    //  Varibale declaration
    var clickCount = 0;
    let mainButton = $("#mainBtn");
    let resetButton = $('#resetBtn')
    let resultImage = $("#resultImage");
    let introPrompt = $(".intro-prompt");
    let imagePrompt = $(".image-prompt");
    let resultDialogue = $("#resultDialogue")
    let resultPrompt = $('#resultNarration')

    // Click functionality to button
    mainButton.click(function() {
        clickCount++;
        switch (clickCount) {
            case 1:
                mainButton.text("Continue");
                $("#introPromptOne").fadeIn();
                break;
            case 2:
                $("#introImage").fadeIn();
                mainButton.text("Hear what he has to say");
                break;
            case 3:
                $("#introPromptTwo").fadeIn();
                $("#name-input").fadeIn();
                mainButton.text("\"Who shall watch over me, O' ancient one!\"");
                break;
            case 4:
                introPrompt.hide();
                mainButton.hide();
                resultPrompt.fadeIn();
                resultDialogue.fadeIn();
                let userName = $("#name-input").val();
                resultDialogue.text("Placeholder");
                resultImage.fadeIn();
                AssignDaedra(userName);
                resetButton.fadeIn();
                break;
            default:
                console.log("button-clicked")
        }
    })

    resetButton.click(function(){
        location.reload();
    })

    function AssignDaedra(name) {
        let UCname = name.toUpperCase();
        let charOfSig = UCname.charAt(0);
        switch (charOfSig) {
            case 'A':
            case 'B':
                // Molag
                resultDialogue.text("I've never worshipped the divines, " + name +", but may they have mercy on you!");
                resultPrompt.text("Your daedric prince is Molag Bal, prince of torture, misery, and pain!");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/molag_bal.jpg');
                break;
            case 'C':
            case 'D':
                // Sanguine
                resultDialogue.text(`Well met ${name}, you are in for a fun time!`);
                resultPrompt.text('Your daedric prince is Sanguine, prince of dabauchery, pleasure, and hedonism.');
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/sanguine.jpg');
                break;
            case 'E':
            case 'F':
                // Hermaeus
                resultDialogue.text(`Ah, so the lord of knowledge is whom you serve, ${name}?`);
                resultPrompt.text("Your daedric prince is Hermaeus Mora, prince of forbidden knowledge, secrets, and fate.");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/hermaeus_mora.jpg');
                break;
            case 'G':
            case 'H':
                // Azura
                resultDialogue.text(`Wow, ${name}, I would've never thought you'd serve the lady of the dusk and dawn!`);
                resultPrompt.text("Your daedric prince is Azura, lady of dusk and dawn, the realm between the twilight, and fate and prophecy.");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/azura.jpg');
                break;
            case 'I':
            case 'J':
                // Clavicus
                resultDialogue.text(`Pray thee, be careful ${name}. To make a deal with the trickster is sure to lead to your end.`);
                resultPrompt.text("Your daedric prince is Clavicus Vile, prince of trickery and bargins. ");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/clavicus.jpg');
                break;
            case 'K':
            case 'L':
                // Hircine
                resultDialogue.text(`${name}, you must be a hunter, or a werebeast..`);
                resultPrompt.text("Your daedric prince is Hircine, prince of the hunt, beast, and the chase.");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/hircine.jpg');
                break;
            case 'M':
            case 'N':
                // Nocturnal
                resultDialogue.text(`You must be a no good theif, ${name}.. I want nothing to do with you!`);
                resultPrompt.text("Your daedric prince is Nocturnal, lady of the night, shadows, and thievery.");
                resultImage.attr('src', 'https://gchagnon.fr/daggerfall/daedras/nocturnal.jpg')
                break;
            case 'O':
            case 'P':
                // Malacath
                resultDialogue.text(`Sorry to say this ${name}, but you may be cursed!`);
                resultPrompt.text("Your daedric prince is Malacath, prince of lies, curses, and blood oaths ");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/malacath.jpg');
                break;
            case 'Q':
            case 'R':
                // Boethiat
                resultDialogue.text(`I want nothing to do with you... `);
                resultPrompt.text("Your daedric prince is Boethiah, lady of plots, cruelty, and schemes.");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/beothiah.jpg');
                break;
            case 'S':
            case 'T':
                // Sheogorath
                resultDialogue.text(`How are you even coherent enough to say your name!`);
                resultPrompt.text("Your daedric prince is Sheogorath, the Master of Madness! ");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/sheogorath.jpg');
                break;
            case 'U':
            case 'V':
                // Merhunes
                resultDialogue.text(`${name}! Are you crazy? You'll destory us all!`);
                resultPrompt.text("Your daedric prince is Mehrunes Dagon, prince of destruction, ambition, and disaster")
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/mehrunes.jpg');
                break;
            case 'W':
            case 'X':
                // Meridia
                resultDialogue.text(`Your future is bright ${name}.`);
                resultPrompt.text("Your daedric prince is Meridia, lady of light, luminance, and life!");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/meridia.jpg');
                break;
            case 'Y':
            case 'Z':
                // Peryite
                resultDialogue.text(`${name} you say? Stay back from me you vile disgusting piece of ...`);
                resultPrompt.text("Your daedric prince is Peryite, prince of pestilence. Yucky!");
                resultImage.attr('src','https://gchagnon.fr/daggerfall/daedras/peryite.jpg');
                break;
            default:
                resultDialogue.text("You must be an immbecile or related to Elon Musk.. Pray thee say a name!");
                resultImage.attr('src','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Felderscrolls2%2Fimages%2F6%2F6d%2FBraunes_Pferd_Daggerfall.gif%2Frevision%2Flatest%3Fcb%3D20170724123800%26path-prefix%3Dde&f=1&nofb=1&ipt=80cd58b328ec04b8727e36d81bcd3ced9daba94d0bc94824a367d255bc60169b&ipo=images')
                resultPrompt.text("Your daedric prince is nonexistent, so here's a horse.")
                break;
        }

    }





});
