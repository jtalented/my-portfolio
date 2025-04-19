const useSmoothScroll = (target: string | number) => {
    window.scrollTo({
      top: Number(target),
      behavior: 'smooth',
    });
  };
  
  export default useSmoothScroll;
  