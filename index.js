'use strict';

const btnContainer = document.getElementsByClassName(
  'd-flex my-2 mx-md-2 flex-md-justify-end'
)[0];

const copyCommitBtn = document.createElement('button');

copyCommitBtn.type = 'button';
copyCommitBtn.className = 'btn btn-secondary';
copyCommitBtn.style.margin = '0px 10px';
copyCommitBtn.innerHTML = 'Copy commits';

btnContainer.insertBefore(copyCommitBtn, btnContainer.firstChild);

const handleButtonClick = () => {
  const commitMessageContainers = document.getElementsByClassName('TimelineItem-body');
  console.log(commitMessageContainers.length);

  let commitMessages = '';

  commitMessageContainers &&
    Object.keys(commitMessageContainers).forEach((key) => {
      const commitElement = commitMessageContainers[key].querySelector('div div div div code a');

      if (commitElement) {
        const commitMessage = commitElement.textContent.trim();
        commitMessages += `- ${commitMessage}\n`;
      }
    });

  copyCommitsToClipBoard(commitMessages);

  copyCommitBtn.innerHTML = 'Copied to clipboard!';

  setTimeout(() => {
    copyCommitBtn.innerHTML = 'Copy commits';
  }, 3000);
};


const copyCommitsToClipBoard = async (commitMessages) => {
  try {
    await navigator.clipboard.writeText(commitMessages);
    console.log('Copied to clipboard:', commitMessages);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
  }
};


btnContainer.addEventListener('click', handleButtonClick);