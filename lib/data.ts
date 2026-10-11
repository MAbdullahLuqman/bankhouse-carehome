import { Accessibility, Armchair, BedDouble, Brain, BusFront, CalendarDays, Dog, Eye, HeartHandshake, Leaf, Phone, Stethoscope, Tv, Users, Wifi } from "lucide-react";

export const navLinks = [
  ["Our care", "/care-services"], ["Life at Bank House", "/facilities"],
  ["Fees & admissions", "/fees"], ["Gallery", "/gallery"], ["Contact", "/contact"], ["About us", "/about-us"]
] as const;

export const siteDetails = {
  name: "Bank House Care Home",
  owner: "Crystal House Platinum Ltd",
  manager: "Ghazala Mahmood",
  address: "Brandlesholme Road, Bury, Greater Manchester BL8 1DJ",
  locationNote: "1.0 mile from the centre of Bury, as the crow flies",
  phone: null as string | null,
  email: null as string | null,
  brochure: null as string | null,
  capacity: 43,
  rooms: { single: 29, companion: 7 },
  building: "Purpose-built; last refurbished in 2013",
  admissionsAge: "65+",
  funding: "Self-funding (private)",
  cqc: {
    rating: "Good",
    inspected: "13 January 2025",
    categories: ["Caring", "Effective", "Responsive", "Safe", "Well-led"].map(name => ({ name, rating: "Good" })),
    url: null as string | null
  }
};

export const careCategories = ["Older person care", "Dementia", "Physical disability", "Visual / hearing impairment"];
export const specialisms = ["Parkinson’s disease", "Acquired brain injury (ABI)", "Day care"];

export const careTypes = [
  {
    slug: "residential", title: "Older person care", icon: HeartHandshake,
    description: "Residential care for older people, with permanent and respite stays available.",
    intro: "Bank House provides residential care for older people aged 65 and over, for both permanent and respite stays.",
    approachTitle: "Support that starts with the person",
    approach: "The home is registered for older person care, dementia, physical disability, and visual or hearing impairment. Individual support is discussed as part of the assessment.",
    dailyLife: ["Help with washing, dressing and everyday routines", "Time for familiar interests and companionship", "Meals that take preferences and dietary needs into account"],
    questions: [
      ["What is residential care?", "Residential care provides accommodation and help with day-to-day personal care. It differs from nursing care, which includes care from registered nurses."],
      ["Can I bring familiar belongings?", "Ask about room layouts and which furniture, photographs and personal items can be brought. Familiar belongings can make a new space feel more comfortable."],
      ["How do I know if it is the right fit?", "Arrange a visit and discuss your needs with the home. Confirm that its staff, facilities and care arrangements can provide the support you need."]
    ]
  },
  {
    slug: "dementia", title: "Dementia care", icon: Brain,
    description: "Understanding, familiar routines and thoughtful support for people living with dementia.",
    intro: "Every person's experience of dementia is different. Choosing care means finding people who understand the individual, their history and their changing needs.",
    approachTitle: "Familiarity, dignity and understanding",
    approach: "Bank House is registered to provide care for people with mild dementia. The team can discuss an individual's needs and whether the home is suitable during an assessment.",
    dailyLife: ["A familiar rhythm to the day, adapted to individual needs", "Meaningful activities based on a person's interests", "Patient communication and opportunities for family connection"],
    questions: [
      ["How is dementia care different?", "Dementia care considers the effects of memory and cognitive changes on everyday life. Ask how staff adapt communication, routines and the environment to each person."],
      ["How can families stay involved?", "Discuss visiting arrangements, preferred ways to receive updates and participation in care reviews. Bring information about routines, interests and personal history."],
      ["What should I ask during a visit?", "Ask about dementia training, staffing, safe outdoor access, mealtime support and how changes in wellbeing are recognised and discussed."]
    ]
  },
  {
    slug: "physical-disability", title: "Physical disability care", icon: Accessibility,
    description: "Residential care for people with physical disabilities.",
    intro: "Physical disability is one of the care categories listed for Bank House. Contact the home to discuss an individual's support needs and suitability.",
    approachTitle: "Support shaped around individual needs",
    approach: "The home can discuss mobility, personal routines, equipment and accessibility needs as part of an assessment.",
    dailyLife: ["Discuss mobility and accessibility requirements", "Share personal routines and preferences", "Ask how support is reviewed as needs change"],
    questions: [
      ["Does Bank House support physical disability?", "Physical disability is included in the home's listed care categories. Suitability depends on an individual's assessed needs."],
      ["Can I ask about accessibility?", "Yes. Discuss access, equipment and room requirements with the home."],
      ["How do we begin?", "Arrange a conversation and share the support needs you would like to discuss."]
    ]
  },
  {
    slug: "visual-hearing-impairment", title: "Visual & hearing impairment", icon: Eye,
    description: "Care for people with visual or hearing impairment.",
    intro: "Visual and hearing impairment are included in Bank House's listed care categories. Contact the home to discuss communication and support needs.",
    approachTitle: "Communication that works for each person",
    approach: "Share the communication approaches and practical support that help someone feel comfortable. The home can discuss individual needs as part of an assessment.",
    dailyLife: ["Discuss preferred ways to communicate", "Share any aids or equipment used", "Agree how information is shared with family"],
    questions: [
      ["Does Bank House support sensory impairment?", "Visual and hearing impairment are included in the home's listed care categories."],
      ["Can a person bring their own equipment?", "Discuss personal equipment and room requirements with the home."],
      ["How do we discuss suitability?", "Contact the home to share the person's needs and communication preferences."]
    ]
  },
  {
    slug: "nursing", title: "Nursing care", icon: Stethoscope,
    description: "Information about nursing care and how to confirm whether a home can meet clinical needs.",
    intro: "Some people need clinical support alongside personal care. Nursing care involves registered nurses and care arrangements matched to those needs.",
    approachTitle: "Clarity about clinical support",
    approach: "Nursing care is not included in the service information supplied for Bank House. Confirm current provision directly before making plans; residential care does not itself imply on-site nursing.",
    dailyLife: ["Ask who provides clinical care and when nurses are available", "Discuss medication, equipment and specialist support needs", "Confirm how clinical changes and appointments are managed"],
    questions: [
      ["Does Bank House provide nursing care?", "Nursing care is not listed in the service information supplied. Confirm current provision directly with the home."],
      ["How does nursing differ from residential care?", "Residential care supports everyday personal needs. Nursing care adds registered nursing support for assessed clinical needs."],
      ["What information should I bring?", "Bring an outline of care needs, medication and clinical support requirements to discuss with the home and the professionals involved."]
    ]
  },
  {
    slug: "respite", title: "Respite care", icon: CalendarDays,
    description: "Explore a short stay for extra support, a change of routine or a break for a family carer.",
    intro: "A short care stay can provide temporary support while a family carer takes a break or circumstances change. The right arrangements depend on individual needs.",
    approachTitle: "A short stay, thoughtfully planned",
    approach: "Bank House offers both permanent residential care and respite stays. Discuss dates, assessment, fees and arrangements for settling in and returning home.",
    dailyLife: ["Share routines, preferences and contact arrangements before the stay", "Confirm medication and any equipment requirements", "Plan the return home and any ongoing support in advance"],
    questions: [
      ["Does Bank House offer respite care?", "Yes. Bank House offers respite stays as well as permanent residential care. Contact the home to discuss availability."],
      ["How long can a short stay be?", "Minimum and maximum stays vary. Confirm the available dates, assessment arrangements and written fees with the home."],
      ["What should we pack?", "Ask for a packing list. Familiar clothes, photographs and personal items may help, alongside medication information and emergency contacts."]
    ]
  }
];

