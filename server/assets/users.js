const users = [
  {
    _id: "5cc60904ec784149790a3c3b",
    fName: "John",
    sName: "Smith",
    email: "admin@tuspark.com",
    password: "$2b$10$35/MUbdu6q2JeKL41yyU/emd8KJBUZASAFzHNrwfDq/5XRvDPHHCu",
    business: { _id: "5cc33d9378f83c17a29786b9", name: "Management" },
    isAdmin: true
  },
  {
    _id: "5cc5ec2f812a4721c1a6288b",
    fName: "Joe",
    sName: "Watt",
    email: "JWatt@codebase.com",
    password: "$2b$10$PnJdzYOdKMAmiabIuEe50.GFEEiUuDOi3o7S7Ihk2lLPSu9h9hrp6",
    business: { _id: "5cc61974c3bb0c4ac61cbf72", name: "Codebase" }
  },
  {
    _id: "5cc60a613e844849a5782c21",
    fName: "Emily",
    sName: "Morley",
    email: "e.morley@gmail.com",
    password: "$2b$10$aRFNzgbSm6ldW1Mz2rr7yuz.iWqLVc5gZYDqDVHa5IeSaAr.TwTdy",
    business: { _id: "5cc61974c3bb0c4ac61cbf72", name: "Codebase" }
  },
  {
    _id: "5cc60104ec784149790a3c3b",
    fName: "Kelly",
    sName: "Smith",
    email: "k.Smith@gmail.com",
    password: "$2b$10$aRFNzgbSm6ldW1Mz2rr7yuz.iWqLVc5gZYDqDVHa5IeSaAr.TwTdy",
    business: { _id: "5cc61974c3bb0c4ac61cbf72", name: "Codebase" }
  },
  {
    _id: "5cc383c6849f881ed832ae65",
    fName: "Matt",
    sName: "Peterson",
    email: "ITsupport@fibrewear.com",
    password: "$2b$10$aRFNzgbSm6ldW1Mz2rr7yuz.iWqLVc5gZYDqDVHa5IeSaAr.TwTdy",
    business: { _id: "5cc6088163c6b748d82e5139", name: "Fibrewear" }
  },
  {
    _id: "5cc41adc849f881ed832ae6d",
    fName: "Sue",
    sName: "McQueen",
    email: "sm.business@hasbrouk.com",
    password: "$2b$10$aRFNzgbSm6ldW1Mz2rr7yuz.iWqLVc5gZYDqDVHa5IeSaAr.TwTdy",
    business: { _id: "5cc7088163c6b748d82e5139", name: "Hasbro" }
  }
];

function getUsers() {
  return users.filter(g => g);
}

function getUser({ email }) {
  return users.find(u => u.email === email);
}

function findById(id) {
  return users.find(u => u._id === id);
}

function saveUser(user) {
  const newUser = {
    _id: Date.now().toString(),
    fName: user.fName,
    sName: user.sName,
    email: user.email,
    password: user.password,
    business: {
      _id: user.business._id,
      name: user.business.name
    }
  };
  users.push(newUser);
}

module.exports = { getUsers, getUser, findById, saveUser };
