const createTablesSQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;

    CREATE TABLE users(
        id serial PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        birthday DATE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        photo_URL VARCHAR(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=',
        is_admin BOOLEAN DEFAULT false,
        active BOOLEAN DEFAULT true,
        CHECK (birthday < CURRENT_DATE)
    );

    CREATE TABLE products(
        id serial PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        created DATE NOT NULL DEFAULT now(),
        last_updated DATE NOT NULL DEFAULT now(),
        price FLOAT NOT NULL,
        photo_URL VARCHAR(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=',
        stock_left INT NOT NULL,
        active BOOLEAN DEFAULT true
    );
`;

const usersData = [
    {
        username: 'skywalker42',
        firstname: 'Luke',
        lastname: 'Skywalker',
        email: 'luke42@email.com',
        birthday: '1990-06-15',
        password: 'forceMaster123'
    },
    {
        username: 'codeNinja99',
        firstname: 'Samantha',
        lastname: 'Hughes',
        email: 'samantha99@email.com',
        birthday: '1987-09-21',
        password: 'ninjaPass!23',
    },
    {
        username: 'shadowFox',
        firstname: 'James',
        lastname: 'Foxworth',
        email: 'james.fox@email.com',
        birthday: '1995-03-12',
        password: 'stealthyFox88',
    },
    {
        username: 'astroGeek',
        firstname: 'Elena',
        lastname: 'Martinez',
        email: 'elena.space@email.com',
        birthday: '1993-07-30',
        password: 'galaxyRocks2024',
    },
    {
        username: 'techTitan',
        firstname: 'Robert',
        lastname: 'Chang',
        email: 'robert.tech@email.com',
        birthday: '1985-05-18',
        password: 'secureTech456',
    },
    {
        username: 'stormChaser',
        firstname: 'Emily',
        lastname: 'Reed',
        email: 'emily.reed@email.com',
        birthday: '1991-11-10',
        password: 'windyStorm!99',
    },
    {
        username: 'pixelPainter',
        firstname: 'Derek',
        lastname: 'Williams',
        email: 'derek.art@email.com',
        birthday: '1998-04-05',
        password: 'colorSplash77',
    },
    {
        username: 'quantumJumper',
        firstname: 'Isabella',
        lastname: 'Torres',
        email: 'isabella.qj@email.com',
        birthday: '1992-02-14',
        password: 'timeTravel321',
    },
    {
        username: 'zenCoder',
        firstname: 'Nathan',
        lastname: 'Bennett',
        email: 'nathan.zen@email.com',
        birthday: '1989-08-07',
        password: 'mindfulDev007',
    },
    {
        username: 'hyperNova',
        firstname: 'Sophia',
        lastname: 'Nguyen',
        email: 'sophia.hyper@email.com',
        birthday: '1994-12-22',
        password: 'cosmicSpeed99',
    }
];

const productData = [
    {
        "name": "Test",
        "price": 22.23,
        "stock_left": 5
    },
    {
        "name": "Test2",
        "price": 22.23,
        "stock_left": 5
    }
]

module.exports = {
    createTablesSQL,
    usersData,
    productData
}