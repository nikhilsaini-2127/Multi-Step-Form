

const firstNames = [
  "Nikhil", "Rahul", "Amit", "Praveen", "Rohit",
  "Vikas", "Arjun", "Karan", "Aditya", "Saurabh",
  "Ankit", "Varun", "Manish", "Deepak", "Akash",
  "Ravi", "Vivek", "Mohit", "Abhishek", "Sumit"
];

const lastNames = [
  "Sharma", "Saini", "Verma", "Swami", "Kumar",
  "Singh", "Gupta", "Yadav", "Mishra", "Jain",
  "Mehta", "Agarwal", "Malhotra", "Bansal", "Kapoor"
];

const companies = [
  "TCS", "Infosys", "Wipro", "Truminds", "Accenture",
  "Microsoft", "Google", "Amazon", "IBM", "Deloitte",
  "HCL", "Tech Mahindra", "Cognizant", "Oracle", "Adobe"
];

const positions = [
  "SDE-1", "SDE-2", "Software Engineer", "Frontend Developer",
  "Backend Developer", "Full Stack Developer", "React Developer",
  "Node.js Developer", "DevOps Engineer", "QA Engineer"
];

const industries = [
  "Software", "FinTech", "E-Commerce", "Healthcare",
  "Artificial Intelligence", "Cloud Computing", "Cyber Security",
  "EdTech", "Consulting", "SaaS"
];

const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

 export default function generateRandomData (count = 100) {
  return Array.from({ length: count }, (_, index) => {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.com`;

    const phone =
      "9" +
      Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(9, "0");

    const company = randomItem(companies);
    const position = randomItem(positions);
    const experience = Math.floor(Math.random() * 11).toString();
    const industry = randomItem(industries);

    const cardHolderName = `${firstName} ${lastName}`;

    const cardNumber =
      "411111111111" +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

    const expiryDate =
      `${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/` +
      `${Math.floor(Math.random() * 10) + 26}`;

    const cvv = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

    return {
      personal: {
        firstName,
        lastName,
        email,
        phone,
      },

      professional: {
        company,
        position,
        experience,
        industry,
      },

      billing: {
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
      },
    };
  });
};

const randomData = generateRandomData(100);

