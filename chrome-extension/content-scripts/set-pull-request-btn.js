// Make this customizable via popup.
const PROD = "master";
const STAGING = "staging";
const DEV = "edge";

const targetBranch = document.querySelector(".commit-ref.base-ref > a > span")
  .textContent;

const sourceBranch = document.querySelector(".commit-ref.head-ref > a > span")
  .textContent;

const dirtyMergeBtn = document.querySelector(
  ".branch-action.branch-action-state-dirty .merge-message .select-menu button"
);

const statusHeadingStates = {
  yellow: ".text-yellow",
  red: ".text-red"
};

const mergeBtn = document.querySelector(
  ".branch-action-state-clean details-menu > div > button:nth-child(1)"
);

const squashBtn = document.querySelector(
  ".branch-action-state-clean details-menu > div > button:nth-child(2)"
);

function clickBtnWhenReady(btnEl) {
  btnEl.click();
  document.activeElement.blur();
}

const shouldMerge = (
  (targetBranch === PROD && sourceBranch === STAGING) ||
  (targetBranch === STAGING && sourceBranch === DEV)
);

function updateMergeBtn() {
  if (shouldMerge) {
    mergeBtn && clickBtnWhenReady(mergeBtn);
  } else {
    squashBtn && clickBtnWhenReady(squashBtn);
  }

  window.scrollTo && window.scrollTo(0, 0);
}

// TODO: handle yellow status when checking PR in CI.
function observeMergeBtn() {
  const observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };

  const mutationObserver = new MutationObserver(function(
    mutationsList,
    observer
  ) {
    setTimeout(updateMergeBtn, 300);
    mutationObserver.disconnect();
  });

  mutationObserver.observe(
    document.querySelector(".merge-message .select-menu"),
    observerConfig
  );
}

if (mergeBtn && squashBtn) {
  setTimeout(updateMergeBtn, 300);
} else {
  observeMergeBtn();
}
