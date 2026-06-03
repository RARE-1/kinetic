import { Project, Service, Testimonial, LifecycleStep } from './types';

export const projectsData: Project[] = [
  {
    id: 'gusto-bistro',
    title: 'Gusto Bistro Food App',
    client: 'Gusto Steakhouse & Bistro',
    category: 'ios',
    tags: ['SwiftUI', 'Apple Pay', 'Live Delivery Tracker', 'Stripe', 'Push Notifications'],
    description: 'A premium food ordering and digital table booking app built for a busy city gastropub, driving online profits and cutting reservation friction.',
    detailedDescription: 'Gusto Bistro needed a custom iOS application to transition away from expensive third-party delivery platforms. We built a gorgeous, branding-forward food exploration menu integrated with Stripe and Apple Pay. It includes an active, real-time order-state timeline tracking "Kitchen Prepping" through "Out for Delivery" or "Ready for Pickup", completely lowering staff management overhead.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Online Sales Growth', value: '+35%' },
      { label: 'Booking Friction', value: '-80%' },
      { label: 'User Feedback Rating', value: '4.9★' }
    ],
    techStack: ['SwiftUI v5', 'CoreData Local Cache', 'Stripe iOS SDK', 'Apple Pay API', 'Firebase Messaging'],
    challenges: 'Designing a smooth checkout flow that works instantly under rushed kitchen environments, preserving order logs even if the client experiences intermittent cellar signals.',
    solutions: 'Built an offline-first transactional checkout queue that buffers cart states and order dispatches locally, executing immediately once connection settles and sending push updates when the chef confirms the ticket.',
    featured: true
  },
  {
    id: 'ironpulse-fitness',
    title: 'IronPulse Gym Member App',
    client: 'IronPulse Gym & Athletic Club',
    category: 'android',
    tags: ['Kotlin', 'Jetpack Compose', 'Calendar API', 'Offline QR Scanner', 'Room DB'],
    description: 'An elite fitness subscriber client coordinating trainer calendar booking sheets, recurring membership checkouts, and barcode keychains.',
    detailedDescription: 'Engineering a unified customer app for an independent gym chain. IronPulse combines live attendance capacity meters, a personalized personal trainer workout schedule planner, and automated barcode entry cards that work directly on gym scanner hardware.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Class RSVPs Tracked', value: '12K+' },
      { label: 'Check-in Latency', value: '<200ms' },
      { label: 'Membership Sales', value: '+22%' }
    ],
    techStack: ['Kotlin Native', 'Jetpack Compose', 'Room Database Organizer', 'Google Calendar Sync SDK', 'Secured Barcode Vector Generator'],
    challenges: 'Allowing hundreds of members to rapidly scan their digital passcards at the physical turnstiles during peak 6:00 AM hours, without lagging or failing to load when cellular signals are dead.',
    solutions: 'Implemented an offline-resilient vector passcard and token encoder, enabling quick turnstile handshakes and syncing attendance records in the background without blocking the member.',
    featured: true
  },
  {
    id: 'aura-salon',
    title: 'Aura Salon Scheduling Hub',
    client: 'Aura Wellness Salon & Spa',
    category: 'cross-platform',
    tags: ['Flutter', 'Stylist Booking', 'SMS Auto-Alerts', 'Loyalty Rewards', 'SQLite'],
    description: 'A luxurious wellness scheduling app designed for a high-end salon chain, integrating stylist diaries, instant appointments, and scratch loyalty cards.',
    detailedDescription: 'Aura Wellness selected us to construct a cross-platform booking engine for their stylist team. Clients can book cuts, colors, and massage therapy treatments, choose specific stylists, view stylist bios, and accrue custom loyalty points within an exquisite, visually soothing viewport.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Staff Booking Coverage', value: '100%' },
      { label: 'No-Show Rate Drop', value: '-64%' },
      { label: 'Client Accounts Saved', value: '8.5K+' }
    ],
    techStack: ['Flutter', 'Dart Core', 'Firebase Cloud Alerts', 'SMS Gateway Integration', 'Secure local Keychain'],
    challenges: 'Preventing double-booking conflicts across 15+ independent stylists during busy weekend rushes while preserving a highly clean, elegant layout that feels elite and stress-free.',
    solutions: 'Constructed an instant calendar lock framework that reserves client slots on the server for 5 minutes during checkout, sending automated SMS confirmations and appointment reminders via Twilio integration.',
    featured: true
  },
  {
    id: 'luna-boutique',
    title: 'Luna Boutique Checkout App',
    client: 'Luna Designer Apparel',
    category: 'ios',
    tags: ['SwiftUI', 'Apple Pay Checkout', 'Inventory Alerting', 'Customer Loyalty'],
    description: 'A charming local clothing studio app enabling haptic-driven purchases, member-only discounts, and real-time boutique stock notifications.',
    detailedDescription: 'Bespoke iOS shopping storefront built for a boutique high-street fashion house. Luna displays weekly catalog entries, hosts special "VIP drop" flash sales, offers haptic-driven one-click checkouts, and coordinates in-store pickups.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Checkout Time', value: '1.8 Seconds' },
      { label: 'In-Store Pickups Boost', value: '+45%' },
      { label: 'Active VIP Fans', value: '4.8K+' }
    ],
    techStack: ['SwiftUI Layouts', 'Apple PassKit', 'StoreKit Subscriptions', 'LocalNotifications Coordinator'],
    challenges: 'Providing instant visual catalog loads for rich, retina-resolution fashion imagery while maintaining fluid layout scrolling on older devices.',
    solutions: 'Designed a multi-stage background image compression and local memory cache system, allowing instantaneous image pops and buttery 120Hz list navigation.',
    featured: false
  }
];

