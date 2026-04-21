import { useState, useEffect, useCallback } from 'react'
import logo from './assets/thekattis.png'
import './App.css'

const menuData = {
  Signature: [
    { name: 'Royal Dum Biryani', desc: 'Slow-cooked basmati, saffron, caramelised onions & whole spices', price: '$18' },
    { name: 'Katti Special Biryani', desc: 'Chef\'s secret masala, tender meat, crispy shallots & rose water', price: '$20' },
    { name: 'Nawabi Biryani', desc: 'Layered with kewra, fried nuts, boiled egg & minted yogurt', price: '$22' },
  ],
  Chicken: [
    { name: 'Chicken Dum Biryani', desc: 'Bone-in chicken, aged basmati, golden onions & biryani masala', price: '$16' },
    { name: 'Pepper Chicken Biryani', desc: 'Fiery black pepper, curry leaves & freshly ground spices', price: '$17' },
    { name: 'Butter Chicken Biryani', desc: 'Creamy tomato-based gravy layered over fragrant rice', price: '$17' },
  ],
  Mutton: [
    { name: 'Mutton Dum Biryani', desc: 'Slow-braised mutton, saffron milk & caramelised onion crust', price: '$21' },
    { name: 'Raan Biryani', desc: 'Whole leg of lamb marinated overnight, slow dum-cooked', price: '$26' },
    { name: 'Seekh Kebab Biryani', desc: 'Spiced minced mutton kebabs over herbed basmati', price: '$22' },
  ],
  Vegetarian: [
    { name: 'Paneer Biryani', desc: 'Charred cottage cheese, bell peppers & aromatic spice blend', price: '$14' },
    { name: 'Mushroom Biryani', desc: 'Forest mushrooms, green peas, mint & saffron basmati', price: '$13' },
    { name: 'Vegetable Dum Biryani', desc: 'Seasonal vegetables, caramelised onions & whole spices', price: '$12' },
  ],
}

const testimonials = [
  { name: 'Aisha R.', text: 'The Royal Dum Biryani is the best I\'ve had outside of Hyderabad. Absolutely divine!', stars: 5 },
  { name: 'Marcus T.', text: 'Incredible depth of flavour. You can taste every layer of spice. A must-visit restaurant.', stars: 5 },
  { name: 'Priya S.', text: 'The atmosphere is warm and the biryani is even warmer. Katti\'s is our family spot.', stars: 5 },
]

