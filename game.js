document.addEventListener("DOMContentLoaded", function() {
    function initialState () {
        return {
            score: 0,
            lives: 3,
            moles: [
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("first-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("second-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("third-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("fourth-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("fifth-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("sixth-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("seventh-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("eighth-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("ninth-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("tenth-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("eleventh-hole")
                },
                {
                    status: "leaving",
                    next: getLeavingInterval(),
                    king: false,
                    node: document.getElementById("twelfth-hole")
                },
            ]
        }
    }
    
    const state = initialState();
    let score = state.score;
    let lives = state.lives;
    let moles = state.moles;
    
    function getHungryInterval () {
        return Date.now() + Math.floor(Math.random() * 3000) + 1500;
    }
    
    function getSadInterval () {
        return Date.now() + 1000;
    }
    
    function getHappyInterval () {
        return Date.now() + 700;
    }
    
    function getLeavingInterval () {
        return Date.now() + 1000;
    }
    
    function getGoneInterval () {
        return Date.now() + Math.floor(Math.random() * 22000) + 2000;
    }
    
    function getKingStatus() {
        return ( Math.random() > 0.9 )
    }
    
    
    function checkLives () {
        lives--
        if ( lives < 1) {
            moles = initialState().moles;
            document.querySelector(".playground").classList.add("hidden");
            document.querySelector(".underground").classList.remove("hidden");
            document.getElementById("lives").innerText = `Lives left: ${0}`;
            return
        }
        document.getElementById("lives").innerText = `Lives left: ${lives - 1}`;
    }
    
    function getNextStatus (mole) {
        switch (mole.status) {
            case "hungry":
                mole.next = getSadInterval();
                mole.node.children[0].classList.remove("hungry");
                    if (mole.king) {
                        mole.node.children[0].src = "./pictures/king-mole-sad.png"
                    } else {
                        mole.node.children[0].src = "./pictures/mole-sad.png"
                    };
                mole.status = "sad";
                break;
            case "fed":    
            case "sad":
                mole.next = getLeavingInterval();
                    if (mole.king) {
                        mole.node.children[0].src = "./pictures/king-mole-leaving.png"
                    } else {
                        mole.node.children[0].src = "./pictures/mole-leaving.png"
                    };
                if (mole.status === "sad") {
                    checkLives(mole)
                }
                mole.status = "leaving";
                break;
            case "leaving":
                mole.next = getGoneInterval();
                mole.node.children[0].classList.toggle("hidden", true);
                mole.status = "gone";
                break;
            case "gone":
                mole.next = getHungryInterval();
                mole.king = getKingStatus();
                mole.node.children[0].classList.toggle("hidden", false);
                mole.node.children[0].classList.add("hungry");
                    if (mole.king) {
                        mole.node.children[0].src = "./pictures/king-mole-hungry.png"
                    } else {
                        mole.node.children[0].src = "./pictures/mole-hungry.png"
                    };
                mole.status = "hungry";
                break;
        }
    }
    
    
    function feed (event) {
        if (event.target.tagName !== "IMG" || !event.target.classList.contains("hungry")) {
            return
        }
    
        const mole = moles[parseInt(event.target.dataset.index) - 1];
    
        mole.next = getHappyInterval();
        mole.node.children[0].classList.remove("hungry");
            if (mole.king) {
                mole.node.children[0].src = "./pictures/king-mole-fed.png"
                score += 4
            } else {
                mole.node.children[0].src = "./pictures/mole-fed.png"
                score++
            };
        
        mole.status = "fed";
        
        if (score < 115) { 
            document.querySelector(".worm-container").style.width = `${3 + score}%`;
        }
        document.getElementById("score").innerText = `Your score: ${score}`;
    }
    
    
    let runAgainAt = Date.now() + 100;
    
    function nextFrame () {
        const now = Date.now();
    
        if (runAgainAt <= now) {
            for ( let i = 0; i < moles.length; i++ ) {
                if( moles[i].next <= now ) {
                    getNextStatus(moles[i]);
                }
            }
            runAgainAt = now + 100;
        } 
        requestAnimationFrame(nextFrame);
    }
    
    document.querySelector("main").addEventListener("click", feed);
    document.getElementById("lives").innerText = `Lives left: ${lives - 1}`;
    
    
    document.querySelector("button").addEventListener("click", function() {
        score = initialState().score;
        document.getElementById("score").innerText = `Your score: ${score}`;
        lives = initialState().lives;
        document.getElementById("lives").innerText = `Lives left: ${lives - 1}`;
        moles = initialState().moles;
        document.querySelector(".worm-container").style.width = `${3 + score}%`;
        document.querySelector(".playground").classList.remove("hidden");
        document.querySelector(".underground").classList.add("hidden");
        nextFrame()
    })
})

