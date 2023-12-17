Ширина контейнера складає 1224px
За можливості встигнути моб версію.
# Home Page
+ при натисканні на кнопку login відкрити модалку на логін
+ модальне вікно має містити табуляцію(логін/реєстрація). Активною завжди є таб логіна
+ кнопки "find mentor" активні тобто переадресовують коритсувача на сторінку пошуку ментора
+ розмістити на своє бачення перемикач на темну-світлу тему
+ внизу сторінки також активні посилання (Business Enginering Marketing) які ведуть користувача на сторінку Mentor Page і там вже має бути вибраний даний таб заявок


# Mentor Page
- Пошук карток менторів зробити живим, або при натисканні на кнопнку Go
- Табуляція по заявкам
+ Карточки заявок мають зʼявлятися динамічно, тобто братися з серверу
+ Карточки заявок оформлені в вигляді слайдера

 # Server API
 login - {url: '/singin', method: POST}
 registr - {url: '/singup', method: POST}
 getMentorTasks - {url: '/statements/:YOUR_CATEGORY', method: GET}
 getAllMentorTasks - {url: '/statements', method: GET}
 addMentorTasks - {url: '/statements', method: POST}

 if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()

    доробити логін/регістр - міняти кнопку на фуллнейм, в разі помилки показувати помилку, в разі саксес показувати popup

    30.11:
    slider-card-tabs

    {
        "category": "enginering",
        "itemizedCategory": "Web Development",
        "title": "Gogi Beridze",
        "description": "10+ years of experience building large scale applications",
        "rating": 200,
        "location": "English/Georgian, Georgia",
        "price": 150
        "imgUrl": "./img/avatar/gogi-beridze.jpg"
    },
    {
        "category": "enginering",
        "itemizedCategory": "Javascript Mentors",
        "title": "Ari Bahtiar",
        "description": "Ask anything about react Js, next js, gatsby js, react native",
        "rating": 150,
        "location": "English, Indonezia",
        "price": 150
        "imgUrl": "./img/avatar/ari-bahtiar.jpg"
    },
    {
        "category": "enginering",
        "itemizedCategory": "Web Development",
        "title": "Den Rat",
        "description": "Fullstack & Devops Engineer | 6+ years of experience",
        "rating": 170,
        "location": "English, Great Britain",
        "price": 200
        "imgUrl": "./img/avatar/den-rat.jpg"
    },
    {
        "category": "enginering",
        "itemizedCategory": "Web Development"
        "title": "Maria Garcia",
        "description": "Award winning dev with quarter of century of experience that is passionate about front end",
        "rating": 170,
        "location": "English/Spanish, Spain",
        "price": 120
        "imgUrl": "./img/avatar/maria-garcia.jpg"
    },
    {
        "category": "enginering",
        "itemizedCategory": "Web Development"
        "title": "Stefy Galushko",
        "description": "7+ years of experience | Frontend Engineer | JS, React, Angular",
        "rating": 180,
        "location": "English/Ukranian, Ukraine",
        "price": 150
        "imgUrl": "./img/avatar/stefy-galushko.jpg"
    },
    {
        "category": "enginering",
        "itemizedCategory": "Web Development",
        "title": "Ryan Black",
        "description": "Fullstack Engineer JavaScript Expert React Node Nest Next",
        "rating": 210,
        "location": "English, USA",
        "price": 200
    },
    {
        "category": "marketing",
        "itemizedCategory": "Marketing Experts",
        "title": "Ben Brady",
        "description": "A top-rated digital marketing mentor and agency mentor and entrepreneur",
        "rating": 130,
        "location": "English, Ireland",
        "price": 100
    },
    {
        "category": "marketing",
        "itemizedCategory": "Marketing Experts",
        "title": "Matt White",
        "description": "Paid Growth Expert with 7+ years of Agency experience in Digital Marketing",
        "rating": 200,
        "location": "English, Great Britain",
        "price": 170
    },
    {
        "category": "business",
        "itemizedCategory": "Startup Mentors",
        "title": "Guillermo Olivera",
        "description": "10+ years of experience building products, services, and teams at early stage startups",
        "rating": 150,
        "location": "English/Portugueze, Portugal",
        "price": 200,
        "imgUrl": "./img/avatar/guillermo-olivera.jpg"

    },
    {
        "category": "other",
        "itemizedCategory": "Product managers",
        "title": "Annet Petit",
        "description": "10+ years of experience in Product management - B2B SaaS, PLG and collaboration with Engineering",
        "rating": 220,
        "location": "English/French, France",
        "price": 200
    },
    {
        "category": "business",
        "itemizedCategory": "CEO's and Founders",
        "title": "Martin Kowalski",
        "description": "Mentoring Entrepreneurs and CEO's on Business Strategy, Growth, Fundraising",
        "rating": 170,
        "location": "English/Polish, Poland",
        "price": 150
    },
    {
        "category": "other",
        "itemizedCategory": "Product managers",
        "title": "Henning Schwarz",
        "description": "6+ years of experience in Product Management",
        "rating": 100,
        "location": "English/Deutsch, Germany",
        "price": 120
    },
    {
        "category": "other",
        "itemizedCategory": "Product managers",
        "title": "Lilian Young",
        "description": "Improve your analytical prowess, become a better PM",
        "rating": 250,
        "location": "English, Canada",
        "price": 200
    },
    {
        "category": "other",
        "itemizedCategory": "Career Growth",
        "title": "Suzan Green",
        "description": "I help people design, plan and work towards creating the life they want",
        "rating": 170,
        "location": "English, USA",
        "price": 150
    },
    {
        "category": "other",
        "itemizedCategory": "UX Design",
        "title": "Diego Solo",
        "description": "Proven track record of helping UX designers advance their careers",
        "rating": 160,
        "location": "English/Italian, Italy",
        "price": 180
    },
    {
        "category": "business",
        "itemizedCategory": "Growth Mentors",
        "title": "Florian Groot",
        "description": "Hurry up Your Success with Expert Mentoring and Coaching",
        "rating": 200,
        "location": "English/Dutch, Nitherlands",
        "price": 250
    },
    {
        "category": "other",
        "itemizedCategory": "Game development",
        "title": "Ram Bhaduri",
        "description": "9 years in video game development",
        "rating": 130,
        "location": "English, India",
        "price": 150
    },
    
    {
        "category":"business",
        "itemizedCategory":"Growth Mentors",
        "title":"Kim Jeong",
        "description":"7+ years of work with small and large businesses around the world",
        "rating": 160,
        "location":"English, South Korea",
        "price": 150,
        "imgUrl":"https://i.pravatar.cc",
    }