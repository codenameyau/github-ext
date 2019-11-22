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
  console.log(targetBranch)
  if (targetBranch === "master") {
    var mergeBtn = document.querySelector(
      ".branch-action-state-clean details-menu > div > button:nth-child(1)"
    );
    mergeBtn && clickBtnWhenReady(mergeBtn);
  } else {
    var squashBtn = document.querySelector(
      ".branch-action-state-clean details-menu > div > button:nth-child(2)"
    );
    squashBtn && clickBtnWhenReady(squashBtn);
  }
}

function observeMergeBtn() {
  var observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };

  var mutationObserver = new MutationObserver(function(
    mutationsList,
    observer
  ) {
    setTimeout(updateMergeBtn, 1000);
  });

  mutationObserver.observe(
    document.querySelector(".merge-message .select-menu"),
    observerConfig
  );
}

setTimeout(updateMergeBtn, 1000);
// observeMergeBtn();
