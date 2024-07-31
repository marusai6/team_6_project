DROP TABLE IF EXISTS dds.сотрудники_дар CASCADE;
CREATE TABLE dds.сотрудники_дар(
    id INT PRIMARY KEY,
    активность bool,
    пол VARCHAR(5),
    фамилия VARCHAR(20),
    имя VARCHAR(20),
    "Последняя авторизация" date,
    должность VARCHAR(50),
    цфо VARCHAR(10),
    подразделения TEXT,
    "E-Mail" VARCHAR(50),
    логин VARCHAR(50),
    компания VARCHAR(50),
    "Город проживания" VARCHAR(50)
);

DROP TABLE IF EXISTS dds.базы_данных CASCADE;
CREATE TABLE dds.базы_данных (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

DROP TABLE IF EXISTS dds.фреймворки CASCADE;
CREATE TABLE dds.фреймворки (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.уровни_знаний_в_предметной_област CASCADE;
CREATE TABLE dds.уровни_знаний_в_предметной_област
(
    id         INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм."   DATE,
    название VARCHAR(100)
);

DROP TABLE IF EXISTS dds.уровни_знаний_в_отрасли CASCADE;
CREATE TABLE dds.уровни_знаний_в_отрасли
(
    id         INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм."   DATE,
    название VARCHAR(100)
);

DROP TABLE IF EXISTS dds.уровни_владения_ин CASCADE;
CREATE TABLE dds.уровни_владения_ин (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.языки CASCADE;
CREATE TABLE dds.языки (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.типы_систем CASCADE;
CREATE TABLE dds.типы_систем (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.языки_программирования CASCADE;
CREATE TABLE dds.языки_программирования (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.технологии CASCADE;
CREATE TABLE dds.технологии (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(100)
);

DROP TABLE IF EXISTS dds.инструменты CASCADE;
CREATE TABLE dds.инструменты (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.среды_разработки CASCADE;
CREATE TABLE dds.среды_разработки (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.платформы CASCADE;
CREATE TABLE dds.платформы (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.уровни_знаний CASCADE;
CREATE TABLE dds.уровни_знаний (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.отрасли CASCADE;
CREATE TABLE dds.отрасли (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.предметная_область CASCADE;
CREATE TABLE dds.предметная_область (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.уровень_образования CASCADE;
CREATE TABLE dds.уровень_образования (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название VARCHAR(50)
);

DROP TABLE IF EXISTS dds.образование_пользователей CASCADE;
CREATE TABLE dds.образование_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Уровень образования" INT,
    "Название учебного заведения" VARCHAR(200),
    "Фиктивное название" text,
    "Год окончания" INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY ("Уровень образования") REFERENCES dds.уровень_образования(id)
);

DROP TABLE IF EXISTS dds.базы_данных_и_уровень_знаний_сотру CASCADE;
CREATE TABLE dds.базы_данных_и_уровень_знаний_сотру (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Базы данных" INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY ("Базы данных") REFERENCES dds.базы_данных(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.инструменты_и_уровень_знаний_сотр CASCADE;
CREATE TABLE dds.инструменты_и_уровень_знаний_сотр (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    инструменты INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (инструменты) REFERENCES dds.инструменты(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.среды_разработки_и_уровень_знаний_ CASCADE;
CREATE TABLE dds.среды_разработки_и_уровень_знаний_ (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Среды разработки" INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY ("Среды разработки") REFERENCES dds.среды_разработки(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.опыт_сотрудника_в_отраслях CASCADE;
CREATE TABLE dds.опыт_сотрудника_в_отраслях (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    отрасли INT,
    "Уровень знаний в отрасли" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (отрасли) REFERENCES dds.отрасли(id),
    FOREIGN KEY ("Уровень знаний в отрасли") REFERENCES dds.уровни_знаний_в_отрасли(id)
);

DROP TABLE IF EXISTS dds.опыт_сотрудника_в_предметных_областях CASCADE;
CREATE TABLE dds.опыт_сотрудника_в_предметных_областях (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Предметные области" INT,
    "Уровень знаний в предметной области" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY ("Предметные области") REFERENCES dds.предметная_область(id),
    FOREIGN KEY ("Уровень знаний в предметной области") REFERENCES dds.уровни_знаний_в_предметной_област(id)
);

DROP TABLE IF EXISTS dds.сертификаты_пользователей CASCADE;
CREATE TABLE dds.сертификаты_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Наименование сертификата" Text,
    "Организация, выдавшая сертификат"  Text,
    "Год сертификата" Text,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id)
);

DROP TABLE IF EXISTS dds.языки_пользователей CASCADE;
CREATE TABLE dds.языки_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    язык INT,
    "Уровень знаний ин. языка" INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (язык) REFERENCES dds.языки(id),
    FOREIGN KEY ("Уровень знаний ин. языка") REFERENCES dds.уровни_владения_ин(id)
);

DROP TABLE IF EXISTS dds.типы_систем_и_уровень_знаний_сотру CASCADE;
CREATE TABLE dds.типы_систем_и_уровень_знаний_сотру (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Типы систем" INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY ("Типы систем") REFERENCES dds.типы_систем(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.технологии_и_уровень_знаний_сотру CASCADE;
CREATE TABLE dds.технологии_и_уровень_знаний_сотру (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    технологии INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (технологии) REFERENCES dds.технологии(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.фреймворки_и_уровень_знаний_сотрудников CASCADE;
CREATE TABLE dds.фреймворки_и_уровень_знаний_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    фреймворки INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (фреймворки) REFERENCES dds.фреймворки(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.языки_программирования_и_уровень CASCADE;
CREATE TABLE dds.языки_программирования_и_уровень (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Языки программирования" INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY ("Языки программирования") REFERENCES dds.языки_программирования(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);

DROP TABLE IF EXISTS dds.платформы_и_уровень_знаний_сотруд CASCADE;
CREATE TABLE dds.платформы_и_уровень_знаний_сотруд (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    платформы INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (платформы) REFERENCES dds.платформы(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES dds.уровни_знаний(id)
);
