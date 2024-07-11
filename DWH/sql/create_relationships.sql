CREATE TABLE базы_данных
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE базы_данных_и_уровень_знаний_сотрудников
(
  id                SERIAL      ,
  название          VARCHAR(255) NOT NULL,
  активность        BOOLEAN     ,
  дата_изм          TIMESTAMP   ,
  база_данных_id    SERIAL       NOT NULL,
  уровень_знаний_id INT         ,
  PRIMARY KEY (id)
);

CREATE TABLE инструменты
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  id         SERIAL       NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE инструменты_и_уровень_знаний_сотрудников
(
  id                SERIAL      ,
  user_id           INT         ,
  название          VARCHAR(255) NOT NULL,
  активность        BOOLEAN     ,
  дата_изм          TIMESTAMP   ,
  дата              DATE        ,
  инструменты_id    INT         ,
  уровень_знаний_id INT         ,
  PRIMARY KEY (id)
);

CREATE TABLE образование_пользователей
(
  id                          SERIAL      ,
  user_id                     INT          NOT NULL,
  активность                  BOOLEAN     ,
  дата_изм                    TIMESTAMP   ,
  уровень_образования         VARCHAR(255),
  название_учебного_заведения VARCHAR(255),
  год_окончания               INT         ,
  PRIMARY KEY (id)
);

CREATE TABLE опыт_сотрудника_в_отраслях
(
  id                          SERIAL   ,
  user_id                     INT       NOT NULL,
  активность                  BOOLEAN  ,
  дата                        TIMESTAMP,
  отрасли_id                  INT      ,
  уровень_знаний_в_отрасли_id INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE опыт_сотрудника_в_предметных_областях
(
  id                                     SERIAL   ,
  user_id                                INT       NOT NULL,
  активность                             BOOLEAN  ,
  дата                                   TIMESTAMP,
  предметная_область_id                  INT      ,
  уровень_знаний_в_предметной_области_id INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE отрасли
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE платформы
(
  id         Serial       NOT NULL,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE платформы_и_уровень_знаний_сотруд
(
  id             SERIAL NOT NULL,
  user_id        SERIAL NOT NULL,
  активность     bool  ,
  Дата изм.      DATE  ,
  дата           DATE  ,
  платформы      Serial NOT NULL,
  уровень знаний SERIAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE предметная_область
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE сертификаты_пользователей
(
  id                              SERIAL      ,
  user_id                         INT          NOT NULL,
  активность                      BOOLEAN     ,
  дата_изм                        TIMESTAMP   ,
  год_сертификата                 INT         ,
  наименование_сертификата        VARCHAR(255),
  организация_выдавшая_сертификат VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE сотрудники_дар
(
  id                    SERIAL      ,
  дата_рождения         DATE        ,
  активность            BOOLEAN     ,
  пол                   VARCHAR(10) ,
  фамилия               VARCHAR(255),
  имя                   VARCHAR(255),
  последняя_авторизация TIMESTAMP   ,
  должность             VARCHAR(255),
  цфо                   VARCHAR(255),
  дата_регистрации      DATE        ,
  дата_изменения        TIMESTAMP   ,
  подразделения         VARCHAR(255),
  email                 VARCHAR(255),
  логин                 VARCHAR(255),
  компания              VARCHAR(255),
  город_проживания      VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE среды_разработки
(
  id            SERIAL      ,
  название      VARCHAR(255) NOT NULL,
  активность    BOOLEAN     ,
  дата_изм      TIMESTAMP   ,
  инструмент_id INT         ,
  PRIMARY KEY (id)
);

CREATE TABLE среды_разработки_и_уровень_знаний_сотрудников
(
  id                  SERIAL   ,
  user_id             INT       NOT NULL,
  активность          BOOLEAN  ,
  дата_изм            TIMESTAMP,
  дата                DATE     ,
  среды_разработки_id INT      ,
  уровень_знаний_id   INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE технологии
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE технологии_и_уровень_знаний_сотрудников
(
  id                SERIAL   ,
  user_id           INT       NOT NULL,
  активность        BOOLEAN  ,
  дата_изм          TIMESTAMP,
  технологии_id     INT      ,
  уровень_знаний_id INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE типы_систем
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE типы_систем_и_уровень_знаний_сотрудников
(
  id                SERIAL   ,
  user_id           INT       NOT NULL,
  активность        BOOLEAN  ,
  дата_изм          TIMESTAMP,
  типы_систем_id    INT      ,
  уровень_знаний_id INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE уровень_образования
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата       TIMESTAMP   ,
  id         SERIAL       NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE уровни_владения_ин
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE уровни_знаний
(
  id         SERIAL       NOT NULL,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE уровни_знаний_в_отрасли
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE уровни_знаний_в_предметной_области
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  сорт       INT         ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE фреймворки
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE фреймворки_и_уровень_знаний_сотрудников
(
  id                SERIAL   ,
  user_id           INT       NOT NULL,
  активность        BOOLEAN  ,
  дата_изм          TIMESTAMP,
  фреймворки_id     INT      ,
  уровень_знаний_id INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE языки
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE языки_пользователей
(
  id                                   SERIAL   ,
  user_id                              INT       NOT NULL,
  активность                           BOOLEAN  ,
  дата_изм                             TIMESTAMP,
  язык_id                              INT      ,
  уровень_знаний_иностранного_языка_id INT      ,
  PRIMARY KEY (id)
);

CREATE TABLE языки_программирования
(
  id         SERIAL      ,
  название   VARCHAR(255) NOT NULL,
  активность BOOLEAN     ,
  дата_изм   TIMESTAMP   ,
  PRIMARY KEY (id)
);

CREATE TABLE языки_программирования_и_уровень_знаний
(
  id                       SERIAL   ,
  user_id                  INT       NOT NULL,
  активность               BOOLEAN  ,
  дата_изм                 TIMESTAMP,
  дата                     DATE     ,
  уровень_знаний_id        INT      ,
  язык_программирования_id INT      ,
  PRIMARY KEY (id)
);
