const mongoose = require('mongoose');
const Service = require('./models/services.model'); // ✅ correct path

const MONGO_URI = 'mongodb+srv://gpinedao:Assignment2@comp229-402.d1klooi.mongodb.net/Portfolio?retryWrites=true&w=majority';

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive and modern websites using HTML, CSS, JavaScript, and React.',
    icon: '/assets/images/webdev.png'
  },
  {
    title: 'Back-End Programming',
    description: 'Creating server-side logic with Python, C#, and Java to power dynamic applications.',
    icon: '/assets/images/backend.png'
  },
  {
    title: 'Database Management',
    description: 'Designing and managing SQL/MySQL databases for scalable applications.',
    icon: '/assets/images/database.png'
  },
  {
    title: 'Software Testing & QA',
    description: 'Ensuring software quality through testing, debugging, and documentation.',
    icon: '/assets/images/testing.png'
  },
  {
    title: 'Financial Data Analysis',
    description: 'Analyzing financial data and building tools for reporting and decision-making.',
    icon: '/assets/images/finance.png'
  }
];

async function seed() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);

    console.log('🗑️ Clearing existing services...');
    await Service.deleteMany();

    console.log('🌱 Inserting new services...');
    await Service.insertMany(services);

    console.log('✅ Services seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding services:', err);
    process.exit(1);
  }
}

seed();