import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Link, NavLink, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Mountain,
  Wifi,
  Coffee,
  Car,
  Utensils,
  CalendarDays,
  Users,
  MapPin,
  Phone,
  Mail,
  Check,
  BedDouble
} from 'lucide-react';
import './styles.css';

const photos = {
  hero: 'https://images.unsplash.com/photo-1678956678855-3513428ed615?auto=format&fit=crop&w=2200&q=88',
  room: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
  room2: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
  balcony: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1400&q=85',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85',
  valley: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85',
  food: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
  cafe: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85'
};
const features = [{icon:Wifi,title:'Stay connected',desc:'Wi-Fi for the moments you need it.'},{icon:Coffee,title:'Slow mornings',desc:'Freshly brewed tea with a mountain view.'},{icon:Utensils,title:'Local flavours',desc:'Warm, homestyle meals on request.'},{icon:Car,title:'Easy arrival',desc:'Parking and local travel assistance.'}];
function Header(){const [open,setOpen]=useState(false);const loc=useLocation();React.useEffect(()=>setOpen(false),[loc]);return <header className="header"><div className="nav-wrap"><Link to="/" className="brand"><span className="brand-mark"><Mountain size={21}/></span><span>WHITE PEAK<small>HOMESTAY · PAURI GARHWAL</small></span></Link><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button><nav className={open?'nav open':'nav'}><NavLink to="/" end>Home</NavLink><NavLink to="/stay">The stay</NavLink><NavLink to="/experiences">Experiences</NavLink><NavLink to="/contact">Contact</NavLink><Link className="nav-cta" to="/contact">Book your stay <ArrowUpRight size={15}/></Link></nav></div></header>}
function Footer(){return <footer className="footer"><div className="footer-top"><div><Link to="/" className="brand brand-light"><span className="brand-mark"><Mountain size={21}/></span><span>WHITE PEAK<small>HOMESTAY · PAURI GARHWAL</small></span></Link><p>A little closer to the mountains.<br/>A little further from the noise.</p></div><div className="footer-links"><span>EXPLORE</span><Link to="/stay">Rooms & stay</Link><Link to="/experiences">Experiences</Link><Link to="/contact">Contact & booking</Link></div><div className="footer-links"><span>GET IN TOUCH</span><a href="tel:+919876543210">+91 98765 43210</a><a href="mailto:hello@whitepeakhomestay.com">hello@whitepeakhomestay.com</a><p>Pauri Garhwal, Uttarakhand, India</p></div></div><div className="footer-bottom"><span>© 2026 White Peak Homestay</span><span>Made for mountain moments <Mountain size={14}/></span></div><p className="demo-note">Demo website · Replace contact details, amenities and photographs with verified property information before publishing.</p></footer>}
function BookingStrip(){
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('2 guests');
  const [error, setError] = useState('');

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  const checkAvailability = () => {
    if (!checkin || !checkout) {
      setError('Please select both check-in and check-out dates.');
      return;
    }
    if (checkout <= checkin) {
      setError('Check-out must be after check-in.');
      return;
    }
    const params = new URLSearchParams({checkin, checkout, guests});
    navigate(`/contact?${params.toString()}`);
  };

  return <div>
    <div className="booking-strip">
      <label className="booking-cell booking-date">
        <CalendarDays/>
        <span><small>CHECK IN</small><input aria-label="Check-in date" type="date" min={minDate} value={checkin} onChange={e=>{setCheckin(e.target.value);if(checkout && e.target.value >= checkout) setCheckout('');setError('');}}/></span>
      </label>
      <label className="booking-cell booking-date">
        <CalendarDays/>
        <span><small>CHECK OUT</small><input aria-label="Check-out date" type="date" min={checkin || minDate} value={checkout} onChange={e=>{setCheckout(e.target.value);setError('');}}/></span>
      </label>
      <label className="booking-cell booking-guests">
        <Users/>
        <span><small>GUESTS</small><select aria-label="Number of guests" value={guests} onChange={e=>setGuests(e.target.value)}><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></span>
      </label>
      <button type="button" onClick={checkAvailability} className="booking-button">Check availability <ArrowRight size={17}/></button>
    </div>
    {error && <p className="booking-error" role="alert">{error}</p>}
  </div>;
}
function Home(){return <><section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(13,29,27,.65),rgba(13,29,27,.12)),url(${photos.hero})`}}><div className="hero-content"><div className="eyebrow light"><span/> PAURI GARHWAL · UTTARAKHAND</div><h1>Find your<br/><em>quiet place.</em></h1><p>Wake up to mountain air, unhurried mornings and the kind of views that stay with you.</p><div className="hero-actions"><Link to="/stay" className="btn btn-light">Explore the stay <ArrowUpRight size={17}/></Link><Link to="/experiences" className="text-link light-link">Discover Pauri <ArrowRight size={16}/></Link></div><div className="hero-caption">A MOUNTAIN HOME, MADE FOR SLOW LIVING</div></div><div className="hero-side">30° NORTH · GARHWAL HIMALAYAS</div></section><main><div className="booking-container"><BookingStrip/></div><section className="intro section"><div className="eyebrow">WELCOME TO WHITE PEAK</div><div className="intro-grid"><h2>Some places make<br/>you <em>exhale.</em></h2><div><p className="lead">Tucked into the beautiful landscapes of Pauri Garhwal, White Peak Homestay is your invitation to slow down and reconnect—with nature, with people, and with yourself.</p><p className="muted">Come for the views. Stay for the warmth, simple comforts and little moments that make a mountain escape memorable.</p><Link to="/stay" className="under-link">A closer look at the stay <ArrowUpRight size={16}/></Link></div></div></section><section className="feature-photo"><img src={photos.balcony} alt="Peaceful mountain retreat balcony"/><div className="photo-label"><span>01 / THE SETTING</span><strong>Room to breathe.<br/><em>Space to be.</em></strong></div></section><section className="section comfort"><div className="section-heading"><div><div className="eyebrow">THOUGHTFUL COMFORTS</div><h2>Everything you need.<br/><em>Nothing you don't.</em></h2></div><p>Simple, considered comforts to make your time in the mountains feel effortless.</p></div><div className="feature-grid">{features.map((f,i)=><div className="feature" key={f.title}><div className="feature-icon"><f.icon size={22}/></div><span className="feature-no">0{i+1}</span><h3>{f.title}</h3><p>{f.desc}</p></div>)}</div></section><section className="rate-band"><div><div className="eyebrow light">YOUR MOUNTAIN ESCAPE STARTS HERE</div><h2>Stay from <em>₹3,500</em><small> / night</small></h2><p>Thoughtful stays, warm hospitality and a view worth waking up for.</p></div><Link to="/contact" className="btn btn-light">Enquire now <ArrowUpRight size={17}/></Link></section><section className="section quote-section"><div className="quote-mark">“</div><blockquote>Take the scenic route.<br/><em>Stay a little longer.</em></blockquote><Link to="/experiences" className="under-link">Find your kind of getaway <ArrowUpRight size={16}/></Link></section></main><Footer/></>}
function Stay(){return <><PageHero kicker="YOUR HOME IN THE HILLS" title={<>Stay a while.<br/><em>Feel at home.</em></>} image={photos.room} desc="Comfortable rooms, thoughtful details and a slower pace of living in Pauri Garhwal."/><main><section className="section stay-intro"><div><div className="eyebrow">THE WHITE PEAK EXPERIENCE</div><h2>Made for restful<br/><em>mountain days.</em></h2></div><div><p className="lead">Whether you're planning a weekend away, a family break or a longer escape, find a welcoming base for exploring the Garhwal hills.</p><p className="muted">Room names, occupancy and amenities below are sample demo content and can be tailored to the actual property.</p></div></section><section className="room-list"><article className="room-card"><img src={photos.room} alt="Warm and comfortable guest room"/><div className="room-info"><div className="eyebrow">01 · THE CLASSIC</div><h3>Mountain View Room</h3><p>A calm, light-filled room to unwind after a day outdoors. Designed for easy mornings and restful nights.</p><div className="room-meta"><span><Users size={15}/> Up to 2 guests</span><span><BedDouble size={15}/> Double bed</span></div><div className="room-bottom"><strong>₹3,500 <small>/ night</small></strong><Link to="/contact" className="under-link">Enquire <ArrowUpRight size={15}/></Link></div></div></article><article className="room-card reverse"><img src={photos.room2} alt="Comfortable spacious homestay bedroom"/><div className="room-info"><div className="eyebrow">02 · THE EXTRA SPACE</div><h3>Family Room</h3><p>More room to settle in, share stories and make the most of a few days away together.</p><div className="room-meta"><span><Users size={15}/> Up to 4 guests</span><span><BedDouble size={15}/> Flexible bedding</span></div><div className="room-bottom"><strong>₹4,500 <small>/ night</small></strong><Link to="/contact" className="under-link">Enquire <ArrowUpRight size={15}/></Link></div></div></article></section><section className="section included"><div className="eyebrow">THE LITTLE DETAILS</div><h2>A stay that feels <em>easy.</em></h2><div className="included-grid">{['Clean, comfortable bedding','Wi-Fi access','Hot water','Home-style meals on request','Local travel guidance','Parking (subject to availability)'].map(x=><div><Check size={17}/>{x}</div>)}</div><p className="fine-print">Please confirm the final room inventory, rates, inclusions and availability with the property before booking.</p></section><section className="rate-band"><div><div className="eyebrow light">READY FOR A CHANGE OF SCENERY?</div><h2>Your room in the hills <em>awaits.</em></h2></div><Link to="/contact" className="btn btn-light">Request a booking <ArrowUpRight size={17}/></Link></section></main><Footer/></>}
function PageHero({kicker,title,image,desc}){return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(13,29,27,.62),rgba(13,29,27,.08)),url(${image})`}}><div className="page-hero-inner"><div className="eyebrow light"><span/>{kicker}</div><h1>{title}</h1><p>{desc}</p></div></section>}
function Experiences(){return <><PageHero kicker="EXPLORE THE SLOW SIDE OF UTTARAKHAND" title={<>The hills are<br/><em>calling.</em></>} image={photos.valley} desc="Forest trails, Himalayan horizons and small-town charm—make your stay about more than just the view."/><main><section className="section experience-intro"><div className="eyebrow">AROUND PAURI GARHWAL</div><div className="intro-grid"><h2>Go gently.<br/><em>Discover deeply.</em></h2><p className="lead">Take a quiet walk beneath tall trees, discover local culture or set aside a day for the views. Let the mountains set the pace.</p></div></section><section className="experience-grid"><article className="experience-card tall"><img src={photos.forest} alt="Green forest trail"/><div><span>01 · NATURE</span><h3>Walk among<br/>the forests</h3><p>Find peaceful trails through the region's oak, pine and deodar landscapes.</p></div></article><article className="experience-card"><img src={photos.valley} alt="Mountain landscape"/><div><span>02 · VIEWS</span><h3>Chase the<br/>Himalayan views</h3><p>Take in the ridgelines and wide-open mountain scenery around Pauri.</p></div></article><article className="experience-card"><img src={photos.food} alt="Traditional food"/><div><span>03 · LOCAL LIFE</span><h3>Taste the<br/>Garhwali table</h3><p>Ask about seasonal, home-style food and regional flavours.</p></div></article></section><section className="section nearby"><div className="nearby-copy"><div className="eyebrow">WORTH THE DETOUR</div><h2>Little places.<br/><em>Big memories.</em></h2><p className="muted">Use White Peak as a starting point for exploring the region. Travel times depend on your exact property location and road conditions.</p><Link to="/contact" className="under-link">Ask us for local tips <ArrowUpRight size={16}/></Link></div><div className="nearby-list"><div><span>01</span><div><h3>Khirsu</h3><p>Known for forest surroundings and wide Himalayan panoramas.</p></div><ArrowUpRight/></div><div><span>02</span><div><h3>Kandoliya</h3><p>A forested hill area with a temple, park and views over Pauri.</p></div><ArrowUpRight/></div><div><span>03</span><div><h3>Kyunkaleshwar Temple</h3><p>A historic temple setting with views towards the Alaknanda valley.</p></div><ArrowUpRight/></div></div></section><section className="rate-band"><div><div className="eyebrow light">MAKE THE MOUNTAINS YOURS</div><h2>Come for the view.<br/><em>Stay for the feeling.</em></h2></div><Link to="/contact" className="btn btn-light">Plan your stay <ArrowUpRight size={17}/></Link></section></main><Footer/></>}
function Contact(){
  const [searchParams] = useSearchParams();
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState(()=>({
    name:'',
    phone:'',
    checkin:searchParams.get('checkin') || '',
    checkout:searchParams.get('checkout') || '',
    guests:searchParams.get('guests') || '2 guests',
    message:''
  }));
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const update=e=>{
    const {name,value}=e.target;
    setForm(current=>({
      ...current,
      [name]:value,
      ...(name==='checkin' && current.checkout && value >= current.checkout ? {checkout:''} : {})
    }));
  };const submit=e=>{e.preventDefault();if(!form.checkin || !form.checkout || form.checkout <= form.checkin){alert('Please select a valid check-in and check-out date.');return;}const body=`Hello White Peak Homestay,%0A%0AI'd like to enquire about a stay.%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ACheck-in: ${form.checkin}%0ACheck-out: ${form.checkout}%0AGuests: ${encodeURIComponent(form.guests)}%0AMessage: ${encodeURIComponent(form.message)}`;window.location.href=`mailto:hello@whitepeakhomestay.com?subject=Booking enquiry&body=${body}`;setSent(true)};return <><PageHero kicker="LET'S PLAN YOUR GETAWAY" title={<>Your mountain<br/><em>time starts here.</em></>} image={photos.cafe} desc="Tell us a little about your trip. We'll help you take the next step towards a stay in Pauri Garhwal."/><main><section className="section contact-layout"><div className="contact-copy"><div className="eyebrow">BOOKINGS & ENQUIRIES</div><h2>Let's make it<br/><em>happen.</em></h2><p className="lead">Share your preferred dates and group size. We'll get back to you with availability and the best option for your stay.</p><div className="contact-detail"><Phone/><div><small>CALL US</small><a href="tel:+919876543210">+91 98765 43210</a></div></div><div className="contact-detail"><Mail/><div><small>EMAIL</small><a href="mailto:hello@whitepeakhomestay.com">hello@whitepeakhomestay.com</a></div></div><div className="contact-detail"><MapPin/><div><small>FIND US</small><span>Pauri Garhwal, Uttarakhand, India</span></div></div><p className="fine-print">Demo contact information — update with the owner's real phone number, email and exact address.</p></div><form className="booking-form" onSubmit={submit}><div className="form-head"><span>01 / BOOKING REQUEST</span><span className="price-tag">FROM ₹3,500 / NIGHT</span></div><h3>Tell us about your stay</h3><div className="form-row"><label>Your name<input name="name" required value={form.name} onChange={update} placeholder="Full name"/></label><label>Phone number<input name="phone" required value={form.phone} onChange={update} placeholder="+91"/></label></div><div className="form-row"><label>Check-in<input type="date" name="checkin" min={minDate} required value={form.checkin} onChange={update}/></label><label>Check-out<input type="date" name="checkout" min={form.checkin || minDate} required value={form.checkout} onChange={update}/></label></div><label>Number of guests<select name="guests" value={form.guests} onChange={update}><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label><label>Anything else we should know?<textarea name="message" rows="4" value={form.message} onChange={update} placeholder="Room preference, arrival time, questions..."/></label><button className="btn btn-dark submit-btn" type="submit">Send booking enquiry <ArrowUpRight size={17}/></button><p className="form-note"><Check size={14}/> This is an enquiry, not an instant confirmed reservation.</p>{sent&&<p className="success-msg">Your email app should open with the enquiry details. Please send it to complete the request.</p>}</form></section><section className="map-panel"><div><div className="eyebrow">THE GARHWAL HILLS</div><h2>Find your way<br/><em>to the quiet.</em></h2><p>Pauri Garhwal, Uttarakhand</p><a className="under-link" href="https://www.google.com/maps/search/?api=1&query=Pauri+Garhwal+Uttarakhand" target="_blank" rel="noreferrer">Open area in Google Maps <ArrowUpRight size={16}/></a></div><div className="map-art"><div className="map-circle"><Mountain size={64}/><span>PAURI<br/>GARHWAL</span></div><div className="map-line line-one"/><div className="map-line line-two"/></div></section></main><Footer/></>}
function App(){return <BrowserRouter><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/stay" element={<Stay/>}/><Route path="/experiences" element={<Experiences/>}/><Route path="/contact" element={<Contact/>}/></Routes></BrowserRouter>}
createRoot(document.getElementById('root')).render(<App/>);