export const servicesData: Service[] = [
  {
    id: 'local-business-apps',
    title: 'Custom Local Business Apps',
    description: 'Bespoke iOS & Android mobile applications built for restaurants, saloons, clinical spas, gyms, and local boutique storefronts to drive immediate growth.',
    icon: 'Smartphone',
    deliverables: [
      'Stellar layouts reflecting your physical brand aesthetics',
      'Smooth catalogs (restaurant menus, spa services, gym programs)',
      '1-Click reservation diaries and trainer directories',
      'Unified on-device customer databases'
    ],
    badge: 'Highly Approachable'
  },
  {
    id: 'bookings-calendars',
    title: 'Seamless Calendars & Booking',
    description: 'Ditch the spreadsheets and paper notebooks. I build direct in-app scheduling calendars that coordinate stylist times, training slots, or restaurant tables.',
    icon: 'Layers',
    deliverables: [
      'Real-time booking locks to prevent double-booking conflicts',
      'Automatic SMS & Email reminders so clients never miss a slot',
      'Recurring gym membership and class scheduling controls',
      'Live attendance meters showing busy hours in real-time'
    ],
    badge: 'Operations Saver'
  },
  {
    id: 'payments-checkout',
    title: 'In-App Orders & Easy Payments',
    description: 'Maximize conversions and stop losing clients to third-party high fee sites. I design smooth, intuitive shopping tabs, delivery menus, and checkout pages.',
    icon: 'Zap',
    deliverables: [
      'Stripe & PayPal secure payment merchant configurations',
      '1-Click Apple Pay & Google Pay checkouts on native grids',
      'Digital gift cards, rewards points, and VIP codes',
      'Live milestone tracking receipts ("Order Placed" to "Prepped")'
    ]
  },
  {
    id: 'loyalty-push',
    title: 'Customer Loyalty & Retention',
    description: 'Keep your local customers coming back with custom digital loyalty stamp books, VIP scratch cards, and targeted notifications sent straight to their phone screen.',
    icon: 'Cpu',
    deliverables: [
      'Mobile loyalty cards tracking visitor stamps and coupon codes',
      'Targeted push notifications alerting neighborhood clients of flash sales',
      'In-app review prompts converting app visitors into Google reviews',
      'Promotional flash drop banner controls'
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'elena-r',
    name: 'Elena Rostova',
    role: 'Co-Founder & General Manager',
    company: 'Gusto Gastronomy Bistro',
    logo: 'Gusto Bistro',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    content: "He built a custom food ordering app for our steakhouse in weeks. We bypassed third-party delivery portal commissions completely, and our weekly delivery orders surged by 35%. The customer menu layout is simply breathtaking.",
    rating: 5,
    projectAssociated: 'Gusto Bistro Food App'
  },
  {
    id: 'marcus-c',
    name: 'Marcus Chen',
    role: 'Managing Director & Head Trainer',
    company: 'IronPulse Gym Chain',
    logo: 'IronPulse Gyms',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    content: "Our members absolutely love the class RSVP calendars. They can secure training slots in under three seconds, and our staff entry checkpoint barcode scans work perfectly even offline under our metal-frame building structure.",
    rating: 5,
    projectAssociated: 'IronPulse Gym Member App'
  },
  {
    id: 'sarah-j-m',
    name: 'Sarah J. Miller',
    role: 'Creative Director',
    company: 'Aura Hair, Spa & Beauty',
    logo: 'Aura Wellness',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    content: "The Twilio-driven automated SMS alerts reduced client no-shows by 64% in a single month. Finding and selecting stylists is incredibly easy. Best investment we have made for our beauty business.",
    rating: 5,
    projectAssociated: 'Aura Salon Scheduling Hub'
  },
  {
    id: 'david-v',
    name: 'David Vance',
    role: 'Owner & Curator',
    company: 'Luna Designer Apparel',
    logo: 'Luna Boutique',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    content: "Our VIP collections drop notification triggers massive rushes, and the Apple Pay checkout has been flawless. It is so rewarding seeing local neighborhood clients pick up items we announced over our app.",
    rating: 5,
    projectAssociated: 'Luna Boutique Checkout App'
  }
];

export const lifecycleStepsData: LifecycleStep[] = [
  {
    phase: '01',
    title: 'Business Goal Discovery',
    duration: 'Week 1',
    description: 'We sketch out your exact business needs—whether that means increasing steak orders, booking styling slots, or tracking memberships.',
    details: [
      'Detailed mapping of your target local client reservation pathways',
      'Identification of menu, catalog, or schedule parameters for input',
      'Deciding on payment systems, checkout features, and loyalty structures'
    ]
  },
  {
    phase: '02',
    title: 'Visual Branding & Designs',
    duration: 'Weeks 2-3',
    description: 'Creating customized, beautiful design mockups illustrating reservation forms, catalogs, or order lists.',
    details: [
      'Tailoring mobile color palettes to match your physical shop colors',
      'Designing intuitive checkout buttons, stylist cards, or trainer menus',
      'Establishing a clear layout flow requiring minimal touch gestures'
    ]
  },
  {
    phase: '03',
    title: 'Elite App Development',
    duration: 'Weeks 4-7',
    description: 'Developing the real, fully performant application. No lazy shortcuts. Extremely fast page-load and smooth scroll animations.',
    details: [
      'Building with native SwiftUI and Jetpack Compose for premium touch responses',
      'Setting up secured data cache storage for fast offline catalog browsing',
      'Integrating Stripe, Apple Pay, and automated calendar diary gates'
    ]
  },
  {
    phase: '04',
    title: 'Launch & Easy Handover',
    duration: 'Week 8',
    description: 'We publish your shiny new app to the iOS and Google App Stores, configure payment merchants, and show you how to manage it with ease.',
    details: [
      'Apple and Google App Store deployment compliance checklists',
      'Setting up your private web portal to edit menus, timetables, or alerts',
      'Comprehensive walkthrough of booking systems, payouts, and customer lists'
    ]
  }
];