// Free high-quality food photos from Unsplash (no API key needed, direct image URLs)
const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
    caption: 'Royal Dum Biryani',
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    caption: 'Hyderabadi Biryani',
  },
  {
    url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80',
    caption: 'Saffron Basmati',
  },
  {
    url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
    caption: 'Dum Handi Style',
  },
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    caption: 'Spice Medley',
  },
  {
    url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&q=80',
    caption: 'Chicken Biryani',
  },
  {
    url: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80',
    caption: 'Mutton Dum Biryani',
  },
  {
    url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
    caption: 'Paneer Biryani',
  },
  {
    url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&q=80',
    caption: 'Nawabi Platter',
  },
]

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Signature')
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [lightbox, setLightbox] = useState(null) // index of open image

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard nav for lightbox
  const handleKeyDown = useCallback((e) => {
    if (lightbox === null) return
    if (e.key === 'Escape') setLightbox(null)
    if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % galleryImages.length)
    if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + galleryImages.length) % galleryImages.length)
  }, [lightbox])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-wrapper">

      {/* NAV */}
      <nav className={`navbar ${navScrolled ? 'navbar--scrolled' : ''}`}>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {[
            { id: 'hero', label: 'Home' },
            { id: 'menu', label: 'Menu' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'about', label: 'About' },
          ].map(({ id, label }) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className="nav-link">{label}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__logo-wrap">
          <img src={logo} alt="The Katti's" className="hero__logo" />
        </div>
        <div className="hero__scroll-hint" onClick={() => scrollTo('menu')}>↓ explore</div>
      </section>

      {/* MENU */}
      <section id="menu" className="section menu-section">
        <div className="section__inner">
          <span className="section__label">Our Menu</span>
          <h2 className="section__title">Biryani Crafted for Royalty</h2>
          <div className="menu-tabs">
            {Object.keys(menuData).map(cat => (
              <button
                key={cat}
                className={`tab ${activeMenu === cat ? 'tab--active' : ''}`}
                onClick={() => setActiveMenu(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {menuData[activeMenu].map((item, i) => (
              <div className="menu-card" key={i}>
                <div className="menu-card__icon">🍛</div>
                <div className="menu-card__body">
                  <h3 className="menu-card__name">{item.name}</h3>
                  <p className="menu-card__desc">{item.desc}</p>
                </div>
                <span className="menu-card__price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery-section">
        <div className="section__inner">
          <span className="section__label">Gallery</span>
          <h2 className="section__title">A Feast for the Eyes</h2>
          <p className="gallery-subtitle">Click any image to view in full screen</p>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`gallery-item gallery-item--${i % 3 === 0 ? 'wide' : 'normal'}`}
                onClick={() => setLightbox(i)}
              >
                <img src={img.url} alt={img.caption} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{img.caption}</span>
                  <span className="gallery-item__zoom">⛶</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>
          <button className="lightbox__prev" onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + galleryImages.length) % galleryImages.length) }}>‹</button>
          <div className="lightbox__content" onClick={e => e.stopPropagation()}>
            <img src={galleryImages[lightbox].url.replace('w=800', 'w=1400')} alt={galleryImages[lightbox].caption} />
            <p className="lightbox__caption">{galleryImages[lightbox].caption}</p>
            <p className="lightbox__counter">{lightbox + 1} / {galleryImages.length}</p>
          </div>
          <button className="lightbox__next" onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % galleryImages.length) }}>›</button>
        </div>
      )}

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="section__inner about-inner">
          <div className="about-img-wrap">
            <img src={logo} alt="The Katti's brand" className="about-img" />
          </div>
          <div className="about-text">
            <span className="section__label">Our Story</span>
            <h2 className="section__title">Born from a Passion for Pure Aroma</h2>
            <p>The Katti's was founded by <strong>Priscilla Katti</strong> with one mission — to bring the soul of authentic dum biryani to your table. Every grain of rice is a story, every spice a tradition passed down through generations.</p>
            <p>We source hand-picked basmati, grind our own masalas, and seal each handi the old-fashioned way — because great biryani can't be rushed.</p>
            <div className="about-stats">
              <div className="stat"><span className="stat__num">15+</span><span className="stat__label">Biryani Varieties</span></div>
              <div className="stat"><span className="stat__num">10k+</span><span className="stat__label">Happy Guests</span></div>
              <div className="stat"><span className="stat__num">3</span><span className="stat__label">Years of Craft</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section__inner">
          <span className="section__label">Reviews</span>
          <h2 className="section__title">What Our Guests Say</h2>
          <div className="testimonial-carousel">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card ${i === activeTestimonial ? 'testimonial-card--active' : ''}`}>
                <p className="testimonial-card__stars">{'★'.repeat(t.stars)}</p>
                <p className="testimonial-card__text">"{t.text}"</p>
                <p className="testimonial-card__name">— {t.name}</p>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot ${i === activeTestimonial ? 'dot--active' : ''}`} onClick={() => setActiveTestimonial(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src={logo} alt="The Katti's" className="footer__logo" />
            <p className="footer__tagline">Royal Authentic Aroma</p>
          </div>
          <div className="footer__info">
            <p>📍 Flat No. 310, A Wing, Building No.3, Vakil Nagar Housing Society, Behind Meenal Garden, Next to Sevasadan School, Erandanwana, Pune</p>
            <p>📞 +91 8390890694</p>
            <p>🕐 Mon–Sat: 11am – 10pm</p>
          </div>
          <div className="footer__copy">
            <p>© 2026 The Katti's. All rights reserved.</p>
            <p>Crafted with ❤️ by Priscilla Katti</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
