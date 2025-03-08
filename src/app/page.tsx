'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';
import Logo from '../components/common/Logo';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for buttons matching signup page style
const PrimaryButton = styled(Button)({
    width: '170px',
    height: '45px',
    background: 'linear-gradient(90deg, #35A3CC, #1A5369)',
    borderRadius: '100px',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'none',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0px 64px 26px rgba(0, 0, 0, 0.01), 0px 36px 22px rgba(0, 0, 0, 0.05), 0px 16px 16px rgba(0, 0, 0, 0.09), 0px 4px 9px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(90deg, #1A5369 , #35A3CC)',
        color: '#ffffff',
        transform: 'translateY(-3px)',
    },
    '&:active': {
        transform: 'translateY(1px)',
    },
    '@media (max-width: 1400px)': {
        width: '280px',
        height: '65px',
        fontSize: '22px',
        lineHeight: '33px',
    },
    '@media (max-width: 1200px)': {
        width: '260px',
        height: '60px',
        fontSize: '20px',
        lineHeight: '30px',
    },
});

const SecondaryButton = styled(Button)({
    width: '170px',
    height: '45px',
    background: '#ffffff',
    borderRadius: '100px',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#21647D',
    textTransform: 'none',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0px 64px 26px rgba(0, 0, 0, 0.01), 0px 36px 22px rgba(0, 0, 0, 0.05), 0px 16px 16px rgba(0, 0, 0, 0.09), 0px 4px 9px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(90deg, #35A3CC, #1A5369)',
        color: '#ffffff',
        transform: 'translateY(-3px)',
    },
    '&:active': {
        transform: 'translateY(1px)',
    },
    '@media (max-width: 1400px)': {
        width: '280px',
        height: '65px',
        fontSize: '22px',
        lineHeight: '33px',
    },
    '@media (max-width: 1200px)': {
        width: '260px',
        height: '60px',
        fontSize: '20px',
        lineHeight: '30px',
    },
});

const LandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const facilitiesSectionRef = useRef<HTMLElement>(null);
    const circlesRef = useRef<Array<HTMLElement>>([]);

    // Track scroll position
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    // Track mouse position with throttling for performance
    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });

        // Apply dynamic parallax to facilities circles
        if (facilitiesSectionRef.current) {
            const rect = facilitiesSectionRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from mouse to center of facilities section
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;

            circlesRef.current.forEach((circle, index) => {
                if (circle) {
                    // Create different movement patterns for each circle
                    const depth = 0.05 * (index % 3 + 1); // Different depths for 3D effect
                    const rotateX = distY * depth * 0.2;
                    const rotateY = -distX * depth * 0.2;
                    const translateX = distX * depth;
                    const translateY = distY * depth;

                    // Apply 3D transform with slight delay for natural feel
                    setTimeout(() => {
                        circle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    }, index * 20);
                }
            });
        }
    };

    // Throttle function to limit execution frequency
    const throttle = (callback: Function, delay: number) => {
        let lastCall = 0;
        return function (...args: any[]) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            callback(...args);
        };
    };

    useEffect(() => {
        // Trigger animations after page load
        setIsLoaded(true);

        // Initialize scroll position
        setScrollY(window.scrollY);

        // Get facilities section and all circle elements
        const facilitiesSection = document.getElementById('facilities');
        if (facilitiesSection) {
            facilitiesSectionRef.current = facilitiesSection as HTMLElement;

            // Get all circle elements
            const circleElements = facilitiesSection.querySelectorAll(
                `.${styles['main-circle']}, ` +
                `.${styles['medkit-circle']}, ` +
                `.${styles['heart-circle']}, ` +
                `.${styles['apple-circle']}, ` +
                `.${styles['pulse-circle']}, ` +
                `.${styles['radio-circle']}, ` +
                `.${styles['contacts-circle']}`
            );

            // Store references to circles
            circlesRef.current = Array.from(circleElements).filter(
                el => el instanceof HTMLElement
            ) as HTMLElement[];
        }

        // Add scroll and mouse event listeners
        const throttledMouseMove = throttle(handleMouseMove, 10);
        const throttledScroll = throttle(handleScroll, 10);

        window.addEventListener('scroll', throttledScroll);
        window.addEventListener('mousemove', throttledMouseMove);

        // Create particle effect in facilities section
        initParticles();

        // Add custom cursor effect
        const handleCursorMove = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--x', e.clientX.toString());
            document.documentElement.style.setProperty('--y', e.clientY.toString());
        };

        document.addEventListener('mousemove', handleCursorMove);

        // Add click effects
        const handleClick = (e: MouseEvent) => {
            // Create ripple effect at click position
            const ripple = document.createElement('div');
            ripple.className = styles['click-ripple'];
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            document.body.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        };

        document.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            window.removeEventListener('mousemove', throttledMouseMove);
            document.removeEventListener('mousemove', handleCursorMove);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    // Create floating particles in the facilities section
    const initParticles = () => {
        const facilitiesSection = document.getElementById('facilities');
        if (!facilitiesSection) return;

        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = styles['particle-container'];
        facilitiesSection.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = styles['particle'];

            // Random position, size and animation delay
            const size = Math.random() * 8 + 2;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animDelay = Math.random() * 10;
            const duration = Math.random() * 20 + 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.animationDelay = `${animDelay}s`;
            particle.style.animationDuration = `${duration}s`;

            particleContainer.appendChild(particle);
        }
    };

    // Calculate dynamic styles based on scroll position
    const getScrollBasedStyles = (elementPosition: number) => {
        // Determine if element is in viewport
        const windowHeight = window.innerHeight;
        const scrollTrigger = elementPosition - windowHeight * 0.8;

        if (scrollY > scrollTrigger) {
            // Element is in view
            const scrollProgress = Math.min(1, (scrollY - scrollTrigger) / (windowHeight * 0.5));
            return {
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 50}px)`
            };
        }

        return {
            opacity: 0,
            transform: 'translateY(50px)'
        };
    };

    return (
        <div
            className={`${styles['landing-page']} ${isLoaded ? styles['page-loaded'] : ''}`}
            data-mouse-x={mousePosition.x}
            data-mouse-y={mousePosition.y}
            data-scroll-y={scrollY}
        >
            {/* Hero Section */}
            <section className={styles['hero-section']}>
                <div className={styles['hero-content']}>
                    <header className={styles.navbar}>
                        <Box className={styles.logo}>
                            <Logo color="white" position="relative" />
                        </Box>
                        <nav className={styles['nav-links']}>
                            <Link href="/">Home</Link>
                            <Link href="#facilities">Facilities</Link>
                            <Link href="#about">About Us</Link>
                        </nav>
                        <div className={styles['auth-buttons']}>
                            <Link href="/login" passHref>
                                <SecondaryButton>Log In</SecondaryButton>
                            </Link>
                            <Link href="/signup" passHref>
                                <PrimaryButton>Sign Up</PrimaryButton>
                            </Link>
                        </div>
                    </header>

                    <div className={styles['hero-text']}>
                        <Typography variant="h1" component="h1" className={styles.heading}>
                            Electronic Health Record
                        </Typography>
                        <Typography variant="body1" className={styles.subheading}>
                            View patient's data their medical history, personal information, previous
                            visits, test result and health conditions
                        </Typography>
                        <div className={styles['hero-buttons']}>
                            <Link href="/signup" passHref>
                                <PrimaryButton size="large">Sign Up</PrimaryButton>
                            </Link>
                            <Link href="/login" className={styles['get-started-btn']}>
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Consulting Specialists Section */}
            <section id="specialists" className={styles['specialists-section']}>
                <h2>Our Consulting Specialists</h2>
                <div className={styles['heading-line']}></div>
                <p className={styles['section-description']}>
                    We provide to you the best choices for you. Adjust it to your health needs and make
                    sure your undergo treatment with our highly qualified doctors you can consult with us
                    which type of service is suitable for your health
                </p>

                <div className={styles['specialists-grid']}>
                    <div className={styles['specialist-card']}>
                        <div className={styles['specialist-icon']}>
                            <Image src="/images/Specialists-icon1.svg" alt="Breast Cancer" width={80} height={80} />
                        </div>
                        <h3>Breast Cancer</h3>
                        <p>Predictive analytics and clinical decision support</p>
                    </div>

                    <div className={styles['specialist-card']}>
                        <div className={styles['specialist-icon']}>
                            <Image src="/images/Specialists-icon2.svg" alt="Heart Disease" width={80} height={80} />
                        </div>
                        <h3>Heart Disease</h3>
                        <p>Predictive analytics and clinical decision support</p>
                    </div>

                    <div className={styles['specialist-card']}>
                        <div className={styles['specialist-icon']}>
                            <Image src="/images/Specialists-icon1.svg" alt="Lung Cancer" width={80} height={80} />
                        </div>
                        <h3>Lung Cancer</h3>
                        <p>Predictive analytics and clinical decision support</p>
                    </div>

                    <div className={styles['specialist-card']}>
                        <div className={styles['specialist-icon']}>
                            <Image src="/images/Specialists-icon2.svg" alt="Diabetes Disease" width={80} height={80} />
                        </div>
                        <h3>Diabetes Disease</h3>
                        <p>Predictive analytics and clinical decision support</p>
                    </div>

                    <div className={styles['specialist-card']}>
                        <div className={styles['specialist-icon']}>
                            <Image src="/images/Specialists-icon2.svg" alt="Chronic Kidney Disease" width={80} height={80} />
                        </div>
                        <h3>Chronic Kidney Disease</h3>
                        <p>Predictive analytics and clinical decision support</p>
                    </div>

                    <div className={styles['specialist-card']}>
                        <div className={styles['specialist-icon']}>
                            <Image src="/images/Specialists-icon2.svg" alt="Alzheimer's Disease" width={80} height={80} />
                        </div>
                        <h3>Alzheimer's Disease</h3>
                        <p>Predictive analytics and clinical decision support</p>
                    </div>
                </div>

                <div className={styles['learn-more-container']}>
                    <Link href="#" passHref>
                        <Button className={styles['learn-more-btn']}>Learn more</Button>
                    </Link>
                </div>
            </section>

            {/* Our Facilities Section */}
            <section id="facilities" className={styles['facilities-section']}>
                <div className={styles['facilities-container']}>
                    <div className={styles['facilities-graphic-container']}>
                        <div className={styles['main-circle']}>
                            <h2>Our Facilities</h2>
                        </div>

                        {/* Concentric circles */}
                        <div className={styles['circle-large']}></div>
                        <div className={styles['circle-medium']}></div>

                        {/* Medical Kit Icon - Green */}
                        <div className={styles['medkit-circle']}>
                            <div className={styles['medkit-icon']}></div>
                        </div>

                        {/* Heart Icon - Pink */}
                        <div className={styles['heart-circle']}>
                            <div className={styles['heart-icon']}></div>
                        </div>

                        {/* Apple/Baby Icon - Blue */}
                        <div className={styles['record-circle']}>
                            <div className={styles['record-icon']}></div>
                        </div>

                        {/* Pulse Icon - Pink */}
                        <div className={styles['pulse-circle']}>
                            <div className={styles['pulse-icon']}></div>
                        </div>

                        {/* Sound/Radio Icon - Green */}
                        <div className={styles['radio-circle']}>
                            <div className={styles['radio-icon']}></div>
                        </div>

                        {/* Contacts Icon - Pink */}
                        <div className={styles['contacts-circle']}>
                            <div className={styles['contacts-icon']}></div>
                        </div>
                    </div>

                    <div className={styles['facilities-content']}>
                        <h2>Our Facilities</h2>
                        <p>
                            We believe that by seamlessly connecting clinical and imaging data, we can improve
                            patient outcomes, streamline clinician workflows, and offer more personalized
                            treatment plans. Our solution prioritizes data security and privacy, ensuring a user-friendly
                            experience while adhering to the highest standards of healthcare compliance.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className={styles['about-section']}>
                <div className={styles['about-background']}></div>
                <div className={styles['about-content']}>
                    <h2>About Us</h2>
                    <p>
                        At Medicare, we are committed to transforming healthcare through
                        innovative technology. Our mission is to bridge the gap in Egypt's
                        healthcare system by integrating bioimaging data directly into Electronic
                        Health Records (EHR). With a focus on enhancing diagnostic precision and
                        enabling predictive healthcare analytics, we aim to create a unified and
                        scalable EHR solution that leverages international interoperability
                        standards like FHIR and DICOM.
                    </p>
                </div>
            </section>

            {/* Our Top Doctors Section */}
            <section id="doctors" className={styles['doctors-section']}>
                <h2>Our Top Doctors</h2>
                <div className={styles['doctors-grid']}>
                    <div className={styles['doctor-card']}>
                        <Image src="/images/Image.png" alt="Doctor" width={220} height={250} />
                        <h3>Dr. John Smith</h3>
                    </div>
                    <div className={styles['doctor-card']}>
                        <Image src="/images/Image2.png" alt="Doctor" width={220} height={250} />
                        <h3>Dr. Michael Williams</h3>
                    </div>
                    <div className={styles['doctor-card']}>
                        <Image src="/images/Image3.png" alt="Doctor" width={220} height={250} />
                        <h3>Dr. Linda Carter</h3>
                    </div>
                    <div className={styles['doctor-card']}>
                        <Image src="/images/Image4.png" alt="Doctor" width={220} height={250} />
                        <h3>Dr. Jack Reynolds</h3>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className={styles.footer}>
                <div className={styles['footer-container']}>
                    <div className={styles['footer-left']}>
                        <div className={styles['footer-logo']}>
                            <Logo color="white" position="relative" />
                        </div>
                        <p className={styles['footer-description']}>
                            One of the world's Website providing safe and compassionate care as its best for everyone
                        </p>
                        <button className={styles['read-more-btn']}>Read more</button>
                        <div className={styles['social-icons']}>
                            <a href="#" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                                </svg>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles['footer-middle']}>
                        <h3>Support</h3>
                        <ul>
                            <li>Support Center</li>
                            <li>24/7 Service</li>
                            <li>Quick Communication</li>
                        </ul>
                    </div>

                    <div className={styles['footer-right']}>
                        <h3>Quick Contact</h3>
                        <form className={styles['contact-form']}>
                            <input type="email" placeholder="Your Email" />
                            <textarea placeholder="Your Message"></textarea>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>

                <div className={styles['footer-divider']}></div>

                <div className={styles['footer-bottom']}>
                    <div className={styles['contact-details']}>
                        <div className={styles['phone-numbers']}>
                            <div className={styles['contact-icon']}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                            </div>
                            <div className={styles['contact-text']}>
                                <p>+(123) 555-0178-890</p>
                                <p>+(123) 555-0104-891</p>
                            </div>
                        </div>
                        <div className={styles['email-addresses']}>
                            <div className={styles['contact-icon']}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </div>
                            <div className={styles['contact-text']}>
                                <p>healthcare@medical.com</p>
                                <p>info@medical.com</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['copyright']}>
                        <p>Copyright@2022Medicare Website</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage; 