export default function copyToClipboard(value) {
  const valueToCopy = value;

  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = valueToCopy;
  document.body.appendChild(textarea);

  // Copy the value to the clipboard
  textarea.select();
  document.execCommand('copy');

  // Remove the temporary textarea element
  document.body.removeChild(textarea);

  // Optional: Provide user feedback
  alert('Value copied to clipboard: ' + valueToCopy);
}
