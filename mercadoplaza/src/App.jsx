import React, { useEffect, useMemo, useState } from 'react';
import {
  Search, MapPin, Heart, Store, ChevronLeft, ChevronRight, Globe, MessageCircle,
  Star, SlidersHorizontal, X, Navigation, ShoppingBasket, Megaphone,
  Gift, ExternalLink, CheckCircle2, MapPinned, Smartphone, Sparkles, ArrowUpRight, Clock3
} from 'lucide-react';
import { SiWhatsapp, SiFacebook, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';

const WHATSAPP = '51930528649';
const wa = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

const rubros = [
  'Abarrotes y alimentos','Bebidas','Carnicerías','Pescaderías','Frutas y verduras',
  'Productos regionales','Restaurantes y comidas','Panaderías y dulcerías','Lácteos',
  'Salud y bienestar','Belleza y cuidado personal','Moda y calzado','Tecnología y electrónica',
  'Hogar y decoración','Ferretería y construcción','Limpieza','Mascotas','Librerías y juguetes',
  'Automotriz y repuestos','Servicios y reparaciones'
];

const locations = {
  Piura:['Piura','Castilla','Catacaos','Cura Mori','El Tallán','La Arena','La Unión','Las Lomas','Tambogrande','Veintiséis de Octubre'],
  Ayabaca:['Ayabaca','Frías','Jililí','Lagunas','Montero','Pacaipampa','Paimas','Sapillica','Sícchez','Suyo'],
  Huancabamba:['Huancabamba','Canchaque','El Carmen de la Frontera','Huarmaca','Lalaquiz','San Miguel de El Faique','Sóndor','Sondorillo'],
  Morropón:['Chulucanas','Buenos Aires','Chalaco','La Matanza','Morropón','Salitral','San Juan de Bigote','Santa Catalina de Mossa','Santo Domingo','Yamango'],
  Paita:['Paita','Amotape','El Arenal','Colán','La Huaca','Tamarindo','Vichayal'],
  Sechura:['Sechura','Bellavista de la Unión','Bernal','Cristo Nos Valga','Rinconada Llícuar','Vice'],
  Sullana:['Sullana','Bellavista','Ignacio Escudero','Lancones','Marcavelica','Miguel Checa','Querecotillo','Salitral'],
  Talara:['Pariñas','El Alto','La Brea','Lobitos','Los Órganos','Máncora']
};

const initialShops = [
  {id:'MP-001',name:'Mercadito La Esquina',category:'Abarrotes y alimentos',description:'Abarrotes, productos de primera necesidad y ofertas para tu hogar.',province:'Piura',district:'Piura',whatsapp:'51987654321',url:'https://facebook.com',rating:4.9,votes:38,image:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700',tag:'Popular'},
  {id:'MP-002',name:'Frutas Selectas Anita',category:'Frutas y verduras',description:'Frutas frescas, verduras y productos de temporada.',province:'Piura',district:'Castilla',whatsapp:'51987654322',url:'https://facebook.com',rating:4.8,votes:26,image:'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=700'},
  {id:'MP-003',name:'Pollería El Buen Sabor',category:'Restaurantes y comidas',description:'Pollo a la brasa, combos familiares y comida para llevar.',province:'Paita',district:'Paita',whatsapp:'51987654323',url:'https://facebook.com',rating:4.7,votes:52,image:'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=700',tag:'Más votado'},
  {id:'MP-004',name:'Pescadería Mar Azul',category:'Pescaderías',description:'Pescados y mariscos frescos, seleccionados cada día.',province:'Sechura',district:'Sechura',whatsapp:'51987654324',url:'',rating:4.6,votes:19,image:'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=700'},
  {id:'MP-005',name:'Panadería Delicias',category:'Panaderías y dulcerías',description:'Pan recién horneado, pasteles y dulces artesanales.',province:'Sullana',district:'Sullana',whatsapp:'51987654325',url:'https://facebook.com',rating:4.7,votes:31,image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700'},
  {id:'MP-006',name:'Pet Shop Huellitas',category:'Mascotas',description:'Alimentos, accesorios y productos para consentir a tu mascota.',province:'Piura',district:'Veintiséis de Octubre',whatsapp:'51987654326',url:'https://facebook.com',rating:4.5,votes:14,image:'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=700'},
  {id:'MP-007',name:'TecnoStore Piura',category:'Tecnología y electrónica',description:'Accesorios para celulares, tecnología y servicio técnico.',province:'Piura',district:'Castilla',whatsapp:'51987654327',url:'https://facebook.com',rating:4.6,votes:22,image:'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700'},
  {id:'MP-008',name:'Moda & Estilo',category:'Moda y calzado',description:'Prendas, calzado y accesorios para toda la familia.',province:'Talara',district:'Pariñas',whatsapp:'51987654328',url:'https://facebook.com',rating:4.4,votes:11,image:'https://images.unsplash.com/photo-1445205170230-053b83016050?w=700'},
  {id:'MP-009',name:'Ferretería Total',category:'Ferretería y construcción',description:'Herramientas, materiales y soluciones para tus proyectos.',province:'Morropón',district:'Chulucanas',whatsapp:'51987654329',url:'https://facebook.com',rating:4.5,votes:17,image:'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=700'},
  {id:'MP-010',name:'Belleza Plus',category:'Belleza y cuidado personal',description:'Productos de belleza, cuidado personal y perfumería.',province:'Piura',district:'Catacaos',whatsapp:'51987654330',url:'https://facebook.com',rating:4.3,votes:9,image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700'}
];

const banners = [
  {title:'Compra cerca, compra en tu mercado',subtitle:'Descubre los puestos y negocios de tu comunidad.',cta:'Explorar puestos',image:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800',color:'green',url:'#puestos'},
  {title:'Tu negocio merece ser encontrado',subtitle:'Registra gratuitamente tu puesto en MercadoPlaza.',cta:'Registrar mi puesto',image:'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1800',color:'orange',url:'#registro'},
  {title:'Conoce los sabores de Piura',subtitle:'Encuentra productos frescos y negocios locales.',cta:'Ver rubros',image:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1800',color:'blue',url:'#rubros'}
];

const categoryIcons = ['🛒','🥤','🥩','🐟','🥬','🌾','🍽️','🥐','🥛','💚','💄','👕','📱','🏠','🔧','🧼','🐾','📚','🚗','🛠️'];

function Modal({title,subtitle,onClose,children,wide=false}) {
  useEffect(()=>{ const f=e=>e.key==='Escape'&&onClose(); window.addEventListener('keydown',f); return()=>window.removeEventListener('keydown',f); },[onClose]);
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <section className={`modal ${wide?'modal-wide':''}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-head"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={20}/></button></div>
      {children}
    </section>
  </div>;
}

function ShopCard({shop,favorite,onFavorite,onRate}) {
  const waLink = shop.whatsapp ? `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent('Hola, encontré tu puesto en MercadoPlaza. Quisiera realizar una consulta.')}` : null;
  const mapLink = shop.lat && shop.lng ? `https://www.google.com/maps?q=${shop.lat},${shop.lng}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name}, ${shop.district}, ${shop.province}, Piura, Perú`)}`;
  return <article className="shop-card">
    <div className="shop-photo"><img src={shop.image} alt="" loading="lazy"/>{shop.tag&&<span className="shop-tag">{shop.tag}</span>}<button className={`favorite-float ${favorite?'active':''}`} onClick={()=>onFavorite(shop.id)} aria-label="Guardar en favoritos"><Heart size={17} fill={favorite?'currentColor':'none'}/></button></div>
    <div className="shop-content">
      <div className="shop-title-row"><h3>{shop.name}</h3><span className="rating"><Star size={13} fill="currentColor"/>{Number(shop.rating||0).toFixed(1)}</span></div>
      <span className="category-pill">{shop.category}</span>
      <p className="shop-description">{shop.description}</p>
      <div className="shop-location"><MapPin size={13}/>{shop.district}, {shop.province}</div>
      <div className="shop-actions">
        {shop.url?<a className="action-web" href={shop.url} target="_blank" rel="noreferrer" aria-label="Ver catálogo o Facebook"><Globe size={18}/></a>:<span className="action-web disabled" title="Sin catálogo"><Globe size={18}/></span>}
        <a className="action-map" href={mapLink} target="_blank" rel="noreferrer" aria-label="Ver ubicación"><MapPin size={18}/></a>
        {waLink?<a className="action-wa" href={waLink} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><SiWhatsapp size={19}/></a>:<span className="action-wa disabled"><SiWhatsapp size={19}/></span>}
        <button className="rate-link" onClick={()=>onRate(shop)}>Calificar</button>
      </div>
      <div className="vote-count">{shop.votes||0} calificaciones</div>
    </div>
  </article>;
}

export default function App() {
  const [shops,setShops]=useState(initialShops);
  const [favorites,setFavorites]=useState(()=>JSON.parse(localStorage.getItem('mp-favorites')||'[]'));
  const [query,setQuery]=useState('');
  const [province,setProvince]=useState('Todas');
  const [district,setDistrict]=useState('Todos');
  const [category,setCategory]=useState('Todos');
  const [bannerIndex,setBannerIndex]=useState(0);
  const [modal,setModal]=useState('');
  const [selectedShop,setSelectedShop]=useState(null);
  const [showFavorites,setShowFavorites]=useState(false);
  const [mobileSearch,setMobileSearch]=useState(false);
  const [toast,setToast]=useState('');
  const [installPrompt,setInstallPrompt]=useState(null);
  const [form,setForm]=useState({name:'',category:'',description:'',province:'Piura',district:'',whatsapp:'',url:'',lat:'',lng:'',consent:false});
  const [ratingForm,setRatingForm]=useState({phone:'',stars:5,comment:''});
  const [donation,setDonation]=useState({name:'',phone:'',method:'Yape',note:''});
  const [socialForm,setSocialForm]=useState({name:'',category:'',networks:[],schedule:'No'});
  const [searchFocused,setSearchFocused]=useState(false);

  useEffect(()=>{localStorage.setItem('mp-favorites',JSON.stringify(favorites));},[favorites]);
  useEffect(()=>{const id=setInterval(()=>setBannerIndex(i=>(i+1)%banners.length),6500);return()=>clearInterval(id);},[]);
  useEffect(()=>{const handler=e=>{e.preventDefault();setInstallPrompt(e);};window.addEventListener('beforeinstallprompt',handler);return()=>window.removeEventListener('beforeinstallprompt',handler);},[]);
  useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),3200);return()=>clearTimeout(t);}},[toast]);

  const filtered = useMemo(()=>{
    let list=shops.filter(s=>{
      const q=query.toLowerCase().trim();
      const matchesQ=!q||[s.name,s.id,s.description,s.category,s.district].some(v=>(v||'').toLowerCase().includes(q));
      return matchesQ&&(category==='Todos'||s.category===category)&&(province==='Todas'||s.province===province)&&(district==='Todos'||s.district===district)&&(!showFavorites||favorites.includes(s.id));
    });
    return list.sort((a,b)=>(b.rating-a.rating)||((b.votes||0)-(a.votes||0)));
  },[shops,query,category,province,district,showFavorites,favorites]);

  const categoryCounts=useMemo(()=>rubros.map(r=>({name:r,count:shops.filter(s=>s.category===r).length})).filter(x=>x.count>0),[shops]);
  const districts=province==='Todas'?[]:(locations[province]||[]);
  const toggleFavorite=id=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const notify=msg=>setToast(msg);
  const openRate=shop=>{setSelectedShop(shop);setRatingForm({phone:'',stars:5,comment:''});setModal('rate');};
  const updateForm=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  const setProvinceFilter=value=>{setProvince(value);setDistrict('Todos');};
  const detectPosition=()=>{
    if(!navigator.geolocation){notify('Tu navegador no permite obtener la ubicación.');return;}
    navigator.geolocation.getCurrentPosition(pos=>{updateForm('lat',pos.coords.latitude.toFixed(6));updateForm('lng',pos.coords.longitude.toFixed(6));notify('Ubicación obtenida. Verifica que corresponda a tu puesto.');},()=>notify('No se pudo obtener la ubicación. Puedes continuar sin GPS.'),{enableHighAccuracy:true,timeout:10000});
  };
  const submitShop=e=>{
    e.preventDefault();
    if(!form.consent){notify('Debes aceptar la política de privacidad.');return;}
    const newShop={id:`MP-${String(Date.now()).slice(-6)}`,name:form.name.trim(),category:form.category,description:form.description.trim(),province:form.province,district:form.district,whatsapp:form.whatsapp.replace(/\D/g,''),url:form.url.trim(),lat:form.lat,lng:form.lng,rating:0,votes:0,image:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700',pending:true};
    setShops(prev=>[newShop,...prev]);setForm({name:'',category:'',description:'',province:'Piura',district:'',whatsapp:'',url:'',lat:'',lng:'',consent:false});setModal('');notify('Registro de demostración agregado. En Fase 2 se conectará al backend.');
  };
  const submitRating=e=>{
    e.preventDefault();
    if(!/^\+?51?\d{9,11}$/.test(ratingForm.phone.replace(/[\s-]/g,''))){notify('Revisa el número de WhatsApp ingresado.');return;}
    notify('Formulario de calificación de demostración. La verificación OTP se implementará en Fase 2.');setModal('');
  };
  const openSocial=()=>{setSocialForm({name:'',category:'',networks:[],schedule:'No'});setModal('social');};
  const toggleNetwork=n=>setSocialForm(p=>({...p,networks:p.networks.includes(n)?p.networks.filter(x=>x!==n):[...p.networks,n]}));
  const socialMessage=`Hola, quiero publicar gratuitamente el contenido de mi puesto o productos en las redes sociales de MercadoPlaza.\n\nNombre del puesto: ${socialForm.name}\nRubro: ${socialForm.category}\nRedes sociales: ${socialForm.networks.join(', ')}\n¿Deseo programar mi publicación?: ${socialForm.schedule}\nMaterial visual o audiovisual: lo enviaré por este chat.`;
  const donateMessage=`Hola, quiero realizar un aporte voluntario para apoyar el crecimiento de MercadoPlaza.\n\nNombre: ${donation.name}\nWhatsApp: ${donation.phone}\nMedio de pago: ${donation.method}\nMensaje: ${donation.note}`;
  const banner=banners[bannerIndex];

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="MercadoPlaza inicio"><span className="brand-mark"><ShoppingBasket size={29}/></span><span><strong>Mercado<span>Plaza</span></strong><small>Tu mercado en un solo lugar</small></span></a>
      <div className={`search-wrap ${mobileSearch?'mobile-open':''}`}>
        <Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} onFocus={()=>setSearchFocused(true)} onBlur={()=>setTimeout(()=>setSearchFocused(false),150)} placeholder="Buscar puestos, productos o rubros..."/>
        {query&&<button onClick={()=>setQuery('')} aria-label="Limpiar búsqueda"><X size={16}/></button>}
      </div>
      <div className="top-actions">
        <div className="location-control"><MapPin size={17}/><select aria-label="Seleccionar provincia" value={province} onChange={e=>setProvinceFilter(e.target.value)}><option value="Todas">Toda Piura</option>{Object.keys(locations).map(p=><option key={p}>{p}</option>)}</select></div>
        <button className={`header-icon ${showFavorites?'selected':''}`} onClick={()=>{setShowFavorites(v=>!v);setCategory('Todos');}} title="Puestos favoritos"><Heart size={21}/><span className="mobile-label">Favoritos</span>{favorites.length>0&&<i>{favorites.length}</i>}</button>
        <button className="register-btn" onClick={()=>setModal('register')}><Store size={18}/><span>Registrar puesto</span></button>
      </div>
      <button className="mobile-search-btn" onClick={()=>setMobileSearch(v=>!v)} aria-label="Buscar"><Search/></button>
    </header>

    <main>
      <section className="hero-wrap">
        <div className={`hero-slide ${banner.color}`} style={{backgroundImage:`linear-gradient(90deg,rgba(10,45,35,.76),rgba(10,45,35,.12)),url("${banner.image}")`}}>
          <div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> COMERCIO LOCAL</span><h1>{banner.title}</h1><p>{banner.subtitle}</p><a href={banner.url} onClick={e=>{if(banner.url==='#registro'){e.preventDefault();setModal('register');}else if(banner.url==='#rubros'){e.preventDefault();document.getElementById('rubros')?.scrollIntoView({behavior:'smooth'});}}} className="hero-cta">{banner.cta}<ArrowUpRight size={17}/></a></div>
          <div className="hero-controls"><button onClick={()=>setBannerIndex((bannerIndex+banners.length-1)%banners.length)} aria-label="Banner anterior"><ChevronLeft/></button><button onClick={()=>setBannerIndex((bannerIndex+1)%banners.length)} aria-label="Banner siguiente"><ChevronRight/></button></div>
          <div className="hero-dots">{banners.map((b,i)=><button key={b.title} className={i===bannerIndex?'active':''} onClick={()=>setBannerIndex(i)} aria-label={`Ir al banner ${i+1}`}/>)}</div>
        </div>
      </section>

      <section className="category-section section" id="rubros">
        <div className="section-heading"><div><span className="section-kicker">ENCUENTRA LO QUE BUSCAS</span><h2>Explora nuestros rubros</h2></div><span className="subtle-count">{shops.length} puestos en la vitrina</span></div>
        <div className="category-strip">
          <button className={`category-chip all ${category==='Todos'?'active':''}`} onClick={()=>setCategory('Todos')}><span>✦</span><b>Todos</b></button>
          {categoryCounts.map(({name,count})=><button key={name} className={`category-chip ${category===name?'active':''}`} onClick={()=>setCategory(category===name?'Todos':name)}><span>{categoryIcons[rubros.indexOf(name)]}</span><b>{name}</b><small>{count}</small></button>)}
        </div>
      </section>

      <section className="directory section" id="puestos">
        <div className="section-heading directory-heading"><div><span className="section-kicker">DESCUBRE TU MERCADO</span><h2>{showFavorites?'Mis puestos favoritos':category==='Todos'?'Puestos para descubrir':category}</h2><p>Conoce los negocios locales y comunícate directamente con ellos.</p></div><div className="sort-label"><SlidersHorizontal size={16}/><span>Mejor calificados</span></div></div>
        <div className="filters-row">
          <label><MapPin size={15}/><select value={province} onChange={e=>setProvinceFilter(e.target.value)}><option value="Todas">Todas las provincias</option>{Object.keys(locations).map(p=><option key={p}>{p}</option>)}</select></label>
          <label><Navigation size={15}/><select value={district} onChange={e=>setDistrict(e.target.value)} disabled={province==='Todas'}><option value="Todos">Todos los distritos</option>{districts.map(d=><option key={d}>{d}</option>)}</select></label>
          {(query||category!=='Todos'||province!=='Todas'||district!=='Todos'||showFavorites)&&<button className="clear-filters" onClick={()=>{setQuery('');setCategory('Todos');setProvince('Todas');setDistrict('Todos');setShowFavorites(false);}}>Limpiar filtros <X size={14}/></button>}
        </div>
        {filtered.length?<div className="shop-grid">{filtered.map(shop=><ShopCard key={shop.id} shop={shop} favorite={favorites.includes(shop.id)} onFavorite={toggleFavorite} onRate={openRate}/>)}</div>:<div className="empty-state"><div className="empty-icon"><Search/></div><h3>No encontramos puestos</h3><p>Prueba cambiando el rubro, la provincia o tu búsqueda.</p><button className="secondary-btn" onClick={()=>{setQuery('');setCategory('Todos');setProvince('Todas');setDistrict('Todos');setShowFavorites(false);}}>Ver todos los puestos</button></div>}
      </section>

      <section className="social-promo section">
        <div className="promo-icon"><Megaphone size={30}/></div>
        <div className="promo-copy"><span className="section-kicker">DIFUSIÓN PARA COMERCIANTES</span><h2>¡Promociona tu puesto GRATIS!</h2><p>Envíanos tus fotos o videos y te ayudaremos a difundir tus productos en nuestras redes sociales.</p><div className="promo-hours"><Clock3 size={14}/> Lunes a sábado: 10:00 a. m. – 1:00 p. m. y 2:00 p. m. – 5:00 p. m.</div><small>Publicaciones en orden de recepción, sujetas a revisión. Envía material listo para el formato de cada red.</small></div>
        <button className="whatsapp-cta" onClick={openSocial}><SiWhatsapp size={19}/> Enviar mi publicación <ArrowUpRight size={16}/></button>
      </section>

      <section className="catalog-promo section">
        <div className="gift-icon"><Gift size={34}/></div><div><span className="section-kicker">HAZ CRECER TU NEGOCIO</span><h2>¿Quieres tener tu propio catálogo virtual?</h2><p>Comparte tus productos con un enlace o código QR. Planes según la cantidad de productos de tu puesto.</p></div>
        <a className="catalog-btn" href={wa('Hola, encontré MercadoPlaza y quiero cotizar un catálogo virtual para mi puesto. Quisiera conocer los planes mensuales y anuales según la cantidad de productos que tengo.')} target="_blank" rel="noreferrer"><SiWhatsapp size={19}/> Cotizar por WhatsApp</a>
      </section>
    </main>

    <footer className="footer">
      <div className="footer-top"><a className="footer-brand" href="#"><span className="brand-mark"><ShoppingBasket/></span><span><b>Mercado<span>Plaza</span></b><small>Tu mercado en un solo lugar</small></span></a><p>Conectando a Piura con sus mercados, puestos y comerciantes.</p><div className="social-icons"><a href="#" aria-label="Facebook"><SiFacebook/></a><a href="#" aria-label="Instagram"><SiInstagram/></a><a href="#" aria-label="TikTok"><SiTiktok/></a><a href="#" aria-label="YouTube"><SiYoutube/></a></div></div>
      <div className="footer-bottom"><span>PaitaMercado - Todos los derechos reservados.</span><span>Desarrollado por <a href="https://comaxion.vercel.app" target="_blank" rel="noreferrer">COMAXION <ExternalLink size={12}/></a></span><div className="footer-links"><a href="#privacidad">Privacidad</a><a href="#terminos">Términos</a><button onClick={()=>setModal('donate')}><Heart size={14}/> Apoyar MercadoPlaza</button></div></div>
    </footer>

    <button className="floating-support" onClick={()=>setModal('donate')}><Heart size={16}/> <span>Apoyar</span></button>
    {installPrompt&&<button className="install-app" onClick={async()=>{await installPrompt.prompt();setInstallPrompt(null);}}><Smartphone size={16}/> Instalar app</button>}
    {toast&&<div className="toast"><CheckCircle2 size={18}/>{toast}</div>}

    {modal==='register'&&<Modal title="Registra tu puesto GRATIS" subtitle="Forma parte de MercadoPlaza y permite que más personas encuentren tu negocio." onClose={()=>setModal('')}>
      <form className="modal-form" onSubmit={submitShop}>
        <label>Nombre o ID del puesto <em>*</em><input required maxLength="90" value={form.name} onChange={e=>updateForm('name',e.target.value)} placeholder="Ej. Puesto 125 - Comercial Anita"/></label>
        <label>Rubro principal <em>*</em><select required value={form.category} onChange={e=>updateForm('category',e.target.value)}><option value="">Selecciona un rubro</option>{rubros.map(r=><option key={r}>{r}</option>)}</select></label>
        <label>Descripción breve <em>*</em><textarea required maxLength="250" value={form.description} onChange={e=>updateForm('description',e.target.value)} placeholder="Cuéntanos brevemente qué ofrece tu puesto..."/><small className="field-hint">{form.description.length}/250 caracteres</small></label>
        <div className="form-two"><label>Provincia <em>*</em><select required value={form.province} onChange={e=>{updateForm('province',e.target.value);updateForm('district','');}}>{Object.keys(locations).map(p=><option key={p}>{p}</option>)}</select></label><label>Distrito <em>*</em><select required value={form.district} onChange={e=>updateForm('district',e.target.value)}><option value="">Selecciona</option>{(locations[form.province]||[]).map(d=><option key={d}>{d}</option>)}</select></label></div>
        <div className="gps-box"><div><MapPinned size={19}/><span><b>Ubicación GPS</b><small>Opcional · Puedes continuar sin GPS</small></span></div><button type="button" className="outline-btn" onClick={detectPosition}><Navigation size={15}/> Detectar ubicación</button>{form.lat&&<small className="gps-coords">Coordenadas: {form.lat}, {form.lng}</small>}</div>
        <label>WhatsApp del puesto (opcional)<input inputMode="tel" value={form.whatsapp} onChange={e=>updateForm('whatsapp',e.target.value)} placeholder="Ej. 987 654 321"/></label>
        <label>Facebook o catálogo virtual (opcional)<input type="url" value={form.url} onChange={e=>updateForm('url',e.target.value)} placeholder="https://..."/></label>
        <label className="consent"><input type="checkbox" checked={form.consent} onChange={e=>updateForm('consent',e.target.checked)}/><span>Acepto el tratamiento de mis datos personales para fines de publicación, difusión comercial y funcionamiento de MercadoPlaza. He leído y acepto la <a href="#privacidad">política de privacidad</a>.</span></label>
        <div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setModal('')}>Cancelar</button><button className="primary-btn" type="submit"><Store size={17}/> Registrar mi puesto</button></div>
        <p className="demo-note">Versión de demostración: el registro se guardará temporalmente en esta sesión. La conexión permanente se implementará en la Fase 2.</p>
      </form>
    </Modal>}

    {modal==='rate'&&selectedShop&&<Modal title="Calificar puesto" subtitle="Tu opinión ayuda a otros consumidores a conocer los negocios locales." onClose={()=>setModal('')}>
      <form className="modal-form" onSubmit={submitRating}>
        <div className="rating-shop"><img src={selectedShop.image} alt=""/><div><b>{selectedShop.name}</b><small>{selectedShop.category}</small><small>{selectedShop.district}, {selectedShop.province}</small></div></div>
        <label className="star-label">¿Cómo calificas este puesto?</label><div className="star-picker">{[1,2,3,4,5].map(n=><button type="button" key={n} className={n<=ratingForm.stars?'on':''} onClick={()=>setRatingForm(p=>({...p,stars:n}))} aria-label={`${n} estrellas`}><Star fill="currentColor"/></button>)}</div><p className="star-caption">{['','Muy malo','Malo','Regular','Bueno','¡Excelente!'][ratingForm.stars]}</p>
        <label>Número de WhatsApp <em>*</em><input required inputMode="tel" value={ratingForm.phone} onChange={e=>setRatingForm(p=>({...p,phone:e.target.value}))} placeholder="Ej. 987 654 321"/></label>
        <label>Comentario o sugerencia (opcional)<textarea maxLength="300" value={ratingForm.comment} onChange={e=>setRatingForm(p=>({...p,comment:e.target.value}))} placeholder="Comparte tu experiencia..."/></label>
        <p className="demo-note">Esta maqueta no verifica el número ni registra votos reales. La verificación OTP y el control de votos únicos se implementarán en la Fase 2.</p>
        <div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setModal('')}>Cancelar</button><button type="submit" className="primary-btn"><Star size={17}/> Enviar calificación</button></div>
      </form>
    </Modal>}

    {modal==='social'&&<Modal title="Publica tu negocio GRATIS" subtitle="Cuéntanos dónde quieres difundir tu contenido." onClose={()=>setModal('')}>
      <form className="modal-form" onSubmit={e=>{e.preventDefault();window.open(wa(socialMessage),'_blank','noopener,noreferrer');setModal('');}}>
        <label>Nombre del puesto <em>*</em><input required value={socialForm.name} onChange={e=>setSocialForm(p=>({...p,name:e.target.value}))} placeholder="Nombre de tu negocio"/></label>
        <label>Rubro <em>*</em><select required value={socialForm.category} onChange={e=>setSocialForm(p=>({...p,category:e.target.value}))}><option value="">Selecciona un rubro</option>{rubros.map(r=><option key={r}>{r}</option>)}</select></label>
        <span className="field-title">¿En qué redes deseas publicar? <em>*</em></span><div className="network-options">{['Facebook','Instagram','TikTok','YouTube'].map(n=><label key={n}><input type="checkbox" checked={socialForm.networks.includes(n)} onChange={()=>toggleNetwork(n)}/>{n}</label>)}</div>
        <label>¿Deseas que tu publicación sea programada?<select value={socialForm.schedule} onChange={e=>setSocialForm(p=>({...p,schedule:e.target.value}))}><option>No</option><option>Sí</option></select></label>
        <p className="demo-note">Envía por WhatsApp tu material listo para publicar. Las publicaciones se revisan y atienden en orden de recepción, dentro del horario indicado.</p>
        <div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setModal('')}>Cancelar</button><button type="submit" className="primary-btn" disabled={!socialForm.networks.length}><SiWhatsapp size={17}/> Continuar por WhatsApp</button></div>
      </form>
    </Modal>}

    {modal==='donate'&&<Modal title="Apoya a MercadoPlaza" subtitle="Tu aporte voluntario nos ayuda a seguir mejorando esta plataforma." onClose={()=>setModal('')}>
      <form className="modal-form" onSubmit={e=>{e.preventDefault();window.open(wa(donateMessage),'_blank','noopener,noreferrer');setModal('');}}>
        <label>Nombres y apellidos (opcional)<input value={donation.name} onChange={e=>setDonation(p=>({...p,name:e.target.value}))} placeholder="Tu nombre"/></label>
        <label>WhatsApp (opcional)<input inputMode="tel" value={donation.phone} onChange={e=>setDonation(p=>({...p,phone:e.target.value}))} placeholder="Tu número de contacto"/></label>
        <label>¿Por qué medio deseas realizar tu aporte?<select value={donation.method} onChange={e=>setDonation(p=>({...p,method:e.target.value}))}><option>Yape</option><option>Plin</option><option>Transferencia bancaria</option></select></label>
        <label>Nota o mensaje (opcional)<textarea value={donation.note} onChange={e=>setDonation(p=>({...p,note:e.target.value}))} placeholder="Escribe un mensaje..."/></label>
        <p className="demo-note">Este formulario comunica tu intención de aportar. No procesa pagos ni solicita claves o datos bancarios.</p>
        <div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setModal('')}>Cancelar</button><button type="submit" className="primary-btn"><SiWhatsapp size={17}/> Enviar por WhatsApp</button></div>
      </form>
    </Modal>}
  </div>;
}
