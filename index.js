'use strict';

const containerElement = document.getElementsByClassName(
  'd-flex my-2 mx-md-2 flex-md-justify-end'
)[0];

const copyButton = document.createElement('button');

copyButton.setAttribute('type', 'button');
copyButton.setAttribute('class', 'btn btn-secondary');
copyButton.setAttribute('style', 'margin: 0px 10px;');
copyButton.textContent = 'Snap the commits';

containerElement.insertBefore(copyButton, containerElement.firstChild);

const clickEvent = () => {
  const commitContainer = document.querySelectorAll('.commits_bucket .TimelineItem-body p');

  let formattedCommits = '';
  let commitNumber = 1;

  commitContainer.forEach((commitElement) => {
    const commit = commitElement.textContent.trim();
    formattedCommits += `${commitNumber}. ${commit}\n`;
    commitNumber++;
  });

  console.log('Commit Messages:', formattedCommits);

  if (formattedCommits) {
    snapCommits(formattedCommits);
    copyButton.textContent = 'Snapped';
    setTimeout(() => {
      copyButton.textContent = 'Snap the commits';
    }, 3000);
  } else {
    console.log('No commit messages found.');
  }
};

const snapCommits = async (formattedCommits) => {
  try {
    await navigator.clipboard.writeText(formattedCommits);
    console.log('Copied to clipboard:', formattedCommits);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
  }
};


containerElement.addEventListener('click', clickEvent);