import { useState, useRef, useEffect } from "react";
import UpArrow from "../Icons/UpArrow";

const ScrollerBlob = () => {
    const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
    const scrollToTopRef = useRef(0);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 300) {
          setScrollToTopVisible(true);
        } else {
          setScrollToTopVisible(false);
        }
    }
    
    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    return (
        <div style={{display: scrollToTopVisible ? "flex" : "none"}} ref={scrollToTopRef} onClick={scrollToTop} className="sm:flex sm:justify-center sm:items-center sm:fixed sm:w-12 sm:h-12 sm:rounded-[12px] sm:bg-[#ef4444] sm:bottom-0 sm:right-0 sm:m-2 cursor-pointer">
            <UpArrow />
        </div>
    )
} 

export default ScrollerBlob;