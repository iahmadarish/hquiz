import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import lgoai from "../utils/ai.png"
import lgo from "../utils/lgoo.svg"
import slidimg from "../utils/slider.jpg"
import mobileview1 from "../utils/mobileview1.jpg"
import mobileview2 from "../utils/mobileview2.png"

export default function Welcome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 2;
    const slides = [
        {
            id: 1,
            image: slidimg,
            mobileImage: mobileview1,
            title: "Welcome to Evoked! I'm Joy 👋",
            description: "Your AI-friend for building confidence. I can help you pick scents that fits your vibe, feels amazing and gets compliments ❤️"
        },
        {
            id: 2,
            image: slidimg,
            mobileImage: mobileview2,
            title: "I'm by your side, whenever you need me 😊",
            description: "When we're not talking about scents, we can chat about work, health and relationship problems that's impacting your confidence levels.",
        }
    ];

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 15000,
        pauseOnHover: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        arrows: false,
        rtl: false,
        centerMode: true,
        centerPadding: '200px',  // Adjusted padding for preview effect
        className: "center",
        responsive: [
            {
                breakpoint: 776,
                settings: {
                    centerMode: false,
                    centerPadding: '00px',
                }
            }
        ]
    };

    const ProgressIndicator = ({ currentStep, totalSteps }) => {
        return (
            <div className="flex justify-center items-center space-x-2 w-full">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-300 ease-out ${index === currentStep
                            ? 'flex-grow h-3 bg-white rounded-full'
                            : 'w-3 h-3 bg-white rounded-full'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <header className="bg-black p-4">
                <div className="text-center">
                    <img src={lgo} alt="eveoked" className="mx-auto" />
                </div>
            </header>

            {/* Mobile View */}
            <div className="md:hidden h-[calc(100vh-72px)]">
                <Slider {...settings} className="h-screen">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="h-full">
                            <div className="relative h-full flex flex-col">
                                {/* Background Image with Gradient */}
                                <div className="absolute inset-0">
                                    <img
                                        src={slide.mobileImage}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative flex-1 flex flex-col justify-end items-center px-6 pb-32">
                                    <div className="w-24 h-24 mt-[380px]">
                                        <img
                                            src={lgoai}
                                            alt="Joy mascot"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="text-center mb-4">
                                        <h1 className="text-2xl font-semibold text-white mb-4">
                                            {slide.title}
                                        </h1>
                                        <p className="text-gray-200 text-sm leading-relaxed mb-8">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Indicator */}
                                <div className="">
                                    <div className="absolute mx-auto w-[200px] bottom-24 left-0 right-0 px-6">
                                        <ProgressIndicator currentStep={currentSlide} totalSteps={totalSlides} />
                                    </div>
                                </div>

                                {/* Bottom Button */}
                                <div className="absolute bottom-8 left-0 right-0 px-6">
                                    {index === 0 ? (
                                        <button
                                            className="w-full bg-white text-black py-3 rounded-lg text-center font-medium cursor-not-allowed"
                                            disabled
                                        >
                                            Swipe to Start
                                        </button>
                                    ) : (
                                        <Link
                                            to="/egconversation"
                                            className="block w-full bg-white text-black py-3 rounded-lg text-center font-medium"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Desktop View */}
            <main className="hidden md:block max-w-7xl overflow-x-hidden h-full mx-auto px-12 py-8">
                <div className="flex items-start gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                        <img
                            src={lgoai}
                            alt="Joy mascot"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold mb-2">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-gray-600">
                            {slides[currentSlide].description}
                        </p>
                    </div>
                </div>

                <div className="w-full relative mb-8">
                    <div className={`transition-all duration-300 ease-in-out ${currentSlide === 1 ? '-translate-x-[100px]' : ''}`}>
                        <Slider {...settings}>
                            {slides.map((slide) => (
                                <div key={slide.id} className="relative px-2">
                                    <div className="relative rounded-xl overflow-hidden">
                                        <img
                                            src={slide.image}
                                            alt={`Slide ${slide.id}`}
                                            className="w-full h-[400px] object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {currentSlide === 1 && (
                    <div className="flex justify-end px-[75px]">
                        <Link
                            to="/egconversation"
                            className="text-black"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
                                <path d="M34.68 6.81212L28.875 0.947115C28.7356 0.806523 28.5697 0.694931 28.3869 0.618778C28.2041 0.542625 28.008 0.503418 27.81 0.503418C27.612 0.503418 27.4159 0.542625 27.2331 0.618778C27.0503 0.694931 26.8844 0.806523 26.745 0.947115C26.4656 1.22816 26.3088 1.60834 26.3088 2.00462C26.3088 2.40089 26.4656 2.78107 26.745 3.06212L32.085 8.44712H1.5C1.10218 8.44712 0.720644 8.60515 0.43934 8.88646C0.158035 9.16776 0 9.54929 0 9.94712C0 10.3449 0.158035 10.7265 0.43934 11.0078C0.720644 11.2891 1.10218 11.4471 1.5 11.4471H32.175L26.745 16.8621C26.6044 17.0016 26.4928 17.1675 26.4167 17.3503C26.3405 17.533 26.3013 17.7291 26.3013 17.9271C26.3013 18.1251 26.3405 18.3212 26.4167 18.504C26.4928 18.6868 26.6044 18.8527 26.745 18.9921C26.8844 19.1327 27.0503 19.2443 27.2331 19.3205C27.4159 19.3966 27.612 19.4358 27.81 19.4358C28.008 19.4358 28.2041 19.3966 28.3869 19.3205C28.5697 19.2443 28.7356 19.1327 28.875 18.9921L34.68 13.1721C35.5227 12.3284 35.996 11.1846 35.996 9.99212C35.996 8.79961 35.5227 7.65587 34.68 6.81212Z" fill="#010101" />
                            </svg>
                        </Link>
                    </div>
                )}
            </main>

            <style jsx global>{`
                /*@media (min-width: 776px) {
    .slick-slide {
        opacity: 0.5;
        transition: all 0.3s ease;
        transform: scale(0.9);
    }
    .slick-current {
        opacity: 1;
        transform: scale(1);
    }
    .slick-slide > div {
        margin: 0 8px;
    }
    .slick-list {
        overflow: visible;
        padding: 0 200px; /* Adjust padding here for more preview area */
    }
    .slick-track {
        display: flex;
        align-items: center;
    }
}
                
                /* Mobile Slider Styles */
                @media (max-width: 776px) {
                    .slick-list {
                        overflow: hidden;
                        height: 100%;
                    }
                    .slick-track, 
                    .slick-slider, 
                    .slick-list {
                        height: 100%;
                    }
                    .slick-slide > div {
                        height: 100%;
                    }
                }
            `}</style>
        </div>
    );
}