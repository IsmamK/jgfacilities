import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        if (isElementInView(el)) {
          el.classList.add("visible");
        }
      });
    };

    // Check if the element is in view
    const isElementInView = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Call handleScroll initially to check if any elements are in view on page load
    handleScroll();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useScrollAnimation;
