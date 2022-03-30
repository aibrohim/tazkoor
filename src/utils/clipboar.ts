export const Clipboard = (function(window, document, navigator) {
  let textArea:any;
  let copy: any;

  function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text: any) {
      textArea = document.createElement('textArea');
      textArea.value = text;
      document.body.appendChild(textArea);
  }

  function selectText() {
      let range:any;
      let selection:any;

      if (isOS()) {
          range = document.createRange();
          range.selectNodeContents(textArea);
          selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textArea.setSelectionRange(0, 999999);
      } else {
          textArea.select();
      }
  }

  function copyToClipboard() {        
      document.execCommand('copy');
      document.body.removeChild(textArea);
  }

  copy = function(text: any) {
      createTextArea(text);
      selectText();
      copyToClipboard();
  };

  return {
      copy: copy
  };
})(window, document, navigator);

// How to use
Clipboard.copy('text to be copied');