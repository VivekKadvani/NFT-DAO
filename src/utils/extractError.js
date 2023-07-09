const extraxtError = async (e) => {
  const reasonRegex = /reason="([^"]*)"/;
  const match = reasonRegex.exec(e);
  const reason = match ? match[1] : null;

  if (reason === 'execution reverted: No NFTs exist for voting.') {
    return 'Please Own NFT First.';
  } else {
    return 'Vote : Disagree Failed.';
  }
};
export default extraxtError;
