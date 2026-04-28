import React, { useEffect, useState } from 'react'

function CopyToClipbord({text, message="Copied to clipboard"}) {
    const [copied, setCopied] = useState(false);
 const copyToClipboard = async (text) => {
    if(!text) {
        setCopied(false)
        return
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Modern API (PC, mobile, secure context)
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / insecure contexts
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; // avoid scrolling to bottom
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true)
      return true;
    } catch (err) {
      setCopied(false)
      return false;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(null)
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  
  return (
    <>
    <button className='font-mono font-bold text-sm px-2 bg-muted text-foreground rounded-sm cursor-pointer' onClick={() => copyToClipboard(text)}>{text}</button>
    <div className={`fixed z-[888888] bottom-16 left-[50%] translate-x-[-50%] py-2.5 px-4 rounded-lg bg-black/75 dark:bg-white/75 text-white dark:text-black transition-all duration-200 ${copied ? 'visible opacity-100' : 'invisible opacity-0'}`}>{message}</div>
    </>
  )
}

export default CopyToClipbord