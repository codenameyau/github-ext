var targetBranch = document.querySelector(".commit-ref.base-ref > a > span")
  .textContent;

var sourceBranch = document.querySelector(".commit-ref.head-ref > a > span")
  .textContent;

var dirtyMergeBtn = document.querySelector(
  ".branch-action.branch-action-state-dirty .merge-message .select-menu button"
);

var statusHeadingYellow = document.querySelector(
  ".merge-pr.is-merging > poll-include-fragment > div > div > div > div:nth-child(3) > div.h4.status-heading.text-yellow"
);

var statusHeading = document.querySelector(
  ".branch-action-body .status-heading.h4"
);

function clickBtnWhenReady(btnEl) {
  btnEl.click();
  document.activeElement.blur();
}

function setMergeBtn() {
  if (targetBranch === "master") {
    var mergeBtn = document.querySelector(
      ".branch-action.branch-action-state-clean details > details-menu > div > button:nth-child(1)"
    );
    mergeBtn && clickBtnWhenReady(mergeBtn);
  } else {
    var squashBtn = document.querySelector(
      ".branch-action.branch-action-state-clean details > details-menu > div > button:nth-child(2)"
    );
    squashBtn && clickBtnWhenReady(squashBtn);
  }
}

function checkIfBtnIsClickable() {
  if (statusHeading && statusHeading.classList.contains('.text-yellow')) {
    var MAX_ATTEMPTS = 120;
    var attempts = 0;

    var intervalID = setInterval(function() {
      setMergeBtn();

      if (
        ++attempts >= MAX_ATTEMPTS ||
        !statusHeading.classList.contains(".text-yellow")
      ) {
        window.clearInterval(intervalID);
      }
    }, 2000);
  }

  else {
    setTimeout(setMergeBtn, 1000);
  }
}

checkIfBtnIsClickable();
