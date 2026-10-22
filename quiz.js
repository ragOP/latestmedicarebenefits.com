(function () {
  var steps = [
    {
      q: "Are you over the age of 64?",
      yes: "YES, I'M 65 OR OLDER",
      no: "NO, I'M 64 OR YOUNGER",
      yesNext: 1,
      noNext: "review"
    },
    {
      q: "2. Do you live in the United States?",
      yes: "Yes",
      no: "No",
      yesNext: "review",
      noNext: "review"
    }
  ];
  var messages = [
    "Reviewing Your Answers...",
    "Matching With Best Options...",
    "Confirming Eligibility..."
  ];
  var step = 0;
  var question = document.getElementById("question");
  var yesBtn = document.getElementById("yes");
  var noBtn = document.getElementById("no");
  var quizView = document.getElementById("quiz-view");
  var statusView = document.getElementById("status-view");
  var doneView = document.getElementById("done-view");
  var mins = document.getElementById("mins");
  var secs = document.getElementById("secs");

  function showStep(i) {
    step = i;
    question.textContent = steps[i].q;
    yesBtn.textContent = steps[i].yes;
    noBtn.textContent = steps[i].no;
  }

  function finish() {
    quizView.hidden = true;
    statusView.hidden = false;
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
    var n = 0;
    statusView.textContent = messages[0];
    var timer = setInterval(function () {
      n += 1;
      if (n < messages.length) {
        statusView.textContent = messages[n];
        return;
      }
      clearInterval(timer);
      statusView.hidden = true;
      doneView.hidden = false;
      var start = Date.now();
      setInterval(function () {
        var left = Math.max(0, 180 - Math.floor((Date.now() - start) / 1000));
        mins.textContent = String(Math.floor(left / 60));
        secs.textContent = String(left % 60).padStart(2, "0");
      }, 1000);
    }, 1500);
  }

  function choose(which) {
    var next = steps[step][which];
    if (next === "review") finish();
    else showStep(next);
  }

  yesBtn.addEventListener("click", function () { choose("yesNext"); });
  noBtn.addEventListener("click", function () { choose("noNext"); });

  showStep(0);
})();