export const facilities = [
  { title: "Single rooms", icon: BedDouble, text: "29 single rooms." },
  { title: "Companion rooms", icon: Users, text: "7 couples or companion rooms." },
  { title: "Lift and stairlift", icon: Accessibility, text: "Lift, stairlift and wheelchair access." },
  { title: "Gardens", icon: Leaf, text: "Gardens for residents to enjoy." },
  { title: "Pets by arrangement", icon: Dog, text: "Pet friendly by arrangement." },
  { title: "Internet access", icon: Wifi, text: "Residents have internet access." },
  { title: "Make it your own", icon: Armchair, text: "Residents may bring their own furniture if required." },
  { title: "Transport", icon: BusFront, text: "Minibus or other transport available." },
  { title: "Phone point", icon: Phone, text: "Phone point in each resident's own room." },
  { title: "Television point", icon: Tv, text: "Television point in each resident's own room." }
];

export const gallery = [
  { src: "/images/lounge.jpg", title: "Light-filled living spaces", alt: "Illustrative sunlit living room with comfortable seating and natural wood", source: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0" },
  { src: "/images/home.jpg", title: "A welcoming setting", alt: "Illustrative house with a green lawn and outdoor space", source: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6" },
  { src: "/images/room.jpg", title: "Room for familiar comforts", alt: "Illustrative sitting room with neutral furnishings, a sofa and a coffee table", source: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" },
  { src: "/images/dining.jpg", title: "Time around the table", alt: "Illustrative kitchen and dining space with natural light", source: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1" }
];

export const reviews: { name: string; text: string; source: string; url: string }[] = [];

export const legalPages = {
  privacy: { title: "Privacy notice", description: "Clear information about your personal information.", sections: ["Who is responsible for your information", "What information is collected and why", "How information is stored and shared", "Your rights and how to contact us"] },
  cookies: { title: "Cookie policy", description: "Understand how cookies and similar technologies are used.", sections: ["Cookies used by this website", "Essential and optional cookies", "Managing your preferences", "Contact and policy updates"] },
  terms: { title: "Website terms", description: "Information about using the Bank House website.", sections: ["About this website", "Information and availability", "Using website materials", "Contact and changes to these terms"] },
  accessibility: { title: "Accessibility", description: "A website designed to make finding care information easier.", sections: ["Accessibility support", "Known limitations", "Reporting an accessibility issue", "Review and improvements"] }
};

export const enquiries: { name: string; need: string; status: string; date: string }[] = [];
export const stats = [
  { label: "Maximum capacity", value: "43" }, { label: "Admissions age", value: "65+" },
  { label: "CQC rating", value: "Good" }, { label: "Published reviews", value: "None" }
];
