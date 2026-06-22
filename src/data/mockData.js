// Lightweight deterministic mock-data generator (no external dependency).
// Uses a seeded PRNG so data is stable across renders within a session.

const FIRST_NAMES_M = [
  'Earl', 'Lester', 'Jeffrey', 'Rohan', 'Kabir', 'Daniel', 'Liam', 'Vikram',
  'Ishaan', 'Omar', 'Yusuf', 'Arjun', 'Felix', 'Hassan',
];

const FIRST_NAMES_F = [
  'Nora', 'Lelia', 'Emilie', 'Matilda', 'Priya', 'Ananya', 'Meera', 'Sara',
  'Aisha', 'Noor', 'Tanya', 'Clara', 'Naomi', 'Diya', 'Grace', 'Isla',
];

const LAST_NAMES = [
  'Parrini', 'Willis', 'Bianchi', 'Humbert', 'Palagi', 'Hermans', 'Sanchez',
  'Kapoor', 'Mehta', 'Iyer', 'Khan', 'Nair', 'Fernandes', 'Joshi', 'Verma',
  'Dsouza', 'Reddy', 'Shaikh', 'Pillai', 'Bose', 'Rao', 'Chawla', 'Malik',
  'Sethi', 'Bhatt', 'Saxena', 'Tandon', 'Ahuja', 'Oberoi', 'Chopra',
];

const COUNTRIES = [
  'India', 'Russia', 'Kenya', 'Nigeria', 'Ethiopia', 'Bahrain', 'Hungary',
  'Malta', 'Brazil', 'Vietnam', 'Egypt', 'Peru', 'Poland', 'Chile', 'Nepal',
];

const CAUSES = [
  'Education Fund', 'Food Relief', 'Medical Aid', 'Disaster Relief',
  'Child Welfare', 'Clean Water', 'Animal Shelter', 'Skill Training',
];

const STATUSES = ['Complete', 'Pending', 'Canceled'];

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function buildRecord(id, rand, kind) {
  const gender = rand() > 0.5 ? 'male' : 'female';
  const first = pick(rand, gender === 'female' ? FIRST_NAMES_F : FIRST_NAMES_M);
  const last = pick(rand, LAST_NAMES);
  const name = `${first} ${last}`;
  const status = pick(rand, STATUSES);
  const country = pick(rand, COUNTRIES);
  const age = 18 + Math.floor(rand() * 50);
  const phone = `+91 ${70000 + Math.floor(rand() * 9999)} ${10000 + Math.floor(rand() * 89999)}`;
  const email = `${first}.${last}`.toLowerCase() + '@mail.com';
  const donations = Math.floor(rand() * 25000);
  const cause = pick(rand, CAUSES);
  const joined = new Date(2021 + Math.floor(rand() * 4), Math.floor(rand() * 12), 1 + Math.floor(rand() * 28));

  return {
    id,
    kind,
    name,
    firstName: first,
    lastName: last,
    gender,
    avatarUrl: null,
    email,
    phone,
    age,
    country,
    status,
    donations,
    cause,
    joined: joined.toISOString().slice(0, 10),
    avatarHue: Math.floor(rand() * 360),
    bio: `Hello, I'm ${name}. A dedicated ${kind === 'volunteer' ? 'volunteer' : 'member'} supporting the ${cause} initiative. Passionate about community impact and showing up where it counts.`,
    role: kind === 'volunteer' ? 'Field Volunteer' : 'General Member',
    zipcode: `${100000 + Math.floor(rand() * 800000)}`,
    address: `${1 + Math.floor(rand() * 400)}, ${pick(rand, ['MG Road', 'Park Street', 'Lake View', 'Civil Lines', 'Sector 21', 'Church Street'])}, ${country}`,
  };
}

function makeDataset(kind, count, seed) {
  const rand = mulberry32(seed);
  const list = [];
  for (let i = 1; i <= count; i += 1) {
    list.push(buildRecord(i, rand, kind));
  }
  return list;
}

export const MEMBERS = makeDataset('member', 240, 1001);
export const VOLUNTEERS = makeDataset('volunteer', 180, 2002);
export const DONATIONS = makeDataset('donation', 260, 3003).map((r) => ({
  ...r,
  amount: 500 + Math.floor((r.donations || 1) * 3.4),
  method: ['UPI', 'Card', 'Bank Transfer', 'Cash'][r.id % 4],
}));

export function findRecordById(kind, id) {
  const source = kind === 'volunteer' ? VOLUNTEERS : kind === 'donation' ? DONATIONS : MEMBERS;
  return source.find((r) => String(r.id) === String(id));
}


/* ------------------------------- Events -------------------------------- */

const EVENT_NAMES = [
  'Annual Fundraising Gala',
  'Volunteer Orientation Day',
  'School Supplies Drive',
  'Community Health Camp',
  'Tree Plantation Drive',
  'Donor Appreciation Meet',
  'Skill Training Workshop',
  'Winter Blanket Distribution',
  'Awareness Walkathon',
  'Board Strategy Meeting',
  'Youth Mentorship Kickoff',
  'Emergency Relief Briefing',
];

const VENUES = [
  'Community Hall, MG Road',
  'Town Park Pavilion',
  'St. Xavier School Auditorium',
  'District Sports Complex',
  'Civic Center, Sector 21',
  'Lake View Convention Center',
];

const EVENT_NOTES = [
  'Please arrive 30 minutes early for registration.',
  'Carry a valid ID for entry.',
  'Light refreshments will be provided.',
  'Volunteers should wear the organisation t-shirt.',
  '',
  '',
];

function buildEvent(id, rand) {
  const isOnline = rand() > 0.55;
  const name = EVENT_NAMES[(id - 1) % EVENT_NAMES.length];
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 27);
  const date = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const hour = 9 + Math.floor(rand() * 9);
  const minute = rand() > 0.5 ? '00' : '30';
  const time = `${String(hour).padStart(2, '0')}:${minute}`;

  return {
    id,
    name: `${name} ${2026}`,
    description:
      'Join us for this initiative as we bring the community together to make a tangible difference. All members and volunteers are welcome to attend and contribute.',
    date,
    time,
    mode: isOnline ? 'online' : 'offline',
    venue: isOnline ? 'Online (link shared below)' : pick(rand, VENUES),
    meetLink: isOnline ? `https://meet.causehub.org/${name.toLowerCase().replace(/\s+/g, '-')}-${id}` : '',
    note: pick(rand, EVENT_NOTES),
  };
}

function makeEvents(count, seed) {
  const rand = mulberry32(seed);
  const list = [];
  for (let i = 1; i <= count; i += 1) {
    list.push(buildEvent(i, rand));
  }
  return list;
}

export const EVENTS = makeEvents(9, 4004);
