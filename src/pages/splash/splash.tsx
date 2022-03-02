import { FC, useState } from "react";
import TinySlider, { TinySliderInfo } from "tiny-slider-react";

import Splash1 from "assets/images/splash-1.jpg";
import Splash2 from "assets/images/splash-2.jpg";

import Container from "components/container/container";
import Button from "components/button/button";

import "tiny-slider/dist/tiny-slider.css";
import "./splash.scss";
import { useRef } from "react";

interface SettingsTypes {
  items: number;
  nav: boolean;
  controls: boolean;
  speed: number;
};

const settings:SettingsTypes = {
  items: 1,
  nav: false,
  controls: false,
  speed: 300,
};

interface SlideTypes {
  img: string,
  title: string,
  description: string
}

const slides:SlideTypes[] = [
  {
    img: Splash1,
    title: "Create a dictionary book for yourself",
    description: "Whether a medieval typesetter chose to garble a well-known"
  },
  {
    img: Splash2,
    title: "Create a dictionary book for yourself - 2",
    description: "Whether a medieval typesetter chose to garble a well-known"
  },
  {
    img: Splash1,
    title: "Create a dictionary book for yourself - 3",
    description: "Whether a medieval typesetter chose to garble a well-known"
  },
]

const Splash:FC = function() {
  const [ activeSlideIndex, setActiveSlideIndex ] = useState<number>(1);

  const sliderRef = useRef<any>(null);
  const slideImgRef = useRef<HTMLSpanElement>(null);

  const handleIndexChange = (slider: TinySliderInfo):void => setActiveSlideIndex(slider.index);
  const handleNextClick = ():void => sliderRef.current?.slider.goTo("next");

  const handleTransitionStart = function():void {
    const timeOut:number = 10;

    slideImgRef.current?.classList.remove("splash__img--animated");
    setTimeout(():void => {
      slideImgRef.current?.classList.add("splash__img--animated");
    }, timeOut);
  };

  const activeImg: string = 
    activeSlideIndex <= slides.length && activeSlideIndex !== 0
      ? slides[activeSlideIndex - 1].img 
      : slides[0].img;

  return (
    <>
      <h1 className="visually-hidden">Tazkoor - ease learning words</h1>
      <div className="splash">
        <span 
          ref={slideImgRef} 
          className="splash__img" 
          style={{backgroundImage: `url("${activeImg}")`}} 
        />
        <div className="splash__slider">
          <TinySlider 
            settings={settings}
            ref={sliderRef}
            onIndexChanged={handleIndexChange}
            onTransitionStart={handleTransitionStart}
          >
            {
              slides.map((slide, index) => {
                const notLastOne = index !== slides.length - 1;
                return (
                  <div key={index} className="splash__item">
                    <Container className="splash__container">
                      <div className="splash__item-content">
                        <p className="splash__item-title">{slide.title}</p>
                        <p className="splash__item-description">{slide.description}</p>
  
                      </div>
                      <Button
                        onClick={notLastOne && handleNextClick}
                        className="splash__btn"
                        link={!notLastOne}
                        to={"/sign-up"}
                      >
                        {notLastOne ? "Keyingisi" : "Ro'yxatdan o'tish"}
                      </Button>
                    </Container>
                  </div>
                );
              })
            }
          </TinySlider>
          <Container>
            <div className="splash__indicators">
              {
                slides.map((_, index) => (
                  <button 
                    key={index} 
                    className={
                      "splash__indicator "
                      + 
                      (
                        index + 1 === activeSlideIndex
                        ? "splash__indicator--active" 
                        : ""
                      )
                    } 
                  />
                ))
              }
            </div>
          </Container>
        </div>
      </div>
    </>
  )
};

export default Splash;