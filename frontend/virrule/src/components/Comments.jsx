import "../styles/Comments.css";

let commentIndex = 0;

function Comments() {
    const comments = [
        "hodi da rabotish",
        "emi nqqsh pari",
        "tui sh zabogateesh be smeshen",
        "pruc",
        "Pogledni se be brat mojesh poveche",
        "Bro u can spend this 5hours in something better like doing front lever",
        "Verno li si povqrva che moje da e lesno",
        "Zastho be",
        "Gordostta na mama",
        "Na tati gordostta",
        "Pochvaj da backash",
        "Spri sega bydi polovin idiot",
        "Po dobre kusno otkolkoto nikoga",
        "Lipsvat ti purvite 7 godini",
        "Ako ne bqha tvoi, sa kvo",
        " Bet mnogo se izkefi",
        "Mahalyolyo",
        "Samo spoko sledvasthiq put 100pro si ti",
        "45vrutki i si razvurtqn aj za ulicata",
        "Cherno cherveno maj pochervenq ot qd ",
        "Investitor v minusa",
        "Nova vrutka nova nadejda susthiq glupak",
        "Mersi za subsidiqta",
        "Donor nomer1",
        "Trenirash zagubi brooooooooo",
        "Plan A lesni pari, Plan B credit, Plan C podlez NDK",
        "Brat stiga upgradeva zagubite",
        "Kusmetut pak e v pochivka",
        "Otricatel IQ test",
        "Kazinoto te poznava po dobre ot gadjeto ue",
        "Speedrun na bednost",
        "Ti li si specialniq be",
        "Ti si sponsor ne igrach",
        "Self control left the chat",
        "IQ tax",
        "Minus aura",
        "Dokato ti spinvash, nqkoi kupuva apartament s tvoite pari",
        "Edin den she razberesh kolko vreme si prodal za nishto",
        "Ne si blizo do pechalba na kosum si  do zavisimost",
        



    ];

    const currentComment = comments[commentIndex % comments.length];
    commentIndex++;

    return (
        <div className="comments-popup comments-popup--attention">
            <p>{currentComment}</p>
        </div>
    );
}

export default Comments;