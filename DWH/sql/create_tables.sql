CREATE TABLE базы_данных (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE инструменты (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE среды_разработки (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE уровни_знаний_в_отрасли (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE предметная_область (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE уровни_образования (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE отрасли (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE платформы (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE уровни_знаний (
    id SERIAL PRIMARY KEY,
    название VARCHAR(20) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE сотрудники_дпр (
    id SERIAL PRIMARY KEY,
    дата_рождения DATE,
    активность BOOLEAN,
    пол VARCHAR(5),
    фамилия VARCHAR(20),
    имя VARCHAR(20),
    отчество VARCHAR(20),
    должность VARCHAR(20),
    цпо VARCHAR(10),
    дата_регистрации DATE,
    дата_изменения DATE,
    подразделение VARCHAR(50),
    email VARCHAR(50),
    логин VARCHAR(50),
    компания VARCHAR(50),
    город_проживания VARCHAR(50)
);

CREATE TABLE сертификаты_пользователей (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    активность BOOLEAN,
    дата_изм DATE,
    год_сертификата INT,
    название_сертификата VARCHAR(100),
    организация_выдавшая_сертификат VARCHAR(50)
);

CREATE TABLE опыт_сотрудника_в_различных_отраслях (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    опыт INT,
    дата DATE,
    отрасль INT REFERENCES отрасли(id),
    уровень_знаний_в_отрасли INT REFERENCES уровни_знаний(id)
);

CREATE TABLE опыт_сотрудника_в_предметной_области (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    опыт INT,
    дата DATE,
    предметная_область INT REFERENCES предметная_область(id),
    уровень_знаний_в_предметной_обл INT REFERENCES уровни_знаний(id)
);

CREATE TABLE базы_данных_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    база_данных INT REFERENCES базы_данных(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE инструменты_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    инструмент INT REFERENCES инструменты(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE среды_разработки_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    среда_разработки INT REFERENCES среды_разработки(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE платформы_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    платформа INT REFERENCES платформы(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE языки_программирования_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    язык INT REFERENCES языки(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE технологии (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE технологии_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    технология INT REFERENCES технологии(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE языки (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE языки_пользователей (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    язык INT REFERENCES языки(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_владения_языком INT REFERENCES уровни_знаний(id)
);

CREATE TABLE типы_систем (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE типы_систем_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    тип_системы INT REFERENCES типы_систем(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);

CREATE TABLE фреймворки (
    id SERIAL PRIMARY KEY,
    название VARCHAR(50) NOT NULL,
    активность BOOLEAN,
    дата_изм DATE
);

CREATE TABLE фреймворки_и_уровень_владения (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES сотрудники_дпр(id),
    фреймворк INT REFERENCES фреймворки(id),
    активность BOOLEAN,
    дата_изм DATE,
    уровень_знаний INT REFERENCES уровни_знаний(id)
);
