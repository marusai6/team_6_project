CREATE TABLE avakyan_dds.сотрудники_даp (
    id int8 PRIMARY KEY,
    "Дата рождения" text,
    активность BOOLEAN,
    пол text,
    фамилия text,
    имя text,
    "Последняя авторизация" text,
    должность text,
    цфо text,
    "Дата регистрации" text,
    "Дата изменения" text,
    подразделения text,
    "E-Mail" text,
    логин text,
    компания text,
    "Город проживания" text
);

CREATE TABLE avakyan_dds.базы_данных (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);


CREATE TABLE avakyan_dds.фреймворки (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.уровни_знаний_в_предметной_област
(
    id         INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм."   DATE,
    название text
);

CREATE TABLE avakyan_dds.уровни_знаний_в_отрасли
(
    id         INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм."   DATE,
    название text
);

CREATE TABLE avakyan_dds.уровни_владения_ин (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.языки (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.типы_систем (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.языки_программирования (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.технологии (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.инструменты (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.среды_разработки (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.платформы (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE avakyan_dds.уровни_знаний (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.отрасли (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.предметная_область (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.уровень_образования (
    id INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм." DATE,
    название text
);

CREATE TABLE avakyan_dds.образование_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Уровень образования" INT,
    "Название учебного заведения" VARCHAR(200),
    "Фиктивное название" text,
    "Год окончания" INT,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY ("Уровень образования") REFERENCES avakyan_dds.уровень_образования(id)
);


CREATE TABLE avakyan_dds.базы_данных_и_уровень_знаний_стору (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Базы данных" INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY ("Базы данных") REFERENCES avakyan_dds.базы_данных(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.инструменты_и_уровень_знаний_сотр (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    инструменты INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY (инструменты) REFERENCES avakyan_dds.инструменты(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.среды_разработки_и_уровень_знаний_ (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Среды разработки" INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY ("Среды разработки") REFERENCES avakyan_dds.среды_разработки(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.опыт_сотрудника_в_отраслях (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    отрасли INT,
    "Уровень знаний в отрасли" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY (отрасли) REFERENCES avakyan_dds.отрасли(id),
    FOREIGN KEY ("Уровень знаний в отрасли") REFERENCES avakyan_dds.уровни_знаний_в_отрасли(id)
);

CREATE TABLE avakyan_dds.опыт_сотрудника_в_предметных_областях (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Предметные области" INT,
    "Уровень знаний в предметной области" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY ("Предметные области") REFERENCES avakyan_dds.предметная_область(id),
    FOREIGN KEY ("Уровень знаний в предметной области") REFERENCES avakyan_dds.уровни_знаний_в_предметной_област(id)
);

CREATE TABLE avakyan_dds.сертификаты_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Наименование сертификата" Text,
    "Организация, выдавшая сертификат"  Text,
    "Год сертификата" Text,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id)
);

CREATE TABLE avakyan_dds.языки_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    язык INT,
    "Уровень знаний ин. языка" INT,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY (язык) REFERENCES avakyan_dds.языки(id),
    FOREIGN KEY ("Уровень знаний ин. языка") REFERENCES avakyan_dds.уровни_владения_ин(id)
);

CREATE TABLE avakyan_dds.типы_систем_и_уровень_знаний_сотру (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Типы систем" INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY ("Типы систем") REFERENCES avakyan_dds.типы_систем(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.технологии_и_уровень_знаний_сотру (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    технология INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY (технология) REFERENCES avakyan_dds.технологии(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.фреймворки_и_уровень_знаний_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    фреймворки INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY (фреймворки) REFERENCES avakyan_dds.фреймворки(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.языки_программирования_и_уровень_ (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    "Языки программирования" INT,
    "Уровень знаний" INT,
    дата DATE,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY ("Языки программирования") REFERENCES avakyan_dds.языки_программирования(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);

CREATE TABLE avakyan_dds.платформы_и_уровень_знаний_сотруд (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    платформы INT,
    "Уровень знаний" INT,
    дата date,
    FOREIGN KEY ("User ID") REFERENCES avakyan_dds.сотрудники_даp(id),
    FOREIGN KEY (платформы) REFERENCES avakyan_dds.платформы(id),
    FOREIGN KEY ("Уровень знаний") REFERENCES avakyan_dds.уровни_знаний(id)
);
