const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve(true);
      }
  
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = err => reject(err);
      document.body.appendChild(script);
    });
  };
  
  export default loadScript;
  