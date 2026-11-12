export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  projectRelation: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Mark Jil Abayon',
    role: 'ICT Officer',
    company: 'University of Eastern Philippines (UEP)',
    content: 'Lorenzon made substantial contributions to the UEP Human Resource Information System. His work building responsive Next.js frontend modules and Express.js backend endpoints was clean, dependable, and well-architected. He demonstrates strong initiative and engineering dedication.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectRelation: 'Human Resource Information System (HRIS) for UEP'
  },
  {
    id: 'test-2',
    author: 'Jorge B. Durom',
    role: 'MLGOO (Municipal Local Government Operations Officer)',
    company: 'Municipality of Bobon',
    content: 'The Katarungang Pambarangay System developed by Lorenzon has modernized how barangay justice cases and dispute mediations are tracked and documented across Bobon. The system is intuitive, secure, and brings immense value to our municipal governance workflows.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectRelation: 'Bobon Katarungang Pambarangay System'
  },
  {
    id: 'test-3',
    author: 'Andrew Estorninos',
    role: 'Computer Programmer II',
    company: 'Municipality of Bobon',
    content: 'Working alongside Lorenzon has been a great experience. His engineering of the Bobon Rural Health Unit Inventory System significantly improved pharmaceutical inventory control, batch tracking, and dispensing records. He writes maintainable code and delivers practical solutions.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    projectRelation: 'Bobon Rural Health Unit (RHU) Inventory System'
  }
];
