var targetBranch = document.querySelector(".commit-ref.base-ref > a > span")
  .textContent;

var sourceBranch = document.querySelector(".commit-ref.head-ref > a > span")
  .textContent;

var dirtyMergeBtn = document.querySelector(
  ".branch-action.branch-action-state-dirty .merge-message .select-menu button"
);

var statusHeadingStates = {
  yellow: '.text-yellow',
  red: '.text-red'
};

function clickBtnWhenReady(btnEl) {
  btnEl.click();
  document.activeElement.blur();
}

function updateMergeBtn() {
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

function observeStatusHeading() {
  var statusHeadingEl = document.querySelector(
    ".branch-action-body .status-heading.h4"
  );

  var mergeDetailsEl = document.querySelector('.mergeability-details');

  var observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
    attributeFilter: ["class"],
    attributeOldValue: true,
    characterDataOldValue: true
  };

  var mutationObserver = new MutationObserver(function(
    mutationsList,
    observer
  ) {
    console.log(mutationsList, observer);
    debugger;
  });

  mutationObserver.observe(document.body, observerConfig);
}

setTimeout(updateMergeBtn, 0);
observeStatusHeading();
